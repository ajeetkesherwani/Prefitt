const SubOrder = require("../../../models/SubOrder");
const AppError = require("../../../utils/AppError");
const catchAsync = require("../../../utils/catchAsync");
const { successResponse } = require("../../../utils/responseHandler");

exports.verifyPickupOtp = catchAsync(async (req, res, next) => {
    const { subOrderId } = req.params;
    const { otp } = req.body;
    const driverId = req.driver.id;
    if (!driverId) return next(new AppError("driverID is requried", 404));

    const subOrder = await SubOrder.findById(subOrderId);

    if (!subOrder) return next(new AppError("SubOrder not found", 404));

    if (
        !subOrder.assignDeliveryBoyId ||
        subOrder.assignDeliveryBoyId.toString() !== driverId
    ) {
        return next(new AppError("Not authorized for this suborder", 403));
    }

    if (!subOrder.pickupotp || subOrder.verified) {
        return next(new AppError("OTP not generated or already verified", 400));
    }

    if (subOrder.expiresAt < new Date()) {
        return next(new AppError("OTP expired", 400));
    }

    if (subOrder.pickupotp !== otp) {
        return next(new AppError("Invalid OTP", 400));
    }

    subOrder.verified = true;
    subOrder.status = "pickuped";
    await subOrder.save();

    successResponse(res, "Pickup otp verified successfully", {
        subOrderId: subOrder._id,
        status: subOrder.status,
    });
});
