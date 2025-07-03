const express = require("express");
const router = express.Router();
const { registerUser, loginUser, changePassword } = require("../controllers/authController");
const { protect } = require("../middleware/middleware/authMiddleware");




router.patch("/change-password", protect, changePassword);
router.post("/register", registerUser);
router.post("/login", loginUser);


module.exports = router;

