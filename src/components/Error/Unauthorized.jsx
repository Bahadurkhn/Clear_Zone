import React from "react";
import { Link } from "react-router-dom";
import "./Unauthorized.css";

function Unauthorized() {
  return (
    <div className="unauthorized-container">
      <h1>Unauthorized Access</h1>
      <p>You don't have permission to view this page.</p>
      <Link to="/" className="home-link">
        Return to Home
      </Link>
    </div>
  );
}

export default Unauthorized;
