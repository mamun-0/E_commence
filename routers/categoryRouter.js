const express = require("express");
const router = express.Router();
const admin = require("../middlewares/admin");
const authorize = require("../middlewares/authorize");
const wrapAsync = require("../Util/wrapAsync");
const {
  createCategory,
  getCategories,
} = require("../controllers/categoryController");

router
  .route("/")
  .post([authorize, admin], wrapAsync(createCategory))
  .get(wrapAsync(getCategories));

module.exports = router;
