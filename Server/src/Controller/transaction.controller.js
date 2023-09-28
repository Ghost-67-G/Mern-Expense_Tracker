const Transaction = require("../Models/transactions.model");
const User = require("../Models/user.model");

const getTransaction = async (req, res) => {
  try {
    const filter = req.query || {};
    if (filter.title) {
      filter.title = { $regex: filter.title, $options: "i" }; // Case-insensitive title search
    }
    const transactions = await Transaction.find(filter);
    if (!transactions) {
      res.status(404).send("Transaction not found");
    }
    res.send({ transactions });
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
};
const createTransaction = async (req, res) => {
  try {
    const transactionData = req.body;
    transactionData.userId = req.user._id;

    // Parse the amount as a number
    transactionData.amount = parseFloat(transactionData.amount);

    const transaction = await Transaction.create({ ...transactionData });
    const user = await User.findById(req.user._id);

    if (transactionData.type === "expense") {
      user.totalBalance -= transactionData.amount;
      user.expense += transactionData.amount;
    } else {
      user.totalBalance += transactionData.amount;
      user.income += transactionData.amount;
    }

    user.save();
    res.status(201).send({ message: "Transaction successfully created", user });
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: "Internal Server Error" });
  }
};

const updateTransaction = async (req, res) => {
  try {
    const transactionId = req.params.id;
    const transactionData = req.body;

    const updatedTransaction = await Transaction.findByIdAndUpdate(
      transactionId,
      { ...transactionData },
      { new: true }
    );
    if (!updatedTransaction) {
      return res.status(404).send("Transaction not found");
    }
    transactionData.amount = parseFloat(transactionData.amount);
    const user = await User.findById(req.user._id);

    const transactions = await Transaction.find({ userId: user._id });
    const income = transactions.filter((item) => item.type === "income");
    const expense = transactions.filter((item) => item.type === "expense");
    const incomeSum = income.reduce((accumulator, currentValue) => {
      return accumulator + currentValue.amount;
    }, 0);
    const expenseSum = expense.reduce((accumulator, currentValue) => {
      return accumulator + currentValue.amount;
    }, 0);
    user.income = incomeSum;
    user.expense = expenseSum;
    user.totalBalance = incomeSum - expenseSum;
    await user.save();
    res.status(200).json(updatedTransaction);
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
};

const deleteTransaction = async (req, res) => {
  try {
    const transactionId = req.params.id;
    const deletedTransaction = await Transaction.findByIdAndRemove(
      transactionId
    );

    if (!deletedTransaction) {
      return res.status(404).send("Transaction not found");
    }

    const user = await User.findById(req.user._id);
    if (deletedTransaction.type === "expense") {
      user.totalBalance += deletedTransaction.amount; // Increase for expenses
      user.expense -= deletedTransaction.amount;
    } else {
      user.totalBalance -= deletedTransaction.amount; // Decrease for income
      user.income -= deletedTransaction.amount;
    }

    await user.save();
    res.status(201).send({message:"Successfully Deleted",user}); // No Content
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
};

const searchTransaction = async (req, res) => {
  try {
    const { title, userId } = req.query;
    const searchCriteria = {};

    if (!title && !userId) {
      return res.status(400).send("Title or userId parameter is missing");
    }

    if (title) {
      searchCriteria.title = { $regex: title, $options: "i" }; // Case-insensitive title search
    }

    if (userId) {
      searchCriteria.userId = userId;
    }

    const transactions = await Transaction.find(searchCriteria);

    if (!transactions || transactions.length === 0) {
      return res
        .status(404)
        .send("No transactions found for the given criteria");
    }

    res.status(200).json(transactions);
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
};

module.exports = {
  createTransaction,
  getTransaction,
  updateTransaction,
  deleteTransaction,
  searchTransaction, // Add the searchTransaction function to the exported object
};
