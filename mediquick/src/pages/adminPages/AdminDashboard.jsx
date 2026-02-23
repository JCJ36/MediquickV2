import React from "react";

export default function AdminDashboard() {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Admin Dashboard</h1>

      <div className="grid grid-cols-2 gap-4">
        <div className="bg-white p-4 shadow rounded">
          <h2 className="font-semibold">Manage Users</h2>
        </div>

        <div className="bg-white p-4 shadow rounded">
          <h2 className="font-semibold">View All Orders</h2>
        </div>

        <div className="bg-white p-4 shadow rounded">
          <h2 className="font-semibold">Manage Pharmacies</h2>
        </div>
      </div>
    </div>
  );
}