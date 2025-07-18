const express = require("express");

const { 
    vendorAuthenticate 
} = require("../../controllers/vendor/authController/vendorAuthenticate");

const { 
    getLiveOrders 
} = require("../../controllers/vendor/liveOrderController/getLIveOrder");

const { 
    liveOrderUpdate 
} = require("../../controllers/vendor/liveOrderController/getLiveOrderUpdate");


const router = express.Router();

router.get("/list", vendorAuthenticate, getLiveOrders);
router.patch(
  "/update/:inventoryId/:index",
  vendorAuthenticate,
  liveOrderUpdate
);

module.exports = router;