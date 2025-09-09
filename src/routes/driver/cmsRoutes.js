const express = require("express");

const { 
    driverAuthenticate 
} = require("../../controllers/driver/authController/driverAuthenticate");

const { 
    createCmsPage 
} = require("../../controllers/driver/cms_pageController/creaeCms");
const { getCmsPage } = require("../../controllers/driver/cms_pageController/getCmsPage");

const router = express.Router();

router.post("/create", driverAuthenticate, createCmsPage);
router.get("/list", driverAuthenticate, getCmsPage);


module.exports = router;