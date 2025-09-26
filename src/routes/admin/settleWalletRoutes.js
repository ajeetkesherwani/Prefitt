const express = require("express");

const { 
    adminAuthenticate 
} = require("../../controllers/admin/auth/adminAuthenticate");

const { 
    getVendorWalletList 
} = require("../../controllers/admin/paymentSettlementController/getAllvendorWallet");

const { 
    settleVendorWallets 
} = require("../../controllers/admin/paymentSettlementController/createSettlement");
const { 
    getDeliveryWalletList 
} = require("../../controllers/admin/paymentSettlementController/getDeliveryWalletList");

const router = express.Router();

// router.get("/list", adminAuthenticate, getVendorWalletList);
router.get("/deliveryWalletList", adminAuthenticate, getDeliveryWalletList);
router.get("/vendorWalletList", adminAuthenticate, getVendorWalletList);
router.post("/create", adminAuthenticate, settleVendorWallets);

module.exports = router;