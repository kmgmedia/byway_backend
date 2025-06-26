const asyncHandler = require("express-async-handler");
const Testimonial = require("../models/testimonials.models");

// @desc Get all testimonials
exports.getTestimonials = asyncHandler(async (req, res) => {
  const testimonials = await Testimonial.find();
  res.status(200).json(testimonials);
});

// @desc Create a new testimonial
exports.setTestimonial = asyncHandler(async (req, res) => {
  const { title, testimonialDetails, testimonialImage, testimonialText } =
    req.body;

  if (!title || !testimonialDetails || !testimonialText) {
    res.status(400);
    throw new Error("Please fill in all required fields");
  }

  const testimonial = await Testimonial.create({
    title,
    testimonialDetails,
    testimonialImage,
    testimonialText,
  });

  res.status(201).json(testimonial);
});

// @desc Update a testimonial
exports.updateTestimonial = asyncHandler(async (req, res) => {
  const testimonial = await Testimonial.findById(req.params.id);
  if (!testimonial) {
    res.status(404);
    throw new Error("Testimonial not found");
  }

  const updatedTestimonial = await Testimonial.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true }
  );
  res.status(200).json(updatedTestimonial);
});

// @desc Delete a testimonial
exports.deleteTestimonial = asyncHandler(async (req, res) => {
  const testimonial = await Testimonial.findById(req.params.id);
  if (!testimonial) {
    res.status(404);
    throw new Error("Testimonial not found");
  }

  await testimonial.deleteOne();
  res.status(200).json({ message: "Testimonial deleted successfully" });
});
