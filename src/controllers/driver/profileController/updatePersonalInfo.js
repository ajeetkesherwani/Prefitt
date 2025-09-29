const Driver = require("../../../models/driver");
const catchAsync = require("../../../utils/catchAsync");
const AppError = require("../../../utils/AppError");
const { successResponse } = require("../../../utils/responseHandler");

exports.updateDriverPersonalInfo = catchAsync(async (req, res, next) => {
    const driverId = req.driver.id;

    if (!driverId) return next(new AppError("driverId is required", 400));

    const driver = await Driver.findById(driverId);

    if (!driver) return next(new AppError("Driver not found", 404));

    const allowedFields = ["firstName", "lastName", "dob", "gender", "email", "mobile", "address", "vehicleType", "location"];

    allowedFields.forEach((field) => {
        if (req.body[field] !== undefined) {
            driver[field] = req.body[field];
        }
    });

    if (req.files?.frontPhoto?.[0]?.path) {
        driver.frontPhoto = req.files.frontPhoto[0].path;
        console.log("front photo", driver.frontPhoto);
    }

    await driver.save();

    successResponse(res, "Driver personal info updated successfully", driver);
});
