const User = require("../../../models/user");
const catchAsync = require("../../../utils/catchAsync");
const { successResponse } = require("../../../utils/responseHandler");

exports.getActivateCustomer = catchAsync(async(req, res, next) => {

    const getCustomers = await User.find({ status: "true" });

    successResponse(res, "All Activate Customer ", { Active_custmoer: getCustomers.length });

});