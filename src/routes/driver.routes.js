const express = require("express");

const authRoutes = require("./driver/authRoutes");
const orderRoutes = require("./driver/orderRoutes");
const profileRoutes = require("./driver/profileRoutes");
const cmsRoutes = require("./driver/cmsRoutes");
const earningRoutes = require("./driver/earningRoutes");

const router = express.Router();

router.use("/auth", authRoutes);
router.use("/order", orderRoutes);
router.use("/profile", profileRoutes);
router.use("/cms", cmsRoutes);
router.use("/earning", earningRoutes);


module.exports = router; 