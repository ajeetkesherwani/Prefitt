const User = require("../../../models/user");
const catchAsync = require("../../../utils/catchAsync");
const { successResponse } = require("../../../utils/responseHandler");

exports.getFlaggedCustomer = catchAsync(async(req, res, next) => {

    const flaggedCustomer = await User.find({ status: false });

    successResponse(res, "All flagged customer found", { flagged: flaggedCustomer.length });

});