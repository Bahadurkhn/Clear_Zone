import React from 'react';
import './KeyFeatures.css';
import featureImage from '../../assets/KeyFeatures.jpg'; // Adjust path as needed

const KeyFeatures = () => {
  return (
    <div className="features-container">
      <div className="image-section">
        <img 
          src={featureImage} 
          alt="Clearzone Features" 
          className="feature-image"
        />
      </div>
      
      <div className="text-section">
        <h2>Key Features</h2>
        <ul>
          <li><span className="feature-title">Waste Reporting:</span> Report waste with location and category.</li>
          <li><span className="feature-title">Real-Time Maps:</span> View reported waste locations.</li>
          <li><span className="feature-title">User Ratings:</span> Gain incentives for accurate reporting.</li>
          <li><span className="feature-title">NGO Collaboration:</span> NGOs can manage clean-up efforts seamlessly.</li>
        </ul>
      </div>
    </div>
  );
};

export default KeyFeatures;