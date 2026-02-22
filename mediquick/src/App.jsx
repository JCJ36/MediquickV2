import React, { useContext } from "react";
import { ERPContext } from "./context/ERPContext";
import Sidebar from "./components/Sidebar";
import StartPage from "./pages/StartPage";
import OrderPage from "./pages/OrderPage";
import AdminPage from "./pages/AdminPage";
import StaffPage from "./pages/StaffPage";
import ClerkPage from "./pages/ClerkPage";
import Login from "./pages/Login";

function App() {
  const { isLoggedIn, currentPage, userRole } = useContext(ERPContext);

  if (!isLoggedIn) return <Login />;

  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-1 min-h-screen p-8 bg-gradient-to-br from-indigo-900 via-purple-900 to-slate-900 text-white">

        {currentPage === "start" && <StartPage />}
        {currentPage === "order" && <OrderPage />}

        {userRole === "admin" && currentPage === "admin" && <AdminPage />}
        {userRole === "staff" && currentPage === "staff" && <StaffPage />}
        {userRole === "clerk" && currentPage === "clerk" && <ClerkPage />}

      </div>
    </div>
  );
}

export default App;