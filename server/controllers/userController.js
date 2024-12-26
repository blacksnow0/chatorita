const jwt = require("jsonwebtoken");

const User = require("../models/UserModel");

require("dotenv").config();

const createToken = (_id) => {
  return jwt.sign({ _id }, process.env.JWT_SECRET, {
    expiresIn: "7d",
  });
};

const registerUser = async (req, res) => {
  const { username, email, password } = req.body;

  try {
    const user = await User.register(username, email, password);
    const token = createToken(user._id);
    res.status(201).json({ username: user.username, token });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const loginUser = async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await User.login(username, password);
    const token = createToken(user._id);
    res.status(200).json({ username: user.username, token });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

module.exports = { registerUser, loginUser };
