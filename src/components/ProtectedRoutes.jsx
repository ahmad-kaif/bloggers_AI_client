// components/ProtectedRoute.jsx
import { Navigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";



export default function ProtectedRoute({ children }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [authChecked, setAuthChecked] = useState(false);
   const backend_url_production="https://sentimental-blogs-backend.onrender.com";
   const backend_url_development="http://localhost:8081";

  useEffect(() => {
    axios.get(`${backend_url_production}/auth/check`, { withCredentials: true })
      .then(() => {
        setIsAuthenticated(true);
        setAuthChecked(true);
      })
      .catch(() => {
        setIsAuthenticated(false);
        setAuthChecked(true);
      });
  }, []);

  // Show a loading state while checking auth
  if (!authChecked) {
    return <div className="text-center mt-20 text-xl">Loading...</div>;
  }

  return isAuthenticated ? children : <Navigate to="/login" replace />;
}
