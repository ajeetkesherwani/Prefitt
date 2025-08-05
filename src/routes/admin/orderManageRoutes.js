const express = require("express");

const { 
    adminAuthenticate 
} = require("../../controllers/admin/auth/adminAuthenticate");

const { 
    getTotalOrderList 
} = require("../../controllers/admin/orderManageController.js/getTotalOrder");

const { 
    getAllPendingOrder 
} = require("../../controllers/admin/orderManageController.js/getPendingOrder");

const { 
    getLastWeekOrders 
} = require("../../controllers/admin/orderManageController.js/getLastWeekOrder");

const router = express.Router();

router.get("/list", adminAuthenticate, getTotalOrderList );
router.get("/list/pendingOrder", adminAuthenticate, getAllPendingOrder );
router.get("/list/lastWeekOrder", adminAuthenticate, getLastWeekOrders );

module.exports = router;