const User = require("../Models/user.model");
const jwt = require("jsonwebtoken");
const sendMail = require("../Utils/email");
const generateTokens = require("../Utils/tokenGenerator");
const bcrypt = require("bcryptjs");

const { verifyEmail } = require("../EmailTemplates/VerifyEmail");

const createUser = async (req, res) => {
  try {
    const emailTaken = await User.findOne({ email: req.body.email });
    if (emailTaken) {
      res.status(400).send("Email already taken");
    }
    const user = new User({ ...req.body });
    const token = generateTokens(user._id, "10m");
    const link = `${process.env.DOMAIN}/users/verify-email/${token}`;
    const mailOptions = {
      to: req.body.email,
      subject: "Please confirm your Email account",
      html: verifyEmail(link),
    };
    if (process.env.NODE_ENV === "production") {
      sendMail(mailOptions, async (error, response) => {
        if (error) {
          console.log(error);
          res.status(400).send("Email cannot send try Again");
        } else {
          await user.save();
          res.status(201).send("User registered successfully");
        }
      });
    } else {
      await user.save();
      res.status(201).send("User registered successfully");
        }
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
};

// const resend = async (req, res) => {
//   try {
//     const user = await User.findOne({ email: req.query.email });
//     const token = generateTokens(user._id, "10m");
//     const link = `${process.env.DOMAIN}/users/verify-email/${token}`;
//     const mailOptions = {
//       to: req.body.email,
//       subject: "Please confirm your Email account",
//       html: verifyEmail(link),
//     };
//     sendMail(mailOptions, (error, response) => {
//       if (error) {
//         console.log(error);
//         res.status(400).send("Email cannot send try Again");
//       } else {
//         res.status(201).send("User registered successfully");
//       }
//     });
//   } catch (error) {
//     console.error(error);
//     res.status(500).send("Internal Server Error");
//   }
// };

const verifyUser = async (req, res) => {
  try {
    const token = req.param.token;
    jsonwebtoken.verify(
      token,
      process.env.JWT_SECRET,
      async function (err, decoded) {
        if (err) {
          res
            .status(401)
            .send(
              "Email verification failed, possibly the link is invalid or expired"
            );
        } else {
          await User.findByIdAndUpdate(decoded.data, { isEmailVerified: true });
          res.send("Email Verify successfully");
        }
      }
    );
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
};

const login = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user.isEmailVerified && process.env.NODE_ENV === "production") {
    res.status(401).send("Email is not verified");
  }

  if (!user || !bcrypt.compare(password, user.password)) {
    res.status(401).send("Incorrect email or password");
  }
  if (user.status === "inactive") {
    res.status(401).send("You can not login your account is banned");
  }

  const tokens = await generateTokens(user, "24h");
  res
    .cookie("tokens", JSON.stringify({ tokens }), {
      domain:
        process.env.NODE_ENV === "development"
          ? "localhost"
          : "sarmadsaeed.netlify.app",
      // secure: true,
      // httpOnly: true,
      // sameSite: 'none',
      httpOnly: true,
      sameSite: "none",
      secure: true,
      maxAge: 24 * 60 * 60 * 1000,
      expires: "24h",
    })
    .send({ user, tokens });
};
const logout = async (req, res) => {
  // Clear the 'tokens' cookie
  res
    .cookie("tokens", "", {
      domain:
        process.env.NODE_ENV === "development"
          ? "localhost"
          : "expense-tracker-as.cyclic.cloud",
      // secure: true,
      // httpOnly: true,
      // sameSite: 'none',
      httpOnly: true,
      sameSite: "none",
      secure: true,
      expires: new Date(0), // Set the expiration to a past date (clears the cookie)
    })
    .send("Logged out");
};

const authenticate = async (req, res) => {
  res.status(200).send({ user: req.user });
};

module.exports = { createUser, verifyUser, login, authenticate, logout };
