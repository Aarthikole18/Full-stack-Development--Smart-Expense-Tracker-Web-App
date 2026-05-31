const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

let transactions = [];

app.get("/api/transactions", (req, res) => {
  res.json(transactions);
});

app.post("/api/transactions", (req, res) => {
  const newTx = {
    _id: Date.now().toString(),
    amount: Number(req.body.amount),
    category: req.body.category,
    type: req.body.type,
  };

  transactions.push(newTx);
  res.json(newTx);
});

app.delete("/api/transactions/:id", (req, res) => {
  transactions = transactions.filter(t => t._id !== req.params.id);
  res.json({ success: true });
});

app.listen(5000, () => console.log("Server running"));