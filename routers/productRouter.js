const express = require("express");
const router = express.Router();
const admin = require("../middlewares/admin");
const authorize = require("../middlewares/authorize");
const wrapAsync = require("../Util/wrapAsync");
const {
  createProduct,
  getProducts,
  getProductById,
  getPhoto,
  updateProductById,
  filterProducts,
} = require("../controllers/productController");

router
  .route("/")
  .post([authorize, admin], wrapAsync(createProduct))
  .get(wrapAsync(getProducts));
router.route("/filter").post(wrapAsync(filterProducts));
router.route("/photo/:id").get(wrapAsync(getPhoto));
router
  .route("/:id")
  .get(wrapAsync(getProductById))
  .put(wrapAsync(updateProductById));
module.exports = router;
