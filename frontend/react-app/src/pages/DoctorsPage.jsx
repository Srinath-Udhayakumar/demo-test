import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import API from "../services/api";

function DoctorsPage() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const specialtyId = searchParams.get("specialtyId");
  const specialtyName = searchParams.get("specialtyName");

  const [doctors, setDoctors] = useState([]);
  const [modeFilter, setModeFilter] = useState("");
  const [loading, setLoading] = useState(true);

  const fetchDoctors = (mode) => {
    setLoading(true);
    let url = "/api/doctors";
    if (specialtyId) {
      url = `/api/doctors/specialty/${specialtyId}`;
      if (mode) url += `?mode=${mode}`;
    } else if (mode) {
      url += `?mode=${mode}`;
    }
    API.get(url)
      .then((res) => setDoctors(res.data))
      .catch(() => alert("Failed to load doctors"))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    fetchDoctors(modeFilter);
  }, [modeFilter, specialtyId]);

  const handleModeChange = (mode) => {
    setModeFilter(mode);
  };

  if (loading) return <p style={{ padding: "24px" }}>Loading doctors...</p>;

  return (
    <div style={styles.container}>
      <h2>{specialtyName ? `Doctors - ${specialtyName}` : "All Doctors"}</h2>
      <div style={styles.filters}>
        <span style={{ marginRight: "10px", fontWeight: "500" }}>Filter by mode:</span>
        {["", "ONLINE", "OFFLINE"].map((m) => (
          <button
            key={m}
            style={{ ...styles.filterBtn, ...(modeFilter === m ? styles.activeFilter : {}) }}
            onClick={() => handleModeChange(m)}
          >
            {m || "All"}
          </button>
        ))}
      </div>
      {doctors.length === 0 ? (
        <p>No doctors found for this filter.</p>
      ) : (
        <div style={styles.grid}>
          {doctors.map((d) => (
            <div key={d.id} style={styles.card}>
              <div style={styles.modeBadge(d.mode)}>{d.mode}</div>
              <h3 style={styles.name}>{d.name}</h3>
              <p style={styles.specialty}>{d.specialtyName}</p>
              <p style={styles.fee}>Fee: ₹{d.consultationFee}</p>
              <p style={{ fontSize: "13px", color: d.available ? "green" : "red" }}>
                {d.available ? "Available" : "Unavailable"}
              </p>
              {d.availableSlots && (
                <p style={{ fontSize: "12px", color: "#666" }}>
                  Slots: {d.availableSlots}
                </p>
              )}
              {d.available && (
                <button
                  style={styles.bookBtn}
                  onClick={() => navigate(`/book?doctorId=${d.id}`)}
                >
                  Book Appointment
                </button>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

const styles = {
  container: { padding: "24px", maxWidth: "1000px", margin: "0 auto" },
  filters: { display: "flex", alignItems: "center", marginBottom: "20px", gap: "8px", flexWrap: "wrap" },
  filterBtn: { padding: "6px 14px", border: "1px solid #ddd", borderRadius: "20px", cursor: "pointer", background: "white", fontSize: "13px" },
  activeFilter: { background: "#1a73e8", color: "white", borderColor: "#1a73e8" },
  grid: { display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))", gap: "16px" },
  card: { background: "white", border: "1px solid #e0e0e0", borderRadius: "8px", padding: "20px", position: "relative" },
  modeBadge: (mode) => ({
    display: "inline-block",
    padding: "2px 10px",
    borderRadius: "12px",
    fontSize: "11px",
    fontWeight: "bold",
    marginBottom: "8px",
    background: mode === "ONLINE" ? "#e8f4fd" : "#fef3e8",
    color: mode === "ONLINE" ? "#1a73e8" : "#e65100",
  }),
  name: { margin: "4px 0", fontSize: "16px" },
  specialty: { color: "#666", fontSize: "13px", margin: "4px 0" },
  fee: { fontSize: "14px", fontWeight: "500", margin: "4px 0" },
  bookBtn: { marginTop: "10px", width: "100%", padding: "8px", background: "#1a73e8", color: "white", border: "none", borderRadius: "4px", cursor: "pointer" },
};

export default DoctorsPage;
