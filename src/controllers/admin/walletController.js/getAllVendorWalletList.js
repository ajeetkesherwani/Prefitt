const VendorWallet = require("../../../models/vendorWalletHistory");
const AppError = require("../../../utils/AppError");
const catchAsync = require("../../../utils/catchAsync");
const { successResponse } = require("../../../utils/responseHandler");


exports.getAllVendorWalletList = catchAsync(async(req, res, next) => {

    const { reason } = req.query;
    if(!reason) return next(new AppError("query is required", 400));

    const vendorWalletList = await VendorWallet.find({ reason }).lean();

    if (vendorWalletList.length === 0) {
        return successResponse(res, "No wallet history found for this reason", []);
    }

    successResponse(res, "Vendor Wallet History Found" , vendorWalletList);

});