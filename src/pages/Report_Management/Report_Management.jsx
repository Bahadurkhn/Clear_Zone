import React from "react";
import "./Report_Management.css";
import { MapContainer, TileLayer } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import WasteImg from "../../assets/Repor_Waste.PNG"; // Import image (update path accordingly)

const Report_Management = () => {
  return (
    <div className="report-waste-container">
      <h1 className="page-title">Waste Report Management</h1>
      <p className="page-subtitle">
        View and manage individual waste reports efficiently.
      </p>

      <div className="filters">
        <div className="filter-group">
          <label>Filter by Type</label>
          <select>
            <option value="all">All</option>
          </select>
        </div>

        <div className="filter-group">
          <label>Filter by Urgency</label>
          <select>
            <option value="all">All</option>
          </select>
        </div>
      </div>

      <div className="waste-report-card">
        <div className="waste-details">
          <h3>Plastic Waste Report</h3>
          <p>
            <strong>Description:</strong> abcd
          </p>
          <p>
            <strong>Urgency:</strong> Medium
          </p>
          <p>
            <strong>Location:</strong> abcd
          </p>
          <p>
            <strong>User Feedback:</strong> null
          </p>
          <p>
            <strong>Status:</strong> Approved
          </p>
        </div>

        {/* Waste image with the imported image */}
        <div className="waste-image">
          <img src={WasteImg} alt="Waste Report" />
        </div>
      </div>

      <div className="waste-map">
        <MapContainer
          center={[24.8607, 67.0011]}
          zoom={12}
          style={{ height: "400px", width: "100%" }}
        >
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution="&copy; OpenStreetMap contributors"
          />
        </MapContainer>
      </div>
    </div>
  );
};

export default Report_Management;
