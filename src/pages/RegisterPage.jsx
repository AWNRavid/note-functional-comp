import { Link, useNavigate } from "react-router-dom";
import { registerFunc } from "../utils/network-data";
import { useForm } from "react-hook-form";
import { useContext } from "react";
import { LanguageContext } from "../context/languageContext";
import { ThemeContext } from "../context/themeContext";

const light = "bg-white border-blue-300";
const dark = "bg-gray-500 text-black border-orange-400";

const RegisterPage = () => {
  const { lang } = useContext(LanguageContext);
  const navigate = useNavigate();
  const {
    register,
    formState: { errors },
    watch,
    handleSubmit,
  } = useForm();
  const { theme } = useContext(ThemeContext);

  const onSubmit = async (data) => {
    const { name, email, password } = data;
    await registerFunc({ name, email, password });
    navigate("/notes");
  };

  return (
    <section className=" min-h-full flex justify-center items-center">
      <div className={`bg-white p-8 rounded shadow-md max-w-md w-full border-2 ${theme === "dark" ? dark : light}`}>
        <h2 className={`text-2xl font-semibold mb-6 text-center ${theme === "dark" ? "text-white" : "text-black"}`}>
          {lang === "id" ? "Daftar" : "Register"}
        </h2>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-4">
            <label
              htmlFor="name"
              className={`block ${theme === "dark" ? "text-white" : "text-black"} font-semibold mb-2`}
            >
              {lang === "id" ? "Nama" : "Name"}
            </label>
            <input
              type="text"
              id="name"
              name="name"
              placeholder={lang === "id" ? "Masukkan nama anda" : "Enter your name"}
              className="w-full border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-400"
              {...register("name", { required: lang === "id" ? "Kolom harus diisi" : "This field is required" })}
            />
            {errors.name && <p className="mt-1 text-orange-500">{errors.name.message}</p>}
          </div>

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
              placeholder={lang === "id" ? "Masukkan email anda" : "Enter your email"}
              className="w-full border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-400"
              {...register("email", {
                required: lang === "id" ? "Kolom harus diisi" : "This field is required",
                pattern: {
                  value: /^[^@ ]+@[^@ ]+\.[^@ .]{2,}$/,
                  message: lang === "id" ? "Email tidak valid" : "Email not valid",
                },
              })}
            />
            {errors.email && <p className="mt-1 text-orange-500">{errors.email.message}</p>}
          </div>

          <div className="mb-4">
            <label
              htmlFor="password"
              className={`block ${theme === "dark" ? "text-white" : "text-black"} font-semibold mb-2`}
            >
              {lang === "id" ? "Kata sandi" : "Password"}
            </label>
            <input
              type="password"
              id="password"
              name="password"
              placeholder={lang === "id" ? "Masukkan password anda" : "Enter your password"}
              className="w-full border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-400"
              {...register("password", {
                required: lang === "id" ? "Kolom harus diisi" : "This field is required",
                minLength: {
                  value: 6,
                  message:
                    lang === "id" ? "Kata sandi minimal harus 6 karakter" : "Password must at least 6 characters",
                },
              })}
            />
          </div>
          {errors.password && <p className="mt-1 text-orange-500">{errors.password.message}</p>}

          <div className="mb-6">
            <label
              htmlFor="confirm-password"
              className={`block ${theme === "dark" ? "text-white" : "text-black"} font-semibold mb-2`}
            >
              {lang === "id" ? "Konfirmasi kata sandi" : "Confirm password"}
            </label>
            <input
              type="password"
              id="confirm-password"
              name="confirmPassword"
              placeholder={lang === "id" ? "Konfirmasi lagi kata sandi anda" : "Confirm your password"}
              className="w-full border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-400"
              {...register("confirmPassword", {
                required: lang === "id" ? "Kolom harus diisi" : "This field is required",
                validate: (value) => {
                  if (watch("password") !== value) {
                    return lang === "id" ? "Password tidak cocok" : "Your passwords do no match";
                  }
                },
              })}
            />
            {errors.confirmPassword && <p className="mt-1 text-orange-500">{errors.confirmPassword.message}</p>}
          </div>

          <button
            type="submit"
            className={`w-full font-semibold py-2 px-4 rounded-md transition duration-300 text-white ${
              theme === "dark" ? "bg-gray-600 hover:bg-gray-700" : "bg-blue-400 hover:bg-blue-500"
            }`}
          >
            {lang === "id" ? "Daftar" : "Register"}
          </button>
          <Link to={"/sign-in"}>
            <p
              className={`mt-5 text-md ${
                theme === "dark" ? "text-white-500 hover:text-orange-400" : "text-gray-500 hover:text-sky-500"
              }`}
            >
              {lang === "id" ? "Sudah punya akun? Klik di sini" : "Already have an account? Click here"}
            </p>
          </Link>
        </form>
      </div>
    </section>
  );
};

export default RegisterPage;
