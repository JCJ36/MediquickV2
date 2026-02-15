import React from "react";

export default function Sidebar() {
  return (
    <div className="w-64 h-screen bg-gray-900 text-white flex flex-col p-6">
      <h1 className="text-2xl font-bold mb-10">MediQuick ERP</h1>

      <nav className="flex flex-col space-y-4 text-sm">
        <a href="#" className="hover:text-blue-400 transition">
          Dashboard
        </a>
        <a href="#" className="hover:text-blue-400 transition">
          HR Management
        </a>
        <a href="#" className="hover:text-blue-400 transition">
          CRM
        </a>
        <a href="#" className="hover:text-blue-400 transition">
          Supply Chain
        </a>
        <a href="#" className="hover:text-blue-400 transition">
          Inventory
        </a>
      </nav>
    </div>
  );
}
