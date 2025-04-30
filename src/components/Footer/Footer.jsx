import React from "react";
import { FaPhone, FaEnvelope, FaMapMarkerAlt } from "react-icons/fa";
import "./Footer.css";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        {/* Contact Information Section */}
        <div className="footer-section">
          <h3 className="footer-logo">Clear_Zone</h3>
          <div className="contact-info">
            <p>
              <FaMapMarkerAlt className="footer-icon" /> A308 Adam Street
              <br />
              New York, NY 535022
            </p>
            <p>
              <FaPhone className="footer-icon" /> <strong>Phone:</strong> +1
              5599 56 495 55
            </p>
            <p>
              <FaEnvelope className="footer-icon" /> <strong>Email:</strong>{" "}
              info@example.com
            </p>
          </div>
        </div>

        {/* Useful Links Section */}
        <div className="footer-section">
          <h4 className="footer-heading">Useful Links</h4>
          <div className="links-grid">
            <div className="links-column">
              <a href="/">Home</a>
              <a href="/about">About us</a>
              <a href="/services">Services</a>
              <a href="/terms">Terms of service</a>
              <a href="/privacy">Privacy policy</a>
            </div>
          </div>
        </div>

        {/* Newsletter Section */}
        <div className="footer-section">
          <div className="newsletter">
            <p>
              <strong>Our Newsletter</strong>
            </p>
            <p>Subscribe to our newsletter and receive the latest news!</p>
            <div className="subscribe-form">
              <input type="email" placeholder="Your Email" />
              <button type="submit">Subscribe</button>
            </div>
          </div>
        </div>
      </div>

      {/* Footer Bottom */}
      <div className="footer-bottom">
        <p>
          © Copyright <strong>Clear_Zone</strong>. All Rights Reserved
        </p>
      </div>
    </footer>
  );
};

export default Footer;
