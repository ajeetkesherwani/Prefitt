const express = require("express");

const { 
    adminAuthenticate 
} = require("../../controllers/admin/auth/adminAuthenticate");

const { 
    getActiveRetailer 
} = require("../../controllers/admin/retailerController.js/getActiveRetailer");

const { 
    getNewRegisterdRetailer 
} = require("../../controllers/admin/retailerController.js/newRegisteredRetailer");

const { 
    getFlaggedRetailer 
} = require("../../controllers/admin/retailerController.js/flaggedRetailer");

const router = express.Router();

router.get("/list", adminAuthenticate, getActiveRetailer);
router.get("/list/registered", adminAuthenticate, getNewRegisterdRetailer );
router.get("/list/flagged", adminAuthenticate, getFlaggedRetailer )

module.exports = router;