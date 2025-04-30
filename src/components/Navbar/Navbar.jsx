import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FiUser, FiLogOut } from "react-icons/fi";
import { AuthContext } from "../AuthContext/AuthContext";
import "./Navbar.css";

function Navbar() {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleAuthAction = () => {
    user ? logout() : navigate("/login");
  };

  const handleProfileClick = () => {
    user
      ? navigate(user.role === "ngo" ? "/ngo-profile" : "/user-profile")
      : navigate("/login");
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        {/* Link to home */}
        <Link to="/" className="navbar-logo">
          ClearZone
        </Link>

        <div className="nav-menu">
          {/* Keep all navigation links */}
          <Link to="/" className="nav-link">
            Home
          </Link>
          <Link to="/user-dashboard" className="nav-link">
            User Dashboard
          </Link>
          <Link to="/UserProfile" className="nav-link">
            Profile
          </Link>
          <Link to="/leaderboard" className="nav-link">
            Leaderboard
          </Link>
          <Link to="/ngo-profile" className="nav-link">
            NGO Profile
          </Link>
          <Link to="/report-management" className="nav-link">
            Report Management
          </Link>
          <Link to="/report-waste" className="nav-link">
            Report Waste
          </Link>
          <Link to="/notifications" className="nav-link">
            Notifications
          </Link>
          <Link to="/history" className="nav-link">
            History
          </Link>

          {user?.role === "ngo" && (
            <Link to="/NGODashboard" className="nav-link">
              NGO Dashboard
            </Link>
          )}

          <div className="auth-section">
            {user ? (
              <>
                <button className="auth-btn" onClick={handleProfileClick}>
                  <FiUser className="icon" />
                  <span>{user.email || "Profile"}</span>
                </button>
                <button className="auth-btn" onClick={handleAuthAction}>
                  <FiLogOut className="icon" />
                  <span>Logout</span>
                </button>
              </>
            ) : (
              <button className="auth-btn" onClick={handleAuthAction}>
                <FiUser className="icon" />
                <span>Login</span>
              </button>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
