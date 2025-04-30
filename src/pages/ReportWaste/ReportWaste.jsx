import React, { useState } from "react";
import "./ReportWaste.css";

const ReportWaste = () => {
  const [mapView, setMapView] = useState("street");
  const [formData, setFormData] = useState({
    wasteType: "",
    description: "",
    urgency: "Medium",
    location: "",
    attachment: null,
  });

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: files ? files[0] : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form Data Submitted:", formData);
    alert("Report submitted!");
  };

  return (
    <div className="report-waste-container">
      <h2 className="form-title">Report Waste</h2>
      <form className="waste-form" onSubmit={handleSubmit}>
        <label>
          Waste Type
          <select
            name="wasteType"
            value={formData.wasteType}
            onChange={handleChange}
            required
          >
            <option value="">Select waste type</option>
            <option value="Plastic">Plastic</option>
            <option value="Organic">Organic</option>
            <option value="E-waste">E-waste</option>
          </select>
        </label>

        <label>
          Description
          <textarea
            name="description"
            placeholder="Provide additional details about the waste"
            value={formData.description}
            onChange={handleChange}
          />
        </label>

        <label>
          Urgency Level
          <select
            name="urgency"
            value={formData.urgency}
            onChange={handleChange}
          >
            <option>Low</option>
            <option>Medium</option>
            <option>High</option>
          </select>
        </label>

        <label>
          Location
          <input
            type="text"
            name="location"
            placeholder="Enter your location"
            value={formData.location}
            onChange={handleChange}
          />
        </label>

        <label>
          Attachments
          <input type="file" name="attachment" onChange={handleChange} />
        </label>

        <div className="map-view">
          <label>Map View</label>
          <div className="map-buttons">
            {["STREET", "SATELLITE", "WASTE DENSITY"].map((view) => (
              <button
                type="button"
                key={view}
                className={mapView === view.toLowerCase() ? "active" : ""}
                onClick={() => setMapView(view.toLowerCase())}
              >
                {view}
              </button>
            ))}
          </div>
        </div>

        <button type="submit" className="submit-button">
          Submit Report
        </button>
      </form>
    </div>
  );
};

export default ReportWaste;
