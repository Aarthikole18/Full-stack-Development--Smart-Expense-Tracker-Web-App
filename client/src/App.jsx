import { useEffect, useState } from "react";
import API from "./api";
import "./App.css";

export default function App() {
  const [transactions, setTransactions] = useState([]);
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState("");
  const [type, setType] = useState("expense");

  const fetchData = async () => {
    try {
      const res = await fetch(`${API}/api/transactions`);
      const data = await res.json();
      setTransactions(Array.isArray(data) ? data : []);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const addTransaction = async () => {
    if (!amount || !category) return;

    try {
      await fetch(`${API}/api/transactions`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          amount: Number(amount),
          category,
          type,
        }),
      });

      setAmount("");
      setCategory("");
      setType("expense");
      fetchData();
    } catch (err) {
      console.log(err);
    }
  };

  const deleteTransaction = async (id) => {
    try {
      await fetch(`${API}/api/transactions/${id}`, {
        method: "DELETE",
      });

      fetchData();
    } catch (err) {
      console.log(err);
    }
  };

  const validTransactions = transactions.filter(
    (t) => t && t.type && t.amount !== undefined
  );

  const income = validTransactions
    .filter((t) => t.type === "income")
    .reduce((sum, t) => sum + Number(t.amount || 0), 0);

  const expense = validTransactions
    .filter((t) => t.type === "expense")
    .reduce((sum, t) => sum + Number(t.amount || 0), 0);

  const balance = income - expense;

  return (
    <div className="app">
      <h1>💰 Smart Expense Tracker</h1>

      <div className="grid">
        <div className="card income">Income 💸 ₹{income}</div>
        <div className="card expense">Expense 🔥 ₹{expense}</div>
        <div className="card balance">Balance ⚖ ₹{balance}</div>
      </div>

      <div className="form">
        <input
          type="number"
          placeholder="Amount"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
        />

        <input
          type="text"
          placeholder="Category"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        />

        <select value={type} onChange={(e) => setType(e.target.value)}>
          <option value="income">Income</option>
          <option value="expense">Expense</option>
        </select>

        <button onClick={addTransaction}>+ Add Transaction</button>
      </div>

      <div className="list">
        {validTransactions.length === 0 ? (
          <p>No transactions yet</p>
        ) : (
          validTransactions.map((t) => (
            <div className="item" key={t._id}>
              <span>
                {t.category} ({t.type})
              </span>
              <span>₹{t.amount}</span>
              <button onClick={() => deleteTransaction(t._id)}>
                Delete
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
}