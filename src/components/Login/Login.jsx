// import React, { useState, useContext } from "react";
// import { useNavigate } from "react-router-dom";
// import { AuthContext } from "../AuthContext/AuthContext";
// import { FiUser, FiLock, FiEye, FiEyeOff } from "react-icons/fi";
// import "./Login.css";

// function Login() {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [role, setRole] = useState("user");
//   const [error, setError] = useState("");
//   const [showPassword, setShowPassword] = useState(false);
//   const [isLoading, setIsLoading] = useState(false);
//   const { login } = useContext(AuthContext);
//   const navigate = useNavigate();

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setIsLoading(true);
//     setError("");

//     try {
//       const result = await login(email, password, role);
//       if (result.error) {
//         setError(result.error);
//       } else {
//         navigate(role === "ngo" ? "/ngo-dashboard" : "/");
//       }
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   return (
//     <div className="login-container">
//       <div className="login-card">
//         <div className="login-header">
//           <h2>Welcome to ClearZone</h2>
//           <p>Manage waste efficiently and sustainably</p>
//         </div>

//         {error && <div className="error-message">{error}</div>}

//         <form onSubmit={handleSubmit} className="login-form">
//           <div className="input-group">
//             <FiUser className="input-icon" />
//             <input
//               type="email"
//               value={email}
//               onChange={(e) => setEmail(e.target.value)}
//               placeholder="Enter your email"
//               required
//             />
//           </div>

//           <div className="input-group">
//             <FiLock className="input-icon" />
//             <input
//               type={showPassword ? "text" : "password"}
//               value={password}
//               onChange={(e) => setPassword(e.target.value)}
//               placeholder="Enter password"
//               required
//             />
//             <button
//               type="button"
//               className="password-toggle"
//               onClick={() => setShowPassword(!showPassword)}
//             >
//               {showPassword ? <FiEyeOff /> : <FiEye />}
//             </button>
//           </div>

//           <div className="input-group">
//             <select
//               value={role}
//               onChange={(e) => setRole(e.target.value)}
//               className="role-select"
//             >
//               <option value="user">Regular User</option>
//               <option value="ngo">NGO Staff</option>
//             </select>
//           </div>

//           <button type="submit" className="login-button" disabled={isLoading}>
//             {isLoading ? "Logging in..." : "Login"}
//           </button>
//         </form>

//         <div className="login-footer">
//           <p>
//             Don't have an account? <a href="/register">Sign up</a>
//           </p>
//           <a href="/forgot-password">Forgot password?</a>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default Login;

// import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { useAuth } from "../AuthContext/AuthContext";
// import { FiUser, FiLock, FiEye, FiEyeOff } from "react-icons/fi";
// import "./Login.css";

// function Login() {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [role, setRole] = useState("user");
//   const [showPassword, setShowPassword] = useState(false);
//   const [isLoading, setIsLoading] = useState(false);
//   const { login, error, clearError } = useAuth();
//   const navigate = useNavigate();

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     if (!email || !password) {
//       return;
//     }

//     setIsLoading(true);
//     clearError();

//     try {
//       const result = await login(email, password, role);
//       if (result.success) {
//         navigate(role === "ngo" ? "/ngo-dashboard" : "/");
//       }
//     } catch (err) {
//       console.error("Login error:", err);
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   return (
//     <div className="login-container">
//       <div className="login-card">
//         <div className="login-header">
//           <h2>Welcome to ClearZone</h2>
//           <p>Manage waste efficiently and sustainably</p>
//         </div>

//         {error && (
//           <div className="error-message">
//             {error}
//             <button onClick={clearError} className="error-close">×</button>
//           </div>
//         )}

//         <form onSubmit={handleSubmit} className="login-form">
//           <div className="input-group">
//             <FiUser className="input-icon" />
//             <input
//               type="email"
//               value={email}
//               onChange={(e) => setEmail(e.target.value)}
//               placeholder="Enter your email"
//               required
//             />
//           </div>

//           <div className="input-group">
//             <FiLock className="input-icon" />
//             <input
//               type={showPassword ? "text" : "password"}
//               value={password}
//               onChange={(e) => setPassword(e.target.value)}
//               placeholder="Enter password"
//               required
//             />
//             <button
//               type="button"
//               className="password-toggle"
//               onClick={() => setShowPassword(!showPassword)}
//               aria-label={showPassword ? "Hide password" : "Show password"}
//             >
//               {showPassword ? <FiEyeOff /> : <FiEye />}
//             </button>
//           </div>

//           <div className="input-group">
//             <select
//               value={role}
//               onChange={(e) => setRole(e.target.value)}
//               className="role-select"
//             >
//               <option value="user">Regular User</option>
//               <option value="ngo">NGO Staff</option>
//             </select>
//           </div>

//           <button 
//             type="submit" 
//             className="login-button" 
//             disabled={isLoading}
//           >
//             {isLoading ? (
//               <>
//                 <span className="spinner" /> Logging in...
//               </>
//             ) : (
//               "Login"
//             )}
//           </button>
//         </form>

//         <div className="login-footer">
//           <p>
//             Don't have an account? <a href="/register">Sign up</a>
//           </p>
//           <a href="/forgot-password">Forgot password?</a>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default Login;

import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../AuthContext/AuthContext";
import { FiMail, FiLock, FiEye, FiEyeOff } from "react-icons/fi";
import "./Login.css"


function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("user");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      const result = await login(email, password, role);
      if (result.error) {
        setError(result.error);
      } else {
        navigate(role === "ngo" ? "/ngo-dashboard" : "/");
      }
    } catch (err) {
      setError("An error occurred during login");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <div className="login-header">
          <h2>Welcome Back</h2>
          <p>Sign in to your ClearZone account</p>
        </div>

        {error && <div className="error-message">{error}</div>}

        <form onSubmit={handleSubmit} className="login-form">
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
            <select
              value={role}
              onChange={(e) => setRole(e.target.value)}
              className="role-select"
            >
              <option value="user">Regular User</option>
              <option value="ngo">NGO Staff</option>
            </select>
          </div>

          <button type="submit" className="login-button" disabled={isLoading}>
            {isLoading ? "Signing in..." : "Sign In"}
          </button>
        </form>

        <div className="login-footer">
          <p>
            Don't have an account? <a href="/register">Sign up</a>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Login;