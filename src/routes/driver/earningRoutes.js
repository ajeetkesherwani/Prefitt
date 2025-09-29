const express = require("express");

const { 
    driverAuthenticate 
} = require("../../controllers/driver/authController/driverAuthenticate");

const { 
    getDriverEarning 
} = require("../../controllers/driver/driverEarningController/getDriverEarning");

const router = express.Router();

router.get("/list", driverAuthenticate, getDriverEarning);


module.exports = router;
