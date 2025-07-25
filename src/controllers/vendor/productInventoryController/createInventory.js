const ProductInventory = require("../../../models/productInventry");
const AppError = require("../../../utils/AppError");
const catchAsync = require("../../../utils/catchAsync");

exports.createInventory = catchAsync(async (req, res, next) => {

 const vendorId = req.vendor._id;
 if(!vendorId) return next(new AppError("vendorID is required",400));

  const {
    service_id,
    category_id,
    subCategory_id,
    product_id,
    inventoryData
  } = req.body;

  if (!service_id || !category_id || !subCategory_id || !product_id || !inventoryData) {
    return next(new AppError("all fields are required", 400));
  }

  const productInventory = new ProductInventory({
    vendor_Id: vendorId,
    service_id,
    category_id,
    subCategory_id,
    product_id,
    inventoryData
  });

  await productInventory.save();

  res.status(200).json({
    status: true,
    message: "Product inventory created successfully",
    data: productInventory
  });
});