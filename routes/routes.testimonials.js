const express = require("express");
const router = express.Router();
const {
  getTestimonials,
  setTestimonial,
  updateTestimonial,
  deleteTestimonial,
} = require("../controllers/testimonialController");

router.route("/").get(getTestimonials).post(setTestimonial);
router.route("/:id").put(updateTestimonial).delete(deleteTestimonial);

module.exports = router;
