import { useState } from "react";
import { Routes, Route, NavLink, Navigate } from "react-router-dom";

import Login from "./pages/Login";
import Register from "./pages/Register";
import Products from "./pages/Products";
import Checkout from "./pages/Checkout";
import Transactions from "./pages/Transactions";
import AllTransactions from "./pages/AllTransactions";
import AdminDashboard from "./pages/AdminDashboard";
import UserDashboard from "./pages/UserDashboard";
import Unauthorized from "./pages/Unauthorized";

import ProtectedRoute from "./components/ProtectedRoute";

export default function App() {
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [role, setRole] = useState(localStorage.getItem("role"));

  const handleLogin = (newToken) => {
    const payload = JSON.parse(atob(newToken.split(".")[1]));
    const newRole = payload.role;

    localStorage.setItem("token", newToken);
    localStorage.setItem("role", newRole);

    setToken(newToken);
    setRole(newRole);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    setToken(null);
    setRole(null);
  };

  const navItemClass = ({ isActive }) =>
    `block px-4 py-2 rounded-md font-medium transition ${
      isActive ? "bg-blue-600 text-white" : "text-gray-300 hover:bg-gray-700 hover:text-white"
    }`;

  return (
    <div className="flex h-screen bg-gray-900 text-white font-sans">
      {/* Sidebar */}
      <aside className="w-64 bg-gray-800 p-4 flex-col justify-between sticky top-0 h-screen hidden md:flex">
        <div>
          <h1 className="text-2xl font-bold mb-6 text-center text-white">Finenice</h1>
          <nav className="space-y-2">
            <NavLink to="/" className={navItemClass}>Products</NavLink>

            {token && role === "user" && (
              <>
                <NavLink to="/user" className={navItemClass}>User Dashboard</NavLink>
                <NavLink to="/checkout" className={navItemClass}>Checkout</NavLink>
                <NavLink to="/transactions" className={navItemClass}>Transactions</NavLink>
              </>
            )}

            {token && role === "admin" && (
              <>
                <NavLink to="/admin" className={navItemClass}>Admin Dashboard</NavLink>
                <NavLink to="/transactions/all" className={navItemClass}>All Transactions</NavLink>
              </>
            )}
          </nav>
        </div>

        <div className="mt-6 space-y-2">
          {token ? (
            <button
              onClick={handleLogout}
              className="w-full p-2 bg-red-600 hover:bg-red-500 rounded font-semibold"
            >
              Logout
            </button>
          ) : (
            <>
              <NavLink to="/login" className="block p-2 rounded bg-blue-600 hover:bg-blue-500 text-center font-semibold">
                Login
              </NavLink>
              <NavLink to="/register" className="block p-2 rounded bg-green-600 hover:bg-green-500 text-center font-semibold">
                Register
              </NavLink>
            </>
          )}
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-6 overflow-auto">
        <Routes>
          <Route path="/" element={<Products token={token} isAdmin={role === "admin"} />} />
          <Route path="/login" element={<Login setToken={handleLogin} />} />
          <Route path="/register" element={<Register />} />

          {/* USER routes */}
          <Route
            path="/user"
            element={
              <ProtectedRoute token={token} role={role} allowedRole="user">
                <UserDashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/checkout"
            element={
              <ProtectedRoute token={token} role={role} allowedRole="user">
                <Checkout token={token} />
              </ProtectedRoute>
            }
          />
          <Route
            path="/transactions"
            element={
              <ProtectedRoute token={token} role={role} allowedRole="user">
                <Transactions token={token} />
              </ProtectedRoute>
            }
          />

          {/* ADMIN routes */}
          <Route
            path="/admin"
            element={
              <ProtectedRoute token={token} role={role} allowedRole="admin">
                <AdminDashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/transactions/all"
            element={
              <ProtectedRoute token={token} role={role} allowedRole="admin">
                <AllTransactions token={token} />
              </ProtectedRoute>
            }
          />

          {/* fallback */}
          <Route path="/unauthorized" element={<Unauthorized />} />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </main>
    </div>
  );
}
