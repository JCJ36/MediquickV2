// import React, { createContext, useState } from "react";

// export const ERPContext = createContext();

// export function ERPProvider({ children }) {
//   const [isLoggedIn, setIsLoggedIn] = useState(false);
//   const [role, setRole] = useState(null); // admin | staff | user
//   const [currentPage, setCurrentPage] = useState("start");
//   const [orderType, setOrderType] = useState(null);

//   // Dummy login function (for testing roles)
//   const login = (username, password) => {
//     // ADMIN
//     if (username === "admin" && password === "admin123") {
//       setRole("admin");
//       setIsLoggedIn(true);
//       setCurrentPage("admin");
//       return true;
//     }

//     // STAFF
//     if (username === "staff" && password === "staff123") {
//       setRole("staff");
//       setIsLoggedIn(true);
//       setCurrentPage("staff");
//       return true;
//     }

//     // USER (patient)
//     if (username === "user" && password === "user123") {
//       setRole("user");
//       setIsLoggedIn(true);
//       setCurrentPage("start");
//       return true;
//     }

//     return false;
//   };

//   const logout = () => {
//     setIsLoggedIn(false);
//     setRole(null);
//     setCurrentPage("start");
//   };

//   return (
//     <ERPContext.Provider
//       value={{
//         isLoggedIn,
//         setIsLoggedIn,
//         role,
//         setRole,
//         currentPage,
//         setCurrentPage,
//         orderType,
//         setOrderType,
//         login,
//         logout,
//       }}
//     >
//       {children}
//     </ERPContext.Provider>
//   );
// }

import React, { createContext, useState } from "react";

export const ERPContext = createContext();

export function ERPProvider({ children }) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [role, setRole] = useState(null); 
  const [orderType, setOrderType] = useState(null);
  const [confirmedPharmacy, setConfirmedPharmacy] = useState(null); // Added this

  const login = (roleType) => {
    setRole(roleType);
    setIsLoggedIn(true);
  };

  const logout = () => {
    setIsLoggedIn(false);
    setRole(null);
    setConfirmedPharmacy(null);
  };

  return (
    <ERPContext.Provider
      value={{
        isLoggedIn,
        role,
        orderType,
        setOrderType,
        confirmedPharmacy,
        setConfirmedPharmacy,
        login,
        logout,
      }}
    >
      {children}
    </ERPContext.Provider>
  );
}