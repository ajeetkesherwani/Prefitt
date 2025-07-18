const ProductInventory = require("../../../models/productInventry");
const AppError = require("../../../utils/AppError");
const catchAsync = require("../../../utils/catchAsync");
const { successResponse } = require("../../../utils/responseHandler");

exports.liveOrderUpdate = catchAsync(async (req, res, next) => {
      const vendorId = req.vendor._id;
    // const vendorId = "68495525b853bcff088802c7";
    if (!vendorId) return next(new AppError("Vendor ID is required", 400));

    const { inventoryId, index } = req.params;
    const { inStock } = req.body;

    if (!inventoryId || index === undefined)
        return next(new AppError("Inventory ID and index are required", 400));

    if (typeof inStock !== "boolean")
        return next(new AppError("inStock must be a boolean value", 400));

    const inventory = await ProductInventory.findOne({ _id: inventoryId, vendor_id: vendorId });
    if (!inventory) return next(new AppError("Inventory not found", 404));

    if (!inventory.inventoryData[index])
        return next(new AppError("Invalid variant index in inventory data", 400));

    // Update the inStock status
    inventory.inventoryData[index].inStock = inStock;

    await inventory.save();

    successResponse(res, "Inventory stock status updated successfully", {
        inventoryId,
        variantIndex: index,
        updatedStock: inStock,
    });
});
