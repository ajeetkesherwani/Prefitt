const mongoose = require("mongoose");
const Product = require("../../../models/products");
const AppError = require("../../../utils/AppError");
const catchAsync = require("../../../utils/catchAsync");

exports.productDetail = catchAsync(async (req, res) => {
  const { productId } = req.params;

  // Validate ObjectId
  if (!mongoose.Types.ObjectId.isValid(productId)) {
    return next(new AppError("Invalid product ID", 400));
  }

  const productDetail = await Product.findById(productId)
    .populate("serviceId", "name status image")
    .populate("categoryId", "name")
    .populate("subCategoryId", "name")
    .populate("vendor", "shopName shopId mobile profileImg")
    .populate("variants.VariantTypeId", "variantName");

  const reletedProducts = await Product.find({
    _id: { $ne: productId },
    serviceId: productDetail?.serviceId?._id,
    categoryId: productDetail?.categoryId?._id,
  }).select("name primary_image price discountedPrice");

  if (!productDetail) {
    return new AppError("Product not found", 404);
  }

  res.status(200).json({
    success: true,
    message: "Product details found",
    count: productDetail.length,
    data: productDetail,
    reletedProducts: reletedProducts,
  });
});
