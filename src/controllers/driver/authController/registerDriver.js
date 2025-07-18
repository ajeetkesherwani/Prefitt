const Driver = require("../../../models/driver");
const DriverDetail = require("../../../models/driverDetail");
const DriverAccountDetail = require("../../../models/driverAccountDetail");
const AppError = require("../../../utils/AppError");
const catchAsync = require("../../../utils/catchAsync");
const validateRequiredFields = require("../../../utils/validateRequiredFields");
const { successResponse } = require("../../../utils/responseHandler");


exports.registerDriver = catchAsync(async (req, res, next) => {

  const driver = JSON.parse(req.body.driver);
  const driverDetail = JSON.parse(req.body.driverDetail);
  const driverAccountDetail = JSON.parse(req.body.driverAccountDetail);

  driver.frontPhoto = req.files?.frontPhoto?.[0]?.path;

  const requiredFields = [
    { field: driver?.firstName, name: "First Name" },
    { field: driver?.lastName, name: "Last Name" },
    { field: driver?.dob, name: "Dob " },
    { field: driver?.gender, name: " Gender" },
    { field: driver?.email, name: "Email" },
    { field: driver?.address, name: "Address" },
    { field: driver?.mobile, name: "Mobile" },
    { field: driver?.vehicleType, name: "vehicleType" },
    { field: driver?.latitude, name: "Latitude" },
    { field: driver?.longitude, name: "Longitude" },
  ];

  let error = validateRequiredFields(requiredFields);
  if (error) return next(error);


  const rc = driverDetail?.rcRegistration;
  const lic = driverDetail?.licence;
  const aad = driverDetail?.adharCard;

  rc.frontPhoto = req.files?.rcFrontPhoto?.[0]?.path;
  rc.backPhoto = req.files?.rcBackPhoto?.[0]?.path;

  lic.frontPhoto = req.files?.licFrontPhoto?.[0]?.path;
  lic.backPhoto = req.files?.licBackPhoto?.[0]?.path;

  aad.frontPhoto = req.files?.aadFrontPhoto?.[0]?.path;
  aad.backPhoto = req.files?.aadBackPhoto?.[0]?.path;

  const requiredDetailFields = [
    { field: rc?.frontPhoto, name: "RC Front Photo" },
    { field: rc?.backPhoto, name: "RC Back Photo" },
    { field: lic?.number, name: "License Number" },
    { field: lic?.frontPhoto, name: "License Front Photo" },
    { field: lic?.backPhoto, name: "License Back Photo" },
    { field: aad?.frontPhoto, name: "Aadhar Front Photo" },
    { field: aad?.backPhoto, name: "Aadhar Back Photo" }
  ];

  error = validateRequiredFields(requiredDetailFields);
  if (error) return next(error);


  const requiredAccountFields = [
    { field: driverAccountDetail?.accountNumber, name: "Account Number" },
    { field: driverAccountDetail?.ifscCode, name: "IFSC Code" },
    { field: driverAccountDetail?.bankName, name: "Bank Name" },
  ];

  error = validateRequiredFields(requiredAccountFields);
  if (error) return next(error);


  const existingDriver = await Driver.findOne({ mobile: driver.mobile });
  if (existingDriver) return next(new AppError("Driver already registerd", 400));


  const detailDoc = await DriverDetail.create(driverDetail);
  const accountDoc = await DriverAccountDetail.create(driverAccountDetail);

  driver.details = detailDoc._id;
  driver.accounts = accountDoc._id;

  const driverDoc = await Driver.create(driver);

  const registerDriverData = await Driver.findById(driverDoc._id)
    .populate("details")
    .populate("accounts");

  successResponse(res, "New driver registerd successfully", registerDriverData);

});