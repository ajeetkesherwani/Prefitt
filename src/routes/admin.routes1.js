const express = require("express");
//==================== Common Middlewares ====================//
const fileUploader = require("../middlewares/fileUploader");

//==================== Auth Routes ====================//
const { signup } = require("../controllers/admin/auth/signup");
const { login } = require("../controllers/admin/auth/login");
const {
  adminAuthenticate,
} = require("../controllers/admin/auth/adminAuthenticate");

const {
  vendorAccountVerification,
} = require("../controllers/admin/auth/vendorAccountVerification");
//==================== Category Routes ====================//
const {
  getCategory,
} = require("../controllers/admin/categoryController/getCategory");
const {
  createCategory,
} = require("../controllers/admin/categoryController/createCategory");

const {
  getCategoryByServiceId,
} = require("../controllers/admin/categoryController/getCategoryByServiceId");

const {
  getSubCategory,
} = require("../controllers/admin/categoryController/getSubCategory");
//==================== Product Variant Routes ====================//
const {
  createProductVariants,
} = require("../controllers/admin/productVariantController/createProductVariant");
const {
  getAllProductVariant,
} = require("../controllers/admin/productVariantController/getAllProductVariant");

//==================== Service Routes ====================//
const {
  createService,
} = require("../controllers/admin/serviceController/createService");
const {
  allServices,
} = require("../controllers/admin/serviceController/allServices");
const {
  deleteService,
} = require("../controllers/admin/serviceController/deleteService");
const {
  detailService,
} = require("../controllers/admin/serviceController/detailService");
const {
  updateService,
} = require("../controllers/admin/serviceController/updateService");

//==================== Fabric Routes ====================//
const {
  createFabric,
} = require("../controllers/admin/fabricController/createFabric");
const {
  getAllFabric,
} = require("../controllers/admin/fabricController/getFabric");
const {
  fabricDetail,
} = require("../controllers/admin/fabricController/fabricDetails");
const {
  deleteFabric,
} = require("../controllers/admin/fabricController/deleteFabric");
const {
  updateFabric,
} = require("../controllers/admin/fabricController/updateFabric");

const {
  getDealsOfTheDay,
} = require("../controllers/admin/dealsOfTheDayController/getDealsOfTheDay");
const {
  createDealsOfTheDay,
} = require("../controllers/admin/dealsOfTheDayController/createDealsOfTheDay");

const {
  updateDealsOfTheDay,
} = require("../controllers/admin/dealsOfTheDayController/updateDealsOfTheDay");

//==================== Variant Routes ====================//
const {
  createVariant,
} = require("../controllers/admin/variantController/createVariant");
const {
  allVariant,
} = require("../controllers/admin/variantController/allVariant");
const {
  deleteVariant,
} = require("../controllers/admin/variantController/deleteVariant");
const {
  detailsVariant,
} = require("../controllers/admin/variantController/detailVariant");
const {
  updateVariant,
} = require("../controllers/admin/variantController/updateVariant");

//==================== Vendor Routes ====================//
const {
  getVendorList,
} = require("../controllers/admin/vendorController/getVendorList");

const {
  createProduct,
} = require("../controllers/admin/productController/createProduct");
const {
  getAllVendorProduct,
} = require("../controllers/admin/productController/getAllVendorProduct");
const {
  productDetail,
} = require("../controllers/admin/productController/productDetail");
const router = express.Router();

//Auth
router.post("/signup", signup);
router.post("/login", login);
router.post(
  "/vendorAccountVerification",
  adminAuthenticate,
  vendorAccountVerification
);

//Category
router.get("/category/list", adminAuthenticate, getCategory);
router.post(
  "/category/create",
  adminAuthenticate,
  fileUploader("category", [{ name: "image", maxCount: 1 }]),
  createCategory
);

router.get("/getSubCategory/:id", adminAuthenticate, getSubCategory);
router.get(
  "/getCategoryByServiceId/:serviceId",
  adminAuthenticate,
  getCategoryByServiceId
);

//fabric
router.get("/fabric/list", adminAuthenticate, getAllFabric);
router.post("/fabric/create", adminAuthenticate, createFabric);
router.patch("/fabric/update/:id", adminAuthenticate, updateFabric);
router.get("/fabric/details/:id", adminAuthenticate, fabricDetail);
router.delete("/fabric/delete/:id", adminAuthenticate, deleteFabric);

//Services
router.get("/service/get", adminAuthenticate, allServices);
router.post(
  "/service/create",
  fileUploader("service", [{ name: "image", maxCount: 1 }]),
  adminAuthenticate,
  createService
);
router.patch(
  "/service/update/:id",
  fileUploader("service", [{ name: "image", maxCount: 1 }]),
  adminAuthenticate,
  updateService
);
router.delete("/service/delete/:id", adminAuthenticate, deleteService);

//variant

router.get("/variant/get", adminAuthenticate, allVariant);
router.post("/variant/create", adminAuthenticate, createVariant);
router.patch("/variant/update/:id", adminAuthenticate, updateVariant);
router.delete("/variant/delete/:id", adminAuthenticate, deleteVariant);
router.get("/variant/details/:id", adminAuthenticate, detailsVariant);

//Products
router.get(
  "/vendorProduct/list/:vendorId",
  adminAuthenticate,
  getAllVendorProduct
);
router.post(
  "/product/create",
  adminAuthenticate,
  fileUploader("product", [
    { name: "primary_image", maxCount: 1 },
    { name: "gallery_images", maxCount: 5 },
  ]),
  createProduct
);
router.get("/product/details/:productId", adminAuthenticate, productDetail);

//productVariants
router.post("/productVariant", createProductVariants);
router.get("/all/productVariant", getAllProductVariant);

//Deals of the Day
router.get("/dealsOfTheDay/get", adminAuthenticate, getDealsOfTheDay);
router.post(
  "/dealsOfTheDay/create",
  adminAuthenticate,
  fileUploader("dealsOfTheDay", [{ name: "image", maxCount: 1 }]),
  createDealsOfTheDay
);
router.patch(
  "/dealsOfTheDay/update/:id",
  adminAuthenticate,
  fileUploader("dealsOfTheDay", [{ name: "image", maxCount: 1 }]),
  updateDealsOfTheDay
);

router.get("/vendor/list", adminAuthenticate, getVendorList);
module.exports = router;
