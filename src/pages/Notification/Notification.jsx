// import React, { useState, useEffect } from "react";
// import { FaTimes } from "react-icons/fa";
// import "./Notification.css";

// const Notification = () => {
//   const [notifications, setNotifications] = useState([]);
//   const [unreadCount, setUnreadCount] = useState(0);

//   // Load notifications from localStorage
//   useEffect(() => {
//     const storedNotifications =
//       JSON.parse(localStorage.getItem("notifications")) || [];
//     setNotifications(storedNotifications);
//     updateUnreadCount(storedNotifications);
//   }, []);

//   const updateUnreadCount = (notifs) => {
//     const count = notifs.filter((n) => !n.read).length;
//     setUnreadCount(count);
//     // Store the count for the navbar to access
//     localStorage.setItem("unreadCount", count);
//   };

//   const markAsRead = (id) => {
//     const updated = notifications.map((n) =>
//       n.id === id ? { ...n, read: true } : n
//     );
//     setNotifications(updated);
//     localStorage.setItem("notifications", JSON.stringify(updated));
//     updateUnreadCount(updated);
//   };

//   const removeNotification = (id) => {
//     const updated = notifications.filter((n) => n.id !== id);
//     setNotifications(updated);
//     localStorage.setItem("notifications", JSON.stringify(updated));
//     updateUnreadCount(updated);
//   };

//   // For demo purposes
//   const addTestNotification = () => {
//     const newNotif = {
//       id: Date.now(),
//       message: "New waste report needs approval",
//       read: false,
//       timestamp: new Date().toISOString(),
//     };
//     const updated = [newNotif, ...notifications];
//     setNotifications(updated);
//     localStorage.setItem("notifications", JSON.stringify(updated));
//     updateUnreadCount(updated);
//   };

//   return (
//     <div className="notification-page">
//       <h2>Notifications</h2>

//       {notifications.length === 0 ? (
//         <p className="no-notifications">No notifications available.</p>
//       ) : (
//         <div className="notification-list">
//           {notifications.map((notification) => (
//             <div
//               key={notification.id}
//               className={`notification-item ${
//                 notification.read ? "read" : "unread"
//               }`}
//               onClick={() => markAsRead(notification.id)}
//             >
//               <div className="notification-content">
//                 <p>{notification.message}</p>
//                 <small>
//                   {new Date(notification.timestamp).toLocaleString()}
//                 </small>
//               </div>
//               <button
//                 className="close-btn"
//                 onClick={(e) => {
//                   e.stopPropagation();
//                   removeNotification(notification.id);
//                 }}
//               >
//                 <FaTimes />
//               </button>
//             </div>
//           ))}
//         </div>
//       )}

//       <button className="demo-btn" onClick={addTestNotification}>
//         Simulate New Notification
//       </button>
//     </div>
//   );
// };

// export default Notification;


import React, { useState, useEffect } from "react";
import { FaTimes } from "react-icons/fa";
import "./Notification.css";

const Notification = () => {
  const [notifications, setNotifications] = useState([]);
  const [unreadCount, setUnreadCount] = useState(0);

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await fetch("http://localhost:7000/api/notifications", {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });

        const data = await response.json();
        console.log("Fetched notifications response:", data);

        const list = data.notifications || (Array.isArray(data) ? data : []);
        const listWithIds = list.map((n, index) => ({
          ...n,
          // ensure each has a unique fallback id if backend doesn't provide
          id: n.id || n._id || `notif-${index}`,
        }));

        setNotifications(listWithIds);
        updateUnreadCount(listWithIds);
      } catch (error) {
        console.error("Error fetching notifications:", error);
      }
    };

    fetchNotifications();
  }, []);

  const updateUnreadCount = (notifs) => {
    const count = notifs.filter((n) => !n.read).length;
    setUnreadCount(count);
  };

  const markAsRead = async (id) => {
    const updated = notifications.map((n) =>
      n.id === id ? { ...n, read: true } : n
    );
    setNotifications(updated);
    updateUnreadCount(updated);

    try {
      const token = localStorage.getItem("token");
      await fetch(`http://localhost:7000/api/notifications/${id}/mark-read`, {
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });
    } catch (error) {
      console.error("Failed to mark as read on server:", error);
    }
  };

  const removeNotification = async (id) => {
    const updated = notifications.filter((n) => n.id !== id);
    setNotifications(updated);
    updateUnreadCount(updated);

    try {
      const token = localStorage.getItem("token");
      await fetch(`http://localhost:7000/api/notifications/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });
    } catch (error) {
      console.error("Failed to delete notification on server:", error);
    }
  };

  return (
    <div className="notification-page">
      <h2>Notifications ({unreadCount} unread)</h2>

      {notifications.length === 0 ? (
        <p className="no-notifications">No notifications available.</p>
      ) : (
        <div className="notification-list">
          {notifications.map((notification) => (
            <div
              key={notification.id}
              className={`notification-item ${notification.read ? "read" : "unread"}`}
              onClick={() => markAsRead(notification.id)}
            >
              <div className="notification-content">
                <p>{notification.message}</p>
                <small>{new Date(notification.timestamp).toLocaleString()}</small>
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
    </div>
  );
};

export default Notification;
