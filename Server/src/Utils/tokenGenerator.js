const jwt = require("jsonwebtoken");

const generateTokens = (data, time) => {
  const token = jwt.sign(
    {
      data,
    },
    process.env.JWT_SECRET,
    { expiresIn: time }
  );
  return token;
};

module.exports = generateTokens;
