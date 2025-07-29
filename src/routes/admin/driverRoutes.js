const express = require("express");

const { 
    adminAuthenticate 
} = require("../../controllers/admin/auth/adminAuthenticate");

const { 
    getAllDriver 
} = require("../../controllers/admin/driverController/getAllDriver");

const { 
    getDriverDetail 
} = require("../../controllers/admin/driverController/getDriverDetail");

const { 
    deleteDriver 
} = require("../../controllers/admin/driverController/deleteDriver");

const router = express.Router();

router.get("/list", adminAuthenticate, getAllDriver);
router.get("/list/:driverId", adminAuthenticate, getDriverDetail);
router.delete("/delete/:driverId", adminAuthenticate, deleteDriver);

module.exports = router;