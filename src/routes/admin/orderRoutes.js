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

const { 
    getAllDriver 
} = require("../../controllers/admin/orderController/getDriver");

const { 
    assignDriverToOrder 
} = require("../../controllers/admin/orderController/assignDriverToOrder");

const router = express.Router();

router.get("/list/:type", adminAuthenticate, getAllOrderList);
router.get("/list/:mainOrderId", adminAuthenticate, getOrderListDetail);
router.get("/driver/list", adminAuthenticate, getAllDriver);
router.post("/assign-driver", adminAuthenticate, assignDriverToOrder);



module.exports = router;