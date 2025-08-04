const express = require("express");
const router = express.Router();

const {
  adminAuthenticate,
} = require("../../controllers/admin/auth/adminAuthenticate");

const {
  createUser,
} = require("../../controllers/admin/adminUserController/createUser");
const {
  updateUser,
} = require("../../controllers/admin/adminUserController/updateUser");
const {
  getUser,
} = require("../../controllers/admin/adminUserController/getUser");
const {
  getAllUsers,
} = require("../../controllers/admin/adminUserController/getAllUsers");
const {
  deleteUser,
} = require("../../controllers/admin/adminUserController/deleteUser");

//Auth
router.post("/createUser", adminAuthenticate, createUser);
router.post("/updateUser", adminAuthenticate, updateUser);
router.get("/getUser/:id", adminAuthenticate, getUser);
router.get("/getAllUsers", adminAuthenticate, getAllUsers);
router.delete("/deleteUser/:id", adminAuthenticate, deleteUser);
module.exports = router;
