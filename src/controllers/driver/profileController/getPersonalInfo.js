const Driver = require("../../../models/driver");
const catchAsync = require("../../../utils/catchAsync");
const AppError = require("../../../utils/AppError");
const { successResponse } = require("../../../utils/responseHandler");

exports.getDriverPersonalInfo = catchAsync(async (req, res, next) => {
    const driverId = req.driver.id;

    const driver = await Driver.findById(driverId)
        .select("firstName lastName dob gender email mobile address vehicleType location frontPhoto status");

    if (!driver) return next(new AppError("Driver not found", 404));

    successResponse(res, "Driver personal info fetched successfully", driver);
});
