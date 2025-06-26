const asyncHandler = require("express-async-handler");
const Product = require("../models/products.models");

// @desc Get all product
exports.getProducts = asyncHandler(async (req, res) => {
  const products = await Product.find();
  res.status(200).json(products);
});

// @desc Create a new product
exports.setProduct = asyncHandler(async (req, res) => {
  const { title, productDetails, productImage, productText, productMore, rating, ratingCount, productAmount  } =
    req.body;

  if (!title || !productDetails || !productText || !productMore || !productAmount || !ratingCount || !rating ) {
    res.status(400);
    throw new Error("Please fill in all required fields");
  }

  const product = await Product.create({
    title,
    productDetails,
    productImage,
    productText,
    productMore,
    productAmount,
    ratingCount,
    rating,
  });

  res.status(201).json(product);
});

// @desc Update a product
exports.updateProduct = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);
  if (!product) {
    res.status(404);
    throw new Error("Product not found");
  }

  const updatedProduct = await Product.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true }
  );
  res.status(200).json(updatedProduct);
});

// @desc Delete a product
exports.deleteProduct = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);
  if (!product) {
    res.status(404);
    throw new Error("Product not found");
  }

  await product.deleteOne();
  res.status(200).json({ message: "Product deleted successfully" });
});
