import React, { useState } from "react";
import "./History.css";

const History = () => {
  const [activeTab, setActiveTab] = useState("all");
  const [selectedReport, setSelectedReport] = useState(null);

  // Sample data matching your image
  const reportData = [
    { id: 1, wasteType: "plastic", location: "abcd", status: "express" },
    // ... other data items
  ];

  const filteredReports =
    activeTab === "all"
      ? reportData
      : reportData.filter((report) => report.status === activeTab);

  const toggleDetails = (report) => {
    if (selectedReport && selectedReport.id === report.id) {
      // Clicking the same report's "View Details" closes the panel
      setSelectedReport(null);
    } else {
      // Clicking a different report shows its details
      setSelectedReport(report);
    }
  };

  const closePanel = () => {
    setSelectedReport(null);
  };

  return (
    <div className="history-container">
      <h1>Report History</h1>

      <div className="tabs">
        <button
          className={activeTab === "all" ? "active" : ""}
          onClick={() => setActiveTab("all")}
        >
          All
        </button>
      </div>

      <div className="report-table-container">
        <table className="report-table">
          <thead>
            <tr>
              <th>Waste Type</th>
              <th>Location</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredReports.map((report) => (
              <tr key={report.id}>
                <td>{report.wasteType}</td>
                <td>{report.location}</td>
                <td>
                  <span className={`status-badge ${report.status}`}>
                    {report.status}
                  </span>
                </td>
                <td>
                  <button
                    className={`view-details-btn ${
                      selectedReport?.id === report.id ? "active" : ""
                    }`}
                    onClick={() => toggleDetails(report)}
                  >
                    {selectedReport?.id === report.id
                      ? "Hide Details"
                      : "View Details"}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Details Panel */}
      {selectedReport && (
        <div className="details-panel">
          <div className="panel-header">
            <h3>Report Details</h3>
            <button className="close-panel" onClick={closePanel}>
              &times;
            </button>
          </div>
          <div className="panel-content">
            <div className="detail-row">
              <span className="detail-label">Waste Type:</span>
              <span>{selectedReport.wasteType}</span>
            </div>
            <div className="detail-row">
              <span className="detail-label">Location:</span>
              <span>{selectedReport.location}</span>
            </div>
            <div className="detail-row">
              <span className="detail-label">Status:</span>
              <span className={`status-badge ${selectedReport.status}`}>
                {selectedReport.status}
              </span>
            </div>
            {/* Add more details as needed */}
          </div>
        </div>
      )}
    </div>
  );
};

export default History;
