const express = require("express");

const { 
    adminAuthenticate 
} = require("../../controllers/admin/auth/adminAuthenticate");

const { 
    getAllOrderList 
} = require("../../controllers/admin/orderController/getAllOrderlist");

const { 
    getOrderListDetail 
} = require("../../controllers/admin/orderController/getOrderlistDetail");

const router = express.Router();

router.get("/list", adminAuthenticate, getAllOrderList);
router.get("/list/:mainOrderId", adminAuthenticate, getOrderListDetail);

module.exports = router;