// controllers/categoryController.js
const asyncHandler = require("express-async-handler");
const Category = require("../models/category.models");

exports.getAllCategories = asyncHandler(async (req, res) => {
  const categories = await Category.find();
  res.status(200).json(categories);
});

exports.createCategory = asyncHandler(async (req, res) => {
  const { name } = req.body;

  if (!name) {
    res.status(400);
    throw new Error("Category name is required");
  }

  const existing = await Category.findOne({ name });
  if (existing) {
    res.status(400);
    throw new Error("Category already exists");
  }

  const newCategory = await Category.create({ name });
  res.status(201).json(newCategory);
});
