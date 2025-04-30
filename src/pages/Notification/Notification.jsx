import React, { useState, useEffect } from "react";
import { FaTimes } from "react-icons/fa";
import "./Notification.css";

const Notification = () => {
  const [notifications, setNotifications] = useState([]);
  const [unreadCount, setUnreadCount] = useState(0);

  // Load notifications from localStorage
  useEffect(() => {
    const storedNotifications =
      JSON.parse(localStorage.getItem("notifications")) || [];
    setNotifications(storedNotifications);
    updateUnreadCount(storedNotifications);
  }, []);

  const updateUnreadCount = (notifs) => {
    const count = notifs.filter((n) => !n.read).length;
    setUnreadCount(count);
    // Store the count for the navbar to access
    localStorage.setItem("unreadCount", count);
  };

  const markAsRead = (id) => {
    const updated = notifications.map((n) =>
      n.id === id ? { ...n, read: true } : n
    );
    setNotifications(updated);
    localStorage.setItem("notifications", JSON.stringify(updated));
    updateUnreadCount(updated);
  };

  const removeNotification = (id) => {
    const updated = notifications.filter((n) => n.id !== id);
    setNotifications(updated);
    localStorage.setItem("notifications", JSON.stringify(updated));
    updateUnreadCount(updated);
  };

  // For demo purposes
  const addTestNotification = () => {
    const newNotif = {
      id: Date.now(),
      message: "New waste report needs approval",
      read: false,
      timestamp: new Date().toISOString(),
    };
    const updated = [newNotif, ...notifications];
    setNotifications(updated);
    localStorage.setItem("notifications", JSON.stringify(updated));
    updateUnreadCount(updated);
  };

  return (
    <div className="notification-page">
      <h2>Notifications</h2>

      {notifications.length === 0 ? (
        <p className="no-notifications">No notifications available.</p>
      ) : (
        <div className="notification-list">
          {notifications.map((notification) => (
            <div
              key={notification.id}
              className={`notification-item ${
                notification.read ? "read" : "unread"
              }`}
              onClick={() => markAsRead(notification.id)}
            >
              <div className="notification-content">
                <p>{notification.message}</p>
                <small>
                  {new Date(notification.timestamp).toLocaleString()}
                </small>
              </div>
              <button
                className="close-btn"
                onClick={(e) => {
                  e.stopPropagation();
                  removeNotification(notification.id);
                }}
              >
                <FaTimes />
              </button>
            </div>
          ))}
        </div>
      )}

      <button className="demo-btn" onClick={addTestNotification}>
        Simulate New Notification
      </button>
    </div>
  );
};

export default Notification;
