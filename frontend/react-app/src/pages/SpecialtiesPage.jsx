import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../services/api";

function SpecialtiesPage() {
  const navigate = useNavigate();
  const [specialties, setSpecialties] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    API.get("/api/specialties")
      .then((res) => setSpecialties(res.data))
      .catch(() => alert("Failed to load specialties"))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <p style={{ padding: "24px" }}>Loading specialties...</p>;

  return (
    <div style={styles.container}>
      <h2>Browse Specialties</h2>
      <p style={{ color: "#555", marginBottom: "20px" }}>Select a specialty to find available doctors</p>
      <div style={styles.grid}>
        {specialties.map((s) => (
          <div
            key={s.id}
            style={styles.card}
            onClick={() => navigate(`/doctors?specialtyId=${s.id}&specialtyName=${encodeURIComponent(s.name)}`)}
          >
            <h3 style={styles.cardTitle}>{s.name}</h3>
            <p style={styles.cardDesc}>{s.description}</p>
            <button style={styles.viewBtn}>View Doctors →</button>
          </div>
        ))}
      </div>
    </div>
  );
}

const styles = {
  container: { padding: "24px", maxWidth: "900px", margin: "0 auto" },
  grid: { display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(240px, 1fr))", gap: "16px" },
  card: {
    background: "white",
    border: "1px solid #e0e0e0",
    borderRadius: "8px",
    padding: "20px",
    cursor: "pointer",
    transition: "box-shadow 0.2s",
  },
  cardTitle: { margin: "0 0 8px 0", color: "#1a73e8" },
  cardDesc: { color: "#666", fontSize: "14px", marginBottom: "12px" },
  viewBtn: { background: "none", border: "none", color: "#1a73e8", cursor: "pointer", padding: "0", fontSize: "14px" },
};

export default SpecialtiesPage;
