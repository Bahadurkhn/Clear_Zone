// // import React, { createContext, useState, useEffect } from "react";

// // export const AuthContext = createContext();

// // export const AuthProvider = ({ children }) => {
// //   const [user, setUser] = useState(null);
// //   const [ngoPassword, setNgoPassword] = useState(
// //     localStorage.getItem("ngoPassword") || "ngopass123" 
// //   );

// //   useEffect(() => {
    
// //     const isAuthenticated = localStorage.getItem("isAuthenticated");
// //     const userRole = localStorage.getItem("userRole");
// //     if (isAuthenticated && userRole) {
// //       setUser({ role: userRole });
// //     }
// //   }, []);

// //   const login = (email, password, role) => {
// //     if (role === "ngo" && password !== ngoPassword) {
// //       return { error: "Invalid NGO password" };
// //     }

// //     localStorage.setItem("isAuthenticated", "true");
// //     localStorage.setItem("userRole", role);
// //     setUser({ email, role });
// //     return { success: true };
// //   };

// //   const logout = () => {
// //     localStorage.removeItem("isAuthenticated");
// //     localStorage.removeItem("userRole");
// //     setUser(null);
// //   };

// //   const updateNgoPassword = (newPassword) => {
// //     setNgoPassword(newPassword);
// //     localStorage.setItem("ngoPassword", newPassword);
// //   };

// //   return (
// //     <AuthContext.Provider
// //       value={{
// //         user,
// //         login,
// //         logout,
// //         ngoPassword,
// //         updateNgoPassword,
// //       }}
// //     >
// //       {children}
// //     </AuthContext.Provider>
// //   );
// // };


// import { createContext, useContext, useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";

// export const AuthContext = createContext();

// export const AuthProvider = ({ children }) => {
//   const [user, setUser] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const navigate = useNavigate();

//   // Initialize auth state
//   useEffect(() => {
//     const storedUser = localStorage.getItem('user');
//     const storedToken = localStorage.getItem('token');
    
//     if (storedUser && storedToken) {
//       try {
//         const parsedUser = JSON.parse(storedUser);
//         if (parsedUser && parsedUser.email && parsedUser.role) {
//           setUser(parsedUser);
//         }
//       } catch (err) {
//         console.error("Failed to parse user data:", err);
//         localStorage.removeItem('user');
//         localStorage.removeItem('token');
//       }
//     }
//     setLoading(false);
//   }, []);

//   const login = async (email, password, role) => {
//     setError(null);
//     try {
//       const response = await fetch('http://localhost:7000/api/auth/login', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({ email, password, role }),
//       });

//       const data = await response.json();

//       // First check HTTP status
//       if (!response.ok) {
//         throw new Error(data.message || data.error || `Login failed with status ${response.status}`);
//       }

//       // Then validate response structure
//       if (!data) {
//         throw new Error('Empty server response');
//       }

//       // Extract user and token with fallbacks
//       const authUser = {
//         email: data.user?.email || data.email || email,
//         role: data.user?.role || data.role || role,
//         ...(data.user || data) // Include all other user properties
//       };

//       const authToken = data.token || data.accessToken;
      
//       if (!authToken) {
//         throw new Error('Missing authentication token in response');
//       }

//       if (!authUser.email || !authUser.role) {
//         throw new Error('Incomplete user data in response');
//       }

//       // Persist auth data
//       localStorage.setItem('user', JSON.stringify(authUser));
//       localStorage.setItem('token', authToken);
//       setUser(authUser);
      
//       return { success: true, user: authUser };

//     } catch (err) {
//       console.error("Login error:", err);
//       const errorMsg = err.message || 'Login failed. Please try again.';
//       setError(errorMsg);
//       return { success: false, error: errorMsg };
//     }
//   };

// const register = async (name, email, password, role, registrationNumber) => {
//   setError(null);
//   try {
//     const response = await fetch('http://localhost:7000/api/auth/register', {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json',
//       },
//       body: JSON.stringify({ 
//         name, 
//         email, 
//         password, 
//         role, 
//         registrationNumber: role === "ngo" ? registrationNumber : undefined 
//       }),
//     });

//     const data = await response.json();

//     if (!response.ok) {
//       // Handle MongoDB duplicate error
//       if (
//         data?.message?.includes("E11000") &&
//         data?.message?.includes("registrationNumber")
//       ) {
//         throw new Error("This NGO registration number is already in use.");
//       }

//       throw new Error(data.message || data.error || `Registration failed with status ${response.status}`);
//     }

//     const authUser = {
//       email: data.user?.email || data.email || email,
//       role: data.user?.role || data.role || role,
//       ...(data.user || data)
//     };

//     const authToken = data.token || data.accessToken;

//     if (!authToken) {
//       throw new Error('Missing authentication token in response');
//     }

//     localStorage.setItem('user', JSON.stringify(authUser));
//     localStorage.setItem('token', authToken);
//     setUser(authUser);

//     return { success: true };
//   } catch (err) {
//     console.error("Registration error:", err);
//     const errorMsg = err.message || 'Registration failed. Please try again.';
//     setError(errorMsg);
//     return { success: false, error: errorMsg };
//   }
// };


//   const logout = () => {
//     localStorage.removeItem('user');
//     localStorage.removeItem('token');
//     setUser(null);
//     setError(null);
//     navigate('/login');
//   };

//   const clearError = () => setError(null);

//   return (
//     <AuthContext.Provider 
//       value={{ 
//         user,
//         error,
//         login,
//         register,
//         logout,
//         isAuthenticated: !!user,
//         clearError
//       }}
//     >
//       {loading ? <div className="loading-spinner" /> : children}
//     </AuthContext.Provider>
//   );
// };

// export const useAuth = () => {
//   const context = useContext(AuthContext);
//   if (!context) {
//     throw new Error('useAuth must be used within an AuthProvider');
//   }
//   return context;
// };

import { createContext, useContext, useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  // Initialize auth state
  useEffect(() => {
    const initializeAuth = async () => {
      try {
        const storedUser = localStorage.getItem('user');
        const storedToken = localStorage.getItem('token');
        
        if (storedUser && storedToken) {
          const parsedUser = JSON.parse(storedUser);
          if (parsedUser?.email && parsedUser?.role) {
            setUser(parsedUser);
          }
        }
      } catch (err) {
        console.error("Failed to initialize auth:", err);
        localStorage.removeItem('user');
        localStorage.removeItem('token');
      } finally {
        setLoading(false);
      }
    };

    initializeAuth();
  }, []);

  const handleAuthResponse = (data) => {
    if (!data) {
      throw new Error('Empty server response');
    }

    const authUser = {
      email: data.email,
      role: data.role,
      name: data.name,
      _id: data._id,
      ...(data.registrationNumber && { registrationNumber: data.registrationNumber })
    };

    const authToken = data.token;
    
    if (!authToken) {
      throw new Error('Missing authentication token');
    }

    if (!authUser.email || !authUser.role) {
      throw new Error('Incomplete user data');
    }

    localStorage.setItem('user', JSON.stringify(authUser));
    localStorage.setItem('token', authToken);
    setUser(authUser);
    setError(null);
    
    return authUser;
  };

  const login = useCallback(async (email, password, role) => {
    setError(null);
    try {
      const response = await fetch('http://localhost:7000/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password, role }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || data.error || `Login failed with status ${response.status}`);
      }

      const authUser = handleAuthResponse(data);
      return { success: true, user: authUser };

    } catch (err) {
      console.error("Login error:", err);
      const errorMsg = err.message || 'Login failed. Please try again.';
      setError(errorMsg);
      return { success: false, error: errorMsg };
    }
  }, []);

 const register = useCallback(async (name, email, password, role) => {
  setError(null);
  try {
    const response = await fetch('http://localhost:7000/api/auth/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ 
        name, 
        email, 
        password, 
        role,
        registrationNumber: role === "ngo" ? 'ngopass123' : undefined
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || data.error || `Registration failed with status ${response.status}`);
    }

    handleAuthResponse(data);
    return { success: true };

  } catch (err) {
    console.error("Registration error:", err);
    const errorMsg = err.message || 'Registration failed. Please try again.';
    setError(errorMsg);
    return { success: false, error: errorMsg };
  }
}, []);
  const logout = useCallback(() => {
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    setUser(null);
    setError(null);
    navigate('/login', { replace: true });
  }, [navigate]);

  const clearError = useCallback(() => setError(null), []);

  const value = {
    user,
    error,
    loading,
    login,
    register,
    logout,
    isAuthenticated: !!user,
    clearError
  };

  return (
    <AuthContext.Provider value={value}>
      {loading ? <div className="loading-spinner" /> : children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};