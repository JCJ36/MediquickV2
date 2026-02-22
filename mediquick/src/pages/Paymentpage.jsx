import React, { useState, useContext } from "react";
import { ERPContext } from "../context/ERPContext";

export default function StaffPage() {
  const { orders, setOrders } = useContext(ERPContext);

  const [patientName, setPatientName] = useState("");
  const [medicine, setMedicine] = useState("");
  const [price, setPrice] = useState("");
  const [orderType, setOrderType] = useState("pickup");

  const createOrder = () => {
    if (!patientName || !medicine || !price) return;

    const newOrder = {
      id: Date.now(),
      patientName,
      medicine,
      price,
      orderType,
      paymentStatus: "Unpaid",
      status: "Waiting Payment",
    };

    setOrders([...orders, newOrder]);

    setPatientName("");
    setMedicine("");
    setPrice("");
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Staff - Create Prescription</h1>

      <input
        className="border p-2 mr-2"
        placeholder="Patient Name"
        value={patientName}
        onChange={(e) => setPatientName(e.target.value)}
      />

      <input
        className="border p-2 mr-2"
        placeholder="Medicine"
        value={medicine}
        onChange={(e) => setMedicine(e.target.value)}
      />

      <input
        className="border p-2 mr-2"
        placeholder="Price"
        type="number"
        value={price}
        onChange={(e) => setPrice(e.target.value)}
      />

      <select
        className="border p-2 mr-2"
        value={orderType}
        onChange={(e) => setOrderType(e.target.value)}
      >
        <option value="pickup">Pickup</option>
        <option value="delivery">Delivery</option>
      </select>

      <button
        onClick={createOrder}
        className="bg-blue-600 text-white px-4 py-2 rounded"
      >
        Create Order
      </button>

      <div className="mt-6">
        {orders.map((order) => (
          <div key={order.id} className="border p-2 mt-2">
            {order.patientName} - {order.medicine} - ₱{order.price} - {order.paymentStatus}
          </div>
        ))}
      </div>
    </div>
  );
}