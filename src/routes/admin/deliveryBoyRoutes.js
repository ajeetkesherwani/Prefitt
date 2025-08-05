const express = require("express");

const { 
    adminAuthenticate 
} = require("../../controllers/admin/auth/adminAuthenticate");

const { 
    getActiveDeliveyBoy 
} = require("../../controllers/admin/deliveryBoyDetailController/getActiveDeliveryBoy");

const { 
    getNewRegisteredDeliveyBoy 
} = require("../../controllers/admin/deliveryBoyDetailController/getNewRegisteredBoy");

const { 
    getFlaggedDeliveryBoy 
} = require("../../controllers/admin/deliveryBoyDetailController/flaggedDeliveryBoy");

const router = express.Router();

router.get("/list", adminAuthenticate, getActiveDeliveyBoy );
router.get("/list/registered", adminAuthenticate, getNewRegisteredDeliveyBoy);
router.get("/list/flagged", adminAuthenticate, getFlaggedDeliveryBoy );

module.exports = router;
