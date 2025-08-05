const moment = require("moment");
const SubOrder = require("../../../models/SubOrder");
const catchAsync = require("../../../utils/catchAsync");
const { successResponse } = require("../../../utils/responseHandler");

exports.getLastYearRevenue = catchAsync(async (req, res, next) => {

    const twelveMonthsAgo = moment().subtract(11, "months").startOf("month").toDate();
    const now = moment().endOf("month").toDate();

    const revenueData = await SubOrder.aggregate([
        {
            $match: {
                status: "delivered",
                createdAt: {
                    $gte: twelveMonthsAgo,
                    $lte: now
                }
            }
        },
        {
            $group: {
                _id: {
                    year: { $year: "$createdAt" },
                    month: { $month: "$createdAt" }
                },
                totalRevenue: { $sum: "$totalAmount" }
            }
        },
        {
            $sort: { "_id.year": 1, "_id.month": 1 }
        }
    ])

    const result = [];
    for (let i = 0; i < 12; i++) {
        const month = moment().subtract(11 - i, "months");
        const year = month.year();
        const monthNum = month.month() + 1;

        const found = revenueData.find(item => item._id.year === year && item._id.month === monthNum);

        result.push({
            month: month.format("MMM-YYYY"), // Example: "Aug-2025"
            totalRevenue: found ? found.totalRevenue : 0
        });
    }

    successResponse(res, "Monthly sales revenue ", result);

});