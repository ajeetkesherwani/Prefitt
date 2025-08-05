const Driver = require("../../../models/driver");
const catchAsync = require("../../../utils/catchAsync");
const { successResponse } = require("../../../utils/responseHandler");

exports.getActiveDeliveyBoy = catchAsync(async(req, res, next) => {

    const activeDeliveyBoy = await Driver.find({ isVerified: true });

    successResponse(res, " All Active Delivery Boys", { active_delivery_Boys: activeDeliveyBoy.length });

});