import React, { createContext, useState } from "react";

export const ERPContext = createContext();

export function ERPProvider({ children }) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentPage, setCurrentPage] = useState("login");
  const [userRole, setUserRole] = useState(null);

  const [users, setUsers] = useState([
    {
      email: "admin@mediquick.com",
      password: "admin123",
      role: "admin",
      status: "active",
    },
    {
      email: "doctor@mediquick.com",
      password: "doc123",
      role: "doctor",
      status: "active",
    },
    {
      email: "nurse@mediquick.com",
      password: "nurse123",
      role: "nurse",
      status: "active",
    },
    {
      email: "clerk@mediquick.com",
      password: "clerk123",
      role: "clerk",
      status: "active",
    },
  ]);

  const [prescriptions, setPrescriptions] = useState([]);
  const [orders, setOrders] = useState([]);

  // LOGIN
  const login = (email, password) => {
    const foundUser = users.find(
      (u) =>
        u.email === email &&
        u.password === password &&
        u.status === "active"
    );

    if (foundUser) {
      setIsLoggedIn(true);
      setUserRole(foundUser.role);

      if (foundUser.role === "admin") setCurrentPage("admin");
      if (foundUser.role === "doctor") setCurrentPage("doctor");
      if (foundUser.role === "nurse") setCurrentPage("nurse");
      if (foundUser.role === "clerk") setCurrentPage("clerk");
    } else {
      alert("Invalid credentials or inactive account.");
    }
  };

  const logout = () => {
    setIsLoggedIn(false);
    setCurrentPage("login");
    setUserRole(null);
  };

  // DOCTOR FUNCTION
  const addPrescription = (prescription) => {
    setPrescriptions((prev) => [
      ...prev,
      {
        ...prescription,
        id: Date.now(),
        status: "pending",
      },
    ]);
  };

  // NURSE FUNCTION
  const createOrderFromPrescription = (prescriptionId) => {
    const prescription = prescriptions.find(
      (p) => p.id === prescriptionId
    );

    if (!prescription) return;

    setOrders((prev) => [
      ...prev,
      {
        ...prescription,
        orderId: Date.now(),
        status: "ordered",
      },
    ]);

    setPrescriptions((prev) =>
      prev.map((p) =>
        p.id === prescriptionId
          ? { ...p, status: "sent to pharmacy" }
          : p
      )
    );
  };

  return (
    <ERPContext.Provider
      value={{
        isLoggedIn,
        currentPage,
        setCurrentPage,
        userRole,
        login,
        logout,
        users,
        prescriptions,
        orders,
        addPrescription,
        createOrderFromPrescription,
      }}
    >
      {children}
    </ERPContext.Provider>
  );
}