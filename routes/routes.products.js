const express = require("express");
const router = express.Router();
const {
  getProducts,
  setProduct,
  updateProduct,
  deleteProduct,
  searchProducts,
} = require("../controllers/productController");

const { protect } = require("../middleware/middleware/authMiddleware");

router.get("/search", searchProducts);
router.route("/").get(getProducts).post(setProduct);
router.route("/:id").put(updateProduct).delete(deleteProduct);

module.exports = router;
