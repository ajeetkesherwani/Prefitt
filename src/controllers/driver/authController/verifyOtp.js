const Driver = require("../../../models/driver");
const AppError = require("../../../utils/AppError");
const catchAsync = require("../../../utils/catchAsync");
const createToken = require("../../../utils/createToken");

exports.verifyOtp = catchAsync(async(req, res, next) => {

    const { mobile, otp,fcmToken,deviceId } = req.body;
    if (!mobile || !otp) return next(new AppError("mobile and otp is required", 400));

    const driver = await Driver.findOne({ mobile });
    if (!driver) {
        return next(new AppError("User not found with this mobile number.", 404));
      }
    
      // Check OTP validity
      if (
        !driver.otp ||
        driver.otp !== otp ||
        !driver.otpExpire ||
        new Date() > new Date(driver.otpExpire)
      ) {
        return next(new AppError("Invalid or expired OTP.", 401));
      }
    
      console.log("fcmToken", fcmToken);
      console.log("deviceId", deviceId);
      // OTP is valid → clear OTP
      driver.otp = undefined;
      driver.otpExpire = undefined;
      driver.fcmToken = fcmToken || driver.fcmToken;
      driver.deviceId = deviceId || driver.deviceId;
      await driver.save();
    
      // Check registration status
      const isRegistered = driver.status === true && driver.isBlocked === false;
    
      if (!isRegistered) {
        return res.status(200).json({
          success: true,
          message:
            "OTP verified, but User is not registered (not verified or blocked).",
          isRegistered: false,
        });
      }
    
      createToken(driver, 200, res, {
        message: "OTP verified and user is registered.",
        isRegistered: true,
      });



    // if (!driver) return next(new AppError("Driver not found with this is mobile number", 404));

    // if (!driver.status) {
    //     return next(new AppError("You are not verify. wait for verification", 400));
    // }

    // if (driver.isBlocked) {
    //     return next(new AppError("You are blocked", 400));
    // }

    // if (!driver.otp || !driver.otpExpire) {
    //     return next(new AppError("OTP not found or expired.", 401));
    // }

    // if (driver.otp !== otp) {
    //     return next(new AppError("Invalid OTP.", 401));
    // }

    // if(new Date() > driver.otpExpire) {
    //     return next(new AppError("OTP has expired.", 401));
    // }

    // driver.otp = undefined;
    // driver.otpExpire = undefined;

    // await driver.save();

   createToken(driver, 200, res);
  
});