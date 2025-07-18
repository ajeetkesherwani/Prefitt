// const ProductInventory = require("../../../models/productInventry");
// const AppError = require("../../../utils/AppError");
// const catchAsync = require("../../../utils/catchAsync");

// const normalizeVariantData = (variantArray) => {
//     return [...variantArray]
//         .map(v => ({
//             variantType_id: v.variantType_id.toString(),
//             // variantType_id: v.variantType_id ? v.variantType_id.toString() : null,
//             value: v.value.trim().toLowerCase()
//         }))
//         .sort((a, b) => a.variantType_id.localeCompare(b.variantType_id));
// };


// exports.updateInventory = catchAsync(async (req, res, next) => {
//     const { id } = req.params;
//     if (!id) return next(new AppError("Inventory ID is required", 400));

//     const {
//         vendor_id,
//         service_id,
//         category_id,
//         subCategory_id,
//         product_id,
//         inventoryData
//     } = req.body;

//     const inventory = await ProductInventory.findById(id);
//     if (!inventory) return next(new AppError("Inventory not found", 404));


//     if (vendor_id) inventory.vendor_id = vendor_id;
//     if (service_id) inventory.service_id = service_id;
//     if (category_id) inventory.category_id = category_id;
//     if (subCategory_id) inventory.subCategory_id = subCategory_id;
//     if (product_id) inventory.product_id = product_id;

//     if (Array.isArray(inventoryData)) {
//         inventoryData.forEach((newItem) => {
//             const newNormalized = JSON.stringify(normalizeVariantData(newItem.variantData));

//             const matchIndex = inventory.inventoryData.findIndex((existingItem) => {
//                 const existingNormalized = JSON.stringify(normalizeVariantData(existingItem.variantData));
//                 return existingNormalized === newNormalized;
//             });

//             if (matchIndex > -1) {
//                 const existing = inventory.inventoryData[matchIndex];
//                 if ("mrp" in newItem) existing.mrp = newItem.mrp;
//                 if ("sellingPrice" in newItem) existing.sellingPrice = newItem.sellingPrice;
//                 if ("quantity" in newItem) existing.quantity = newItem.quantity;
//                 if ("inStock" in newItem) existing.inStock = newItem.inStock;
//                 if ("status" in newItem) existing.status = newItem.status;
//             }
//         });
//     }

//     await inventory.save();

//     res.status(200).json({
//         status: true,
//         message: "Inventory updated successfully",
//         data: inventory,
//     });
// });


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
            const existingItem = inventory.inventoryData.find((i) =>
                i._id.toString() === newItem._id
            );

            if (existingItem) {
                if ("mrp" in newItem) existingItem.mrp = newItem.mrp;
                if ("sellingPrice" in newItem) existingItem.sellingPrice = newItem.sellingPrice;
                if ("quantity" in newItem) existingItem.quantity = newItem.quantity;
                if ("inStock" in newItem) existingItem.inStock = newItem.inStock;
                if ("status" in newItem) existingItem.status = newItem.status;

                if (Array.isArray(newItem.variantData)) {
                    newItem.variantData.forEach((updatedVariant) => {
                        const existingVariant = existingItem.variantData.find(
                            (v) => v._id.toString() === updatedVariant._id
                        );

                        if (existingVariant) {
                            if ("value" in updatedVariant)
                                existingVariant.value = updatedVariant.value.trim().toLowerCase();

                            if ("variantType_id" in updatedVariant)
                                existingVariant.variantType_id = updatedVariant.variantType_id?.toString() || null;
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
