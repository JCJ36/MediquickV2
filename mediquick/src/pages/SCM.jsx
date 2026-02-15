import { useState, useContext } from "react";
import { ERPContext } from "../context/ERPContext";

const SCM = () => {
  const { suppliers, setSuppliers } = useContext(ERPContext);
  const [supplier, setSupplier] = useState("");

  const addSupplier = () => {
    if (!supplier.trim()) return;
    setSuppliers([...suppliers, { id: Date.now(), name: supplier }]);
    setSupplier("");
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">SCM Module</h1>

      <div className="flex gap-3 mb-6">
        <input
          className="border p-2 rounded w-64"
          placeholder="Supplier Name"
          value={supplier}
          onChange={(e) => setSupplier(e.target.value)}
        />
        <button
          onClick={addSupplier}
          className="bg-orange-600 text-white px-4 py-2 rounded"
        >
          Add
        </button>
      </div>

      <ul className="space-y-2">
        {suppliers.map(s => (
          <li key={s.id} className="bg-gray-100 p-3 rounded">
            {s.name}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SCM;
