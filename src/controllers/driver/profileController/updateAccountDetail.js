const Driver = require("../../../models/driver");
const catchAsync = require("../../../utils/catchAsync");
const AppError = require("../../../utils/AppError");
const { successResponse } = require("../../../utils/responseHandler");

exports.updateDriverAccount = catchAsync(async (req, res, next) => {
    const driverId = req.driver.id;

    if (!driverId) return next(new AppError("Unauthorized access", 401));

    const driver = await Driver.findById(driverId).populate("accounts");

    if (!driver) return next(new AppError("Driver not found", 404));

    if (!driver.accounts) return next(new AppError("Driver account details not found", 404));

    const account = driver.accounts;

    const allowedFields = [
        "bankName",
        "accountNumber",
        "ifscCode",
        "accountHolderName"
    ];

    allowedFields.forEach((field) => {
        if (req.body[field] !== undefined) {
            account[field] = req.body[field];
        }
    });

    await account.save();

    successResponse(res, "Driver account details updated successfully", account);
});
