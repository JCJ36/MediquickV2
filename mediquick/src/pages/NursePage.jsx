import React, { useContext } from "react";
import { ERPContext } from "../context/ERPContext";

export default function NursePage() {
  const { prescriptions, createOrderFromPrescription } =
    useContext(ERPContext);

  const pendingPrescriptions = prescriptions.filter(
    (p) => p.status === "pending"
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-slate-900 text-white p-8">
      <h1 className="text-3xl font-bold text-purple-300 mb-6">
        Nurse Dashboard
      </h1>

      {pendingPrescriptions.length === 0 && (
        <p>No pending prescriptions.</p>
      )}

      {pendingPrescriptions.map((p) => (
        <div
          key={p.id}
          className="bg-white/10 p-6 rounded-xl mb-4 shadow"
        >
          <p><strong>Patient:</strong> {p.patientName}</p>
          <p><strong>Medicine:</strong> {p.medicine}</p>
          <p><strong>Dosage:</strong> {p.dosage}</p>

          <button
            onClick={() => createOrderFromPrescription(p.id)}
            className="mt-3 bg-green-600 px-4 py-2 rounded"
          >
            Order Medication
          </button>
        </div>
      ))}
    </div>
  );
}