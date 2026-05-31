import { useEffect, useState } from "react";
import axios from "axios";

const API = "http://localhost:5000/api/transactions";

export default function App() {
  const [data, setData] = useState([]);
  const [form, setForm] = useState({
    amount: "",
    type: "expense",
    category: ""
  });

  const load = async () => {
    const res = await axios.get(API);
    setData(res.data || []);
  };

  useEffect(() => {
    load();
  }, []);

  const add = async () => {
    if (!form.amount || !form.category) return;

    await axios.post(API, {
      ...form,
      amount: Number(form.amount)
    });

    setForm({ amount: "", type: "expense", category: "" });
    load();
  };

  const del = async (id) => {
    await axios.delete(`${API}/${id}`);
    load();
  };

  const income = data
    .filter(t => t.type === "income")
    .reduce((a, b) => a + Number(b.amount || 0), 0);

  const expense = data
    .filter(t => t.type === "expense")
    .reduce((a, b) => a + Number(b.amount || 0), 0);

  const balance = income - expense;

  return (
    <div className="min-h-screen bg-[#0B0F14] text-[#E6E6E6] px-6 py-10 font-sans">

      {/* HEADER */}
      <div className="max-w-5xl mx-auto mb-10">
        <h1 className="text-3xl font-semibold tracking-tight">
          Smart Expense Tracker
        </h1>
        <p className="text-sm text-gray-400 mt-1">
          A simple way to track income, expenses, and financial balance.
        </p>
      </div>

      {/* SUMMARY CARDS */}
      <div className="max-w-5xl mx-auto grid md:grid-cols-3 gap-6 mb-10">

        <div className="bg-[#121821] p-5 rounded-xl border border-[#1E2632]">
          <p className="text-gray-400 text-sm">Total Income</p>
          <h2 className="text-2xl font-medium mt-1 text-green-400">
            ₹{income}
          </h2>
        </div>

        <div className="bg-[#121821] p-5 rounded-xl border border-[#1E2632]">
          <p className="text-gray-400 text-sm">Total Expense</p>
          <h2 className="text-2xl font-medium mt-1 text-red-400">
            ₹{expense}
          </h2>
        </div>

        <div className="bg-[#121821] p-5 rounded-xl border border-[#1E2632]">
          <p className="text-gray-400 text-sm">Balance</p>
          <h2 className="text-2xl font-medium mt-1 text-cyan-300">
            ₹{balance}
          </h2>
        </div>

      </div>

      {/* MAIN LAYOUT */}
      <div className="max-w-5xl mx-auto grid md:grid-cols-3 gap-8">

        {/* FORM */}
        <div className="space-y-4">

          <h2 className="text-lg font-medium text-gray-200">
            Add Transaction
          </h2>

          <input
            className="w-full p-3 rounded-lg bg-[#121821] border border-[#1E2632] text-white outline-none focus:border-gray-500"
            placeholder="Amount"
            value={form.amount}
            onChange={(e) => setForm({ ...form, amount: e.target.value })}
          />

          <input
            className="w-full p-3 rounded-lg bg-[#121821] border border-[#1E2632] text-white outline-none focus:border-gray-500"
            placeholder="Category (Food, Rent, Travel)"
            value={form.category}
            onChange={(e) => setForm({ ...form, category: e.target.value })}
          />

          <select
            className="w-full p-3 rounded-lg bg-[#121821] border border-[#1E2632] text-white outline-none"
            value={form.type}
            onChange={(e) => setForm({ ...form, type: e.target.value })}
          >
            <option value="expense">Expense</option>
            <option value="income">Income</option>
          </select>

          <button
            onClick={add}
            className="w-full py-3 rounded-lg bg-[#2D6CDF] hover:bg-[#2457B7] transition text-white font-medium"
          >
            Add Transaction
          </button>

        </div>

        {/* LIST */}
        <div className="md:col-span-2 space-y-3">

          <h2 className="text-lg font-medium text-gray-200">
            Recent Transactions
          </h2>

          {data.length === 0 && (
            <p className="text-gray-500 text-sm">
              No transactions available.
            </p>
          )}

          {data.map((t) => (
            <div
              key={t._id}
              className="flex justify-between items-center p-4 rounded-lg bg-[#121821] border border-[#1E2632]"
            >

              <div>
                <p className="text-sm font-medium text-gray-200">
                  {t.category}
                </p>
                <p className="text-xs text-gray-500">
                  {t.type}
                </p>
              </div>

              <div className="flex items-center gap-4">
                <span
                  className={
                    t.type === "income"
                      ? "text-green-400 font-medium"
                      : "text-red-400 font-medium"
                  }
                >
                  ₹{t.amount}
                </span>

                <button
                  onClick={() => del(t._id)}
                  className="text-gray-500 hover:text-red-400 text-sm"
                >
                  Delete
                </button>
              </div>

            </div>
          ))}

        </div>

      </div>
    </div>
  );
}