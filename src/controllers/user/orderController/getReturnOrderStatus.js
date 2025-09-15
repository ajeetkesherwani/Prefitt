const OrderReturn = require("../../../models/orderReturn");
const MainOrder = require("../../../models/mainOrder");
const AppError = require("../../../utils/AppError");
const catchAsync = require("../../../utils/catchAsync");


exports.getReturnOrderStatus = catchAsync(async (req, res, next) => {
  const userId = req.user.id;
  const { id } = req.params;
  const { vendorId } = req.body;

    if (!id) {
        return next(new AppError("Order ID is required", 400));
    }
    let returnRequest = await OrderReturn.findById({id , }).populate('mainOrderId').select("products.status products.productId mainOrderId createdAt updatedAt");
    console.log(returnRequest);
    if (!returnRequest) {
        return next(new AppError("No return request found for this order", 404));
    }  

  // Send success response
  res.status(201).json({
    success: true,
    message: "Return request created successfully",
    data: returnRequest,
  });
});
