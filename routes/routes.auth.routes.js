const express = require("express");
const router = express.Router();
const {
  registerUser,
  loginUser,
  changePassword,
  resetUsername,
  deleteUser,
  forgotPassword,
  resetPassword
} = require("../controllers/authController");
const { protect } = require("../middleware/middleware/authMiddleware");
const { logoutUser } = require("../controllers/authController");



router.post("/logout", logoutUser);
router.patch("/change-password", protect, changePassword);
router.patch("/reset-username", protect, resetUsername);
router.delete("/:id", protect, deleteUser);
router.post("/register", registerUser);
router.post("/login", loginUser);
router.post("/forgot-password", forgotPassword);
router.post("/reset-password/:token", resetPassword);


module.exports = router;

