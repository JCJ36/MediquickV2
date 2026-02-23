import React, { useState, useContext } from "react";
import { ERPContext } from "../context/ERPContext";
import { useNavigate } from "react-router-dom";

export default function MedicineSelectionPage() {
  const { confirmedPharmacy } = useContext(ERPContext);
  const navigate = useNavigate();

  const [selectedMedicines, setSelectedMedicines] = useState([]);
  const [prescription, setPrescription] = useState(null);
  const [orderPlaced, setOrderPlaced] = useState(false);
  const [paymentDone, setPaymentDone] = useState(false);

  const [medicines] = useState([
    { id: 1, name: "Paracetamol", img: "/images/paracetamol.png", controlled: false },
    { id: 2, name: "Amoxicillin", img: "/images/amoxicillin.png", controlled: false },
    { id: 3, name: "Ibuprofen", img: "/images/ibuprofen.png", controlled: false },
    { id: 4, name: "Ephedrine", img: "/images/ephedrine.png", controlled: true },
  ]);

  if (!confirmedPharmacy) {
    return <div className="text-center mt-10">Please select a pharmacy first. <button onClick={() => navigate("/order")} className="text-blue-600 underline">Go back</button></div>;
  }

  const toggleMedicine = (med) => {
    setSelectedMedicines(prev => 
      prev.find(m => m.id === med.id) ? prev.filter(m => m.id !== med.id) : [...prev, med]
    );
  };

  const requiresPrescription = selectedMedicines.some((m) => m.controlled);

  const handlePlaceOrder = () => {
    if (selectedMedicines.length === 0) return alert("Please select at least one medicine.");
    if (requiresPrescription && !prescription) return alert("Prescription required!");
    
    // We navigate to payment and can even pass the order details if needed
    navigate("/payment");
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white border rounded-lg shadow-lg mt-10">
      <h2 className="text-2xl font-bold mb-2 text-center text-gray-800">Review Your Order</h2>
      <p className="text-center text-gray-500 mb-8 italic">Pharmacy: {confirmedPharmacy.name}</p>
      
      {/* Medicine Grid */}
      <div className="flex flex-wrap justify-center gap-6 mb-8">
        {medicines.map((med) => (
          <div
            key={med.id}
            className={`group relative border rounded-xl p-4 cursor-pointer transition-all w-48 ${
              selectedMedicines.some(m => m.id === med.id) ? "border-green-600 ring-2 ring-green-100" : "border-gray-200 hover:border-blue-400"
            }`}
            onClick={() => toggleMedicine(med)}
          >
            <img src={med.img} alt={med.name} className="w-40 h-40 object-contain mx-auto" />
            <p className="mt-3 font-semibold text-center">{med.name}</p>
          </div>
        ))}
      </div>

      {requiresPrescription && (
        <div className="max-w-md mx-auto mb-6 p-4 bg-red-50 border border-red-100 rounded-lg text-center">
          <label className="block mb-2 font-semibold text-red-700">Upload Prescription:</label>
          <input type="file" className="text-sm block w-full border rounded p-1 bg-white" onChange={(e) => setPrescription(e.target.files[0])} />
        </div>
      )}

      <div className="flex justify-center gap-4">
        <button onClick={() => navigate("/order")} className="bg-gray-500 text-white px-8 py-3 rounded-full font-bold">Back to Map</button>
        <button onClick={handlePlaceOrder} className="bg-blue-600 hover:bg-blue-700 text-white px-10 py-3 rounded-full font-bold shadow-lg transition">
          Proceed to Payment
        </button>
      </div>
    </div>
  );
}