const SubOrder = require("../../../models/SubOrder");
const AppError = require("../../../utils/AppError");
const { successResponse } = require("../../../utils/responseHandler");

exports.getAssignOrder = async (req, res, next) => {

       const driverId = req.driver._id;

    if (!driverId) return next(new AppError("driverId is not authenticated", 400));

    const subOrder = await SubOrder.find({
        assignDeliveryBoyId: driverId,
        isDeliveryAsign: true
    })
        .populate({
            path: "vendorId",
            select: "shopName shopAddress mobile"
        })
        .populate({
            path: "mainOrderId",
            select: "orderNumber expectedDeliveryTime address user_Id",
            populate: {
                path: "user_Id",
                model: "User",
                select: "name mobileNo location lat long"
            }
        })
        .select("_id products pickupotp status expiresAt")
        .lean();

    if (!Array.isArray(subOrder) || subOrder.length === 0) {
        return next(new AppError("No assigned suborder found", 404));
    }

    // Map each subOrder to a simplified payload
    const results = subOrder.map((so) => {
        const totalQuantity = Array.isArray(so.products)
            ? so.products.reduce((sum, item) => sum + (item.quantity || 0), 0)
            : 0;

        const expectedDeliveryTime = so.mainOrderId?.expectedDeliveryTime || so.mainOrderId?.deliveryTime || null;

        return {
            orderId: so._id,
            status:so.status,
            pickupFrom: {
                shopName: so.vendorId?.shopName || null,
                vendorPhone: so.vendorId?.mobile || null,
                vendorAddress: so.vendorId?.shopAddress || null,
                orderNumber: so.mainOrderId?.orderNumber || null,
                expectedDeliveryTime: expectedDeliveryTime || "N/A",
                items: totalQuantity,
                otp: so.pickupotp || null,
                expiresAt: so.expiresAt || null
            },
            deliveredTo: {
                userName: so.mainOrderId?.user_Id?.name || "N/A",
                userPhone: so.mainOrderId?.user_Id?.mobileNo || "N/A",
                orderNumber: so.mainOrderId?.orderNumber || null,
                location: so.mainOrderId?.user_Id?.location?.type || null,
                latitude: so.mainOrderId?.user_Id?.lat || null,
                longitude: so.mainOrderId?.user_Id?.long || null,
                expectedDeliveryTime: so.mainOrderId?.expectedDeliveryTime || null,
                items: totalQuantity
            }
        };
    });

    successResponse(res, "Assigned order details fetched", results);
    
};

