const DriverWalletHistory = require("../../../models/driverWalletHistory");
const SubOrder = require("../../../models/SubOrder");
const moment = require("moment");
const AppError = require("../../../utils/AppError");
const catchAsync = require("../../../utils/catchAsync");
const mongoose = require("mongoose")


exports.getDriverEarning = catchAsync(async (req, res, next) => {

    const driverId = req.driver.id;
    if (!driverId) return next(new AppError("driverId is required", 400));

    const { filter } = req.query;

    let startDate, endDate;

    const today = moment().startOf("day");

if (!filter) {
    startDate = new Date("1970-01-01"); 
    endDate = new Date(); // now
  } else if (filter === "day") {
    startDate = moment().startOf("day").toDate();
    endDate = moment().endOf("day").toDate();
  } else if (filter === "week") {
    startDate = moment().startOf("week").toDate();
    endDate = moment().endOf("week").toDate();
  } else if (filter === "year") {
    startDate = moment().startOf("year").toDate();
    endDate = moment().endOf("year").toDate();
  } else {
    return next(new AppError("Invalid filter type", 400));
  }

    //total earning
    const totalEarningsAgg = await DriverWalletHistory.aggregate([
        {
            $match: {
              driverId: new mongoose.Types.ObjectId(driverId), 
                type: "credit",
                status: "pending",
                createdAt: { $gte: startDate, $lte: endDate }
            }
        },
        { $group: { _id: null, total: { $sum: "$amount" } } }
    ]);

    const earnings = totalEarningsAgg[0]?.total || 0;

    //trip count
    const totalTrips = await SubOrder.countDocuments({
       assignDeliveryBoyId: new mongoose.Types.ObjectId(driverId),
        status: "delivered",
        updatedAt: { $gte: startDate, $lte: endDate }
    });
     
    //active houres
    const trips = await SubOrder.find({
        assignDeliveryBoyId: driverId,
        status: "delivered",
        updatedAt: { $gte: startDate, $lte: endDate }
    }).select("createdAt updatedAt");
    console.log("trip", trips);
   

    let activeHours = 0;
    trips.forEach(trip => {
        if (trip.createdAt && trip.updatedAt) {
            const diff = moment(trip.updatedAt).diff(moment(trip.createdAt), "hours", true);
            activeHours += diff;
        }
    });

    // Last balance (from last transaction)
    const lastTransaction = await DriverWalletHistory.findOne({ driverId })
        .sort({ createdAt: -1 });
      

    const balance = lastTransaction?.balance_after_transaction || 0;


    res.status(200).json({
        success: true,
        filter,
        dateRange: {
            start: startDate,
            end: endDate
        },
        earnings,
        totalTrips,
        activeHours: Math.round(activeHours),
        balance,
    });

});