const Driver = require("../../../models/driver");
const DriverDetail = require("../../../models/driverDetail");
const DriverAccountDetail = require("../../../models/driverAccountDetail");
const AppError = require("../../../utils/AppError");
const catchAsync = require("../../../utils/catchAsync");
const { successResponse } = require("../../../utils/responseHandler");

exports.updateDriverProfile = catchAsync(async (req, res, next) => {

    // const { driverId } = req.driver._id;
    const { driverId } = req.params;
    if (!driverId) return next(new AppError(" driverId is required", 400));

    const updatedDriver = JSON.parse(req.body.driver);
    const updatedDriverDetail = JSON.parse(req.body.driverDetail);
    const updatedDriverAccountDetail = JSON.parse(req.body.driverAccountDetail);
   
    const driverDoc = await Driver.findById(driverId).populate("details").populate("accounts");

    if (!driverDoc) return next(new AppError("driveDoc not found", 404));

    if (req.files?.frontPhoto?.[0]) {
        updatedDriver.frontPhoto = req.files.frontPhoto[0].path;
    }

    const rc = updatedDriverDetail?.rcRegistration || {};
    const lic = updatedDriverDetail?.licence || {};
    const aad = updatedDriverDetail?.adharCard || {};

    if (req.files?.rcFrontPhoto?.[0]) rc.frontPhoto = req.files.rcFrontPhoto[0].path;
    if (req.files?.rcBackPhoto?.[0]) rc.backPhoto = req.files.rcBackPhoto[0].path;
    if (req.files?.licFrontPhoto?.[0]) lic.frontPhoto = req.files.licFrontPhoto[0].path;
    if (req.files?.licBackPhoto?.[0]) lic.backPhoto = req.files.licBackPhoto[0].path;
    if (req.files?.aadFrontPhoto?.[0]) aad.frontPhoto = req.files.aadFrontPhoto[0].path;
    if (req.files?.aadBackPhoto?.[0]) aad.backPhoto = req.files.aadBackPhoto[0].path;

    if (updatedDriver.latitude || updatedDriver.longitude) {
        driverDoc.location.latitude = updatedDriver.latitude || driverDoc.location.latitude;
        driverDoc.location.longitude = updatedDriver.longitude || driverDoc.location.longitude;
        delete updatedDriver.latitude;
        delete updatedDriver.longitude;
    }

      Object.assign(driverDoc, updatedDriver);
    await driverDoc.save();


    if (Object.keys(updatedDriverDetail).length) {
        const detailDoc = await DriverDetail.findById(driverDoc.details);
        Object.assign(detailDoc.rcRegistration, rc);
        Object.assign(detailDoc.licence, lic);
        Object.assign(detailDoc.adharCard, aad);
        Object.assign(detailDoc, updatedDriverDetail);
        await detailDoc.save();
    }

    if (Object.keys(updatedDriverAccountDetail).length) {
        const accDoc = await DriverAccountDetail.findById(driverDoc.accounts);
        Object.assign(accDoc, updatedDriverAccountDetail);
        await accDoc.save();
    }

    const finalData = await Driver.findById(driverId)
        .populate("details")
        .populate("accounts");

    successResponse(res, "Driver profile updated successfully", finalData);

});