import React, { useContext } from "react";
import { ERPContext } from "../context/ERPContext";

export default function ClerkPage() {
  const { orders, setOrders } = useContext(ERPContext);

  const markReady = (id) => {
    const updated = orders.map((order) =>
      order.id === id
        ? { ...order, status: "Ready" }
        : order
    );
    setOrders(updated);
  };

  const statusBadge = (status) => {
    if (status === "Waiting Payment")
      return "bg-amber-100 text-amber-700";
    if (status === "Ready")
      return "bg-emerald-100 text-emerald-700";
    return "bg-gray-100 text-gray-700";
  };

  return (
    <div className="max-w-5xl mx-auto">
      <h1 className="text-3xl font-bold text-blue-800 mb-6">
        Order Processing
      </h1>

      <div className="space-y-4">
        {orders
          .filter((o) => o.paymentStatus === "Paid")
          .map((order) => (
            <div
              key={order.id}
              className="bg-white p-5 rounded-xl shadow-md flex justify-between items-center"
            >
              <div>
                <p className="text-lg font-semibold">
                  {order.patientName}
                </p>
                <p className="text-gray-600">
                  {order.medicine} • ₱{order.price}
                </p>
                <span
                  className={`inline-block mt-2 px-3 py-1 rounded-full text-sm ${statusBadge(
                    order.status
                  )}`}
                >
                  {order.status}
                </span>
              </div>

              {order.status !== "Ready" && (
                <button
                  onClick={() => markReady(order.id)}
                  className="bg-emerald-600 hover:bg-emerald-700 text-white px-5 py-2 rounded-lg"
                >
                  Mark Ready
                </button>
              )}
            </div>
          ))}
      </div>
    </div>
  );
}