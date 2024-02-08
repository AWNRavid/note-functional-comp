import { useContext } from "react";
import { addNote } from "../utils/network-data";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { LanguageContext } from "../context/languageContext";
import { ThemeContext } from "../context/themeContext";

const light = "text-gray-700 outline outline-blue-400 focus:border-blue-400";
const dark = "text-white bg-slate-800";

const AddNewNotePage = () => {
  const navigate = useNavigate();
  const { lang } = useContext(LanguageContext);
  const { register, handleSubmit } = useForm();
  const { theme } = useContext(ThemeContext);

  const onSubmit = async (noteData) => {
    const { error } = await addNote({ ...noteData });
    if (!error) {
      navigate("/notes");
    }
  };

  return (
    <section className={`w-5/6 mx-auto`}>
      <div className="mt-4">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-4">
            <label
              htmlFor="email"
              className={`block font-semibold mb-2 ${theme === "dark" ? "text-white" : "text-black"}`}
            >
              {lang === "id" ? "Judul" : "Title"}
            </label>
            <input
              type="text"
              id="title"
              name="title"
              placeholder={lang === "id" ? "Masukkan judul" : "Enter your title"}
              className={`w-full border-gray-300 rounded-md py-2 px-3 focus:outline-none ${
                theme === "dark" ? dark : light
              }`}
              {...register("title")}
            />
          </div>

          <div className="mb-4">
            <label
              htmlFor="catatan"
              className={`block font-semibold mb-2 ${theme === "dark" ? "text-white" : "text-black"}`}
            >
              {lang === "id" ? "Catatan" : "Note"}
            </label>
            <textarea
              name=""
              id="catatan"
              cols="30"
              rows="10"
              placeholder={lang === "id" ? "Masukkan catatan" : "Enter your note"}
              className={`w-full border-gray-300 rounded-md py-2 px-3 focus:outline-none ${
                theme === "dark" ? dark : light
              } `}
              {...register("body")}
            />
          </div>

          <button
            type="submit"
            className={`w-full  text-white font-semibold py-2 px-4 rounded-md ${
              theme === "dark" ? "bg-gray-600 hover:bg-gray-700" : "bg-blue-400 hover:bg-blue-500"
            }  transition duration-300`}
          >
            {lang === "id" ? "Tambahkan Catatan Baru" : "Add New Note"}
          </button>
        </form>
      </div>
    </section>
  );
};

export default AddNewNotePage;
