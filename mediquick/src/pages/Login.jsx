import React, { useState, useContext } from "react";
import { ERPContext } from "../context/ERPContext";

export default function Login() {
  const { login } = useContext(ERPContext);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    login(email, password);
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center bg-cover bg-center relative"
      style={{
        backgroundImage: "url('/images/hospital-bg.png')",
      }}
    >
      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-indigo-900/80 via-purple-900/80 to-black/80"></div>

      {/* Login Card */}
      <div className="relative bg-white/10 backdrop-blur-md p-10 rounded-2xl shadow-2xl w-96 text-white border border-white/20">
        <h1 className="text-3xl font-bold mb-6 text-purple-300 text-center">
          MediQuick ERP
        </h1>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="email"
            placeholder="Email"
            className="w-full p-3 rounded-lg bg-white/20 border border-white/20 placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-500"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <input
            type="password"
            placeholder="Password"
            className="w-full p-3 rounded-lg bg-white/20 border border-white/20 placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-500"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <button
            type="submit"
            className="w-full bg-purple-600 hover:bg-purple-700 transition p-3 rounded-lg font-semibold"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
}