import React, { useState, useContext } from "react";
import { AuthContext } from "../.././components/AuthContext/AuthContext";
import "./NgoPasswordChange.css";

function NgoPasswordChange() {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");
  const { ngoPassword, updateNgoPassword } = useContext(AuthContext);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (currentPassword !== ngoPassword) {
      setMessage("Current password is incorrect");
      return;
    }

    if (newPassword !== confirmPassword) {
      setMessage("New passwords do not match");
      return;
    }

    updateNgoPassword(newPassword);
    setMessage("Password changed successfully");
    setCurrentPassword("");
    setNewPassword("");
    setConfirmPassword("");
  };

  return (
    <div className="password-change-container">
      <h3>Change NGO Password</h3>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Current Password</label>
          <input
            type="password"
            value={currentPassword}
            onChange={(e) => setCurrentPassword(e.target.value)}
            required
          />
        </div>

        <div className="form-group">
          <label>New Password</label>
          <input
            type="password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            required
          />
        </div>

        <div className="form-group">
          <label>Confirm New Password</label>
          <input
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
        </div>

        {message && <div className="message">{message}</div>}

        <button type="submit" className="change-button">
          Change Password
        </button>
      </form>
    </div>
  );
}

export default NgoPasswordChange;
