import { useState, useContext } from "react";
import { ERPContext } from "../context/ERPContext";

const Inventory = () => {
  const { products, setProducts } = useContext(ERPContext);
  const [product, setProduct] = useState("");

  const addProduct = () => {
    if (!product.trim()) return;
    setProducts([...products, { id: Date.now(), name: product }]);
    setProduct("");
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Inventory</h1>

      <div className="flex gap-3 mb-6">
        <input
          className="border p-2 rounded w-64"
          placeholder="Product Name"
          value={product}
          onChange={(e) => setProduct(e.target.value)}
        />
        <button
          onClick={addProduct}
          className="bg-green-600 text-white px-4 py-2 rounded"
        >
          Add
        </button>
      </div>

      <ul className="space-y-2">
        {products.map(p => (
          <li key={p.id} className="bg-gray-100 p-3 rounded">
            {p.name}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Inventory;
