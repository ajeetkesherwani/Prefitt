const Cms_Page = require("../../../models/cms_page");
const AppError = require("../../../utils/AppError");
const catchAsync = require("../../../utils/catchAsync");
const { successResponse } = require("../../../utils/responseHandler");

exports.getCmsPage = catchAsync(async(req, res, next) => {

    const cms = await Cms_Page.find();
    if(!cms) return next(new AppError("cms_page not found",404));

    successResponse(res, "Cms page found successfully", cms);

});