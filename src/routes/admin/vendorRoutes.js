const express = require("express");
const router = express.Router();

const fileUploader = require("../../middlewares/fileUploader");
const {
  adminAuthenticate,
} = require("../../controllers/admin/auth/adminAuthenticate");
const {
  getVendorList,
} = require("../../controllers/admin/vendorController/getVendorList");
const {
  getDataById,
} = require("../../controllers/admin/vendorController/getDataById");
const {
  createVendor,
} = require("../../controllers/admin/vendorController/createVendor");

router.get("/list", adminAuthenticate, getVendorList);
router.get("/getDataById/:id", adminAuthenticate, getDataById);
router.post(
  "/create",
  fileUploader("vendor", [
    { name: "profileImg", maxCount: 1 },
    { name: "panImages", maxCount: 1 },
    { name: "shopImages", maxCount: 1 },
    { name: "digitalSignature", maxCount: 1 },
  ]),
  createVendor
);
module.exports = router;
