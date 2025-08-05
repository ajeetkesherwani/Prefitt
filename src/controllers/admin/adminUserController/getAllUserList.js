const Admin = require("../../../models/admin");
const catchAsync = require("../../../utils/catchAsync");
const { successResponse } = require("../../../utils/responseHandler");

exports.getAllUserList = catchAsync(async (req, res) => {
  const admins = await Admin.find().populate("role");

  successResponse(res, "Admins fetched successfully", { admins });
});
