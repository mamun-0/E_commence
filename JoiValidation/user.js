const Joi = require("joi");
const validateUser = (user) => {
  return Joi.object({
    name: Joi.string().min(3).max(100).required(),
    email: Joi.string().email().max(255).required(),
    password: Joi.string().min(5).max(255).required(),
  }).validate(user);
};

module.exports = {
  validateUser,
};
