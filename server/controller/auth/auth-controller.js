const bcrypt = require("bcryptjs");
const User = require("../../models/User.js");
const jwt = require("jsonwebtoken");

const registerUser = async (req, res) => {
  const { userName, email, password } = req.body;
  try {
    const checkUser = await User.findOne({ email });

    if (checkUser) {
      return res.json({
        success: false,
        message: "User already exist please use another email",
      });
    }
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

// const bcrypt = require("bcryptjs");
// const User = require("../models/User.js");

// const registerUser = async (req, res) => {
//   const { userName, email, password } = req.body;

//   if (!userName || !email || !password) {
//     return res.status(400).json({
//       success: false,
//       message: "All fields are required",
//     });
//   }

//   try {
//     const existingUser = await User.findOne({ email });
//     if (existingUser) {
//       return res.status(400).json({
//         success: false,
//         message: "User already exists with this email",
//       });
//     }

//     const saltRounds = 12;
//     const hashPassword = await bcrypt.hash(password, saltRounds);

//     const newUser = new User({ userName, email, password: hashPassword });

//     await newUser.save();

//     res.status(200).json({
//       success: true,
//       message: "Registration successful",
//       data: { userId: newUser._id, userName: newUser.userName },
//     });
//   } catch (e) {
//     console.error("Error during registration:", e);
//     res.status(500).json({
//       success: false,
//       message: "Internal server error",
//     });
//   }
// };

// module.exports = registerUser;
const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const checkUser = await User.findOne({ email });
    if (!checkUser)
      return res.json({
        success: false,
        message: "User doesn't exist! Please register first",
      });

    const checkPasswordMatch = await bcrypt.compare(
      password,
      checkUser.password
    );
    if (!checkPasswordMatch)
      return res.json({
        success: false,
        message: "Incorrect password Please use correct password",
      });

    const token = jwt.sign(
      {
        id: checkUser.id,
        role: checkUser.role,
        email: checkUser.email,
        userName: checkUser.userName,
      },
      "CLIENT_SECRET_KEY",
      { expiresIn: "60m" }
    );

    res.cookie("token", token, { httpOnly: true, secure: false }).json({
      success: true,
      message: "login successful",
      user: {
        email: checkUser.email,
        role: checkUser.role,
        id: checkUser._id,
        userName: checkUser.userName,
      },
    });
  } catch (e) {
    console.log(e);
    res.status(500).json({
      success: false,
      message: "Some error occurred while registering",
    });
  }
};

const logoutUser = (req, res) => {
  res
    .clearCookie("token")
    .json({ success: true, message: "Logged out successfully" });
};

const authMiddleware = (req, res, next) => {
  const token = req.cookies.token;
  if (!token)
    return res
      .status(401)
      .json({ success: false, message: "unauthorized user!" });
  try {
    const decoded = jwt.verify(token, "CLIENT_SECRET_KEY");
    req.user = decoded;
    next();
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "unauthorized user!",
    });
  }
};

module.exports = { registerUser, loginUser, logoutUser, authMiddleware };
