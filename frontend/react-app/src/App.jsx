import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Navbar from "./components/Navbar";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import SpecialtiesPage from "./pages/SpecialtiesPage";
import DoctorsPage from "./pages/DoctorsPage";
import BookAppointmentPage from "./pages/BookAppointmentPage";
import MyAppointmentsPage from "./pages/MyAppointmentsPage";
import SummaryPage from "./pages/SummaryPage";
import { isLoggedIn } from "./util/auth";

function PrivateRoute({ children }) {
  return isLoggedIn() ? children : <Navigate to="/login" />;
}

function App() {
  return (
    <BrowserRouter>
      <div style={{ background: "#f5f7fa", minHeight: "100vh" }}>
        <Navbar />
        <Routes>
          <Route path="/" element={<Navigate to="/specialties" />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/specialties" element={<PrivateRoute><SpecialtiesPage /></PrivateRoute>} />
          <Route path="/doctors" element={<PrivateRoute><DoctorsPage /></PrivateRoute>} />
          <Route path="/book" element={<PrivateRoute><BookAppointmentPage /></PrivateRoute>} />
          <Route path="/my-appointments" element={<PrivateRoute><MyAppointmentsPage /></PrivateRoute>} />
          <Route path="/summary" element={<PrivateRoute><SummaryPage /></PrivateRoute>} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
