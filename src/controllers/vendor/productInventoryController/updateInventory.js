const ProductInventory = require("../../../models/productInventry");
const AppError = require("../../../utils/AppError");
const catchAsync = require("../../../utils/catchAsync");

exports.updateInventory = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  if (!id) return next(new AppError("Inventory ID is required", 400));

  const {
    vendor_id,
    service_id,
    category_id,
    subCategory_id,
    product_id,
    inventoryData,
  } = req.body;

  const inventory = await ProductInventory.findById(id);
  if (!inventory) return next(new AppError("Inventory not found", 404));

  if (vendor_id) inventory.vendor_id = vendor_id;
  if (service_id) inventory.service_id = service_id;
  if (category_id) inventory.category_id = category_id;
  if (subCategory_id) inventory.subCategory_id = subCategory_id;
  if (product_id) inventory.product_id = product_id;

  if (Array.isArray(inventoryData)) {
    inventoryData.forEach((newItem) => {
      if (!newItem._id) return; 

      const existingItem = inventory.inventoryData.find(
        (i) => i._id.toString() === newItem._id.toString()
      );

      if (existingItem) {
        if ("add_on_price" in newItem) existingItem.add_on_price = newItem.add_on_price;
        if ("quantity" in newItem) existingItem.quantity = newItem.quantity;
        if ("inStock" in newItem) existingItem.inStock = newItem.inStock;
        if ("status" in newItem) existingItem.status = newItem.status;

        if (Array.isArray(newItem.variantData)) {
          newItem.variantData.forEach((updatedVariant) => {
            if (!updatedVariant._id) return;

            const existingVariant = existingItem.variantData.find(
              (v) => v._id.toString() === updatedVariant._id.toString()
            );

            if (existingVariant) {
              if (
                "value" in updatedVariant &&
                typeof updatedVariant.value === "string"
              ) {
                existingVariant.value = updatedVariant.value.trim().toLowerCase();
              }

              if ("variantType_id" in updatedVariant)
                existingVariant.variantType_id =
                  updatedVariant.variantType_id?.toString() || null;
            }
          });
        }
      }
    });
  }

  await inventory.save();

  res.status(200).json({
    status: true,
    message: "Inventory updated successfully",
    data: inventory,
  });
});
