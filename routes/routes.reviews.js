const express = require("express");
const router = express.Router();
const Review = require("../models/reviews.models");

router.post("/", async (req, res) => {
  try {
    const review = await Review.create(req.body);
    res.status(201).json(review);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

router.get("/", async (req, res) => {
  try {
    res.status(201).json({ message: "Working" });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

module.exports = router;
