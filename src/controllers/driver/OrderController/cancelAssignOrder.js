const SubOrder = require("../../../models/SubOrder");
const AppError = require("../../../utils/AppError");
const { successResponse } = require("../../../utils/responseHandler");
const catchAsync = require("../../../utils/catchAsync");

exports.cancelOrderByDriver = catchAsync(async (req, res, next) => {
    const driverId = req.driver.id;
    const { subOrderId } = req.params;
    const  { cancellReson } = req.body;

    if(!cancellReson) return next(new AppError("cancellReson is required",400));

    if (!subOrderId) {
        return next(new AppError("SubOrder ID is required", 400));
    }

    const subOrder = await SubOrder.findById(subOrderId);
    if (!subOrder) {
        return next(new AppError("SubOrder not found", 404));
    }

    // check if driver is the same
    if (String(subOrder.assignDeliveryBoyId) !== String(driverId)) {
        return next(new AppError("Not authorized to cancel this order", 403));
    }

    subOrder.status = "cancelled";
    subOrder.cancellReson = cancellReson

    await subOrder.save();

    successResponse(res, "Order rejected successfully by driver", subOrder);
});
