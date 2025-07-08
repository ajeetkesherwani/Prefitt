const Vendor = require("../../../models/vendor");

exports.getVendorList = async (req, res) => {
  try {
    const allVendor = await Vendor.find()
      .select(
        "shopName shopId serviceId mobile profileImg status isBlocked wallet_balance"
      )
      .populate("serviceId", "name");
    if (!allVendor) {
      return res
        .status(400)
        .json({ success: false, message: "Vendor not found" });
    }

    res.status(200).json({
      success: true,
      message: "all Vendor found",
      count: allVendor.length,
      data: allVendor,
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};
