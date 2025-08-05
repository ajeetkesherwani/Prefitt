const moment = require("moment");
const SubOrder = require("../../../models/SubOrder");
const { successResponse } = require("../../../utils/responseHandler");
const catchAsync = require("../../../utils/catchAsync");

exports.getLastWeekOrders =  catchAsync(async(req, res, next) => {
    const today = moment().startOf("day");
    const sevenDaysAgo = moment().subtract(6, "days").startOf("day");

    const AllOrders = await SubOrder.aggregate([
        {
            $match: {
                status: "shipped",
                createdAt: {
                    $gte: sevenDaysAgo.toDate(),
                    $lte: today.endOf("day").toDate()
                }
            }
        },
        {
            $group: {
                _id: {
                    $dateToString: { format: "%d-%m-%Y", date: "$createdAt" }
                },
                totalOrders: { $sum: 1 }
            }
        },
        {
            $sort: { "_id": 1 }
        }
    ]);

    // Create list of last 7 days with 0 as default
    const last7Days = Array.from({ length: 7 }).map((_, i) => {
        const date = moment().subtract(6 - i, "days").format("DD-MM-YYYY");
        const orderData = AllOrders.find(item => item._id === date);
        return {
            date,
            totalOrders: orderData ? orderData.totalOrders : 0
        };
    });

    successResponse(res, "Last 7 days orders found", last7Days);
});
