const Driver = require("../../../models/driver");
const catchAsync = require("../../../utils/catchAsync");
const AppError = require("../../../utils/AppError");
const { successResponse } = require("../../../utils/responseHandler");


exports.getDriverDetails = catchAsync(async (req, res, next) => {
    const driverId = req.driver.id;
    console.log("driverID", driverId);

    const driver = await Driver.findById(driverId).populate("details");

    if (!driver) return next(new AppError("Driver not found", 404));
    if (!driver.details) return next(new AppError("Driver details not found", 404));

    successResponse(res, "Driver details fetched successfully", driver.details);
});
