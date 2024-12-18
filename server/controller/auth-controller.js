const bcrypt = require("bcryptjs");
const User = require("../models/User.js");

const registerUser = async (req, res) => {
  const { userName, email, password } = req.body;

  try {
    const hashPassword = await bcrypt.hash(password, 12);

    const newUser = new User({ userName, email, password: hashPassword });

    await newUser.save();
    res.status(200).json({
      success: true,
      message: "Registration successfull",
    });
  } catch (e) {
    console.log(e);
    res.status(500).json({
      success: false,
      message: "Some error occurred while registering",
    });
  }
};
const login = (req, res) => {
  const { email, password } = req.body;

  try {
  } catch (e) {
    console.log(e);
    res.status(500).json({
      success: false,
      message: "Some error occurred while registering",
    });
  }
};

module.exports = { registerUser, login };
