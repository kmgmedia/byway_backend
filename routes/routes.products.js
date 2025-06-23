const express = require("express");
const router = express.Router();
const {
  getProducts,
  setProduct,
  updateProduct,
  deleteProduct,
} = require("../controllers/productController");

router.route("/").get(getProducts).post(setProduct);
router.route("/:id").put(updateProduct).delete(deleteProduct);

module.exports = router;
