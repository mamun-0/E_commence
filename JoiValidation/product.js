const Joi = require("joi");

module.exports = function (product) {
  return Joi.object({
    name: Joi.string().min(3).max(255).required(),
    description: Joi.string().max(255).required(),
    price: Joi.number().min(0).required(),
    quantity: Joi.number().required(),
    category: Joi.string().required(),
  }).validate(product);
};
