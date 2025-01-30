import Address from "../../models/Address.js";

export const addAddress = async (req, res) => {
  try {
    const { userId, address, phone, city, pincode, notes } = req.body;

    if (!userId || !address || !phone || !city || !pincode || !notes) {
      return res
        .status(400)
        .json({ success: false, message: "Invalide data provided!" });
    }

    const newlyCreatwAddess = new Address({
      userId,
      address,
      phone,
      city,
      pincode,
      notes,
    });
    await newlyCreatwAddess.save();

    res.status(201).json({ success: true, data: newlyCreatwAddess });
  } catch (err) {
    console.log(err);
    return res
      .status(500)
      .json({ success: false, message: "Internal Server Error" });
  }
};
export const fetchAllAddress = async (req, res) => {
  try {
    const { userId } = req.params;
    if (!userId) {
      return res
        .status(400)
        .json({ success: false, message: "userId is required!" });
    }

    const address = await Address.find({ userId });
    res.status(200).json({
      success: true,
      data: address,
    });
  } catch (err) {
    console.log(err);
    return res
      .status(500)
      .json({ success: false, message: "Internal Server Error" });
  }
};
export const editAddress = async (req, res) => {
  try {
    const { userId, addressId } = req.params;
    const { formData } = req.body;

    if (!userId || !addressId) {
      return res.status(400).json({
        success: false,
        message: "userId and addressId is required!",
      });
    }
    const address = await Address.findOneAndUpdate(
      { _id: addressId, userId },
      formData,
      { new: true }
    );
    if (!address) {
      return res.status(404).json({
        success: false,
        message: "Address not found!",
      });
    }
    res.status(200).json({
      success: true,
      data: address,
    });
  } catch (err) {
    console.log(err);
    return res
      .status(500)
      .json({ success: false, message: "Internal Server Error" });
  }
};
export const deleteAddress = async (req, res) => {
  try {
    const { userId, addressId } = req.params;

    if (!userId || !addressId) {
      return res.status(400).json({
        success: false,
        message: "userId and addressId is required!",
      });
    }

    const address = await Address.findOneAndDelete({ _id: addressId, userId });

    if (!address) {
      return res.status(404).json({
        success: false,
        message: "Address not found!",
      });
    }

    res.status(200).json({
      success: true,
      message: "Address deleted successfully!",
    });
  } catch (err) {
    console.log(err);
    return res
      .status(500)
      .json({ success: false, message: "Internal Server Error" });
  }
};


