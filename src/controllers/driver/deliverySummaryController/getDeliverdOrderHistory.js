const SubOrder = require("../../../models/SubOrder");
const moment = require("moment");
const { successResponse } = require("../../../utils/responseHandler");
const catchAsync = require("../../../utils/catchAsync");

exports.getDeliverySummary = catchAsync(async (req, res, next) => {
    const driverId = req.driver.id;
    const { filter } = req.query; // today | week | month

    let dateFilter = {};

    if (filter) {
        const today = moment().startOf("day");
        let startDate, endDate;

        if (filter === "today") {
            startDate = today.toDate();
            endDate = moment().endOf("day").toDate();
        } else if (filter === "week") {
            startDate = moment().startOf("week").toDate();
            endDate = moment().endOf("day").toDate();
        } else if (filter === "month") {
            startDate = moment().startOf("month").toDate();
            endDate = moment().endOf("day").toDate();
        } else {
            return next(new Error("Invalid filter value"));
        }

        // Filter by updatedAt (delivery time)
        dateFilter = { updatedAt: { $gte: startDate, $lte: endDate } };
    }

    const orders = await SubOrder.find({
        assignDeliveryBoyId: driverId,
        status: "delivered",
        ...dateFilter,
    })
        .populate({
            path: "mainOrderId",
            populate: {
                path: "user_Id",
                select: "name",
            },
        })
        .sort({ updatedAt: -1 });

    const totalOrders = orders.length;

    const summary = {
        totalOrders,
        activeHours: "2 hr", // fixed as per your request
        netPayout: totalOrders * 40, // ₹40 per delivery
    };

    const orderHistory = orders.map((o) => ({
        orderId: o.mainOrderId?.orderNumber,
        userName: o.mainOrderId?.user_Id?.name,
        deliveryTime: `${o.deliveryTime || 0} min`,
        distance: 23,
        deliveryCharge: 40,
    }));

    return successResponse(res, "Driver delivery summary fetched", {
        summary,
        orderHistory,
    });
});
