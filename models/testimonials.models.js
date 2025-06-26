const mongoose = require("mongoose");

const testimonialSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, maxlength: 100 },
    testimonialDetails: { type: String, required: true },
    testimonialImage: { type: String },
    testimonialText: { type: String, required: true, minlength: 10 },
    reviewDate: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Testimonial", testimonialSchema);
