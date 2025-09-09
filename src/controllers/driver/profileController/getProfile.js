const Driver = require("../../../models/driver");
const AppError = require("../../../utils/AppError");
const catchAsync = require("../../../utils/catchAsync");
const { successResponse } = require("../../../utils/responseHandler");

exports.getDriverProfile = catchAsync(async (req, res, next) => {

    const driverId = req.driver.id;

    if (!driverId) return next(new AppError("Unauthorized access", 401));

    const driver = await Driver.findById(driverId)
        .populate("details")  
        .populate("accounts");
        
    if (!driver) return next(new AppError("driver not found", 404));

    successResponse(res, "Driver profile fetched successfully", driver);

});