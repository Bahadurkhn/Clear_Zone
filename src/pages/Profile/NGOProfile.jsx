import React, { useState } from "react";
import "./NGOProfile.css";

const NGOProfile = () => {
  const [profile, setProfile] = useState({
    name: "Green Earth Initiative",
    email: "contact@greenearth.org",
    phone: "+1 (555) 123-4567",
    reportsHandled: 247,
    wasteCollected: "1,250 kg",
    feedback: "Excellent",
    activeCases: 32,
    wasteTypes: "Plastic, Organic, E-Waste, Metal",
  });

  const [isEditing, setIsEditing] = useState(false);
  const [passwordInput, setPasswordInput] = useState("");
  const [authError, setAuthError] = useState("");
  const [showModal, setShowModal] = useState(false);

  const handleEditClick = () => {
    setShowModal(true); // Open password modal
  };

  const handlePasswordSubmit = (e) => {
    e.preventDefault();
    if (passwordInput === "ngopass") {
      setIsEditing(true); // allow editing
      setAuthError("");
      setPasswordInput("");
      setShowModal(false); // close modal
    } else {
      setAuthError("Incorrect password. Only authorized NGO members can edit.");
    }
  };

  const handleSaveChanges = () => {
    setIsEditing(false); // just stop editing
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfile((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div className="ngo-profile-container">
      <h1>NGO Profile</h1>

      <div className="profile-section">
        <h2>Organization Info</h2>

        <div className="info-item">
          <label>Name:</label>
          {isEditing ? (
            <input
              type="text"
              name="name"
              value={profile.name}
              onChange={handleChange}
            />
          ) : (
            <span>{profile.name}</span>
          )}
        </div>

        <div className="info-item">
          <label>Email:</label>
          {isEditing ? (
            <input
              type="email"
              name="email"
              value={profile.email}
              onChange={handleChange}
            />
          ) : (
            <span>{profile.email}</span>
          )}
        </div>

        <div className="info-item">
          <label>Phone:</label>
          {isEditing ? (
            <input
              type="tel"
              name="phone"
              value={profile.phone}
              onChange={handleChange}
            />
          ) : (
            <span>{profile.phone}</span>
          )}
        </div>
      </div>

      <div className="profile-section">
        <h2>Waste Management Stats</h2>

        <div className="stats-grid">
          <div className="stat-item">
            <label>Total Reports Handled:</label>
            <span>{profile.reportsHandled}</span>
          </div>

          <div className="stat-item">
            <label>Total Waste Collected:</label>
            <span>{profile.wasteCollected}</span>
          </div>

          <div className="stat-item">
            <label>User Feedback:</label>
            {isEditing ? (
              <select
                name="feedback"
                value={profile.feedback}
                onChange={handleChange}
              >
                <option>Excellent</option>
                <option>Good</option>
                <option>Average</option>
                <option>Poor</option>
              </select>
            ) : (
              <span>{profile.feedback}</span>
            )}
          </div>

          <div className="stat-item">
            <label>Active Cases:</label>
            <span>{profile.activeCases}</span>
          </div>

          <div className="stat-item">
            <label>Types of Waste Handled:</label>
            {isEditing ? (
              <input
                type="text"
                name="wasteTypes"
                value={profile.wasteTypes}
                onChange={handleChange}
              />
            ) : (
              <span>{profile.wasteTypes}</span>
            )}
          </div>
        </div>
      </div>

      {!isEditing ? (
        <button className="edit-btn" onClick={handleEditClick}>
          Edit Profile
        </button>
      ) : (
        <button className="save-btn" onClick={handleSaveChanges}>
          Save Changes
        </button>
      )}

      {/* Modal Section */}
      {showModal && (
        <div className="modal">
          <div className="modal-content">
            <span className="close" onClick={() => setShowModal(false)}>
              &times;
            </span>
            <h3>Enter NGO Password</h3>
            <form onSubmit={handlePasswordSubmit}>
              <input
                type="password"
                value={passwordInput}
                onChange={(e) => setPasswordInput(e.target.value)}
                placeholder="Enter password"
                required
              />
              {authError && <div className="error">{authError}</div>}
              <button type="submit">Submit</button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default NGOProfile;
