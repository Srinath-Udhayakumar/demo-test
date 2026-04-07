import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import API from "../services/api";
import { setToken, setUser } from "../util/auth";

function LoginPage() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const res = await API.post("/api/auth/login", form);
      setToken(res.data.token);
      setUser({ name: res.data.name, email: res.data.email, role: res.data.role });
      navigate("/specialties");
    } catch (err) {
      setError(err.response?.data?.error || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h2 style={styles.title}>Login</h2>
        {error && <p style={styles.error}>{error}</p>}
        <form onSubmit={handleSubmit}>
          <div style={styles.field}>
            <label>Email</label>
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              style={styles.input}
              required
            />
          </div>
          <div style={styles.field}>
            <label>Password</label>
            <input
              type="password"
              name="password"
              value={form.password}
              onChange={handleChange}
              style={styles.input}
              required
            />
          </div>
          <button type="submit" style={styles.btn} disabled={loading}>
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>
        <p style={{ marginTop: "12px", textAlign: "center" }}>
          No account? <Link to="/register">Register</Link>
        </p>
        <p style={{ fontSize: "12px", color: "#888", textAlign: "center", marginTop: "8px" }}>
          Demo: patient@clinic.com / patient123 | admin@clinic.com / admin123
        </p>
      </div>
    </div>
  );
}

const styles = {
  container: { display: "flex", justifyContent: "center", alignItems: "center", height: "80vh" },
  card: { background: "white", padding: "32px", borderRadius: "8px", boxShadow: "0 2px 8px rgba(0,0,0,0.1)", width: "360px" },
  title: { marginBottom: "20px", textAlign: "center" },
  field: { marginBottom: "14px", display: "flex", flexDirection: "column", gap: "4px" },
  input: { padding: "8px", border: "1px solid #ddd", borderRadius: "4px", fontSize: "14px" },
  btn: { width: "100%", padding: "10px", background: "#1a73e8", color: "white", border: "none", borderRadius: "4px", cursor: "pointer", fontSize: "15px" },
  error: { color: "red", marginBottom: "12px", fontSize: "14px" },
};

export default LoginPage;
