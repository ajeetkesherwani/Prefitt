const OrderReturn = require("../../../models/orderReturn");
const MainOrder = require("../../../models/mainOrder");
const AppError = require("../../../utils/AppError");
const catchAsync = require("../../../utils/catchAsync");


exports.getReturnOrderStatus = catchAsync(async (req, res, next) => {
  const userId = req.user.id;
  const { id } = req.params;
  // const { vendorId } = req.body;

    if (!id) {
        return next(new AppError("Order ID is required", 400));
    }
    console.log("id",id);
    // Find the OrderReturn that contains a product with the given subOrderId
    // Using a positional projection to retrieve only matching product entries is supported via the projection object
    const returnRequest = await OrderReturn.findOne(
      { 'products.subOrderId': id },
      { 'products.$': 1, createdAt: 1, updatedAt: 1, userId: 1 }
    ).lean();

    if (!returnRequest) {
      return next(new AppError('No return request found for this order', 404));
    }

    // Optionally ensure the requesting user owns this return request
    if (returnRequest.userId && returnRequest.userId.toString() !== userId.toString()) {
      return next(new AppError('Not authorized to view this return request', 403));
    }

    // products.$ projection returns an array with the matched element(s)
    const matchedProducts = Array.isArray(returnRequest.products) ? returnRequest.products : [];

    const responseData = {
      _id: returnRequest._id,
      products: matchedProducts.map(p => ({
        productId: p.productId,
        subOrderId: p.subOrderId,
        quantity: p.quantity,
        vendorId: p.vendorId,
        reason: p.reason,
        message: p.message,
        status: p.status
      })),
      createdAt: returnRequest.createdAt,
      updatedAt: returnRequest.updatedAt
    };

    // Send success response
    res.status(200).json({
      success: true,
      message: 'Return request fetched successfully',
      data: responseData,
    });
});
