import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import RoleSelection from "./pages/RoleSelection";
import Predict from "./pages/predict";
import UserHome from "./pages/UserHome";
import Login from "./pages/login";
import Signup from "./pages/signup";
import Dashboard from "./pages/dashboard"; // ✅ make sure this file exists
import Blogs from "./pages/Blog";
import WriteBlog from "./pages/WriteBlog";
import NewsPage from "./pages/NewsPage";
import History from "./pages/History";
import NewsSymptoms from "./pages/NewsSymptoms";
import NewsTrending from "./pages/NewsTrending";
import DoctorLogin from "./pages/doctor/DoctorLogin";
import DoctorSignup from "./pages/doctor/DoctorSignup";
import DoctorHome from "./pages/doctor/DoctorHome";
import DoctorDashboard from "./pages/doctor/DoctorDashboard";
import PendingAppointments from "./pages/doctor/PendingAppointments";
import ApprovedAppointments from "./pages/doctor/ApprovedAppointments";
import GetDoctors from "./pages/GetDoctors";
import GetAppointment from "./pages/GetAppointment";




const PrivateRoute = ({ element }) => {
  const isAuthenticated = localStorage.getItem("token");
  return isAuthenticated ? element : <Navigate to="/login" />;
};

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<RoleSelection />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/predict" element={<PrivateRoute element={<Predict />} />} />
        <Route path="/dashboard" element={<PrivateRoute element={<Dashboard />} />} />
        <Route path="/blogs" element={<Blogs />} />
        <Route path="/write-blog" element={<WriteBlog />} />
        <Route path="/news" element={<PrivateRoute element={<NewsPage />} />} />
        <Route path="/history" element={<PrivateRoute element={<History />} />} />
        <Route path="/news/symptoms" element={<PrivateRoute element={<NewsSymptoms />} />} />
        <Route path="/news/trending" element={<PrivateRoute element={<NewsTrending />} />} />
        <Route path="/doctor/login" element={<DoctorLogin />} />
        <Route path="/doctor/signup" element={<DoctorSignup />} />
        <Route path="/user-home" element={<UserHome />} />
        <Route path="/doctor-home" element={<DoctorHome />} />
        <Route path="/doctor/dashboard" element={<DoctorDashboard />} />
        <Route path="/doctor/pending-appointments" element={<PendingAppointments />} />
        <Route path="/doctor/appointments/upcoming" element={<ApprovedAppointments />} />
        <Route path="/get-doctors" element={<GetDoctors />} />
        <Route path="/get-appointment/:doctorId" element={<GetAppointment />} />
      </Routes>
    </Router>
  );
}


export default App;
