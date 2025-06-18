const asyncHandler = require("express-async-handler");
const Review = require("../models/reviews.models");

// @desc Get all reviews
exports.getReviews = asyncHandler(async (req, res) => {
  const reviews = await Review.find();
  res.status(200).json(reviews);
});

// @desc Create a new review
exports.setReview = asyncHandler(async (req, res) => {
  const { title, reviewDetails, reviewImage, reviewText, reviewMore, rating } =
    req.body;

  if (!title || !reviewDetails || !reviewText || !reviewMore || !rating) {
    res.status(400);
    throw new Error("Please fill in all required fields");
  }

  const review = await Review.create({
    title,
    reviewDetails,
    reviewImage,
    reviewText,
    reviewMore,
    rating,
  });

  res.status(201).json(review);
});

// @desc Update a review
exports.updateReview = asyncHandler(async (req, res) => {
  const review = await Review.findById(req.params.id);
  if (!review) {
    res.status(404);
    throw new Error("Review not found");
  }

  const updatedReview = await Review.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true }
  );
  res.status(200).json(updatedReview);
});

// @desc Delete a review
exports.deleteReview = asyncHandler(async (req, res) => {
  const review = await Review.findById(req.params.id);
  if (!review) {
    res.status(404);
    throw new Error("Review not found");
  }

  await review.deleteOne();
  res.status(200).json({ message: "Review deleted successfully" });
});
