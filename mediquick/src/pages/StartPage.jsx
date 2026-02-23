import React, { useContext } from "react";
import { ERPContext } from "../context/ERPContext";
import { useNavigate } from "react-router-dom";

export default function StartPage() {
  const { setOrderType, setCurrentPage } = useContext(ERPContext);
  const navigate = useNavigate();
  return (
    <div className="text-center">
      <h1 className="text-3xl font-bold mb-8">
        Choose Order Type
      </h1>

      <div className="flex justify-center gap-6">
        <button
          className="bg-green-500 text-white px-6 py-3 rounded"
          onClick={() => {
            setOrderType("delivery");
            navigate("/order"); // Go to map
          }}
        >
          Delivery
        </button>

        <button
          className="bg-blue-500 text-white px-6 py-3 rounded"
          onClick={() => {
            setOrderType("pickup");
            navigate("/order"); // Go to map
          }}
        >
          Pick Up
        </button>
      </div>
    </div>
  );
}