const User = require("../models/user.model");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const asyncHandler = require("express-async-handler");

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "30d" });
};

const register = asyncHandler(async (req, res) => {
  try {
    const { username, email, password } = req.body;

    //check if user already exist
    const existUser = await User.findOne({ username });
    if (existUser) {
      res.status(400);
      throw new Error("user already exist");
    }

    //hash password
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);

    const newUser = await User.create({
      username,
      email,
      password: hash,
    });

    if (newUser) {
      res.status(201).json({
        _id: newUser._id,
        username: newUser.username,
        email: newUser.email,
        token: generateToken(newUser._id),
      });
    } else {
      res.status(400);
      throw Error("Invalid user data");
    }
  } catch (error) {
    res.status(500);
    throw new Error(error.message || "internal server error please try again");
  }
});

const login = asyncHandler(async (req, res) => {
  try {
    const { username, password } = req.body;

    const user = await User.findOne({ username });

    if (user && (await bcrypt.compare(password, user.password))) {
      res.status(200);
      res.json({
        _id: user._id,
        username: user.username,
        email: user.email,
        token: generateToken(user._id),
      });
    } else {
      res.status(401);
      throw new Error(error.message || "invalid data");
    }
  } catch (error) {
    res.status(500);
    throw new Error(error.message || "internal server error please try again");
  }
});

const getUser = asyncHandler(async (req, res) => {
  try {
    const { _id, username } = req.user;
    if (req.user) {
      res.status(200).json({
        _id,
        username,
      });
    }
  } catch (error) {
    res.status(500);
    throw new Error(error.message || "cannot get user");
  }
});

module.exports = {
  register,
  login,
  getUser,
};
