const SubOrder = require("../../../models/SubOrder");
const AppError = require("../../../utils/AppError");
const catchAsync = require("../../../utils/catchAsync");
const { successResponse } = require("../../../utils/responseHandler");

//generate OTP
const generateOtp = () =>
    Math.floor(1000 + Math.random() * 9000).toString();

exports.generatePickupOtp = catchAsync(async (req, res, next) => {
    const { subOrderId } = req.params;
    const driverId = req.driver.id;
    if (!driverId) return next(new AppError("driverID is requried", 404));


    const subOrder = await SubOrder.findById(subOrderId).populate({
        path: "mainOrderId",
        populate: { path: "user_Id", model: "User" },
    });

    if (!subOrder) return next(new AppError("SubOrder not found", 404));

    if (!subOrder.assignDeliveryBoyId ||
        subOrder.assignDeliveryBoyId.toString() !== driverId
    ) {
        return next(new AppError("Not authorized for this suborder", 403));
    }

    const otp = generateOtp();
    subOrder.pickupotp = otp;
    subOrder.expiresAt = new Date(Date.now() + 10 * 60 * 1000); // 10 min validity
    subOrder.verified = false;
    await subOrder.save();

    const customerPhone = subOrder.mainOrderId.user_Id.mobileNo;

    // Send OTP to customer (SMS/Email)
    console.log(`Send OTP ${otp} to customer phone: ${customerPhone}`);

    successResponse(res, "Pickup OTP generated and sent to customer", {
        subOrderId: subOrder._id,
        customerPhone: customerPhone,
        otp
    });
});

