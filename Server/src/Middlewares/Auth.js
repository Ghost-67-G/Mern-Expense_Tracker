const jwt = require("jsonwebtoken");
const User = require("../Models/user.model");

const auth = (req, res, next) => {
  const cookie = req.cookies;
  if (!cookie.tokens) {
    res.status(401).send("Authentication failed");
  }
  const token = JSON.parse(cookie?.tokens)?.tokens;
  if (token) {
    jwt.verify(token, process.env.JWT_SECRET, async (error, decoded) => {
      if (error) {
        res.status(401).send("Authentication failed");
      } else {
        const user = await User.findById(decoded.data._id);
        req.user = user;
        next();
      }
    });
  } else {
    res.status(401).send("Authentication failed");
  }
};

module.exports = auth;
