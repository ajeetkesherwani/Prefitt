const express = require("express");

const fileUploader = require("../../middlewares/fileUploader");

const {
    driverAuthenticate
} = require("../../controllers/driver/authController/driverAuthenticate");

const {
    getDriverProfile
} = require("../../controllers/driver/profileController/getProfile");

const {
    getDriverPersonalInfo
} = require("../../controllers/driver/profileController/getPersonalInfo");

const {
    getDriverDetails
} = require("../../controllers/driver/profileController/getInfoInDetail");

const {
    getDriverAccount
} = require("../../controllers/driver/profileController/getAccountInfo");

const {
    updateDriverPersonalInfo
} = require("../../controllers/driver/profileController/updatePersonalInfo");

const {
     updateInfoInDetail
} = require("../../controllers/driver/profileController/updateInfoInDetail");

const {
    updateDriverAccount
} = require("../../controllers/driver/profileController/updateAccountDetail");

const router = express.Router();

router.get("/list", driverAuthenticate, getDriverProfile);
router.get("/list/personalInfo", driverAuthenticate, getDriverPersonalInfo);
router.get("/list/details", driverAuthenticate, getDriverDetails);
router.get("/list/account", driverAuthenticate, getDriverAccount);
router.patch("/update/personal-info", driverAuthenticate,
    fileUploader("driver", [
        { name: "frontPhoto", maxCount: 1 }
    ]), updateDriverPersonalInfo);

router.patch("/update/info-detail", driverAuthenticate,
  fileUploader("driver", [
    { name: "rcFrontPhoto", maxCount: 1 },
    { name: "rcBackPhoto", maxCount: 1 },
    { name: "licFrontPhoto", maxCount: 1 },
    { name: "licBackPhoto", maxCount: 1 },
    { name: "aadFrontPhoto", maxCount: 1 },
    { name: "aadBackPhoto", maxCount: 1 }
  ]),
  updateInfoInDetail
);


router.patch("/update/account-info", driverAuthenticate, updateDriverAccount);

module.exports = router;