import React, { useState, useContext } from "react";
import { ERPContext } from "../context/ERPContext";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const { login } = useContext(ERPContext);

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const handleLogin = (e) => {
    e.preventDefault();
    if (username === "user" && password === "user123") {
      login("user");
      navigate("/"); // Go to start page
    }
    const success = login(username, password);

    if (!success) {
      setError("Invalid credentials");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 shadow rounded w-96">
        <h2 className="text-2xl font-bold mb-6 text-center">
          MediQuick Login
        </h2>

        {error && (
          <p className="text-red-600 text-sm mb-3">{error}</p>
        )}

        <form onSubmit={handleLogin}>
          <input
            type="text"
            placeholder="Username"
            className="w-full mb-3 p-2 border rounded"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />

          <input
            type="password"
            placeholder="Password"
            className="w-full mb-4 p-2 border rounded"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
          >
            Login
          </button>
        </form>

        <div className="mt-4 text-sm text-gray-600">
          <p><strong>Test Accounts:</strong></p>
          <p>Admin → admin / admin123</p>
          <p>Staff → staff / staff123</p>
          <p>User → user / user123</p>
        </div>
      </div>
    </div>
  );
}