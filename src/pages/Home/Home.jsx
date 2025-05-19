import React from 'react';
import './Home.css';

const Home = () => {
  return (
    <div className="home-container">
      <div className="hero-overlay"></div>
      <div className="hero-content">
        <h1>CLEARZONE – FOCUSES ON CREATING CLEAN, WASTE-FREE ZONES IN COMMUNITIES</h1>
        <p className="hero-description">
          Clearzone is an innovative solution designed to tackle waste-filled areas by leveraging modern technology and communications.
        </p>
        <div className="hero-quote">
          "Make Your Dry Cleaner, Greener, and Better With ClearZone!"
        </div>
        <p className="hero-join">
          Join the movement to report, classify, and manage waste efficiently in your community.
        </p>
        <button className="cta-button">Get Started</button>
      </div>
    </div>
  );
};

export default Home;