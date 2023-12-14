const jwt = require("jsonwebtoken");
module.exports = async function (req, res, next) {
  let token = req.header("Authorization");
  if (!token) return res.status(500).send("Access denied. No token provided.");
  //Bearer fkjsaklj45
  token = token.split(" ")[1].trim();
  try {
    const decoded = await jwt.verify(token, process.env.JSON_WEB_TOKEN);
    req.user = decoded;
    next();
  } catch (err) {
     return res.status(500).send("Invalid token!");
  }
};
