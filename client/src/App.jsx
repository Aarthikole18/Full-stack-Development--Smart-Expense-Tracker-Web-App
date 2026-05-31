import { useEffect, useState } from "react";
import API from "./api";
import "./App.css";

export default function App() {
  const [transactions, setTransactions] = useState([]);
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState("");

  const fetchData = async () => {
    try {
      const res = await fetch(`${API}/api/transactions`);
      const data = await res.json();
      setTransactions(data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const addTransaction = async () => {
    if (!amount || !category) return;

    await fetch(`${API}/api/transactions`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ amount, category }),
    });

    setAmount("");
    setCategory("");
    fetchData();
  };

  const deleteTransaction = async (id) => {
    await fetch(`${API}/api/transactions/${id}`, {
      method: "DELETE",
    });

    fetchData();
  };

  const total = transactions.reduce((acc, t) => acc + Number(t.amount), 0);

  return (
    <div className="app">
      <h1>💰 Smart Expense Tracker</h1>

      <div className="grid">
        <div className="card income">💸 ₹{total}</div>
        <div className="card balance">📊 {transactions.length}</div>
        <div className="card expense">🚀 Finance Tracker</div>
      </div>

      <div className="form">
        <input
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          placeholder="Amount"
        />

        <input
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          placeholder="Category"
        />

        <button onClick={addTransaction}>+ Add</button>
      </div>

      <div className="list">
        {transactions.map((t) => (
          <div className="item" key={t._id}>
            <span>{t.category}</span>
            <span>₹{t.amount}</span>
            <button onClick={() => deleteTransaction(t._id)}>
              Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}