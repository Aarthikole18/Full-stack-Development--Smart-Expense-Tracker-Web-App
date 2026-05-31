import { useEffect, useState } from "react";
import axios from "axios";
import { Pie } from "react-chartjs-2";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend
} from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend);

export default function Dashboard() {
  const [transactions, setTransactions] = useState([]);
  const [form, setForm] = useState({
    amount: "",
    type: "expense",
    category: ""
  });

  const fetchData = async () => {
    const res = await axios.get("http://localhost:5000/api/transaction");
    setTransactions(res.data);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const addTransaction = async () => {
    await axios.post("http://localhost:5000/api/transaction", form);
    setForm({ amount: "", type: "expense", category: "" });
    fetchData();
  };

  const income = transactions
    .filter(t => t.type === "income")
    .reduce((a, b) => a + Number(b.amount), 0);

  const expense = transactions
    .filter(t => t.type === "expense")
    .reduce((a, b) => a + Number(b.amount), 0);

  const chartData = {
    labels: ["Income", "Expense"],
    datasets: [
      {
        data: [income, expense],
        backgroundColor: ["#4CAF50", "#F44336"]
      }
    ]
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>📊 Smart Expense Dashboard</h1>

      {/* FORM */}
      <div style={{ marginBottom: "20px" }}>
        <input
          placeholder="Amount"
          value={form.amount}
          onChange={(e) => setForm({ ...form, amount: e.target.value })}
        />

        <input
          placeholder="Category"
          value={form.category}
          onChange={(e) => setForm({ ...form, category: e.target.value })}
        />

        <select
          value={form.type}
          onChange={(e) => setForm({ ...form, type: e.target.value })}
        >
          <option value="income">Income</option>
          <option value="expense">Expense</option>
        </select>

        <button onClick={addTransaction}>Add</button>
      </div>

      {/* CHART */}
      <div style={{ width: "300px", marginBottom: "20px" }}>
        <Pie data={chartData} />
      </div>

      {/* LIST */}
      <h3>Transactions</h3>
      {transactions.map((t, i) => (
        <div key={i} style={{
          padding: "10px",
          border: "1px solid #ccc",
          marginBottom: "10px"
        }}>
          <p>💰 {t.amount}</p>
          <p>📂 {t.category}</p>
          <p>📌 {t.type}</p>
        </div>
      ))}
    </div>
  );
}