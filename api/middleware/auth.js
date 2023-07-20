const jwt = require("jsonwebtoken");
require("dotenv").config();

function auth(req, res, next) {
  const token = req.header("x-auth-token");
console.log(token);
  if (!token)
    return res.status(401).json({ msg: "Not authorised, access denied" });

  try {
    const decoded = jwt.verify(token, process.env.jwtSecret);
    req.user = decoded;
    next();
  } catch (e) {
    res.status(400).json({ msg: "Token is not valid" });
  }
}

module.exports = auth;
