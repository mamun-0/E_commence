const Joi = require("joi");
module.exports = function (category) {
  return Joi.object({
    name: Joi.string().min(3).max(50).required(),
  }).validate(category);
};
