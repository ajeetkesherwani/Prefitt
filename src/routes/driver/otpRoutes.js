const express = require("express");

const {
    driverAuthenticate } =
    require("../../controllers/driver/authController/driverAuthenticate");

const {
    generatePickupOtp
} = require("../../controllers/driver/otpController/getOtp");
const { verifyPickupOtp } = require("../../controllers/driver/otpController/verifyOtp");

const router = express.Router();

router.post("/generate/:subOrderId", driverAuthenticate, generatePickupOtp);
router.post("/verify/:subOrderId", driverAuthenticate, verifyPickupOtp);

module.exports = router;
