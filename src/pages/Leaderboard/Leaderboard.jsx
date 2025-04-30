import React, { useState } from "react";
import { FaTimes, FaCheck, FaSearch } from "react-icons/fa";
import "./Leaderboard.css";

const Leaderboard = () => {
  const [reports, setReports] = useState([
    {
      id: 1,
      user: "Malgames H.radio",
      score: 240,
      email: "mhzxzh6114@gmail.com",
      status: "pending",
      reports: 34,
    },
    {
      id: 2,
      user: "EcoWarrior",
      score: 180,
      email: "eco@example.com",
      status: "completed",
      reports: 22,
    },
    {
      id: 3,
      user: "GreenHero",
      score: 150,
      email: "green@example.com",
      status: "pending",
      reports: 15,
    },
  ]);

  const [searchTerm, setSearchTerm] = useState("");

  const filteredReports = reports.filter(
    (report) =>
      report.user.toLowerCase().includes(searchTerm.toLowerCase()) ||
      report.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleRemoveReport = (id) => {
    setReports(reports.filter((report) => report.id !== id));
  };

  const handleMarkComplete = (id) => {
    setReports(
      reports.map((report) =>
        report.id === id ? { ...report, status: "completed" } : report
      )
    );
  };

  return (
    <div className="leaderboard-container">
      <h2>Cleanup Leaderboard</h2>

      {/* Search Bar Added Here */}
      <div className="search-container">
        <div className="search-input">
          <FaSearch className="search-icon" />
          <input
            type="text"
            placeholder="Search users..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      <div className="stats-summary">
        <div className="stat-card">
          <h3>Total Participants</h3>
          <p>{reports.length}</p>
        </div>
        <div className="stat-card">
          <h3>Active Reports</h3>
          <p>{reports.filter((r) => r.status === "pending").length}</p>
        </div>
        <div className="stat-card highlight">
          <h3>Top Score</h3>
          <p>{Math.max(...reports.map((r) => r.score))}</p>
        </div>
      </div>

      <table className="leaderboard-table">
        <thead>
          <tr>
            <th>Rank</th>
            <th>User</th>
            <th>Score</th>
            <th>Email</th>
            <th>Reports</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredReports
            .sort((a, b) => b.score - a.score)
            .map((report, index) => (
              <tr key={report.id} className={report.status}>
                <td>{index + 1}</td>
                <td>{report.user}</td>
                <td>{report.score}</td>
                <td>{report.email}</td>
                <td>{report.reports}</td>
                <td>
                  <span className={`status-badge ${report.status}`}>
                    {report.status}
                  </span>
                </td>
                <td>
                  {report.status === "pending" && (
                    <button
                      onClick={() => handleMarkComplete(report.id)}
                      className="action-btn complete"
                      title="Mark as completed"
                    >
                      <FaCheck />
                    </button>
                  )}
                  <button
                    onClick={() => handleRemoveReport(report.id)}
                    className="action-btn remove"
                    title="Remove entry"
                  >
                    <FaTimes />
                  </button>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
};

export default Leaderboard;
