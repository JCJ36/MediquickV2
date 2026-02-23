import React, { useContext } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { ERPContext } from "./context/ERPContext";
import Sidebar from "./components/Sidebar";
import Login from "./pages/Login";
import StartPage from "./pages/StartPage";
import OrderPage from "./pages/OrderPage";
import MedicineSelectionPage from "./pages/MedicineSelectionPage";
import PaymentPage from "./pages/Paymentpage";
import AdminPage from "./pages/AdminPages/AdminPage";

export default function App() {
  const { isLoggedIn, role } = useContext(ERPContext);

  if (!isLoggedIn) return <Login />;

  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-1 bg-gray-100 min-h-screen p-8">
        <Routes>
          {/* User Routes */}
          {role === "user" && (
            <>
              <Route path="/" element={<StartPage />} />
              <Route path="/order" element={<OrderPage />} />
              <Route path="/order/medicines" element={<MedicineSelectionPage />} />
              <Route path="/payment" element={<PaymentPage />} />
            </>
          )}

          {/* Admin Routes */}
          {(role === "admin" || role === "staff") && (
            <Route path="/admin" element={<AdminPage />} />
          )}

          {/* Catch-all redirect */}
          <Route path="*" element={<Navigate to={role === "user" ? "/" : "/admin"} />} />
        </Routes>
      </div>
    </div>
  );
}