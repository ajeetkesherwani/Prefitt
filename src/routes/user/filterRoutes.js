const express = require("express");
const {
  userAuthenticate,
} = require("../../controllers/user/authController/userAuthenticate");
const {
  getFilterData,
} = require("../../controllers/user/filterController/getFilterData");
const router = express.Router();
router.get("/getFilterData/:vendorId", userAuthenticate, getFilterData);

module.exports = router;
