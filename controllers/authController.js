const asyncHandler = require("express-async-handler");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/user.models");

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "1d" });
};

// @desc Register new user
// @route POST /api/auth/register
// @access Public
exports.registerUser = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    res.status(400);
    throw new Error("All fields are required");
  }

  const userExists = await User.findOne({ email });
  if (userExists) {
    res.status(400);
    throw new Error("User already exists");
  }

  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  const user = await User.create({
    name,
    email,
    password: hashedPassword,
  });

  res.status(201).json({
    _id: user.id,
    name: user.name,
    email: user.email,
    token: generateToken(user.id),
  });
});

// @desc Login user
// @route POST /api/auth/login
// @access Public
exports.loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });

  if (user?.isDeleted) {
    res.status(403);
    throw new Error("Account deleted. Contact support if this is an error.");
  }

  if (user && (await bcrypt.compare(password, user.password))) {
    res.json({
      _id: user.id,
      name: user.name,
      email: user.email,
      token: generateToken(user.id),
    });
  } else {
    res.status(401);
    throw new Error("Invalid credentials");
  }
});

// @desc Change password
// @route PATCH /api/auth/change-password
// @access Private
exports.changePassword = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);
  const { currentPassword, newPassword } = req.body;

  if (!user) {
    res.status(404);
    throw new Error("User not found");
  }

  const isMatch = await bcrypt.compare(currentPassword, user.password);
  if (!isMatch) {
    res.status(400);
    throw new Error("Current password is incorrect");
  }

  const salt = await bcrypt.genSalt(10);
  user.password = await bcrypt.hash(newPassword, salt);
  await user.save();

  res.status(200).json({ message: "Password changed successfully" });
});

// @desc Reset username
// @route PATCH /api/auth/reset-username
// @access Private
exports.resetUsername = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user.id);
  const { newUsername } = req.body;

  if (!user) {
    res.status(404);
    throw new Error("User not found");
  }

  if (!newUsername || newUsername.trim() === "") {
    res.status(400);
    throw new Error("New username is required");
  }

  user.name = newUsername;
  await user.save();

  res.status(200).json({
    message: "Username updated successfully",
    user: {
      _id: user.id,
      name: user.name,
      email: user.email,
    },
  });
});

// @desc Delete user account
// @route DELETE /api/auth/:id
// @access Private
exports.deleteUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);

  if (!user) {
    res.status(404);
    throw new Error("User not found");
  }

  if (user._id.toString() !== req.user.id) {
    res.status(401);
    throw new Error("Not authorized to delete this user");
  }

  user.isDeleted = true;
  user.deletedAt = new Date();
  await user.save();

  res.status(200).json({
    message: "Account deleted. You can contact support within 30 days.",
  });
});

// @desc Forgot Password - Generate Reset Token
// @route POST /api/auth/forgot-password
// @access Public
exports.forgotPassword = asyncHandler(async (req, res) => {
  const { email } = req.body;
  const user = await User.findOne({ email });

  if (!user) {
    res.status(404);
    throw new Error("User not found");
  }

  const resetToken = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
    expiresIn: "15m",
  });

  // You'd email this token to the user
  res.status(200).json({
    message: "Password reset token generated",
    resetToken,
  });
});

// @desc Reset Password using Token
// @route POST /api/auth/reset-password/:token
// @access Public
exports.resetPassword = asyncHandler(async (req, res) => {
  const { token } = req.params;
  const { newPassword } = req.body;

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.id);

    if (!user) {
      res.status(404);
      throw new Error("User not found");
    }

    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(newPassword, salt);
    await user.save();

    res.status(200).json({ message: "Password has been reset successfully" });
  } catch (error) {
    res.status(400);
    throw new Error("Invalid or expired token");
  }
});

// @desc Logout user (client should delete token)
// @route POST /api/auth/logout
// @access Public
exports.logoutUser = (req, res) => {
  res.status(200).json({ message: "Logged out successfully (client should delete token)" });
};

