const Vendor = require("../../../models/vendor");
const catchAsync = require("../../../utils/catchAsync");
const { successResponse } = require("../../../utils/responseHandler");

exports.getFlaggedRetailer = catchAsync(async(req, res, next) => {

    const getFlaggedRetailer = await Vendor.find({ isBlocked: true });

    successResponse(res, "All Flagged Retailer", { Flagged: getFlaggedRetailer.length });

});