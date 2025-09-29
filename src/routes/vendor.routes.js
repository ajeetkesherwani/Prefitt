const express = require("express");

const router = express.Router();

router.use("/auth", require("./vendor/authRoutes"));
router.use("/profile", require("./vendor/profileRoutes"));
router.use("/product", require("./vendor/productRoutes"));
router.use("/order", require("./vendor/orderRoutes"));
router.use("/productInventory", require("./vendor/productInventoryRoutes"));
router.use("/common", require("./vendor/commonRoutes"));
router.use("/pending/order", require("./vendor/orderListRoutes"));
router.use("/return", require("./vendor/orderReturnRoutes"));
router.use("/return-order", require("./vendor/returnRequestRoutes"));
router.use("/dashboard", require("./vendor/dashboardRoutes"));
router.use("/live-order", require("./vendor/liveOrderRoutes.js"));
router.use("/cmspage", require("./vendor/cmsPageRoutes.js"));
router.use("/exchangeRequest", require("./vendor/exchangeRoutes.js"));
router.use("/coupon", require("./vendor/couponRoutes.js"));
router.use("/lastSettlement", require("./vendor/lastSettlementRoutes.js"));
router.use("/paymentSettlement", require("./vendor/paymentSettlementRoutes.js"));
router.use("/productVariant", require("./vendor/productVariantRoutes"));

module.exports = router;
