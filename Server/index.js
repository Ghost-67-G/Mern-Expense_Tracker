const express = require("express");
const env = require("dotenv");
const app = express();
let cookieParser = require("cookie-parser");
const userRoutes = require("./src/Routes/user.routes");
const transactionRoutes = require("./src/Routes/transaction.routes");
const path = require("path");
env.config();
const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    // "mongodb+srv://AyanNaseer:Ghost-67@combinedb.x23qgg7.mongodb.net/ChatApp?retryWrites=true&w=majority"
    const uri = process.env.MONGODB_URL;
    const conn = await mongoose.connect(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

connectDB();

app.use(cookieParser());
app.use(express.json());

app.use("/api/user", userRoutes);
app.use("/api/transactions", transactionRoutes);
app.use(express.static(path.join(__dirname, "build")));
app.get("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "build", "index.html"));
});

console.log(process.env.NODE_ENV);
const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log("listening on port", PORT);
});
