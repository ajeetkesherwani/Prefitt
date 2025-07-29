const express = require("express");

const {
    driverAuthenticate
} = require("../../controllers/driver/authController/driverAuthenticate");

const {
    getAssignOrder
} = require("../../controllers/driver/OrderController/getAssignOrder");

const {
    getAssignOrderDetails
} = require("../../controllers/driver/OrderController/getAssignOrderDetails");

const {
    updateOrderStatus
} = require("../../controllers/driver/OrderController/updateOrderStatus");

const {
    deliveryPhotoUpload
} = require("../../controllers/driver/OrderController/deliveryUploadPhotot");

const {
    orderDelivered
} = require("../../controllers/driver/OrderController/updateDeliverdOrderStatus");

const fileUploader = require("../../middlewares/fileUploader");

const router = express.Router();

router.get("/list", driverAuthenticate, getAssignOrder);
router.get("/list/:subOrderId", driverAuthenticate, getAssignOrderDetails);
router.put("/update/status/:subOrderId", driverAuthenticate, updateOrderStatus);

router.post("/uploadPhoto/:subOrderId", driverAuthenticate,
    fileUploader("deliveryPhoto", [
        { name: "deliveryPhoto", maxCount: 5 }
    ]),
    deliveryPhotoUpload);

router.patch("/update/deliverd/order/status/:subOrderId", driverAuthenticate, orderDelivered )


module.exports = router;