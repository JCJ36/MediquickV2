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
    <div className="max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold text-blue-800 mb-6">
        Create Prescription
      </h1>

      <div className="bg-white p-6 rounded-xl shadow-md grid grid-cols-1 md:grid-cols-2 gap-4">
        <input
          className="border p-3 rounded-lg text-lg"
          placeholder="Patient Name"
          value={patientName}
          onChange={(e) => setPatientName(e.target.value)}
        />

        <input
          className="border p-3 rounded-lg text-lg"
          placeholder="Medicine"
          value={medicine}
          onChange={(e) => setMedicine(e.target.value)}
        />

        <input
          type="number"
          className="border p-3 rounded-lg text-lg"
          placeholder="Price (₱)"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
        />

        <select
          className="border p-3 rounded-lg text-lg"
          value={orderType}
          onChange={(e) => setOrderType(e.target.value)}
        >
          <option value="pickup">Pickup</option>
          <option value="delivery">Delivery</option>
        </select>

        <button
          onClick={createOrder}
          className="col-span-2 bg-blue-700 hover:bg-blue-800 text-white text-lg py-3 rounded-lg transition"
        >
          Save Prescription
        </button>
      </div>
    </div>
  );
}