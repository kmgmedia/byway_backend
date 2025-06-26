const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, maxlength: 100 },
    productDetails: { type: String, required: true },
    productImage: { type: String },
    productText: { type: String, required: true, minlength: 10 },
    productMore: { type: String, required: true },
    ratingCount: { type: Number, required: true, min: 1, max: 5000 },
    rating: { type: Number, required: true, min: 1, max: 5 },
    productAmount: { type: Number, required: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Product", productSchema);
