const express = require("express");
const {
  createInventory,
} = require("../../controllers/vendor/productInventoryController/createInventory");

const {
  getInventory,
} = require("../../controllers/vendor/productInventoryController/getInventory");

const {
  getOneInventory,
} = require("../../controllers/vendor/productInventoryController/getOneInventory");

const {
  updateInventory,
} = require("../../controllers/vendor/productInventoryController/updateInventory");

const {
  deleteInventory,
} = require("../../controllers/vendor/productInventoryController/deleteInvetory");

const router = express.Router();

router.post("/create", createInventory);
router.get("/list", getInventory);
router.get("/list/:id", getOneInventory);
router.patch("/update/:id", updateInventory);
router.delete("/delete/:id", deleteInventory);

module.exports = router;
