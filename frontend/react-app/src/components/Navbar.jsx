import { Link, useNavigate } from "react-router-dom";
import { getUser, isLoggedIn, logout } from "../util/auth";

function Navbar() {
  const navigate = useNavigate();
  const user = getUser();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <nav style={styles.nav}>
      <div style={styles.brand}>
        <Link to="/" style={styles.brandLink}>MediBook</Link>
      </div>
      <div style={styles.links}>
        {isLoggedIn() ? (
          <>
            <Link to="/specialties" style={styles.link}>Specialties</Link>
            <Link to="/doctors" style={styles.link}>Doctors</Link>
            <Link to="/my-appointments" style={styles.link}>My Appointments</Link>
            {user && user.role === "ADMIN" && (
              <Link to="/summary" style={styles.link}>Summary</Link>
            )}
            <span style={styles.userInfo}>Hello, {user && user.name}</span>
            <button onClick={handleLogout} style={styles.logoutBtn}>Logout</button>
          </>
        ) : (
          <>
            <Link to="/login" style={styles.link}>Login</Link>
            <Link to="/register" style={styles.link}>Register</Link>
          </>
        )}
      </div>
    </nav>
  );
}

const styles = {
  nav: {
    background: "#1a73e8",
    padding: "12px 24px",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
  brand: {},
  brandLink: {
    color: "white",
    fontWeight: "bold",
    fontSize: "20px",
    textDecoration: "none",
  },
  links: {
    display: "flex",
    alignItems: "center",
    gap: "16px",
  },
  link: {
    color: "white",
    textDecoration: "none",
    fontSize: "14px",
  },
  userInfo: {
    color: "#d0e8ff",
    fontSize: "14px",
  },
  logoutBtn: {
    background: "white",
    color: "#1a73e8",
    border: "none",
    padding: "6px 14px",
    borderRadius: "4px",
    cursor: "pointer",
    fontSize: "14px",
  },
};

export default Navbar;
