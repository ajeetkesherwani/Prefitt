const User = require("../../../models/user");
const AppError = require("../../../utils/AppError");
const catchAsync = require("../../../utils/catchAsync");
const { successResponse } = require("../../../utils/responseHandler");

exports.getAllUser = catchAsync(async(req, res, next) => {

    const allUser = await User.find()
    .lean();

    if(!allUser) return next(new AppError("User not found",404 ));

    successResponse(res, "All User found", allUser);

});