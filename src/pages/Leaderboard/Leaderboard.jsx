// import React, { useState } from "react";
// import { FaTimes, FaCheck, FaSearch } from "react-icons/fa";
// import "./Leaderboard.css";

// const Leaderboard = () => {
//   const [reports, setReports] = useState([
//     {
//       id: 1,
//       user: "Malgames H.radio",
//       score: 240,
//       email: "mhzxzh6114@gmail.com",
//       status: "pending",
//       reports: 34,
//     },
//     {
//       id: 2,
//       user: "EcoWarrior",
//       score: 180,
//       email: "eco@example.com",
//       status: "completed",
//       reports: 22,
//     },
//     {
//       id: 3,
//       user: "GreenHero",
//       score: 150,
//       email: "green@example.com",
//       status: "pending",
//       reports: 15,
//     },
//   ]);

//   const [searchTerm, setSearchTerm] = useState("");

//   const filteredReports = reports.filter(
//     (report) =>
//       report.user.toLowerCase().includes(searchTerm.toLowerCase()) ||
//       report.email.toLowerCase().includes(searchTerm.toLowerCase())
//   );

//   const handleRemoveReport = (id) => {
//     setReports(reports.filter((report) => report.id !== id));
//   };

//   const handleMarkComplete = (id) => {
//     setReports(
//       reports.map((report) =>
//         report.id === id ? { ...report, status: "completed" } : report
//       )
//     );
//   };

//   return (
//     <div className="leaderboard-container">
//       <h2>Cleanup Leaderboard</h2>

//       {/* Search Bar Added Here */}
//       <div className="search-container">
//         <div className="search-input">
//           <FaSearch className="search-icon" />
//           <input
//             type="text"
//             placeholder="Search users..."
//             value={searchTerm}
//             onChange={(e) => setSearchTerm(e.target.value)}
//           />
//         </div>
//       </div>

//       <div className="stats-summary">
//         <div className="stat-card">
//           <h3>Total Participants</h3>
//           <p>{reports.length}</p>
//         </div>
//         <div className="stat-card">
//           <h3>Active Reports</h3>
//           <p>{reports.filter((r) => r.status === "pending").length}</p>
//         </div>
//         <div className="stat-card highlight">
//           <h3>Top Score</h3>
//           <p>{Math.max(...reports.map((r) => r.score))}</p>
//         </div>
//       </div>

//       <table className="leaderboard-table">
//         <thead>
//           <tr>
//             <th>Rank</th>
//             <th>User</th>
//             <th>Score</th>
//             <th>Email</th>
//             <th>Reports</th>
//             <th>Status</th>
//             <th>Actions</th>
//           </tr>
//         </thead>
//         <tbody>
//           {filteredReports
//             .sort((a, b) => b.score - a.score)
//             .map((report, index) => (
//               <tr key={report.id} className={report.status}>
//                 <td>{index + 1}</td>
//                 <td>{report.user}</td>
//                 <td>{report.score}</td>
//                 <td>{report.email}</td>
//                 <td>{report.reports}</td>
//                 <td>
//                   <span className={`status-badge ${report.status}`}>
//                     {report.status}
//                   </span>
//                 </td>
//                 <td>
//                   {report.status === "pending" && (
//                     <button
//                       onClick={() => handleMarkComplete(report.id)}
//                       className="action-btn complete"
//                       title="Mark as completed"
//                     >
//                       <FaCheck />
//                     </button>
//                   )}
//                   <button
//                     onClick={() => handleRemoveReport(report.id)}
//                     className="action-btn remove"
//                     title="Remove entry"
//                   >
//                     <FaTimes />
//                   </button>
//                 </td>
//               </tr>
//             ))}
//         </tbody>
//       </table>
//     </div>
//   );
// };

// export default Leaderboard;

// Leaderboard.js (updated)

import React, { useState, useEffect } from "react";
import { FaTimes, FaCheck, FaSearch } from "react-icons/fa";
import "./Leaderboard.css";

const Leaderboard = () => {
  const [reports, setReports] = useState([]);
  const [stats, setStats] = useState({
    totalParticipants: 0,
    activeReports: 0,
    topScore: 0
  });
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [actionLoading, setActionLoading] = useState({
    status: null,
    remove: null
  });

  const API_BASE_URL = "http://localhost:7000/api";

  const fetchData = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const [entriesRes, statsRes] = await Promise.all([
        fetch(`${API_BASE_URL}/leaderboard`),
        fetch(`${API_BASE_URL}/leaderboard/stats`)
      ]);

      if (!entriesRes.ok) throw new Error('Failed to fetch leaderboard');
      if (!statsRes.ok) throw new Error('Failed to fetch stats');

      const [entries, statsData] = await Promise.all([
        entriesRes.json(),
        statsRes.json()
      ]);

      setReports(entries);
      setStats(statsData);
    } catch (err) {
      console.error('Fetch error:', err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleStatusUpdate = async (id, newStatus) => {
    try {
      setActionLoading(prev => ({ ...prev, status: id }));
      
      const response = await fetch(`${API_BASE_URL}/leaderboard/${id}/status`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify({ status: newStatus })
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to update status');
      }

      const updatedEntry = await response.json();
      
      setReports(reports.map(report => 
        report._id === id ? updatedEntry : report
      ));
      
      // Update stats if needed
      if (newStatus === 'Completed') {
        setStats(prev => ({
          ...prev,
          activeReports: prev.activeReports - 1
        }));
      }
    } catch (err) {
      console.error('Update error:', err);
      alert('Failed to update status: ' + err.message);
    } finally {
      setActionLoading(prev => ({ ...prev, status: null }));
    }
  };

  const handleRemove = async (id) => {
    if (!window.confirm('Are you sure you want to remove this entry?')) {
      return;
    }

    try {
      setActionLoading(prev => ({ ...prev, remove: id }));
      
      const response = await fetch(`${API_BASE_URL}/leaderboard/${id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to delete entry');
      }

      setReports(reports.filter(report => report._id !== id));
      setStats(prev => ({
        ...prev,
        totalParticipants: prev.totalParticipants - 1
      }));
    } catch (err) {
      console.error('Delete error:', err);
      alert('Failed to remove entry: ' + err.message);
    } finally {
      setActionLoading(prev => ({ ...prev, remove: null }));
    }
  };

  // ... rest of your component code (search, render, etc.)

  return (
  <div className="leaderboard-container">
    <h2>Cleanup Leaderboard</h2>

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
        <p>{stats.totalParticipants}</p>
      </div>
      <div className="stat-card">
        <h3>Active Reports</h3>
        <p>{stats.activeReports}</p>
      </div>
      <div className="stat-card highlight">
        <h3>Top Score</h3>
        <p>{stats.topScore}</p>
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
        {reports.map((report, index) => (
          <tr key={report._id}>
            <td>{index + 1}</td>
            <td>{report.user?.name || 'Unknown'}</td>
            <td>{report.score}</td>
            <td>{report.user?.email || ''}</td>
            <td>{report.reports}</td>
            <td>
              <span className={`status-badge ${report.status.toLowerCase()}`}>
                {report.status}
              </span>
            </td>
            <td>
              {report.status === 'Pending' && (
                <button
                  onClick={() => handleStatusUpdate(report._id, 'Completed')}
                  className="action-btn complete"
                  title="Mark as completed"
                  disabled={actionLoading.status === report._id}
                >
                  {actionLoading.status === report._id ? '...' : <FaCheck />}
                </button>
              )}
              <button
                onClick={() => handleRemove(report._id)}
                className="action-btn remove"
                title="Remove entry"
                disabled={actionLoading.remove === report._id}
              >
                {actionLoading.remove === report._id ? '...' : <FaTimes />}
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