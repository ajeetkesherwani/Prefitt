const SubOrder = require("../../../models/SubOrder");
const catchAsync = require("../../../utils/catchAsync");
const { successResponse } = require("../../../utils/responseHandler");

exports.getAllPendingOrder = catchAsync(async(req, res, next) => {

    const pendingOrders = await SubOrder.find({ status: "pending" });

    successResponse(res, "Pending Orders found", { Pending_Order: pendingOrders.length });
    
});