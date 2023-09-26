const nodemailer = require("nodemailer");
const transporter = nodemailer.createTransport({
  host: process.env.HOST,
  port: process.env.EMAIL_PORT,
  secure: process.env.SECURE,
  auth: {
    user: process.env.USER,
    pass: process.env.PASS,
  },
});

const sendMail = (mailOptions, next) => {
  try {
    transporter.sendMail(mailOptions, (error, response) => {
      next(error, response);
    });
  } catch (error) {
    next(error, "hello");
  }
};

module.exports = sendMail;
