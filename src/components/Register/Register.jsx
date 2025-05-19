import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../AuthContext/AuthContext";
import { FiUser, FiMail, FiLock, FiEye, FiEyeOff } from "react-icons/fi";
import "./Register.css"



function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [role, setRole] = useState("user");
  const [registrationNumber, setRegistrationNumber] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [showNgoPassword, setShowNgoPassword] = useState(false);

  const { register } = useContext(AuthContext);
  const navigate = useNavigate();

   const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      setIsLoading(false);
      return;
    }

    // For NGO registration, verify the registration number
    if (role === 'ngo' && registrationNumber !== 'ngopass123') {
      setError("Invalid NGO registration number");
      setIsLoading(false);
      return;
    }

    try {
      const result = await register(
        name,
        email,
        password,
        role,
        'ngopass123' // Always send ngopass123 for NGO registration
      );
      
      if (result.error) {
        setError(result.error);
      } else {
        navigate(role === "ngo" ? "/ngo-dashboard" : "/");
      }
    } finally {
      setIsLoading(false);
    }
  };


  return (
    <div className="login-container">
      <div className="login-card">
        <div className="login-header">
          <h2>Create an Account</h2>
          <p>Join ClearZone to manage waste efficiently</p>
        </div>

        {error && <div className="error-message">{error}</div>}

        <form onSubmit={handleSubmit} className="login-form">
          <div className="input-group">
            <FiUser className="input-icon" />
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Full name"
              required
            />
          </div>

          <div className="input-group">
            <FiMail className="input-icon" />
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email address"
              required
            />
          </div>

          <div className="input-group">
            <FiLock className="input-icon" />
            <input
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              required
            />
            <button
              type="button"
              className="password-toggle"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <FiEyeOff /> : <FiEye />}
            </button>
          </div>

          <div className="input-group">
            <FiLock className="input-icon" />
            <input
              type={showConfirmPassword ? "text" : "password"}
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="Confirm password"
              required
            />
            <button
              type="button"
              className="password-toggle"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
            >
              {showConfirmPassword ? <FiEyeOff /> : <FiEye />}
            </button>
          </div>

          <div className="input-group">
            <select
              value={role}
              onChange={(e) => setRole(e.target.value)}
              className="role-select"
            >
              <option value="user">Regular User</option>
              <option value="ngo">NGO Staff</option>
            </select>
          </div>

          {role === "ngo" && (
            <div className="input-group">
              <FiLock className="input-icon" />
              <input
                type={showNgoPassword ? "text" : "password"}
                value={registrationNumber}
                onChange={(e) => setRegistrationNumber(e.target.value)}
                placeholder="NGO Registration Number"
                required
              />
              <button
                type="button"
                className="password-toggle"
                onClick={() => setShowNgoPassword(!showNgoPassword)}
              >
                {showNgoPassword ? <FiEyeOff /> : <FiEye />}
              </button>
            </div>
          )}

          <button type="submit" className="login-button" disabled={isLoading}>
            {isLoading ? "Registering..." : "Register"}
          </button>
        </form>

        <div className="login-footer">
          <p>
            Already have an account? <a href="/login">Sign in</a>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Register;
