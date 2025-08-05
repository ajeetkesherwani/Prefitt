const Driver = require("../../../models/driver");
const catchAsync = require("../../../utils/catchAsync");
const { successResponse } = require("../../../utils/responseHandler");

exports.getNewRegisteredDeliveyBoy = catchAsync(async(req, res, next) => {

    const newRegisteredDeliveyBoy = await Driver.find({ isVerified: false });

    successResponse(res, " New Registered Delivery Boys", { active_delivery_Boys: newRegisteredDeliveyBoy.length });

});