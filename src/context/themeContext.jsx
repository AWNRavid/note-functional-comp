import { createContext, useEffect, useMemo } from "react";
import PropTypes from "prop-types";
import { useState } from "react";

export const ThemeContext = createContext();

const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");

  const toggleTheme = () => {
    return setTheme((prevTheme) => {
      return prevTheme === "light" ? "dark" : "light";
    });
  };

  useEffect(() => {
    localStorage.setItem("theme", theme);
  }, [theme]);

  const themeContextValue = useMemo(() => {
    return {
      theme,
      toggleTheme,
    };
  }, [theme]);

  return <ThemeContext.Provider value={themeContextValue}>{children}</ThemeContext.Provider>;
};

ThemeProvider.propTypes = {
  children: PropTypes.element,
};

export default ThemeProvider;
