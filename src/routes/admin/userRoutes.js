const express = require("express");

const { 
    getAllUser 
} = require("../../controllers/admin/userController/getAlluser");

const { 
    adminAuthenticate 
} = require("../../controllers/admin/auth/adminAuthenticate");

const { 
    getOneUser 
} = require("../../controllers/admin/userController/getOneUser");

const router = express.Router();

router.get("/list", adminAuthenticate, getAllUser);
router.get("/list/:userId", adminAuthenticate, getOneUser);

module.exports = router;
