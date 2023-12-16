const { CartItem } = require("../models/cartItem");

module.exports.createCartItem = async (req, res) => {
  const { price, product } = req.body;
  const foundProduct = await CartItem.findOne({ user: req.user._id, product });
  if (foundProduct)
    return res.status(400).send("Item already exist in the cart.");
  const cartItem = new CartItem({ price, product, user: req.user._id });
  const result = await cartItem.save();
  return res.status(200).send({
    message: "Added to cart successfully",
    data: result,
  });
};
module.exports.getCartItem = async (req, res) => {
  const cartItems = await CartItem.find({ user: re.user_id })
    .populate("product", "name")
    .populate("user", "name");
  if (cartItems.length) return res.status(400).send("Cart is empty");
};
module.exports.updateCartItem = async (req, res) => {
  const { _id, count } = req.body;
  await CartItem.updateOne({ _id: _id, user: req.user }, { count });
  return res.status(200).send("Item updated");
};
module.exports.deleteCartItem = async (req, res) => {
  const { id } = req.params;
  await CartItem.deleteOne({ _id: id, user: req.user._id });
  return res.status(200).send("Item deleted!");
};
