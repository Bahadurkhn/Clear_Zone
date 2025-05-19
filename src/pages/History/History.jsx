// // import React, { useState } from "react";
// // import "./History.css";

// // const History = () => {
// //   const [activeTab, setActiveTab] = useState("all");
// //   const [selectedReport, setSelectedReport] = useState(null);

// //   // Sample data matching your image
// //   const reportData = [
// //     { id: 1, wasteType: "plastic", location: "abcd", status: "express" },
// //     // ... other data items
// //   ];

// //   const filteredReports =
// //     activeTab === "all"
// //       ? reportData
// //       : reportData.filter((report) => report.status === activeTab);

// //   const toggleDetails = (report) => {
// //     if (selectedReport && selectedReport.id === report.id) {
// //       // Clicking the same report's "View Details" closes the panel
// //       setSelectedReport(null);
// //     } else {
// //       // Clicking a different report shows its details
// //       setSelectedReport(report);
// //     }
// //   };

// //   const closePanel = () => {
// //     setSelectedReport(null);
// //   };

// //   return (
// //     <div className="history-container">
// //       <h1>Report History</h1>

// //       <div className="tabs">
// //         <button
// //           className={activeTab === "all" ? "active" : ""}
// //           onClick={() => setActiveTab("all")}
// //         >
// //           All
// //         </button>
// //       </div>

// //       <div className="report-table-container">
// //         <table className="report-table">
// //           <thead>
// //             <tr>
// //               <th>Waste Type</th>
// //               <th>Location</th>
// //               <th>Status</th>
// //               <th>Actions</th>
// //             </tr>
// //           </thead>
// //           <tbody>
// //             {filteredReports.map((report) => (
// //               <tr key={report.id}>
// //                 <td>{report.wasteType}</td>
// //                 <td>{report.location}</td>
// //                 <td>
// //                   <span className={`status-badge ${report.status}`}>
// //                     {report.status}
// //                   </span>
// //                 </td>
// //                 <td>
// //                   <button
// //                     className={`view-details-btn ${
// //                       selectedReport?.id === report.id ? "active" : ""
// //                     }`}
// //                     onClick={() => toggleDetails(report)}
// //                   >
// //                     {selectedReport?.id === report.id
// //                       ? "Hide Details"
// //                       : "View Details"}
// //                   </button>
// //                 </td>
// //               </tr>
// //             ))}
// //           </tbody>
// //         </table>
// //       </div>

// //       {/* Details Panel */}
// //       {selectedReport && (
// //         <div className="details-panel">
// //           <div className="panel-header">
// //             <h3>Report Details</h3>
// //             <button className="close-panel" onClick={closePanel}>
// //               &times;
// //             </button>
// //           </div>
// //           <div className="panel-content">
// //             <div className="detail-row">
// //               <span className="detail-label">Waste Type:</span>
// //               <span>{selectedReport.wasteType}</span>
// //             </div>
// //             <div className="detail-row">
// //               <span className="detail-label">Location:</span>
// //               <span>{selectedReport.location}</span>
// //             </div>
// //             <div className="detail-row">
// //               <span className="detail-label">Status:</span>
// //               <span className={`status-badge ${selectedReport.status}`}>
// //                 {selectedReport.status}
// //               </span>
// //             </div>
// //             {/* Add more details as needed */}
// //           </div>
// //         </div>
// //       )}
// //     </div>
// //   );
// // };

// // export default History;


// import React, { useState, useEffect } from "react";
// import "./History.css";
// import axios from 'axios';

// const History = () => {
//   const [activeTab, setActiveTab] = useState("all");
//   const [selectedReport, setSelectedReport] = useState(null);
//   const [reports, setReports] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//  useEffect(() => {
//   const fetchReports = async () => {
//     try {
//       const token = localStorage.getItem('token');
//       if (!token) {
//         throw new Error('No authentication token found');
//       }

//       const response = await axios.get('http://localhost:7000/api/history', {
//         headers: {
//           'Authorization': `Bearer ${token}`
//         }
//       });
      
//       if (response.data.success) {
//         setReports(response.data.data);
//       } else {
//         setError(response.data.message || 'Failed to fetch reports');
//       }
//     } catch (err) {
//       const errorMessage = err.response 
//         ? `Error: ${err.response.status} - ${err.response.data.message || 'No error details'}`
//         : err.message;
//       setError(`Failed to fetch reports: ${errorMessage}`);
//       console.error('API Error:', err);
//     } finally {
//       setLoading(false);
//     }
//   };

//   fetchReports();
// }, []);

//   const fetchReportDetails = async (reportId) => {
//     try {
//       const token = localStorage.getItem('token');
//       const response = await axios.get(`/api/history/${reportId}`, {
//         headers: {
//           'Authorization': `Bearer ${token}`
//         }
//       });
      
//       if (response.data.success) {
//         return response.data.data;
//       }
//       return null;
//     } catch (err) {
//       console.error('Error fetching report details:', err);
//       return null;
//     }
//   };

//   // const toggleDetails = async (report) => {
//   //   if (selectedReport && selectedReport.id === report.id) {
//   //     setSelectedReport(null);
//   //   } else {
//   //     const details = await fetchReportDetails(report.id);
//   //     if (details) {
//   //       setSelectedReport(details);
//   //     }
//   //   }
//   // };

//   const toggleDetails = (report) => {
//   if (selectedReport && selectedReport.id === report.id) {
//     setSelectedReport(null);
//   } else {
//     setSelectedReport(report);
//   }
// };

//   // const filteredReports =
//   //   activeTab === "all"
//   //     ? reports
//   //     : reports.filter((report) => report.status.toLowerCase() === activeTab.toLowerCase());
// const filteredReports = 
//   activeTab === "all" 
//     ? reports 
//     : reports.filter(report => 
//         activeTab === "pending" && report.status === "Pending" ||
//         activeTab === "inprogress" && report.status === "InProgress" ||
//         activeTab === "completed" && report.status === "Completed"
//       );


//   const closePanel = () => {
//     setSelectedReport(null);
//   };

//   if (loading) return <div className="history-container">Loading...</div>;
//   if (error) return <div className="history-container">Error: {error}</div>;

//   return (
//     <div className="history-container">
//       <h1>Report History</h1>

//      {/* <div className="tabs">
//          <button
//           className={activeTab === "all" ? "active" : ""}
//           onClick={() => setActiveTab("all")}
//         >
//           All
//         </button>
//         <button
//           className={activeTab === "pending" ? "active" : ""}
//           onClick={() => setActiveTab("pending")}
//         >
//           Pending
//         </button>
//         <button
//           className={activeTab === "inprogress" ? "active" : ""}
//           onClick={() => setActiveTab("inprogress")}
//         >
//           In Progress
//         </button>
//         <button
//           className={activeTab === "completed" ? "active" : ""}
//           onClick={() => setActiveTab("completed")}
//         >
//           Completed
//         </button>
//       </div> */}


// <div className="tabs">
//   <button className={activeTab === "all" ? "active" : ""} onClick={() => setActiveTab("all")}>
//     All
//   </button>
//   <button className={activeTab === "pending" ? "active" : ""} onClick={() => setActiveTab("pending")}>
//     Pending
//   </button>
//   <button className={activeTab === "inprogress" ? "active" : ""} onClick={() => setActiveTab("inprogress")}>
//     In Progress
//   </button>
//   <button className={activeTab === "completed" ? "active" : ""} onClick={() => setActiveTab("completed")}>
//     Completed
//   </button>
// </div>
//       <div className="report-table-container">
//         <table className="report-table">
//           <thead>
//             <tr>
//               <th>Waste Type</th>
//               <th>Location</th>
//               <th>Status</th>
//               <th>Actions</th>
//             </tr>
//           </thead>
//           <tbody>
//             {filteredReports.map((report) => (
//               <tr key={report.id}>
//                 <td>{report.wasteType}</td>
//                 <td>{report.location}</td>
//                 <td>
//                   <span className={`status-badge ${report.status.toLowerCase()}`}>
//                     {report.status}
//                   </span>
//                 </td>
//                 <td>
//                   <button
//                     className={`view-details-btn ${
//                       selectedReport?.id === report.id ? "active" : ""
//                     }`}
//                     onClick={() => toggleDetails(report)}
//                   >
//                     {selectedReport?.id === report.id
//                       ? "Hide Details"
//                       : "View Details"}
//                   </button>
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>

//       {/* Details Panel */}
//       {selectedReport && (
//         <div className="details-panel">
//           <div className="panel-header">
//             <h3>Report Details</h3>
//             <button className="close-panel" onClick={closePanel}>
//               &times;
//             </button>
//           </div>
//           <div className="panel-content">
//             <div className="detail-row">
//               <span className="detail-label">Waste Type:</span>
//               <span>{selectedReport.wasteType}</span>
//             </div>
//             <div className="detail-row">
//               <span className="detail-label">Location:</span>
//               <span>{selectedReport.location}</span>
//             </div>
//             <div className="detail-row">
//               <span className="detail-label">Status:</span>
//               <span className={`status-badge ${selectedReport.status.toLowerCase()}`}>
//                 {selectedReport.status}
//               </span>
//             </div>
//             <div className="detail-row">
//               <span className="detail-label">Urgency:</span>
//               <span>{selectedReport.urgency}</span>
//             </div>
//             <div className="detail-row">
//               <span className="detail-label">Description:</span>
//               <span>{selectedReport.description || 'No description provided'}</span>
//             </div>
//             {selectedReport.attachment && (
//               <div className="detail-row">
//                 <span className="detail-label">Attachment:</span>
//                 <a href={selectedReport.attachment} target="_blank" rel="noopener noreferrer">
//                   View Attachment
//                 </a>
//               </div>
//             )}
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default History;

import React, { useState, useEffect } from "react";
import "./History.css";
import axios from 'axios';

const History = () => {
  const [activeTab, setActiveTab] = useState("all");
  const [selectedReport, setSelectedReport] = useState(null);
  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchReports = async () => {
      try {
        setLoading(true);
        setError(null);
        
        const token = localStorage.getItem('token');
        if (!token) {
          throw new Error('No authentication token found');
        }

        const response = await axios.get('http://localhost:7000/api/history', {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        
        if (response.data?.success) {
          // Transform status to match our filter options
          const transformedReports = response.data.data.map(report => ({
            ...report,
            status: report.status === "InProgress" ? "InProgress" : report.status
          }));
          setReports(transformedReports);
        } else {
          throw new Error(response.data?.message || 'Invalid response from server');
        }
      } catch (err) {
        setError(err.response?.data?.message || err.message || 'Failed to fetch reports');
        console.error('Fetch error:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchReports();
  }, []);

  const toggleDetails = (report) => {
    setSelectedReport(prev => 
      prev?.id === report.id ? null : report
    );
  };

  const closePanel = () => {
    setSelectedReport(null);
  };

  const filteredReports = activeTab === "all" 
    ? reports 
    : reports.filter(report => 
        report.status.toLowerCase() === activeTab.toLowerCase()
      );

  if (loading) return (
    <div className="history-container">
      <div className="loading-spinner"></div>
      <p>Loading reports...</p>
    </div>
  );

  if (error) return (
    <div className="history-container error-message">
      <h2>Error</h2>
      <p>{error}</p>
      <button onClick={() => window.location.reload()}>Try Again</button>
    </div>
  );

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
        <button 
          className={activeTab === "pending" ? "active" : ""} 
          onClick={() => setActiveTab("pending")}
        >
          Pending
        </button>
        <button 
          className={activeTab === "inprogress" ? "active" : ""} 
          onClick={() => setActiveTab("inprogress")}
        >
          In Progress
        </button>
        <button 
          className={activeTab === "completed" ? "active" : ""} 
          onClick={() => setActiveTab("completed")}
        >
          Completed
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
            {filteredReports.length > 0 ? (
              filteredReports.map((report) => (
                <tr key={report.id}>
                  <td>{report.wasteType}</td>
                  <td>{report.location}</td>
                  <td>
                    <span className={`status-badge ${report.status.toLowerCase()}`}>
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
              ))
            ) : (
              <tr>
                <td colSpan="4" className="no-reports">
                  No reports found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

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
              <span className={`status-badge ${selectedReport.status.toLowerCase()}`}>
                {selectedReport.status}
              </span>
            </div>
            <div className="detail-row">
              <span className="detail-label">Urgency:</span>
              <span>{selectedReport.urgency || 'Not specified'}</span>
            </div>
            <div className="detail-row">
              <span className="detail-label">Description:</span>
              <span>{selectedReport.description || 'No description provided'}</span>
            </div>
            {selectedReport.attachment && (
              <div className="detail-row">
                <span className="detail-label">Attachment:</span>
                <a 
                  href={selectedReport.attachment} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="attachment-link"
                >
                  View Attachment
                </a>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default History;