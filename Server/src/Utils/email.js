const nodemailer = require("nodemailer");
console.log(process.env.SMTP_HOST);
console.log(process.env.SMTP_PORT);
console.log(process.env.SMTP_USER);
console.log(process.env.SMTP_PASS);
const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST || 'smtp.ethereal.email',
  port: process.env.SMTP_PORT || 587,
  // secure: process.env.SECURE,
  auth: {
    user: process.env.SMTP_USER || "judson.kling@ethereal.email",
    pass: process.env.SMTP_PASS || "AzbZsV5kb9KjY8kcCU",
  },
});

const sendMail = (mailOptions, next) => {
  try {
    console.log(transporter);
    transporter.sendMail(mailOptions, (error, response) => {
      console.log("🚀 ~ transporter.sendMail ~ error:", error)
      next(error, response);
    });
  } catch (error) {
    console.log("🚀 ~ sendMail ~ error:", error)
    next(error, "hello");
  }
};

module.exports = sendMail;
