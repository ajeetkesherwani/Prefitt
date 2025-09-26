const Driver = require("../../../models/driver");
const AppError = require("../../../utils/AppError");
const catchAsync = require("../../../utils/catchAsync");
const { successResponse } = require("../../../utils/responseHandler");

exports.sendOtp = catchAsync(async (req, res, next) => {

    let { mobile } = req.body;
    if (!mobile) return next(new AppError("mobile is required", 400));

    let driver = await Driver.findOne({ mobile });

    const otp = "1234";
    const otpExpire = Date.now() + 10 * 60 * 1000;

    if (driver) {
        driver.otp = otp;
        driver.otpExpire = otpExpire;
    } else {
        driver = await Driver.create({
            mobile,
            otp,
            otpExpire
        });
    }

    await driver.save();

    // res.status(200).json({ status: true, message: "otp generate successfully", otp })
    successResponse(res, "otp generate successfully", otp);

});