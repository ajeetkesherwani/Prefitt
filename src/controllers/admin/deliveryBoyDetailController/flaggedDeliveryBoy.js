const Driver = require("../../../models/driver");
const catchAsync = require("../../../utils/catchAsync");
const { successResponse } = require("../../../utils/responseHandler");

exports.getFlaggedDeliveryBoy = catchAsync(async(req, res, next) => {

    const fleggedBoy = await Driver.find({ isBlocked: true });

    successResponse(res, "Flagged Delivery", { flagged: fleggedBoy.length });

});