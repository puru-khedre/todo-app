const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const asyncHandler = require("express-async-handler");
const User = require("../models/userModel");

module.exports = {
  registerUser: asyncHandler(async (req, res) => {
    const { name, email, password } = req.body;

    //* check all field are filled
    if (!name || !email || !password) {
      res.status(400);
      throw new Error("please add all fields");
    }

    const userExist = await User.findOne({ email });

    //* check user already exists or not
    if (userExist) {
      res.status(400);
      throw new Error("user already exist");
    }

    //* create hash of password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    //* create a user in db
    const user = await User.create({
      name,
      email,
      password: hashedPassword,
    });

    if (user) {
      res.status(201).json({
        id: user._id,
        name: user.name,
        email: user.email,
        token: generateToken(user._id),
      });
    } else {
      res.status(400);
      throw new Error("Invalid user data");
    }
  }),

  loginUser: asyncHandler(async (req, res) => {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (user && (await bcrypt.compare(password, user.password))) {
      res.json({
        id: user._id,
        name: user.name,
        email: user.email,
        token: generateToken(user._id),
      });
    } else {
      res.status(400);
      throw new Error("Invalid credentials");
    }
  }),

  getMe: asyncHandler(async (req, res) => {
    const { _id: id, name, email } = req.user;
    res.status(200).json({ id, name, email });
  }),
};

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: "30d",
  });
};
