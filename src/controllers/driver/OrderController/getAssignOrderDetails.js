const SubOrder = require("../../../models/SubOrder");
const Products = require("../../../models/products");
const AppError = require("../../../utils/AppError");
const catchAsync = require("../../../utils/catchAsync");
const { successResponse } = require("../../../utils/responseHandler");

exports.getAssignOrderDetails = catchAsync(async (req, res, next) => {
  const driverId = req.driver._id;
  const { subOrderId } = req.params;

  if (!driverId) return next(new AppError("Driver not authenticated", 401));
  if (!subOrderId) return next(new AppError("SubOrder ID is required", 400));

  const subOrder = await SubOrder.findOne({
    _id: subOrderId,
    assignDeliveryBoyId: driverId,
    isDeliveryAsign: true,
  })
    .populate("mainOrderId")
    .populate("vendorId")
    .populate("products.productId")
    .lean();
  
    console.log("subOrder",subOrder);

  if (!subOrder) {
    return next(new AppError("SubOrder not found or not assigned to you", 404));
  }
  // Build items from subOrder.products using available schema fields.
  // Each product entry may already contain name and productId (populated or not).
  const productDetails = (subOrder.products || []).map((item) => {
    // productId may be ObjectId or populated object
    const pidObj = item.productId && typeof item.productId === 'object' ? item.productId : null;
    const productIdValue = pidObj ? pidObj._id : item.productId;

    // Prefer item's stored name, then populated product name, then fall back
    const productName = (item.name && item.name.toString()) || (pidObj && (pidObj.name || pidObj.title)) || 'Unknown Product';

    // Try multiple common image field names on the populated product
    const productImage = pidObj && (pidObj.primary_image || pidObj.primaryImage || pidObj.image || pidObj.thumbnail) || null;

    const variant = Array.isArray(item.variant) ? item.variant.map(v => ({ value: v.value, variantTypeId: v.variantTypeId })) : [];

    const totalItemAmount = item.totalItemAmount ?? (typeof item.price === 'number' && typeof item.quantity === 'number' ? item.price * item.quantity : null);

    return {
      productId: productIdValue,
      productName,
      productImage,
      quantity: item.quantity || 0,
      price: item.price || 0,
      discountedPrice: item.discountedPrice || null,
      gstPercentage: item.gstPercentage || null,
      gstAmount: item.gstAmount || null,
      totalItemAmount,
      variant,
      orderNumber: subOrder.mainOrderId?.orderNumber || 'N/A',
    };
  });

  // Basic suborder details
  const basicSubOrder = {
    subOrderId: subOrder._id,
    vendor: {
      id: subOrder.vendorId?._id || subOrder.vendorId || null,
      shopName: subOrder.vendorId?.shopName || null,
      mobile: subOrder.vendorId?.mobile || null,
      address: subOrder.vendorId?.shopAddress || null,
    },
    mainOrder: {
      id: subOrder.mainOrderId?._id || subOrder.mainOrderId || null,
      orderNumber: subOrder.mainOrderId?.orderNumber || null,
      expectedDeliveryTime: subOrder.mainOrderId?.expectedDeliveryTime || null,
      address: subOrder.mainOrderId?.address || null,
      user: subOrder.mainOrderId?.user_Id || null,
    },
    totals: {
      subTotal: subOrder.subTotal || null,
      totalGST: subOrder.totalGST || null,
      totalAmount: subOrder.totalAmount || null,
      deliveryCharge: subOrder.deliveryCharge?.amount || null,
    },
    status: subOrder.status || null,
    pickupotp: subOrder.pickupotp || null,
    expiresAt: subOrder.expiresAt || null,
    isDeliveryAsign: subOrder.isDeliveryAsign || false,
    assignDeliveryBoyId: subOrder.assignDeliveryBoyId || null,
  };

  successResponse(res, 'SubOrder fetched', { subOrder: basicSubOrder, productDetails });
});
