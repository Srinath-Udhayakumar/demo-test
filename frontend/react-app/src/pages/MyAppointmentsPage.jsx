import { useEffect, useState } from "react";
import API from "../services/api";

const STATUS_COLORS = {
  CONFIRMED: "#1a73e8",
  COMPLETED: "green",
  CANCELLED: "red",
  NO_SHOW: "orange",
};

function MyAppointmentsPage() {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchAppointments = () => {
    API.get("/api/appointments/my")
      .then((res) => setAppointments(res.data))
      .catch(() => alert("Failed to load appointments"))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    fetchAppointments();
  }, []);

  const updateStatus = async (id, status) => {
    try {
      await API.put(`/api/appointments/${id}/status`, { status });
      fetchAppointments();
    } catch {
      alert("Failed to update status");
    }
  };

  if (loading) return <p style={{ padding: "24px" }}>Loading appointments...</p>;

  return (
    <div style={styles.container}>
      <h2>My Appointments</h2>
      {appointments.length === 0 ? (
        <p>No appointments yet. <a href="/specialties">Book one now</a></p>
      ) : (
        <div>
          {appointments.map((a) => (
            <div key={a.id} style={styles.card}>
              <div style={styles.header}>
                <div>
                  <h3 style={styles.doctorName}>{a.doctorName}</h3>
                  <p style={styles.specialty}>{a.specialtyName}</p>
                </div>
                <div style={{ textAlign: "right" }}>
                  <span style={styles.modeBadge(a.mode)}>{a.mode}</span>
                  <div style={{ ...styles.statusBadge, color: STATUS_COLORS[a.status] || "#333" }}>
                    {a.status}
                  </div>
                </div>
              </div>
              <div style={styles.details}>
                <span>📅 {a.appointmentDate} at {a.appointmentTime}</span>
                <span>₹{a.consultationFee}</span>
              </div>
              {a.videoLink && (
                <p style={{ fontSize: "13px" }}>
                  🔗 <a href={a.videoLink} target="_blank" rel="noreferrer">Join Video Call</a>
                </p>
              )}
              {a.notes && <p style={{ fontSize: "13px", color: "#666" }}>Note: {a.notes}</p>}
              {a.status === "CONFIRMED" && (
                <div style={styles.actions}>
                  <button style={styles.cancelBtn} onClick={() => updateStatus(a.id, "CANCELLED")}>
                    Cancel
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

const styles = {
  container: { padding: "24px", maxWidth: "800px", margin: "0 auto" },
  card: { background: "white", border: "1px solid #e0e0e0", borderRadius: "8px", padding: "20px", marginBottom: "16px" },
  header: { display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "10px" },
  doctorName: { margin: "0 0 4px 0", fontSize: "16px" },
  specialty: { color: "#666", fontSize: "13px", margin: 0 },
  modeBadge: (mode) => ({
    display: "inline-block",
    padding: "2px 8px",
    borderRadius: "10px",
    fontSize: "11px",
    fontWeight: "bold",
    background: mode === "ONLINE" ? "#e8f4fd" : "#fef3e8",
    color: mode === "ONLINE" ? "#1a73e8" : "#e65100",
  }),
  statusBadge: { fontSize: "13px", fontWeight: "500", marginTop: "4px" },
  details: { display: "flex", gap: "20px", fontSize: "14px", marginBottom: "8px", color: "#333" },
  actions: { marginTop: "10px", display: "flex", gap: "8px" },
  cancelBtn: { padding: "6px 14px", background: "white", border: "1px solid red", color: "red", borderRadius: "4px", cursor: "pointer", fontSize: "13px" },
};

export default MyAppointmentsPage;
