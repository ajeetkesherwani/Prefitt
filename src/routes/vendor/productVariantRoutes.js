const express = require("express");

const { 
    getProductVariants
} = require("../../controllers/vendor/productVariantController/getProductVariantById");

const { 
    vendorAuthenticate 
} = require("../../controllers/vendor/authController/vendorAuthenticate");

const router = express.Router();


// router.get("/products/:id/variants", vendorAuthenticate, getProductVariants);
router.get("/list/:productId", vendorAuthenticate, getProductVariants );

module.exports = router