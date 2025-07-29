// controllers/driver/deliveryController.js
const SubOrder = require("../../../models/SubOrder");
const catchAsync = require("../../../utils/catchAsync");
const AppError = require("../../../utils/AppError");
const { successResponse } = require("../../../utils/responseHandler");

exports.orderDelivered = catchAsync(async (req, res, next) => {
    const { subOrderId } = req.params;
    const driverId = req.driver._id;
    console.log("subirderid", subOrderId);

    const subOrder = await SubOrder.findOne({ _id: subOrderId, assignDeliveryBoyId: driverId });
    console.log("suborder", subOrder);
    if (!subOrder) return next(new AppError("SubOrder not found or not assigned to you", 404));

    if (subOrder.status === "delivered") {
        return next(new AppError("This order is already marked as delivered", 400));
    }

    subOrder.status = "delivered";
    await subOrder.save();

    successResponse(res, "Order status  delivered update successfully", subOrder);
});
