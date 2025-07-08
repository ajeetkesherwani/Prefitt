const express = require("express");
const router = express.Router();
const {
  vendorAuthenticate,
} = require("../../controllers/vendor/authController/vendorAuthenticate");
const {
  getList,
} = require("../../controllers/vendor/commonController/getList");

router.get("/list/:type", vendorAuthenticate, getList);

module.exports = router;
