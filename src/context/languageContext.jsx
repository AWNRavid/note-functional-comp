import { createContext, useMemo, useState } from "react";
import PropTypes from "prop-types";

export const LanguageContext = createContext();

const LanguageProvider = ({ children }) => {
  const [lang, setLang] = useState("id");

  const toggleLang = () => {
    return setLang((prevLang) => {
      return prevLang === "id" ? "en" : "id";
    });
  };

  const langContextValue = useMemo(() => {
    return {
      lang,
      toggleLang,
    };
  }, [lang]);

  return <LanguageContext.Provider value={langContextValue}>{children}</LanguageContext.Provider>;
};

LanguageProvider.propTypes = {
  children: PropTypes.element,
};

export default LanguageProvider;
