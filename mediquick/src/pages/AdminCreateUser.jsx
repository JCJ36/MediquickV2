import { useState } from "react";

export default function AdminCreateUser() {
  const [users, setUsers] = useState([]);

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    role: "staff",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Add new user to local state
    setUsers([...users, form]);

    alert("User created successfully (Demo Mode)");

    // Reset form
    setForm({
      name: "",
      email: "",
      password: "",
      role: "staff",
    });
  };

  return (
    <div className="min-h-screen bg-gray-100 p-10">

      <div className="max-w-3xl mx-auto bg-white p-8 rounded-2xl shadow-xl">

        <h2 className="text-2xl font-bold text-[#2D1B4E] mb-6">
          Create Staff / Clerk Account
        </h2>

        {/* FORM */}
        <form onSubmit={handleSubmit} className="space-y-4 mb-8">

          <input
            type="text"
            name="name"
            placeholder="Full Name"
            value={form.name}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#7C3AED]"
            required
          />

          <input
            type="email"
            name="email"
            placeholder="Email"
            value={form.email}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#7C3AED]"
            required
          />

          <input
            type="password"
            name="password"
            placeholder="Password"
            value={form.password}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#7C3AED]"
            required
          />

          <select
            name="role"
            value={form.role}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#7C3AED]"
          >
            <option value="staff">Staff</option>
            <option value="clerk">Clerk</option>
          </select>

          <button
            type="submit"
            className="w-full bg-[#7C3AED] text-white py-3 rounded-xl hover:bg-[#8B5CF6] transition shadow-lg"
          >
            Create Account
          </button>
        </form>

        {/* USER LIST */}
        <h3 className="text-lg font-semibold text-[#2D1B4E] mb-4">
          Created Accounts (Demo)
        </h3>

        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-gray-200 text-gray-600">
              <th className="p-3">Name</th>
              <th className="p-3">Email</th>
              <th className="p-3">Role</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user, index) => (
              <tr key={index} className="border-t hover:bg-gray-50 transition">
                <td className="p-3">{user.name}</td>
                <td className="p-3">{user.email}</td>
                <td className="p-3 text-[#7C3AED] font-semibold">
                  {user.role}
                </td>
              </tr>
            ))}
          </tbody>
        </table>

      </div>
    </div>
  );
}