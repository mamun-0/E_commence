const router = require("express").Router();
const { getProfile, setProfile } = require("../controllers/profileController");
const authorize = require("../middlewares/authorize");
const wrapAsync = require("../Util/wrapAsync");

router
  .route("/")
  .get(authorize, wrapAsync(getProfile))
  .post(authorize, wrapAsync(setProfile));
module.exports = router;
