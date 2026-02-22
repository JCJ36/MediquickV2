import React, { useState, useContext } from "react";
import { ERPContext } from "../context/ERPContext";

export default function DoctorPage() {
  const { addPrescription } = useContext(ERPContext);

  const [patientName, setPatientName] = useState("");
  const [medicine, setMedicine] = useState("");
  const [dosage, setDosage] = useState("");

  const handleSubmit = () => {
    if (!patientName || !medicine || !dosage) {
      alert("Please fill all fields");
      return;
    }

    addPrescription({
      patientName,
      medicine,
      dosage,
      doctor: "Dr. User",
    });

    setPatientName("");
    setMedicine("");
    setDosage("");

    alert("Prescription sent to Nurse");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-slate-900 text-white p-8">
      <h1 className="text-3xl font-bold text-purple-300 mb-6">
        Doctor Dashboard
      </h1>

      <div className="bg-white/10 p-6 rounded-xl space-y-4">
        <input
          placeholder="Patient Name"
          className="w-full p-3 rounded bg-white/20"
          value={patientName}
          onChange={(e) => setPatientName(e.target.value)}
        />

        <input
          placeholder="Medicine Name"
          className="w-full p-3 rounded bg-white/20"
          value={medicine}
          onChange={(e) => setMedicine(e.target.value)}
        />

        <input
          placeholder="Dosage"
          className="w-full p-3 rounded bg-white/20"
          value={dosage}
          onChange={(e) => setDosage(e.target.value)}
        />

        <button
          onClick={handleSubmit}
          className="bg-purple-600 px-6 py-2 rounded"
        >
          Send Prescription
        </button>
      </div>
    </div>
  );
}