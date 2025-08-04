const driverWalletHistory = require("../../../models/driverWalletHistory");
const AppError = require("../../../utils/AppError");
const catchAsync = require("../../../utils/catchAsync");
const { successResponse } = require("../../../utils/responseHandler");


exports.getAllDriverWalletList = catchAsync(async(req, res, next) => {

    const { reason } = req.query;
    if(!reason) return next(new AppError("query is required", 400));

    const driverWalletList = await driverWalletHistory.find({ reason }).lean();

    if (driverWalletList.length === 0) {
        return successResponse(res, "No wallet history found for this reason", []);
    }

    successResponse(res, "Driver Wallet History Found" , driverWalletList);

});