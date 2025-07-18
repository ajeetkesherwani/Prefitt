const ProductInventory = require("../../../models/productInventry");
const AppError = require("../../../utils/AppError");
const catchAsync = require("../../../utils/catchAsync");
const { successResponse } = require("../../../utils/responseHandler");

exports.getLiveOrders = catchAsync(async (req, res, next) => {
  const vendorId = req.vendor._id;
  // const vendorId = "68495525b853bcff088802c7";
  if (!vendorId) return next(new AppError("Vendor ID is required", 400));

  const inventoryItems = await ProductInventory.find({ vendor_id: vendorId })
    .populate({
      path: "product_id",
      select: "name primary_image categoryId",
      populate: { path: "categoryId", select: "name" }
    })
    .populate("inventoryData.variantData.variantType_id", "variantName")
    .lean();

  const result = [];

  for (const item of inventoryItems) {
    const product = item.product_id;
    if (!product) continue;

    const categoryName = product?.categoryId?.name || "N/A";

    for (const inv of item.inventoryData) {
      if (!inv.inStock || inv.quantity <= 0) continue; 

      const variants = inv.variantData.map((v) => ({
        type: v.variantType_id?.variantName || "Unknown",
        value: v.value,
      }));

      result.push({
        productId: product._id,
        name: product.name,
        image: product.primary_image,
        category: categoryName,
        mrp: inv.mrp,
        sellingPrice: inv.sellingPrice,
        quantity: inv.quantity,
        inStock: inv.inStock,
        status: inv.status,
        variantCombination: variants,
        inventoryId: item._id, 
        inventoryIndex: item.inventoryData.indexOf(inv),
      });
    }
  }

  successResponse(res, "Live products found", result);

});
