const mongoose = require("mongoose");

const TransactionSchema = new mongoose.Schema({
  amount: Number,
  type: String, // income or expense
  category: String,
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model("Transaction", TransactionSchema);