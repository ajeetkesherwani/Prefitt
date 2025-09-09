const Driver = require("../../../models/driver");
const catchAsync = require("../../../utils/catchAsync");
const AppError = require("../../../utils/AppError");
const { successResponse } = require("../../../utils/responseHandler");

exports.updateInfoInDetail = catchAsync(async (req, res, next) => {
    const driverId = req.driver.id;

    if (!driverId) return next(new AppError("Unauthorized access", 401));

    const { licNumber } = req.body;

    const driver = await Driver.findById(driverId).populate("details");
    if (!driver) return next(new AppError("Driver not found", 404));

    const details = driver.details;
    if (!details) return next(new AppError("Driver details not found", 404));

    if (licNumber) details.licence.number = licNumber;

     if (req.files?.licFrontPhoto?.[0]?.path)
      details.licence.frontPhoto = req.files.licFrontPhoto[0].path;

    if (req.files?.licBackPhoto?.[0]?.path)
      details.licence.backPhoto = req.files.licBackPhoto[0].path;

    if (req.files?.aadFrontPhoto?.[0]?.path)
      details.adharCard.frontPhoto = req.files.aadFrontPhoto[0].path;

    if (req.files?.aadBackPhoto?.[0]?.path)
      details.adharCard.backPhoto = req.files.aadBackPhoto[0].path;

    if (req.files?.rcFrontPhoto?.[0]?.path)
      details.rcRegistration.frontPhoto = req.files.rcFrontPhoto[0].path;

    if (req.files?.rcBackPhoto?.[0]?.path)
      details.rcRegistration.backPhoto = req.files.rcBackPhoto[0].path;
  
    await details.save();

    successResponse(res, "Driver details updated successfully", details);
});
