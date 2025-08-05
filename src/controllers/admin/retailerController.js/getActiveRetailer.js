const Vendor = require("../../../models/vendor");
const catchAsync = require("../../../utils/catchAsync");
const { successResponse } = require("../../../utils/responseHandler");

exports.getActiveRetailer = catchAsync(async(req, res, next) => {

    const getRetailer = await Vendor.find({ status: true });

    successResponse(res, "All active Retailer", { Active_Retailers: getRetailer.length });

});