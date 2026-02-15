import { useState, useContext } from "react";
import { ERPContext } from "../context/ERPContext";

const CRM = () => {
  const { customers, setCustomers } = useContext(ERPContext);
  const [customer, setCustomer] = useState("");

  const addCustomer = () => {
    if (!customer.trim()) return;
    setCustomers([...customers, { id: Date.now(), name: customer }]);
    setCustomer("");
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">CRM Module</h1>

      <div className="flex gap-3 mb-6">
        <input
          className="border p-2 rounded w-64"
          placeholder="Customer Name"
          value={customer}
          onChange={(e) => setCustomer(e.target.value)}
        />
        <button
          onClick={addCustomer}
          className="bg-purple-600 text-white px-4 py-2 rounded"
        >
          Add
        </button>
      </div>

      <ul className="space-y-2">
        {customers.map(c => (
          <li key={c.id} className="bg-gray-100 p-3 rounded">
            {c.name}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CRM;
