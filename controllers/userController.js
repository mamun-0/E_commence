const bcrypt = require("bcrypt");
const User = require("../models/user");
const _ = require("lodash");
const { validateUser } = require("../JoiValidation/user");

module.exports.signUp = async (req, res) => {
  const { error } = validateUser(req.body);
  if (error) {
    return res.status(400).send(error.details[0].message);
  }
  const findUser = await User.findOne({ email: req.body.email });
  if (findUser) return res.status(400).send("User already registered.");
  const newUser = new User(_.pick(req.body, ["name", "email", "password"]));
  newUser.password = await bcrypt.hash(newUser.password, 12);
  const jwtToken = newUser.generateJWT();
  newUser.save();
  res.send({
    message: "Registration successful",
    token: jwtToken,
    user: _.pick(newUser, ["_id", "name", "email"]),
  });
};

module.exports.signIn = async (req, res) => {
  res.send("Signin incomming get request");
};
