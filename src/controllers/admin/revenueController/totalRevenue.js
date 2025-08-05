const SubOrder = require("../../../models/SubOrder");
const catchAsync = require("../../../utils/catchAsync");
const { successResponse } = require("../../../utils/responseHandler");

exports.getTotalRevenue = catchAsync(async (req, res, next) => {

    const orders = await SubOrder.find({ status: "shipped" })
        .populate({
            path: "products.productId",
            populate: {
                path: "serviceId",
                model: "Service"
            }
        })
        .lean();

    let totalRevenue = 0;
    let clothing = 0;
    let footwear = 0;
    let accessories = 0;

    orders.forEach(order => {
        const orderAmount = order.totalAmount || 0;
        totalRevenue += orderAmount;

        order.products.forEach(p => {
            const serviceName = p.productId?.serviceId?.name;

                if (serviceName === "Clothing") clothing += orderAmount;
                else if (serviceName === "Footwear") footwear += orderAmount;
                else if (serviceName === "Accessories") accessories += orderAmount;

        });
    });

    successResponse(res, "Total Revenue from services", {
        totalRevenue,
        clothing,
        footwear,
        accessories
    });
});

