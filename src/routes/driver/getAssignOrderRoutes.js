const express = require("express");

const { 
    driverAuthenticate 
} = require("../../controllers/driver/authController/driverAuthenticate");

const { 
    getAssignOrder 
} = require("../../controllers/driver/OrderController/getAssignOrder");

const { 
    getAssignOrderDetails 
} = require("../../controllers/driver/OrderController/getAssignOrderDetails");

const router = express.Router();

router.get("/list", driverAuthenticate, getAssignOrder);
router.get("/list/:subOrderId", driverAuthenticate, getAssignOrderDetails);

module.exports = router;