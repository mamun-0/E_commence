const mongoose = require("mongoose");

const profileSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    unique: true,
    required: true,
  },
  phone: String,
  address1: String,
  address2: String,
  city: String,
  state: String,
  postCode: Number,
  country: String,
});

module.exports = mongoose.model("Profile", profileSchema);
