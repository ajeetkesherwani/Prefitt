const express = require("express");

const {
    driverAuthenticate
} = require("../../controllers/driver/authController/driverAuthenticate");

const {
    getDeliverySummary
} = require("../../controllers/driver/deliverySummaryController/getDeliverdOrderHistory");

const router = express.Router();

router.get("/list", driverAuthenticate, getDeliverySummary);

module.exports = router;