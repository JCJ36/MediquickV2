import React, { useContext } from "react";
import { ERPContext } from "../context/ERPContext";

export default function AdminPage() {
  const { orders } = useContext(ERPContext);

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Admin Dashboard</h1>

      <h2 className="font-semibold">All Orders</h2>

      {orders.map((order) => (
        <div key={order.id} className="border p-2 mt-2">
          {order.patientName} - {order.medicine} ({order.status})
        </div>
      ))}
    </div>
  );
}