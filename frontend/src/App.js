import { useState } from "react";
import { Route, Routes, Link, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Products from "./pages/Products";
import Checkout from "./pages/Checkout";
import Transactions from "./pages/Transactions";
import AllTransactions from "./pages/AllTransactions";

function App() {
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [role, setRole] = useState(localStorage.getItem("role"));

  const handleLogin = (newToken, newRole) => {
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

  return (
    <div className="flex h-screen bg-gray-900 text-white font-sans">
      {/* Sidebar */}
      <aside className="w-64 bg-gray-800 p-4 flex flex-col justify-between">
        <div>
          <h1 className="text-2xl font-bold mb-6 text-center">Finenice</h1>
          <nav className="space-y-3">
            <Link to="/" className="block p-2 rounded hover:bg-gray-700">
              Products
            </Link>
            {token && role === "user" && (
              <>
                <Link to="/checkout" className="block p-2 rounded hover:bg-gray-700">
                  Checkout
                </Link>
                <Link to="/transactions" className="block p-2 rounded hover:bg-gray-700">
                  Transactions
                </Link>
              </>
            )}
            {token && role === "admin" && (
              <Link to="/transactions/all" className="block p-2 rounded hover:bg-gray-700">
                All Transactions
              </Link>
            )}
          </nav>
        </div>
        <div className="space-y-2">
          {token ? (
            <button
              onClick={handleLogout}
              className="w-full p-2 bg-red-600 hover:bg-red-500 rounded text-center"
            >
              Logout
            </button>
          ) : (
            <>
              <Link
                to="/login"
                className="block p-2 rounded bg-blue-600 hover:bg-blue-500 text-center"
              >
                Login
              </Link>
              <Link
                to="/register"
                className="block p-2 rounded bg-green-600 hover:bg-green-500 text-center"
              >
                Register
              </Link>
            </>
          )}
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-6 overflow-auto">
        <Routes>
          <Route path="/" element={<Products token={token} isAdmin={role === "admin"} />} />
          <Route
            path="/login"
            element={
              <Login
                setToken={(t) => {
                  const payload = JSON.parse(atob(t.split(".")[1]));
                  handleLogin(t, payload.role);
                }}
              />
            }
          />
          <Route path="/register" element={<Register />} />
          <Route path="/checkout" element={<Checkout token={token} />} />
          <Route path="/transactions" element={<Transactions token={token} />} />
          <Route path="/transactions/all" element={<AllTransactions token={token} />} />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;
