const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
require("dotenv").config();

const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 5000;

// MongoDB Model
const Transaction = require("./models/Transaction");

// MongoDB Connect
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.log("Mongo Error:", err.message));

/* ---------------- ROUTES ---------------- */

// GET all transactions
app.get("/api/transactions", async (req, res) => {
  try {
    const data = await Transaction.find();
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ADD transaction
app.post("/api/transactions", async (req, res) => {
  try {
    const newTx = new Transaction(req.body);
    await newTx.save();
    res.json(newTx);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// DELETE transaction
app.delete("/api/transactions/:id", async (req, res) => {
  try {
    await Transaction.findByIdAndDelete(req.params.id);
    res.json({ message: "Deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

/* ---------------- HOME ---------------- */
app.get("/", (req, res) => {
  res.send("Smart Expense Tracker API Running 🚀");
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});