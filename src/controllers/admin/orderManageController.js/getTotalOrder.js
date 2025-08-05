const SubOrder = require("../../../models/SubOrder");

const catchAsync = require("../../../utils/catchAsync");
const { successResponse } = require("../../../utils/responseHandler");

exports.getTotalOrderList = catchAsync(async (req, res, next) => {

    const orders = await SubOrder.find({ status: "shipped" })
        .populate({
            path: "products.productId",
            populate: {
                path: "serviceId",
                model: "Service"
            }
        })
        .lean();

    let clothing = 0;
    let footwear = 0;
    let accessories = 0;

    orders.forEach(order => {
        order.products.forEach(p => {
            const serviceName = p.productId?.serviceId?.name;
            console.log("name", serviceName);

            if (serviceName === "Clothing") clothing++;
            else if (serviceName === "Footwear") footwear++;
            else if (serviceName === "Accessories") accessories++;
        });
    });


    successResponse(res, "all Order counts", {
        TotalOrder: orders.length,
        clothing,
        footwear,
        accessories

    });

});