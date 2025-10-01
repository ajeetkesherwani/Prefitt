const express = require("express");

const authRoutes = require("./driver/authRoutes");
const orderRoutes = require("./driver/orderRoutes");
const profileRoutes = require("./driver/profileRoutes");
const cmsRoutes = require("./driver/cmsRoutes");
const earningRoutes = require("./driver/earningRoutes");
const otpRoutes = require("./driver/otpRoutes");
const deliverySummaryRoutes = require("./driver/deliverySummaryRoutes");

const router = express.Router();

router.use("/auth", authRoutes);
router.use("/order", orderRoutes);
router.use("/profile", profileRoutes);
router.use("/cms", cmsRoutes);
router.use("/earning", earningRoutes);
router.use("/otp", otpRoutes);
router.use("/delivery", deliverySummaryRoutes);



module.exports = router; 