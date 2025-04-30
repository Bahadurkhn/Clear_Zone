import React from "react";
import { useNavigate } from "react-router-dom";
import "./UserDashboard.css";

const UserDashboard = () => {
  const navigate = useNavigate();

  const userStats = {
    score: 420,
    status: "Active",
    reportsSubmitted: 24,
  };

  const reportTrends = {
    weekly: 5,
    monthly: 18,
    yearly: 156,
  };

  const handleReportWaste = () => navigate("/report-waste"); // Ensure this is pointing to the correct route
  const handleViewProfile = () => navigate("/UserProfile"); // Profile route

  return (
    <div className="dashboard-container">
      <header>
        <h1>Clearzone</h1>
      </header>

      <section className="user-section">
        <h2>User Dashboard</h2>
        <p className="welcome-message">Welcome back, EcoWarrior</p>
      </section>

      <div className="dashboard-content">
        <div className="stats-section">
          <h3>Your Stats</h3>
          <ul className="stats-list">
            <li>
              Score <span>{userStats.score}</span>
            </li>
            <li>
              Status <span className="status-active">{userStats.status}</span>
            </li>
            <li>
              Reports Submitted <span>{userStats.reportsSubmitted}</span>
            </li>
          </ul>

          <div className="quick-actions">
            <h3>Quick Actions</h3>
            <div className="action-buttons">
              <button onClick={handleReportWaste} className="report-button">
                Report Waste
              </button>
              <button onClick={handleViewProfile} className="profile-button">
                View Profile
              </button>
            </div>
          </div>
        </div>

        <div className="activity-section">
          <h3>Your Activity</h3>
          <div className="waste-categories">
            <h4>Waste Categories</h4>
            <div className="category-tags">
              <span className="category-tag">Prints</span>
              <span className="category-tag">Deposit</span>
              <span className="category-tag">Hazardous</span>
              <span className="category-tag">General</span>
              <span className="category-tag">E-mails</span>
            </div>
          </div>
        </div>
      </div>

      <div className="trends-section">
        <h3>Reporting Trends</h3>
        <ul className="trends-list">
          <li>
            Weekly Reports: <span>{reportTrends.weekly}</span>
          </li>
          <li>
            Monthly Reports: <span>{reportTrends.monthly}</span>
          </li>
          <li>
            Year-to-Date Reports: <span>{reportTrends.yearly}</span>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default UserDashboard;
