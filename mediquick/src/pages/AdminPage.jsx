import React, { useContext, useState } from "react";
import { ERPContext } from "../context/ERPContext";

export default function AdminPage() {
  const { users, createUser, toggleUserStatus } = useContext(ERPContext);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("staff");

  const handleCreateUser = () => {
    if (!email || !password) {
      alert("Please fill all fields");
      return;
    }

    createUser({
      email,
      password,
      role,
      status: "active",
    });

    setEmail("");
    setPassword("");
    setRole("staff");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-indigo-900 text-white p-8">
      
      {/* Header */}
      <h1 className="text-3xl font-bold mb-8 text-purple-300">
        Admin Control Panel
      </h1>

      {/* Create User Card */}
      <div className="bg-white/10 backdrop-blur-md p-6 rounded-2xl shadow-lg border border-white/20 mb-10">
        <h2 className="text-xl font-semibold mb-4 text-purple-200">
          Create New User
        </h2>

        <div className="grid md:grid-cols-3 gap-4">
          <input
            type="email"
            placeholder="Email"
            className="p-3 rounded-lg bg-white/20 border border-white/20 focus:outline-none focus:ring-2 focus:ring-purple-500"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <input
            type="password"
            placeholder="Password"
            className="p-3 rounded-lg bg-white/20 border border-white/20 focus:outline-none focus:ring-2 focus:ring-purple-500"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <select
            className="p-3 rounded-lg bg-white text-black border border-white/20 focus:outline-none focus:ring-2 focus:ring-purple-500"
            value={role}
            onChange={(e) => setRole(e.target.value)}
          >
            <option value="doctor">Doctor</option>
            <option value="nurse">Nurse</option>
            <option value="clerk">Clerk</option>
            <option value="admin">Admin</option>
          </select>
        </div>

        <button
          onClick={handleCreateUser}
          className="mt-4 bg-purple-600 hover:bg-purple-700 transition px-6 py-2 rounded-lg font-semibold"
        >
          Create User
        </button>
      </div>

      {/* User Status Table */}
      <div className="bg-white/10 backdrop-blur-md p-6 rounded-2xl shadow-lg border border-white/20">
        <h2 className="text-xl font-semibold mb-4 text-purple-200">
          User Status Checker
        </h2>

        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="border-b border-white/20 text-purple-300">
                <th className="py-3">Email</th>
                <th>Role</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>

            <tbody>
              {users.map((u, index) => (
                <tr
                  key={index}
                  className="border-b border-white/10 hover:bg-white/5 transition"
                >
                  <td className="py-3">{u.email}</td>
                  <td className="capitalize">{u.role}</td>

                  <td>
                    <span
                      className={`px-3 py-1 rounded-full text-sm font-semibold ${
                        u.status === "active"
                          ? "bg-green-600/80"
                          : "bg-red-600/80"
                      }`}
                    >
                      {u.status}
                    </span>
                  </td>

                  <td>
                    <button
                      onClick={() => toggleUserStatus(u.email)}
                      className="bg-indigo-600 hover:bg-indigo-700 transition px-4 py-1 rounded-lg text-sm"
                    >
                      Toggle Status
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
}