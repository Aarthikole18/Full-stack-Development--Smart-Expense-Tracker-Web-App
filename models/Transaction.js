const mongoose = require("mongoose");

const TransactionSchema = new mongoose.Schema({
  amount: Number,
  category: String,
  type: String,
});

module.exports = mongoose.model("Transaction", TransactionSchema);