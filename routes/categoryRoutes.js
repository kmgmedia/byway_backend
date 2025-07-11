// routes/categoryRoutes.js
const express = require("express");
const router = express.Router();
const {
  getAllCategories,
  createCategory,
} = require("../controllers/categoryController");

router.get("/", getAllCategories);
router.post("/", createCategory); // <== this line handles the POST request

module.exports = router;
