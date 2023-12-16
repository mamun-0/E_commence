const router = require("express").Router();
const authorize = require("../middlewares/authorize");
const wrapAsync = require("../Util/wrapAsync");
const {
  createCartItem,
  getCartItem,
  updateCartItem,
  deleteCartItem,
} = require("../controllers/cartItemController");

router
  .route("/")
  .post(authorize, wrapAsync(createCartItem))
  .get(authorize, wrapAsync(getCartItem))
  .put(authorize, wrapAsync(updateCartItem));

router.route("/:id").delete(authorize, wrapAsync(deleteCartItem));

module.exports = router;
