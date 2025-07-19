// components/ProtectedRoute.jsx
import { Navigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

export default function ProtectedRoute({ children }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [authChecked, setAuthChecked] = useState(false); // to wait for the check to complete

  useEffect(() => {
    axios.get("http://localhost:8081/auth/check", { withCredentials: true })
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
