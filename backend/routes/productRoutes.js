const express = require("express");
// const asyncHandler = require('express-async-handler') //moved to product controller file
const router = express.Router();
// const Product = require('../models/productModel'); //moved to product controller file
const productCTRL = require("../controllers/productController");
const { protect, admin } = require("../middleware/authMiddleware");

router
  .route("/")
  .get(productCTRL.getProducts)
  .post(protect, admin, productCTRL.createProduct);
router.route("/:id/reviews").post(protect, productCTRL.createProductReview)
router
  .route("/:id")
  .get(productCTRL.getProductById)
  .delete(protect, admin, productCTRL.deleteProduct)
  .put(protect, admin, productCTRL.updateProduct);

module.exports = router;
