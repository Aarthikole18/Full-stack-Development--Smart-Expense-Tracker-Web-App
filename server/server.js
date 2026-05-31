const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
require("dotenv").config();

const app = express();

app.use(cors());
app.use(express.json());

// MongoDB
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
require("dotenv").config();

const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 5000;

// safer DB connect
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Connected"))
  .catch(err => {
    console.log("Mongo Error:", err.message);
  });

app.get("/", (req, res) => {
  res.send("Smart Expense Tracker API Running 🚀");
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

// Schema
const Transaction = mongoose.model("Transaction", {
  amount: Number,
  type: String,
  category: String
});

// API
app.get("/api/transactions", async (req, res) => {
  const data = await Transaction.find();
  res.json(data);
});

app.post("/api/transactions", async (req, res) => {
  const txn = new Transaction(req.body);
  await txn.save();
  res.json(txn);
});

app.delete("/api/transactions/:id", async (req, res) => {
  await Transaction.findByIdAndDelete(req.params.id);
  res.json({ message: "deleted" });
});

app.listen(5000, () => console.log("Server running on 5000"));