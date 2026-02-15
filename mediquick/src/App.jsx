import React, { useContext } from "react";
import { ERPContext } from "./context/ERPContext";
import Sidebar from "./components/Sidebar";
import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";

export default function App() {
  const { isLoggedIn } = useContext(ERPContext);

  if (!isLoggedIn) {
    return <Login />;
  }

  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-1 bg-gray-100 min-h-screen p-8">
        <Dashboard />
      </div>
    </div>
  );
}
