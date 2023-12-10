const express = require("express");
const router = express.Router();
const { signUp, signIn } = require("../controllers/userController");
const wrapAsync = require("../Util/wrapAsync");
router.route("/signup").post(wrapAsync(signUp));
router.route("/signin").post(wrapAsync(signIn));

module.exports = router;
