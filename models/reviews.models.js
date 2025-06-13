const mongoose = require("mongoose");

const userReviews = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      maxlength: 100,
    },
    reviewDetails: {
      type: String,
      required: true,
    },

    reviewImage: {
      type: String,
      required: false,
    },

    reviewText: {
      type: String,
      required: true,
      minlength: 10,
    },

    reviewMore: {
      type: String,
      required: true,
    },

    reviewDate: {
      type: Date,
      required: true,
      default: Date.now,
    },

    rating: {
      type: Number,
      required: true,
      min: 1,
      max: 5,
    },
  },

  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Review", userReviews);
