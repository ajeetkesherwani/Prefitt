const express = require("express");

const authRoutes = require("./driver/authRoutes");
const getAssignOrderRoutes = require("./driver/getAssignOrderRoutes");

const router = express.Router();

router.use("/auth", authRoutes);
router.use("/order", getAssignOrderRoutes);


module.exports = router; 