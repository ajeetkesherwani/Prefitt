const Order = require("../../../models/mainOrder");
const AppError = require("../../../utils/AppError");
const catchAsync = require("../../../utils/catchAsync");
const { successResponse } = require("../../../utils/responseHandler");

const validOrderStatus = [
    "placed",
    "confirmed",
    "shipped",
    "delivered",
    "cancelled",
    "returned",
];

exports.getAllOrderList = catchAsync(async (req, res, next) => {

    const { type } = req.params;
    const { isDriverAssign } = req.query;

    let query = {};

    if (isDriverAssign === "true") {
        query.isDriverAssign = true;
    }

    if (type === "all") {
    
    } else if (validOrderStatus.includes(type)) {

        query.orderStatus = type;
    } else {
        return next(new AppError("Invalid type. it should ne 'all' or one of the:" + validOrderStatus.toLocaleString(", "), 400));
    }

    const orderList = await Order.find(query).lean();
    if (!orderList || orderList.length === 0) {
        return next(new AppError("orderList not found", 404));
    }

    successResponse(res, "ALl orderList Found", orderList);

});