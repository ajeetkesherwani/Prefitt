const DriverWalletHistory = require("../../../models/driverWalletHistory");
const Driver = require("../../../models/driver"); // Assuming Driver model path
const AppError = require("../../../utils/AppError");
const { successResponse } = require("../../../utils/responseHandler");

exports.getDeliveryWalletList = async (req, res, next) => {
  try {
    // 1. Get all histories
    const histories = await DriverWalletHistory.find({status: "pending",type: "credit"}).sort({ createdAt: -1 }).select("driverId orderId amount type reason commission totalAmount status");
    if (!histories || histories.length === 0) {
      return next(new AppError("Driver wallet history not found", 404));
    }

    // 2. Collect unique driverIds
    const uniqueDriverIds = [
      ...new Set(histories.map((h) => h.driverId.toString())),
    ];

    // 3. Fetch drivers in one query
    const drivers = await Driver.find(
      { _id: { $in: uniqueDriverIds } },
      "firstName lastName email mobile walletBalance vehicleType" // project only needed fields
    );

    // 4. Map driverId → driver data
    const driverMap = {};
    drivers.forEach((d) => {
      driverMap[d._id.toString()] = d;
    });

    // 5. Group histories by driver
    const grouped = uniqueDriverIds.map((id) => ({
      driver: driverMap[id] || null,
      walletHistory: histories.filter((h) => h.driverId.toString() === id),
    }));

    return successResponse(res, "Driver wallet data fetched", grouped);
  } catch (error) {
    return next(new AppError(error.message, 500));
  }
};
