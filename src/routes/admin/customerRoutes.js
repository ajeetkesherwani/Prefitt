const express = require("express");

const { 
    adminAuthenticate 
} = require("../../controllers/admin/auth/adminAuthenticate");

const { 
    getActivateCustomer 
} = require("../../controllers/admin/customerDetailController.js/getAllActiveCustomer");

const { 
    getFlaggedCustomer 
} = require("../../controllers/admin/customerDetailController.js/getFlaggedCustomer");

const router = express.Router();

router.get("/list", adminAuthenticate, getActivateCustomer );
router.get("/list/flagged", adminAuthenticate, getFlaggedCustomer );

module.exports = router;