// const Product = require("../../../models/products");

// exports.getProductVariants = async (req, res) => {
//   const { productId } = req.params;

//   try {
//     const product = await Product.findById(productId)

//     if (!product || !product.variants || product.variants.length === 0) {
//       return res.status(404).json({
//         success: false,
//         message: "No variants found for this product",
//       });
//     }

//     res.status(200).json({
//       success: true,
//       message: "Variants fetched successfully",
//       count: product.variants.length,
//       data: product.variants,
//     });
//   } catch (error) {
//     return res.status(500).json({ success: false, message: error.message });
//   }
// };


// const ProductVariant = require("../../../models/productVariant");
// const AppError = require("../../../utils/AppError");

// exports.getProductVariants = async (req, res) => {
//   const id = req.params.id;
//   console.log("id", id);
//   try {
//     const getProductVariants = await ProductVariant.findById(id);
//     console.log("variants", getProductVariants)
//     if (!getProductVariants) {
//       return new AppError("productVariants not found", 404);
//     }

//     res.status(200).json({
//       success: true,
//       message: "productVariant found",
//       data: getProductVariants,
//     });
//   } catch (error) {
//     console.log("ryyyyyyyyyyyy");
//     return new AppError(error.message, 500);
//   }
// };

const Product = require("../../../models/products");
const AppError = require("../../../utils/AppError");
const catchAsync = require("../../../utils/catchAsync");
const { successResponse } = require("../../../utils/responseHandler");

exports.getProductVariants = catchAsync(async (req, res, next) => {
    const { productId } = req.params;

    const product = await Product.findById(productId)
        .select("variants name")
        .populate("variants.VariantTypeId", "variantName")
        .lean();



    if (!product) {
        return next(new AppError("Product not found", 404));
    }

    if (!product.variants || product.variants.length === 0) {
        return next(new AppError("No variants available for this product", 404));
    }


    const variantData = product.variants.map((variant) => ({
        _id: variant._id,
        VariantTypeId: variant.VariantTypeId._id,
        variantName: variant.VariantTypeId.variantName,
        value: variant.value,
    }));




    successResponse(res, "Variants fetch successfully for this product", {
        productName: product.name,
        variants: variantData
    })
});


