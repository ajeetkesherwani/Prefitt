const Admin = require("../../../models/Admin");
const AppError = require("../../../utils/AppError");
const catchAsync = require("../../../utils/catchAsync");

exports.createUser = catchAsync(async (req, res) => {
  const { name, email, phoneNo, password, role, address, bio } = req.body;

  if (!name || !name.trim()) throw new AppError("Name is required", 400);
  if (!email || !email.trim()) throw new AppError("Email is required", 400);
  if (!phoneNo || !phoneNo.trim())
    throw new AppError("Phone number is required", 400);
  if (!password || !password.trim())
    throw new AppError("Password is required", 400);

  // Image Upload Handling (if image file is passed)
  let imagePath = "";
  if (req.files && req.files.image) {
    const file = req.files.image[0];
    imagePath = `${file.destination}/${file.filename}`;
  }

  const admin = new Admin({
    name,
    email,
    phoneNo,
    password,
    role,
    address,
    bio,
    image: imagePath,
  });

  await admin.save();

  return res.status(201).json({
    status: true,
    message: "Admin created successfully",
    data: { admin },
  });
});
