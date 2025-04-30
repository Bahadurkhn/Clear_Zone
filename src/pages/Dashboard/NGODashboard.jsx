import React, { useState } from "react";
import "./NGODashboard.css";

const NGODashboard = () => {
  const [statusFilter, setStatusFilter] = useState("All");
  const [urgencyFilter, setUrgencyFilter] = useState("All");

  // dummy data
  const stats = {
    pending: 33,
    resolved: 1,
    total: 34,
  };

  const reports = [
    {
      type: "plastic",
      urgency: "medium",
      status: "Approved",
      location: "abcd",
    },
    {
      type: "organic",
      urgency: "medium",
      status: "Pending",
      location: "dnm c",
    },
    // …more rows
  ];

  const filtered = reports.filter(
    (r) =>
      (statusFilter === "All" || r.status === statusFilter) &&
      (urgencyFilter === "All" || r.urgency === urgencyFilter)
  );

  return (
    <div className="ngo-dashboard">
      <header className="page-header">
        <h1>NGO Dashboard</h1>
        <p>Manage and act on waste reports efficiently.</p>
      </header>

      <div className="stats-cards">
        <div className="card">
          <span className="label">Pending Reports</span>
          <span className="value">{stats.pending}</span>
        </div>
        <div className="card">
          <span className="label">Resolved Reports</span>
          <span className="value">{stats.resolved}</span>
        </div>
        <div className="card">
          <span className="label">Total Reports</span>
          <span className="value">{stats.total}</span>
        </div>
      </div>

      <div className="main-panels">
        <div className="panel map-panel">
          <div className="panel-heading">Active Reports Map</div>
          <div className="map-placeholder">[Map Placeholder]</div>
        </div>
        <div className="panel progress-panel">
          <div className="panel-heading">Weekly Collection Target</div>
          <div className="progress-bar">
            <div
              className="filled"
              style={{ width: `${(stats.pending / 20) * 100}%` }}
            >{`${Math.round((stats.pending / 20) * 100)}%`}</div>
          </div>
          <div className="progress-text">
            {`${stats.pending} of 20 reports collected.`}
          </div>
        </div>
      </div>

      <div className="filters">
        <label>
          Filter by Status:
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
          >
            <option>All</option>
            <option>Pending</option>
            <option>Approved</option>
            <option>Resolved</option>
          </select>
        </label>
        <label>
          Filter by Urgency:
          <select
            value={urgencyFilter}
            onChange={(e) => setUrgencyFilter(e.target.value)}
          >
            <option>All</option>
            <option>low</option>
            <option>medium</option>
            <option>high</option>
          </select>
        </label>
      </div>

      <table className="reports-table">
        <thead>
          <tr>
            <th>Type</th>
            <th>Urgency</th>
            <th>Status</th>
            <th>Location</th>
          </tr>
        </thead>
        <tbody>
          {filtered.map((r, i) => (
            <tr key={i}>
              <td>{r.type}</td>
              <td>{r.urgency}</td>
              <td>{r.status}</td>
              <td>{r.location}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default NGODashboard;
