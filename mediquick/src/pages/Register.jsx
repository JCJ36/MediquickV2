import React, { useState, useContext } from "react";
import { ERPContext } from "../context/ERPContext";
import { useNavigate, Link } from "react-router-dom";

export default function Register() {
  const { registerUser } = useContext(ERPContext);
  const [form, setForm] = useState({ username: "", password: "" });
  const navigate = useNavigate();

  const handleRegister = (e) => {
    e.preventDefault();
    const result = registerUser(form.username, form.password);
    if (result.success) {
      alert("Registration successful! Please login.");
      navigate("/login");
    } else {
      alert(result.message);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50">
      <form onSubmit={handleRegister} className="bg-white p-8 rounded-xl shadow-lg w-96">
        <h2 className="text-2xl font-bold mb-6 text-center text-blue-600">Create Account</h2>
        <input 
          type="text" placeholder="Username" 
          className="w-full p-3 mb-4 border rounded-lg"
          onChange={(e) => setForm({...form, username: e.target.value})} 
        />
        <input 
          type="password" placeholder="Password" 
          className="w-full p-3 mb-6 border rounded-lg"
          onChange={(e) => setForm({...form, password: e.target.value})} 
        />
        <button className="w-full bg-blue-600 text-white py-3 rounded-lg font-bold hover:bg-blue-700">Register</button>
        <p className="mt-4 text-center text-sm text-gray-500">
          Already have an account? <Link to="/login" className="text-blue-600 underline">Login</Link>
        </p>
      </form>
    </div>
  );
}