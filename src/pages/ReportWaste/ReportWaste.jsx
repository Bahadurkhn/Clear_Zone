// import React, { useState } from "react";
// import "./ReportWaste.css";

// const ReportWaste = () => {
//   const [mapView, setMapView] = useState("street");
//   const [formData, setFormData] = useState({
//     wasteType: "",
//     description: "",
//     urgency: "Medium",
//     location: "",
//     attachment: null,
//   });

//   const handleChange = (e) => {
//     const { name, value, files } = e.target;
//     setFormData((prev) => ({
//       ...prev,
//       [name]: files ? files[0] : value,
//     }));
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     console.log("Form Data Submitted:", formData);
//     alert("Report submitted!");
//   };

//   return (
//     <div className="report-waste-container">
//       <h2 className="form-title">Report Waste</h2>
//       <form className="waste-form" onSubmit={handleSubmit}>
//         <label>
//           Waste Type
//           <select
//             name="wasteType"
//             value={formData.wasteType}
//             onChange={handleChange}
//             required
//           >
//             <option value="">Select waste type</option>
//             <option value="Plastic">Plastic</option>
//             <option value="Organic">Organic</option>
//             <option value="E-waste">E-waste</option>
//           </select>
//         </label>

//         <label>
//           Description
//           <textarea
//             name="description"
//             placeholder="Provide additional details about the waste"
//             value={formData.description}
//             onChange={handleChange}
//           />
//         </label>

//         <label>
//           Urgency Level
//           <select
//             name="urgency"
//             value={formData.urgency}
//             onChange={handleChange}
//           >
//             <option>Low</option>
//             <option>Medium</option>
//             <option>High</option>
//           </select>
//         </label>

//         <label>
//           Location
//           <input
//             type="text"
//             name="location"
//             placeholder="Enter your location"
//             value={formData.location}
//             onChange={handleChange}
//           />
//         </label>

//         <label>
//           Attachments
//           <input type="file" name="attachment" onChange={handleChange} />
//         </label>

//         <div className="map-view">
//           <label>Map View</label>
//           <div className="map-buttons">
//             {["STREET", "SATELLITE", "WASTE DENSITY"].map((view) => (
//               <button
//                 type="button"
//                 key={view}
//                 className={mapView === view.toLowerCase() ? "active" : ""}
//                 onClick={() => setMapView(view.toLowerCase())}
//               >
//                 {view}
//               </button>
//             ))}
//           </div>
//         </div>

//         <button type="submit" className="submit-button">
//           Submit Report
//         </button>
//       </form>
//     </div>
//   );
// };

// export default ReportWaste;


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
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: files ? files[0] : value,
    }));
  };

const handleSubmit = async (e) => {
  e.preventDefault();
  setIsLoading(true);
  setError('');

  // Validate required fields
  if (!formData.wasteType || !formData.location) {
    setError('Waste type and location are required');
    setIsLoading(false);
    return;
  }

  // Prepare FormData
  const formDataToSend = new FormData();
  formDataToSend.append('wasteType', formData.wasteType);
  formDataToSend.append('description', formData.description);
  formDataToSend.append('urgency', formData.urgency);
  formDataToSend.append('location', formData.location);
  
  if (formData.attachment) {
    formDataToSend.append('file', formData.attachment);
  }

  try {
    const token = localStorage.getItem('token');
    if (!token) {
      throw new Error('Please login to submit reports');
    }

    const response = await fetch('http://localhost:7000/api/reports', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`
      },
      body: formDataToSend
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || 'Failed to submit report');
    }

    // Success handling
    alert('Report submitted successfully!');
    setFormData({
      wasteType: '',
      description: '',
      urgency: 'Medium',
      location: '',
      attachment: null
    });
    
  } catch (err) {
    setError(err.message || 'An error occurred while submitting the report');
    console.error('Report submission error:', err);
  } finally {
    setIsLoading(false);
  }
};

  return (
    <div className="report-waste-container">
      <h2 className="form-title">Report Waste</h2>
      {error && <div className="error-message">{error}</div>}
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

        <button type="submit" className="submit-button" disabled={isLoading}>
          {isLoading ? "Submitting..." : "Submit Report"}
        </button>
      </form>
    </div>
  );
};

export default ReportWaste;
