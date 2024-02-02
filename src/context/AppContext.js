import React, { createContext, useState } from "react";

export const AppContext = createContext({});

export const AppContextProvider = ({ children }) => {
  const [isopenMenu, setisopenMenu] = useState(false);
  const [theme, settheme] = useState(
    localStorage.getItem("diary-theme") ?? "default"
  );
  const value = {
    isopenMenu,
    setisopenMenu,
    theme,
    settheme,
  };
  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};
