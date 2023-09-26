const {
  createUser,
  verifyUser,
  login,
  authenticate,
} = require("../Controller/user.controller");
const auth = require("../Middlewares/Auth");

const router = require("express").Router();

router.route("/").post(createUser);
router.route("/login").post(login);
router.route("/verify").get(verifyUser);
router.route("/authenticate").get(auth, authenticate);

module.exports = router;
