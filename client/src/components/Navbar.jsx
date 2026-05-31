import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <div style={{
      display: "flex",
      justifyContent: "space-between",
      padding: "15px",
      background: "#111",
      color: "white"
    }}>
      <h2>💰 Expense Tracker</h2>

      <div style={{ display: "flex", gap: "15px" }}>
        <Link to="/" style={{ color: "white" }}>Dashboard</Link>
        <Link to="/login" style={{ color: "white" }}>Login</Link>
      </div>
    </div>
  );
}