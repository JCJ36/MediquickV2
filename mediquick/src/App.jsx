import React, { useContext } from "react";
import { ERPContext } from "./context/ERPContext";
import Sidebar from "./components/Sidebar";
import StartPage from "./pages/StartPage";
import OrderPage from "./pages/OrderPage";
import AdminPage from "./pages/AdminPage";
import ClerkPage from "./pages/ClerkPage";
import Login from "./pages/Login";
import DoctorPage from "./pages/DoctorPage";  
import NursePage from "./pages/NursePAge";


function App() {
  const { isLoggedIn, currentPage, userRole } = useContext(ERPContext);

  if (!isLoggedIn) return <Login />;

  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-1 min-h-screen p-8 bg-gradient-to-br from-indigo-900 via-purple-900 to-slate-900 text-white">

        {currentPage === "start" && <StartPage />}
        {currentPage === "order" && <OrderPage />}
        {currentPage === "doctor" && <DoctorPage />}

        {userRole === "admin" && currentPage === "admin" && <AdminPage />}
        {userRole === "doctor" && currentPage === "doctor" && <DoctorPage />}
        {userRole === "nurse" && currentPage === "nurse" && <NursePage />}  
        {userRole === "clerk" && currentPage === "clerk" && <ClerkPage />}

      </div>
    </div>
  );
}

export default App;