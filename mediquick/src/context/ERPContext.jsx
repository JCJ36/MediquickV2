import React, { createContext, useState } from "react";

export const ERPContext = createContext();

export function ERPProvider({ children }) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userRole, setUserRole] = useState(null);
  const [currentPage, setCurrentPage] = useState("start");

  const [orders, setOrders] = useState([]);

  const login = (username, password) => {
    if (username === "admin" && password === "admin123") {
      setUserRole("admin");
      setCurrentPage("admin");
      setIsLoggedIn(true);
    } else if (username === "staff" && password === "staff123") {
      setUserRole("staff");
      setCurrentPage("staff");
      setIsLoggedIn(true);
    } else if (username === "clerk" && password === "clerk123") {
      setUserRole("clerk");
      setCurrentPage("clerk");
      setIsLoggedIn(true);
    } else {
      alert("Invalid credentials");
    }
  };

  const logout = () => {
    setIsLoggedIn(false);
    setUserRole(null);
    setCurrentPage("start");
  };

  return (
    <ERPContext.Provider
      value={{
        isLoggedIn,
        userRole,
        currentPage,
        setCurrentPage,
        login,
        logout,
        orders,
        setOrders,
      }}
    >
      {children}
    </ERPContext.Provider>
  );
}