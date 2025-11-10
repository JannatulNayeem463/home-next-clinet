// src/components/ProtectedRoute.jsx
import { Navigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";


const ProtectedRoute = ({ children }) => {
  const { user } = AuthContext();
  return user ? children : <Navigate to="/login" replace />;
};

export default ProtectedRoute;
