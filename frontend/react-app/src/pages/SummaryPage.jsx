import { useState, useEffect } from "react";
import API from "../services/api";

function SummaryPage() {
  const [date, setDate] = useState(new Date().toISOString().split("T")[0]);
  const [summary, setSummary] = useState(null);
  const [loading, setLoading] = useState(false);
  const [allAppointments, setAllAppointments] = useState([]);

  const fetchSummary = async (d) => {
    setLoading(true);
    try {
      const res = await API.get(`/api/summary/daily?date=${d}`);
      setSummary(res.data);
    } catch {
      alert("Failed to fetch summary");
    } finally {
      setLoading(false);
    }
  };

  const fetchAll = async () => {
    try {
      const res = await API.get("/api/appointments");
      setAllAppointments(res.data);
    } catch {
      console.error("Failed to load all appointments");
    }
  };

  useEffect(() => {
    fetchSummary(date);
    fetchAll();
  }, []);

  const handleDateChange = (e) => {
    setDate(e.target.value);
    fetchSummary(e.target.value);
  };

  const updateStatus = async (id, status) => {
    try {
      await API.put(`/api/appointments/${id}/status`, { status });
      fetchAll();
      fetchSummary(date);
    } catch {
      alert("Failed to update");
    }
  };

  return (
    <div style={styles.container}>
      <h2>Admin Dashboard</h2>

      <div style={styles.section}>
        <h3>Daily Summary</h3>
        <div style={styles.dateRow}>
          <input type="date" value={date} onChange={handleDateChange} style={styles.input} />
          <button style={styles.btn} onClick={() => fetchSummary(date)}>Refresh</button>
        </div>

        {loading ? (
          <p>Loading...</p>
        ) : summary ? (
          <div style={styles.summaryGrid}>
            <div style={styles.summaryCard}>
              <div style={styles.summaryNum}>{summary.totalAppointments}</div>
              <div style={styles.summaryLabel}>Total Appointments</div>
            </div>
            <div style={styles.summaryCard}>
              <div style={styles.summaryNum}>₹{summary.totalRevenue.toFixed(2)}</div>
              <div style={styles.summaryLabel}>Total Revenue</div>
            </div>
            <div style={styles.summaryCard}>
              <div style={styles.summaryNum}>{summary.appointmentsByMode?.ONLINE || 0}</div>
              <div style={styles.summaryLabel}>Online</div>
            </div>
            <div style={styles.summaryCard}>
              <div style={styles.summaryNum}>{summary.appointmentsByMode?.OFFLINE || 0}</div>
              <div style={styles.summaryLabel}>Offline</div>
            </div>
          </div>
        ) : null}

        {summary && summary.appointmentsBySpecialty && Object.keys(summary.appointmentsBySpecialty).length > 0 && (
          <div style={{ marginTop: "16px" }}>
            <h4>By Specialty</h4>
            <table style={styles.table}>
              <thead>
                <tr>
                  <th>Specialty</th>
                  <th>Appointments</th>
                </tr>
              </thead>
              <tbody>
                {Object.entries(summary.appointmentsBySpecialty).map(([name, count]) => (
                  <tr key={name}>
                    <td>{name}</td>
                    <td>{count}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      <div style={styles.section}>
        <h3>All Appointments</h3>
        {allAppointments.length === 0 ? (
          <p>No appointments yet.</p>
        ) : (
          <table style={styles.table}>
            <thead>
              <tr>
                <th>Patient</th>
                <th>Doctor</th>
                <th>Specialty</th>
                <th>Date</th>
                <th>Time</th>
                <th>Mode</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {allAppointments.map((a) => (
                <tr key={a.id}>
                  <td>{a.patientName}</td>
                  <td>{a.doctorName}</td>
                  <td>{a.specialtyName}</td>
                  <td>{a.appointmentDate}</td>
                  <td>{a.appointmentTime}</td>
                  <td>{a.mode}</td>
                  <td style={{ color: a.status === "CONFIRMED" ? "#1a73e8" : a.status === "COMPLETED" ? "green" : "red" }}>
                    {a.status}
                  </td>
                  <td>
                    {a.status === "CONFIRMED" && (
                      <div style={{ display: "flex", gap: "4px" }}>
                        <button style={styles.actionBtn("green")} onClick={() => updateStatus(a.id, "COMPLETED")}>Done</button>
                        <button style={styles.actionBtn("orange")} onClick={() => updateStatus(a.id, "NO_SHOW")}>No-Show</button>
                        <button style={styles.actionBtn("red")} onClick={() => updateStatus(a.id, "CANCELLED")}>Cancel</button>
                      </div>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}

const styles = {
  container: { padding: "24px", maxWidth: "1100px", margin: "0 auto" },
  section: { background: "white", border: "1px solid #e0e0e0", borderRadius: "8px", padding: "20px", marginBottom: "20px" },
  dateRow: { display: "flex", gap: "10px", marginBottom: "16px", alignItems: "center" },
  input: { padding: "8px", border: "1px solid #ddd", borderRadius: "4px" },
  btn: { padding: "8px 16px", background: "#1a73e8", color: "white", border: "none", borderRadius: "4px", cursor: "pointer" },
  summaryGrid: { display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "12px" },
  summaryCard: { background: "#f5f8ff", borderRadius: "8px", padding: "16px", textAlign: "center" },
  summaryNum: { fontSize: "28px", fontWeight: "bold", color: "#1a73e8" },
  summaryLabel: { fontSize: "13px", color: "#666", marginTop: "4px" },
  table: { width: "100%", borderCollapse: "collapse", fontSize: "13px" },
  actionBtn: (color) => ({
    padding: "3px 8px",
    background: "white",
    border: `1px solid ${color}`,
    color: color,
    borderRadius: "3px",
    cursor: "pointer",
    fontSize: "12px",
  }),
};

export default SummaryPage;
