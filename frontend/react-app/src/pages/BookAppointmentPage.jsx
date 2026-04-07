import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import API from "../services/api";

function BookAppointmentPage() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const doctorId = searchParams.get("doctorId");

  const [doctor, setDoctor] = useState(null);
  const [slots, setSlots] = useState([]);
  const [form, setForm] = useState({ appointmentDate: "", appointmentTime: "", notes: "" });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!doctorId) return;
    API.get(`/api/doctors/${doctorId}`).then((res) => {
      setDoctor(res.data);
      if (res.data.availableSlots) {
        setSlots(res.data.availableSlots.split(","));
      }
    });
  }, [doctorId]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const res = await API.post("/api/appointments", {
        doctorId: Number(doctorId),
        appointmentDate: form.appointmentDate,
        appointmentTime: form.appointmentTime,
        notes: form.notes,
      });
      setSuccess(res.data);
    } catch (err) {
      setError(err.response?.data?.error || "Booking failed");
    } finally {
      setLoading(false);
    }
  };

  if (!doctorId) return <p style={{ padding: "24px" }}>No doctor selected.</p>;
  if (!doctor) return <p style={{ padding: "24px" }}>Loading doctor info...</p>;

  if (success) {
    return (
      <div style={styles.container}>
        <div style={styles.successCard}>
          <h2 style={{ color: "green" }}>✓ Appointment Confirmed!</h2>
          <p><strong>Doctor:</strong> {success.doctorName}</p>
          <p><strong>Specialty:</strong> {success.specialtyName}</p>
          <p><strong>Date:</strong> {success.appointmentDate}</p>
          <p><strong>Time:</strong> {success.appointmentTime}</p>
          <p><strong>Mode:</strong> {success.mode}</p>
          <p><strong>Fee:</strong> ₹{success.consultationFee}</p>
          {success.videoLink && (
            <p><strong>Video Link:</strong> <a href={success.videoLink} target="_blank" rel="noreferrer">{success.videoLink}</a></p>
          )}
          <button style={styles.btn} onClick={() => navigate("/my-appointments")}>
            View My Appointments
          </button>
        </div>
      </div>
    );
  }

  return (
    <div style={styles.container}>
      <h2>Book Appointment</h2>
      <div style={styles.doctorInfo}>
        <span style={styles.modeBadge(doctor.mode)}>{doctor.mode}</span>
        <h3 style={{ margin: "4px 0" }}>{doctor.name}</h3>
        <p style={{ color: "#666" }}>{doctor.specialtyName} | Fee: ₹{doctor.consultationFee}</p>
      </div>

      {error && <p style={styles.error}>{error}</p>}

      <form onSubmit={handleSubmit} style={styles.form}>
        <div style={styles.field}>
          <label>Date</label>
          <input
            type="date"
            value={form.appointmentDate}
            onChange={(e) => setForm({ ...form, appointmentDate: e.target.value })}
            style={styles.input}
            min={new Date().toISOString().split("T")[0]}
            required
          />
        </div>
        <div style={styles.field}>
          <label>Time Slot</label>
          {slots.length > 0 ? (
            <div style={styles.slotGrid}>
              {slots.map((slot) => (
                <button
                  type="button"
                  key={slot}
                  style={{ ...styles.slotBtn, ...(form.appointmentTime === slot ? styles.activeSlot : {}) }}
                  onClick={() => setForm({ ...form, appointmentTime: slot })}
                >
                  {slot}
                </button>
              ))}
            </div>
          ) : (
            <input
              type="time"
              value={form.appointmentTime}
              onChange={(e) => setForm({ ...form, appointmentTime: e.target.value })}
              style={styles.input}
              required
            />
          )}
        </div>
        <div style={styles.field}>
          <label>Notes (optional)</label>
          <textarea
            value={form.notes}
            onChange={(e) => setForm({ ...form, notes: e.target.value })}
            style={{ ...styles.input, height: "80px" }}
          />
        </div>
        <button
          type="submit"
          style={styles.btn}
          disabled={loading || !form.appointmentTime}
        >
          {loading ? "Booking..." : "Confirm Appointment"}
        </button>
      </form>
    </div>
  );
}

const styles = {
  container: { padding: "24px", maxWidth: "600px", margin: "0 auto" },
  doctorInfo: { background: "white", border: "1px solid #e0e0e0", borderRadius: "8px", padding: "16px", marginBottom: "20px" },
  modeBadge: (mode) => ({
    display: "inline-block",
    padding: "2px 10px",
    borderRadius: "12px",
    fontSize: "11px",
    fontWeight: "bold",
    marginBottom: "4px",
    background: mode === "ONLINE" ? "#e8f4fd" : "#fef3e8",
    color: mode === "ONLINE" ? "#1a73e8" : "#e65100",
  }),
  form: { background: "white", padding: "24px", borderRadius: "8px", border: "1px solid #e0e0e0" },
  field: { marginBottom: "16px", display: "flex", flexDirection: "column", gap: "6px" },
  input: { padding: "8px", border: "1px solid #ddd", borderRadius: "4px", fontSize: "14px" },
  slotGrid: { display: "flex", flexWrap: "wrap", gap: "8px" },
  slotBtn: { padding: "6px 14px", border: "1px solid #ddd", borderRadius: "4px", cursor: "pointer", background: "white", fontSize: "13px" },
  activeSlot: { background: "#1a73e8", color: "white", borderColor: "#1a73e8" },
  btn: { width: "100%", padding: "10px", background: "#1a73e8", color: "white", border: "none", borderRadius: "4px", cursor: "pointer", fontSize: "15px" },
  error: { color: "red", fontSize: "14px", marginBottom: "12px" },
  successCard: { background: "white", padding: "32px", borderRadius: "8px", border: "1px solid #e0e0e0" },
};

export default BookAppointmentPage;
