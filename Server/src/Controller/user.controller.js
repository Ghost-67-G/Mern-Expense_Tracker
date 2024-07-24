const User = require("../Models/user.model");
const generateTokens = require("../Utils/tokenGenerator");
const bcrypt = require("bcryptjs");


const createUser = async (req, res) => {
  try {
    const emailTaken = await User.findOne({ email: req.body.email });
    if (emailTaken) {
      return res.status(400).send("Email already taken");
    }
    const user = new User({ ...req.body });
    await user.save();
    return res.status(201).send("User registered successfully");
  } catch (error) {
    console.error(error);
    return res.status(500).send("Internal Server Error");
  }
};

const login = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });

  if (!user || !bcrypt.compare(password, user.password)) {
    return res.status(401).send("Incorrect email or password");
  }
  if (user.status === "inactive") {
    return res.status(401).send("You cannot login, your account is banned");
  }

  const tokens = await generateTokens(user, "24h");
  res
    .cookie("tokens", JSON.stringify({ tokens }), {
      httpOnly: true,
      sameSite: process.env.NODE_ENV === "development" ? "lax" : "none",
      secure: process.env.NODE_ENV !== "development",
      maxAge: 24 * 60 * 60 * 1000, // 24 hours
    })
    .send({ user, tokens });
};

const logout = async (req, res) => {
  // Clear the 'tokens' cookie
  res
    .cookie("tokens", "", {
      domain: process.env.NODE_ENV === "development" ? "localhost" : process.env.DOMAIN,
      httpOnly: true,
      sameSite: process.env.NODE_ENV === "development" ? "lax" : "none",
      secure: process.env.NODE_ENV !== "development",
      expires: new Date(0), // Set the expiration to a past date (clears the cookie)
    })
    .send("Logged out");
};

const authenticate = async (req, res) => {
  res.status(200).send({ user: req.user });
};

module.exports = { createUser, login, authenticate, logout };
