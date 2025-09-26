const Vendor = require("../../../models/vendor");
const VendorWalletHistory = require("../../../models/vendorWalletHistory");
const AppError = require("../../../utils/AppError");
// const Vendor = require("../../../models/vendor");
const { successResponse } = require("../../../utils/responseHandler");

exports.getVendorWalletList = (async(req, res, next) => {

    // const getList = await VendorWalletHistory.find();
    const histories = await VendorWalletHistory.find({status: "pending",type: "credit"}).sort({ createdAt: -1 }).select("vendorId orderId amount type reason commission totalAmount status");

    if (!histories || histories.length === 0) {
        return next(new AppError("Vendor wallet history not found", 404));
    }

    const uniqueVendorIds = [
      ...new Set(histories.map((h) => h.vendorId.toString())),
    ];

    const vendors = await Vendor.find(
        { _id: { $in: uniqueVendorIds } },
        "shopName shopNumber mobile wallet_balance" // project only needed fields
    );
    // 4. Map driverId → driver data
        const vendorMap = {};
        vendors.forEach((d) => {
          vendorMap[d._id.toString()] = d;
        });
    
        // 5. Group histories by driver
        const grouped = uniqueVendorIds.map((id) => ({
          vendor: vendorMap[id] || null,
          walletHistory: histories.filter((h) => h.vendorId.toString() === id),
        }));
    
        // successResponse(res, "Driver wallet data fetched", grouped);

    successResponse(res, "vendor wallet found", grouped);

});