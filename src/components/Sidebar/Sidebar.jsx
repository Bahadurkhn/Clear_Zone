import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import {
  FiHome,
  FiTrash2,
  FiUser,
  FiAward,
  FiPieChart,
  FiFileText,
  FiBell,
  FiClock,
  FiMenu,
  FiX,
} from "react-icons/fi";
import "./Sidebar.css";

function Sidebar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* Mobile Toggle Button */}
      <button
        className="mobile-sidebar-toggle"
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? <FiX size={24} /> : <FiMenu size={24} />}
      </button>

      {/* Sidebar */}
      <div className={`sidebar ${isOpen ? "open" : ""}`}>
        <div className="sidebar-content">
          <div className="sidebar-header">
            <h3>ClearZone</h3>
          </div>

          <nav className="sidebar-nav">
            <div className="nav-section">
              <h4 className="section-title">DASHBOARD</h4>
              <NavLink
                to="/"
                className="nav-item"
                onClick={() => setIsOpen(false)}
              >
                <FiHome className="nav-icon" />
                <span>Home</span>
              </NavLink>
              <NavLink
                to="/Repor_waste"
                className="nav-item"
                onClick={() => setIsOpen(false)}
              >
                <FiTrash2 className="nav-icon" />
                <span>Repor_Waste</span>
              </NavLink>
            </div>

            <div className="nav-section">
              <h4 className="section-title">NGO</h4>
              <NavLink
                to="/ngo-dashboard"
                className="nav-item"
                onClick={() => setIsOpen(false)}
              >
                <FiPieChart className="nav-icon" />
                <span>Dashboard</span>
              </NavLink>
              <NavLink
                to="/report-management"
                className="nav-item"
                onClick={() => setIsOpen(false)}
              >
                <FiFileText className="nav-icon" />
                <span>Reports</span>
              </NavLink>
            </div>

            <div className="nav-section">
              <h4 className="section-title">USER</h4>
              <NavLink
                to="/profile"
                className="nav-item"
                onClick={() => setIsOpen(false)}
              >
                <FiUser className="nav-icon" />
                <span>Profile</span>
              </NavLink>
              <NavLink
                to="/leaderboard"
                className="nav-item"
                onClick={() => setIsOpen(false)}
              >
                <FiAward className="nav-icon" />
                <span>Leaderboard</span>
              </NavLink>
              <NavLink
                to="/notifications"
                className="nav-item"
                onClick={() => setIsOpen(false)}
              >
                <FiBell className="nav-icon" />
                <span>Notifications</span>
              </NavLink>
              <NavLink
                to="/history"
                className="nav-item"
                onClick={() => setIsOpen(false)}
              >
                <FiClock className="nav-icon" />
                <span>History</span>
              </NavLink>
            </div>
          </nav>
        </div>
      </div>

      {/* Overlay when sidebar is open on mobile */}
      {isOpen && (
        <div className="sidebar-overlay" onClick={() => setIsOpen(false)} />
      )}
    </>
  );
}

export default Sidebar;
