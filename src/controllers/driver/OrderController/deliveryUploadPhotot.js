const SubOrder = require("../../../models/SubOrder");
const AppError = require("../../../utils/AppError");
const catchAsync = require("../../../utils/catchAsync");
const { successResponse } = require("../../../utils/responseHandler");

exports.deliveryPhotoUpload = catchAsync(async (req, res, next) => {

    const driverId = req.driver._id;
    const { subOrderId } = req.params;

    const subOrder = await SubOrder.findById(subOrderId);
    if (!subOrder) return next(new AppError("SubOrder not found", 404));

    if (String(subOrder.assignDeliveryBoyId) !== String(driverId)) {
        return next(new AppError("Unauthorized access", 403));
    }

    const uploadedPhotos = req.files?.deliveryPhoto?.map(file => file.path);

    if (!uploadedPhotos || uploadedPhotos.length === 0) {
        return next(new AppError("At least one photo is required", 400));
    }

    subOrder.deliveryPhoto = uploadedPhotos;
    await subOrder.save();

    successResponse(res, "subOrder status updated successfully", {
        orderId: subOrder._id,
        deliveryPhoto: subOrder.deliveryPhoto
    });
});