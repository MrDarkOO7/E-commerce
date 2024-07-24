import React, { createContext, useState } from "react";

export const GlobalInfo = createContext();

export const AppProvider = ({ children }) => {
  const [totalProductsAvailable, setTotalProductsAvailable] = useState(0);
  const [loggedInID, setloggedInID] = useState("");

  return (
    <GlobalInfo.Provider
      value={{
        totalProductsAvailable,
        setTotalProductsAvailable,
        loggedInID,
        setloggedInID,
      }}
    >
      {children}
    </GlobalInfo.Provider>
  );
};
