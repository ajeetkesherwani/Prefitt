const Vendor = require("../../../models/vendor");
const catchAsync = require("../../../utils/catchAsync");
const { successResponse } = require("../../../utils/responseHandler");

exports.getNewRegisterdRetailer = catchAsync(async(req, res, next) => {

    const getRetailer = await Vendor.find({ status: false });

    successResponse(res, "All registered Retailer", { New_Registerd_Retailer: getRetailer.length });

});