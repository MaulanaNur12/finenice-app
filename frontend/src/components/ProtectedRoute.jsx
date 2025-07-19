import { Navigate } from "react-router-dom";

export default function ProtectedRoute({ token, role, allowedRole, children }) {
  if (!token) {
    return <Navigate to="/login" />;
  }

  if (allowedRole && role !== allowedRole) {
    return <Navigate to="/" />;
  }

  return children;
}
