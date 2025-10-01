const SubOrder = require("../../../models/SubOrder");
const catchAsync = require("../../../utils/catchAsync");
const AppError = require("../../../utils/AppError");
const { successResponse } = require("../../../utils/responseHandler");

exports.trackOrder = catchAsync(async (req, res, next) => {
    const userId = req.user.id;
    console.log("userId", userId);
    const { orderId } = req.params;
    console.log(orderId, "orderId");


    const subOrder = await SubOrder.findOne({ _id: orderId })
        .populate({
            path: "mainOrderId",
            select: "user_Id"
        });
    console.log(subOrder, "subOrder");

    if (!subOrder || String(subOrder.mainOrderId.user_Id) !== userId) {
        return next(new AppError("Order not found", 404));
    }

    const trackingSteps = [
        {
            status: "pending",
            label: "Pending",
            message: "Your order has been placed and is waiting for confirmation.",
            timestamp: subOrder.createdAt
        },
        {
            status: "accepted",
            label: "Accepted",
            message: "Seller accepted your order.",
            timestamp: null
        },
        {
            status: "confirmed",
            label: "Confirmed",
            message: "Order confirmed and preparing for shipment.",
            timestamp: null
        },
        {
            status: "shipped",
            label: "Shipped",
            message: "Order shipped from seller / warehouse.",
            timestamp: null
        },
        {
            status: "pickuped",
            label: "Picked up",
            message: "Courier picked up the package.",
            timestamp: null
        },
        {
            status: "delivered",
            label: "Delivered",
            message: "Order delivered to the customer.",
            timestamp: null
        },
        {
            status: "cancelled",
            label: "Cancelled",
            message: "Order has been cancelled.",
            timestamp: null
        },
        {
            status: "return_requests",
            label: "Return Requested",
            message: "Customer initiated a return request.",
            timestamp: null
        },
        {
            status: "return_received",
            label: "Return Received",
            message: "Returned item received by warehouse.",
            timestamp: null
        },
        {
            status: "rejectByDelivery",
            label: "Rejected by Delivery",
            message: "Delivery partner rejected the order.",
            timestamp: null
        }
    ];

    // Fill timestamps dynamically
    const statusIndex = trackingSteps.findIndex(s => s.status === subOrder.status);
    trackingSteps.forEach((step, index) => {
        if (index <= statusIndex) {
            step.timestamp = subOrder.updatedAt;
        }
    });

    return successResponse(res, "Order tracking fetched successfully", {
        order_id: subOrder._id,
        amount: subOrder.totalAmount,
        current_status: subOrder.status,
        statuses: trackingSteps
    });
});
