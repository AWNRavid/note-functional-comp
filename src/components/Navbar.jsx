import { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { UserContext } from "../context/userContext";
import { ThemeContext } from "../context/themeContext";
import { LanguageContext } from "../context/languageContext";
import { GrLanguage } from "react-icons/gr";
import { CiLogout } from "react-icons/ci";

const Navbar = () => {
  const { user, setUser } = useContext(UserContext);
  const navigate = useNavigate();
  const { theme, toggleTheme } = useContext(ThemeContext);
  const { lang, toggleLang } = useContext(LanguageContext);

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem("accessToken");
    localStorage.removeItem("user");
    navigate("/");
  };

  const dark = "text-white bg-gray-500";
  const light = "text-white bg-blue-300";

  return (
    <nav className={`w-full ${theme === "dark" ? dark : light} shadow-lg `}>
      <div className="w-5/6 mx-auto py-4 ">
        {user ? (
          <div className="flex items-center justify-between font-bold">
            <div className="flex gap-10 items-center">
              <Link to={"/notes"} className="text-xl hover:text-sky-700 transition duration-100">
                {lang === "id" ? "Catatan" : "Notes"}
              </Link>
              <Link to={"/archive"} className="text-xl hover:text-sky-700 transition duration-100">
                {lang === "id" ? "Arsip Catatan" : "Archived Notes"}
              </Link>
              <Link to={"/new-note"} className="text-xl hover:text-sky-700 transition duration-100">
                {lang === "id" ? "Catatan Baru" : "New Notes"}
              </Link>
            </div>

            <div className="flex gap-10 items-center">
              <h1 className="text-2xl">{user.name.toUpperCase()}</h1>
              <button onClick={toggleTheme}>{theme === "light" ? "🌙" : "🌞"}</button>
              <button onClick={toggleLang} className="flex items-center gap-1 text-xl">
                <GrLanguage />
                {lang === "id" ? "EN" : "ID"}
              </button>
              <button onClick={handleLogout} className="flex items-center gap-1 text-xl">
                <CiLogout />
                {lang === "id" ? "Keluar" : "Log Out"}
              </button>
            </div>
          </div>
        ) : (
          <div className="flex items-center font-bold gap-10">
            <Link to={"/sign-in"}>{lang === "id" ? "Masuk" : "Sign In"}</Link>
            <Link to={"/register"}>{lang === "id" ? "Daftar" : "Register"}</Link>
            <button onClick={toggleLang}>{lang === "id" ? "EN" : "ID"}</button>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
