import { useState, useContext } from "react";
import { ERPContext } from "../context/ERPContext";

const HR = () => {
  const { employees, setEmployees } = useContext(ERPContext);
  const [name, setName] = useState("");

  const addEmployee = () => {
    if (!name.trim()) return;
    setEmployees([...employees, { id: Date.now(), name }]);
    setName("");
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">HR Module</h1>

      <div className="flex gap-3 mb-6">
        <input
          className="border p-2 rounded w-64"
          placeholder="Employee Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <button
          onClick={addEmployee}
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          Add
        </button>
      </div>

      <ul className="space-y-2">
        {employees.map(emp => (
          <li key={emp.id} className="bg-gray-100 p-3 rounded">
            {emp.name}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default HR;
