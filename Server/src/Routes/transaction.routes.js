const {
  createTransaction,
  getTransaction,
  updateTransaction,
  deleteTransaction,
  searchTransaction,
} = require("../Controller/transaction.controller");
const auth = require("../Middlewares/Auth");

const router = require("express").Router();

router.route("/").post(auth, createTransaction).get(auth, getTransaction);
router
  .route("/:id")
  .put(auth, updateTransaction)
  .delete(auth, deleteTransaction);
router.route("/search").get(auth, searchTransaction);

module.exports = router;
