const {
  createUser,
  verifyUser,
  login,
  authenticate,
  logout,
} = require("../Controller/user.controller");
const auth = require("../Middlewares/Auth");

const router = require("express").Router();

router.route("/").post(createUser);
router.route("/login").post(login);
router.route("/verify").get(verifyUser);
router.route("/authenticate").get(auth, authenticate);
router.route("/logout").get(auth, logout);

module.exports = router;
