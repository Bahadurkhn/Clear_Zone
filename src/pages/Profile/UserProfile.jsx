import React, { useEffect, useState } from "react";
import "./UserProfile.css";
import { FaFacebookF, FaTwitter, FaLinkedinIn, FaCamera } from "react-icons/fa";

const UserProfile = () => {
  const [userData, setUserData] = useState(null);
  const [editing, setEditing] = useState(false);
  const [profileImage, setProfileImage] = useState(null);
  const [editedName, setEditedName] = useState("");
  const [editedEmail, setEditedEmail] = useState("");
  const [editedPhone, setEditedPhone] = useState("");

  useEffect(() => {
    fetchUserData();
  }, []);

  const fetchUserData = async () => {
    // Fake API
    const data = {
      name: "Khateja",
      email: "khateja@gmail.com",
      phone: "09876543",
      totalReports: 0,
      accuracyScore: 0,
      ranking: "#",
    };
    setUserData(data);
  };

  const handleEditProfile = () => {
    if (editing) {
      // Save updated data
      setUserData({
        ...userData,
        name: editedName,
        email: editedEmail,
        phone: editedPhone,
      });
    } else {
      // Load current data into inputs
      setEditedName(userData.name);
      setEditedEmail(userData.email);
      setEditedPhone(userData.phone);
    }
    setEditing(!editing);
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onloadend = () => {
      setProfileImage(reader.result);
    };
    reader.readAsDataURL(file);
  };

  if (!userData) {
    return <div className="loading">Loading...</div>;
  }

  return (
    <div className="user-profile-container">
      <h2 className="profile-title">User Profile</h2>
      <p className="profile-subtitle">
        View and update your information and achievements.
      </p>

      <div className="profile-card">
        <div className="profile-image-section">
          <div className="profile-image-wrapper">
            <img
              src={profileImage || "https://via.placeholder.com/120"}
              alt="Profile"
              className="profile-image"
            />
            <label className="camera-icon">
              <FaCamera />
              <input
                type="file"
                onChange={handleImageChange}
                accept="image/*"
              />
            </label>
          </div>
        </div>

        <h3>Basic Info</h3>

        {editing ? (
          <div className="edit-fields">
            <input
              type="text"
              value={editedName}
              onChange={(e) => setEditedName(e.target.value)}
            />
            <input
              type="email"
              value={editedEmail}
              onChange={(e) => setEditedEmail(e.target.value)}
            />
            <input
              type="text"
              value={editedPhone}
              onChange={(e) => setEditedPhone(e.target.value)}
            />
          </div>
        ) : (
          <div className="info-fields">
            <p>
              <strong>Name:</strong> {userData.name}
            </p>
            <p>
              <strong>Email:</strong> {userData.email}
            </p>
            <p>
              <strong>Phone:</strong> {userData.phone}
            </p>
          </div>
        )}

        <button className="edit-profile-btn" onClick={handleEditProfile}>
          {editing ? "Save Profile" : "Edit Profile"}
        </button>

        <div className="reporting-stats">
          <div className="stat-box">
            <p className="stat-value">{userData.totalReports}</p>
            <p className="stat-label">Total Reports</p>
          </div>
          <div className="stat-box">
            <p className="stat-value">{userData.accuracyScore}</p>
            <p className="stat-label">Accuracy Score</p>
          </div>
          <div className="stat-box">
            <p className="stat-value">{userData.ranking}</p>
            <p className="stat-label">Ranking</p>
          </div>
        </div>

        <h3>Badges</h3>
        {/* Badges section */}
      </div>

      <div className="achievements-card">
        <h3>Share Achievements</h3>
        <p>Let your friends know about your achievements!</p>
        <div className="social-buttons">
          <a
            href="https://www.facebook.com/sharer/sharer.php?u=https://yourwebsite.com"
            target="_blank"
            rel="noreferrer"
          >
            <button className="facebook-btn">
              <FaFacebookF /> Share on Facebook
            </button>
          </a>

          <a
            href="https://twitter.com/intent/tweet?text=Check+out+my+achievements+on+Clearzone!&url=https://yourwebsite.com"
            target="_blank"
            rel="noreferrer"
          >
            <button className="twitter-btn">
              <FaTwitter /> Share on Twitter
            </button>
          </a>

          <a
            href="https://www.linkedin.com/sharing/share-offsite/?url=https://yourwebsite.com"
            target="_blank"
            rel="noreferrer"
          >
            <button className="linkedin-btn">
              <FaLinkedinIn /> Share on LinkedIn
            </button>
          </a>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
