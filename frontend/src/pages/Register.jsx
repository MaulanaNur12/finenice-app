import { useState } from "react";

export default function Register() {
  const [form, setForm] = useState({ username: "", password: "", role: "user" });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await fetch("http://localhost:5000/auth/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });
    const data = await res.json();
    alert(data.msg);
  };

 return (
  <div className="flex items-center justify-center min-h-screen bg-gray-900">
    <form
      onSubmit={handleSubmit}
      className="bg-gray-800 text-white p-8 rounded shadow-md w-full max-w-sm space-y-4"
    >
      <h2 className="text-2xl font-bold text-center">Register</h2>

      <input
        type="text"
        placeholder="Username"
        onChange={(e) => setForm({ ...form, username: e.target.value })}
        className="w-full px-4 py-2 bg-white text-black rounded focus:outline-none"
      />

      <input
        type="password"
        placeholder="Password"
        onChange={(e) => setForm({ ...form, password: e.target.value })}
        className="w-full px-4 py-2 bg-white text-black rounded focus:outline-none"
      />

      <select
        onChange={(e) => setForm({ ...form, role: e.target.value })}
        className="w-full px-4 py-2 bg-white text-black rounded focus:outline-none"
      >
        <option value="user">User</option>
        <option value="admin">Admin</option>
      </select>

      <button
        type="submit"
        className="w-full bg-red-600 hover:bg-red-700 text-white font-semibold py-2 px-4 rounded"
      >
        Register
      </button>
    </form>
  </div>
);

}
