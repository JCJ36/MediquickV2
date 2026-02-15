import React, { createContext, useState } from "react";

export const ERPContext = createContext();

export const ERPProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const [user, setUser] = useState(null);

  const [branches] = useState([
    { id: 1, name: "Manila Pharmacy", position: [14.5995, 120.9842] },
    { id: 2, name: "Quezon Pharmacy", position: [14.6760, 121.0437] },
    { id: 3, name: "Makati Pharmacy", position: [14.5547, 121.0244] },
  ]);

  const login = (email) => {
    setUser({ email });
    setIsLoggedIn(true);
  };

  const logout = () => {
    setUser(null);
    setIsLoggedIn(false);
  };

  return (
    <ERPContext.Provider
      value={{
        isLoggedIn,
        user,
        login,
        logout,
        branches,
      }}
    >
      {children}
    </ERPContext.Provider>
  );
};
