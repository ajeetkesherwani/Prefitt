const SubOrder = require("../../../models/SubOrder");
const User = require("../../../models/user");
const Vendor = require("../../../models/vendor");
const Driver = require("../../../models/driver");
const catchAsync = require("../../../utils/catchAsync");
const { successResponse } = require("../../../utils/responseHandler");

exports.getAdminDashboardData = catchAsync(async (req, res, next) => {

    const orders = await SubOrder.find()
        .populate({
            path: "products.productId",
            populate: {
                path: "serviceId",
                model: "Service"
            }
        })
        .lean();

    const filteredOrders = orders.filter(order => order.status === "delivered"); // or your condition

    const allOrders = orders.length;

    let clothing = 0;
    let footwear = 0;
    let accessories = 0;

    orders.forEach(order => {
        order.products.forEach(p => {
            const serviceName = p.productId?.serviceId?.name;
            if (serviceName === "Clothing") clothing++;
            else if (serviceName === "Footwear") footwear++;
            else if (serviceName === "Accessories") accessories++;
        });
    });

    //revenue 

    let totalRevenue = 0;
    let clothing_revenue = 0;
    let footwear_revenue = 0;
    let accessories_revenue = 0;

       filteredOrders.forEach(order => {
        order.products.forEach(p => {
            const serviceName = p.productId?.serviceId?.name;
            const itemAmount = p.totalItemAmount || 0;

            totalRevenue += itemAmount;

            if (serviceName === "Clothing") clothing_revenue += itemAmount;
            else if (serviceName === "Footwear") footwear_revenue += itemAmount;
            else if (serviceName === "Accessories") accessories_revenue += itemAmount;
        });
    });

    const pendingOrders = await SubOrder.countDocuments({ status: "pending" });

    const returnOrderCount = await SubOrder.countDocuments({
        status: { $in: ["return_requests", "return_received"] }
    });


    // Customers
    const activeCustomers = await User.countDocuments({ isVerified: "true" });
    const newRegisteredCustomers = await User.countDocuments({ status: false });
    const flaggedCustomers = await User.countDocuments({ isVerified: "false" });

    // Vendors
    const activeRetailers = await Vendor.countDocuments({ status: true });
    const newRegisteredRetailers = await Vendor.countDocuments({ status: false });
    const flaggedRetailers = await Vendor.countDocuments({ isBlocked: true });

    // Drivers
    const activeDeliveryBoys = await Driver.countDocuments({ isVerified: true });
    const newRegisteredDeliveryBoys = await Driver.countDocuments({ isVerified: false });
    const flaggedDeliveryBoys = await Driver.countDocuments({ isBlocked: true });

    // Final response
    successResponse(res, "Admin Dashboard Status", {
        totalOrders: allOrders,
        orderCountByService: {
            clothing: clothing,
            footwear: footwear,
            accessories: accessories
        },

        pendingOrders,

        returnOrderCount,

        totalRevenue,
        revenueByService: {
            clothing: clothing_revenue,
            footwear: footwear_revenue,
            accessories: accessories_revenue
        },
        customers: {
            active: activeCustomers,
            newRegistered: newRegisteredCustomers,
            flagged: flaggedCustomers
        },
        retailers: {
            active: activeRetailers,
            newRegistered: newRegisteredRetailers,
            flagged: flaggedRetailers
        },
        deliveryBoys: {
            active: activeDeliveryBoys,
            newRegistered: newRegisteredDeliveryBoys,
            flagged: flaggedDeliveryBoys
        }
    });
});


