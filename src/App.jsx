import React, { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import { AuthProvider } from "./components/AuthContext/AuthContext";
import Navbar from "./components/Navbar/Navbar";
import Sidebar from "./components/Sidebar/Sidebar";
import Login from "./components/Login/Login";
import Leaderboard from "./pages/Leaderboard/Leaderboard";
import Notification from "./pages/Notification/Notification";
import ProtectedRoute from "./components/ProtectedRoute/ProtectedRoute";
import NGODashboard from "./pages/Dashboard/NGODashboard";
import NGOProfile from "./pages/Profile/NGOProfile";
import Unauthorized from "./components/Error/Unauthorized";
import NgoPasswordChange from "./pages/Profile/NgoPasswordChange";
import UserProfile from "./pages/Profile/UserProfile";
import UserDashboard from "./pages/Dashboard/UserDashboard";
import Report_Management from "./pages/Report_Management/Report_Management";
import History from "./pages/History/History";
import Home from "./pages/Home/Home";
import Footer from "./components/Footer/Footer";
import ReportWaste from "./pages/ReportWaste/ReportWaste";

function App() {
  // Scroll to top on route change
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <AuthProvider>
      <Router>
        <div className="app-container">
          <Navbar />
          <div className="main-content">
            <Sidebar />
            <div className="page-content">
              <Routes>
                {/* Render Home directly at both / and /home */}
                <Route path="/" element={<Home />} />
                <Route path="/home" element={<Home />} />

                {/* Public Routes */}
                <Route path="/login" element={<Login />} />

                {/* Protected Routes */}
                <Route
                  path="/UserProfile"
                  element={
                    <ProtectedRoute allowedRoles={["user", "ngo"]}>
                      <UserProfile />
                    </ProtectedRoute>
                  }
                />
                {/* Keep all your other routes exactly as before */}
                <Route path="/user-dashboard" element={<UserDashboard />} />
                <Route path="/leaderboard" element={<Leaderboard />} />
                <Route path="/notifications" element={<Notification />} />
                <Route path="/ngo-profile" element={<NGOProfile />} />
                <Route path="/history" element={<History />} />
                <Route
                  path="/report-management"
                  element={<Report_Management />}
                />
                <Route path="/report-waste" element={<ReportWaste />} />
                <Route path="/unauthorized" element={<Unauthorized />} />
                <Route
                  path="/NgoPasswordChange"
                  element={<NgoPasswordChange />}
                />
                <Route path="/NGODashboard" element={<NGODashboard />} />
              </Routes>
            </div>
          </div>
          <Leaderboard />
          <UserProfile />
          <Login />
          <Notification />
          <History />
          <Footer />
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
