import { useContext } from "react";
import { UserContext } from "../context/userContext";
import { Link, useNavigate } from "react-router-dom";
import { getUserLogged, login, putAccessToken } from "../utils/network-data";
import { useForm } from "react-hook-form";
import { LanguageContext } from "../context/languageContext";
import { ThemeContext } from "../context/themeContext";

const light = "bg-white border-blue-300";
const dark = "bg-gray-500 text-black border-orange-400";

const SignInPage = () => {
  const { setUser } = useContext(UserContext);
  const navigate = useNavigate();
  const { lang } = useContext(LanguageContext);
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();
  const { theme } = useContext(ThemeContext);

  const onSubmit = async (data) => {
    const res = await login({ ...data });

    if (!res.error) {
      putAccessToken(res.data.accessToken);
      const { data } = await getUserLogged();
      setUser(data);
      localStorage.setItem("user", JSON.stringify(data));
      navigate("/notes");
    }
  };

  return (
    <section className=" min-h-full flex justify-center items-center">
      <div className={`p-8 rounded-xl shadow-md max-w-md w-full border-2 ${theme === "dark" ? dark : light}`}>
        <h2 className={`text-2xl font-semibold mb-6 text-center ${theme === "dark" ? "text-white" : "text-black"}`}>{lang === "id" ? "Masuk" : "Sign In"}</h2>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-4">
            <label
              htmlFor="email"
              className={`block ${theme === "dark" ? "text-white" : "text-black"} font-semibold mb-2`}
            >
              Email
            </label>
            <input
              type="text"
              id="email"
              name="email"
              placeholder={lang === "id" ? "Masukkan email" : "Enter your email"}
              className="w-full border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-400"
              {...register("email", {
                required: "This field is required.",
                pattern: { value: /^[^@ ]+@[^@ ]+\.[^@ .]{2,}$/, message: "Email not valid." },
              })}
            />
            {errors.email && <p className="mt-1 text-orange-400">{errors.email.message}</p>}
          </div>

          <div className="mb-4">
            <label
              htmlFor="password"
              className={`block ${theme === "dark" ? "text-white" : "text-black"} font-semibold mb-2`}
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              placeholder={lang === "id" ? "Masukkan kata sandi" : "Enter your password"}
              className="w-full border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-400"
              {...register("password", {
                required: "This field is required.",
                minLength: { value: 6, message: "Password must at least 6 characters." },
              })}
            />
          </div>
          {errors.password && <p className="mt-1 text-orange-400">{errors.password.message}</p>}

          <button
            type="submit"
            className={`w-full font-semibold py-2 px-4 rounded-md transition duration-300 text-white ${
              theme === "dark" ? "bg-gray-600 hover:bg-gray-700" : "bg-blue-400 hover:bg-blue-500"
            }`}
          >
            {lang === "id" ? "Masuk Ke Akun Anda" : "Sign In"}
          </button>

          <Link to={"/register"}>
            <p
              className={`mt-5 text-md ${
                theme === "dark" ? "text-white-500 hover:text-orange-400" : "text-gray-500 hover:text-sky-500"
              }`}
            >
              {lang === "id" ? "Belum punya akun? Daftar di sini" : "Don't have an account yet? Register here"}
            </p>
          </Link>
        </form>
      </div>
    </section>
  );
};

export default SignInPage;
