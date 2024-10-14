import { createContext, useState, useEffect } from "react";

export const ModeContext = createContext();

export const ModeProvider = ({ children }) => {
  const [darkMode, setDarkMode] = useState(() => {
    const savedMode = localStorage.getItem("isDarkMode");
    return savedMode ? JSON.parse(savedMode) : false;
  });

  const toggleTheme = () => {
    setDarkMode((prevTheme) => !prevTheme);
  };

  useEffect(() => {
    localStorage.setItem("isDarkMode", JSON.stringify(darkMode));
  }, [darkMode]);

  return (
    <ModeContext.Provider value={{ darkMode, toggleTheme }}>
      {children}
    </ModeContext.Provider>
  );
};
