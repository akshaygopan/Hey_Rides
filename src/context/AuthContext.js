import React, { createContext, useState } from "react";

export const AuthContext = createContext({});

export const AuthContextProvider = ({ children }) => {
  const [authDetails, setauthDetails] = useState({
    isAuthenticated: false,
    type: "user",
    name: "",
  });
  const value = {
    authDetails,
    setauthDetails,
  };
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
