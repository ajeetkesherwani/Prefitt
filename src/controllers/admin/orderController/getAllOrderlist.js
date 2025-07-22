const Order = require("../../../models/mainOrder");
const AppError = require("../../../utils/AppError");
const catchAsync = require("../../../utils/catchAsync");
const { successResponse } = require("../../../utils/responseHandler");

exports.getAllOrderList = catchAsync(async(req, res, next) => {

    const orderList = await Order.find()
    .lean();
    if(!orderList) return next(new AppError("orderList not found",404));

    successResponse(res, "ALl orderList Found", orderList);

});