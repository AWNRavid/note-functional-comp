import PropTypes from "prop-types";
import { useContext } from "react";
import { FaArchive, FaTrash } from "react-icons/fa";
import { RiInboxUnarchiveFill } from "react-icons/ri";
import { Link } from "react-router-dom";
import { ThemeContext } from "../context/themeContext";

const light = "border-blue-300";
const dark = "bg-gray-500 text-white border-gray-600";

const Note = ({ id, title, body, createdAt, archived, handleDelete, handleArchive, handleActive }) => {
  const { theme } = useContext(ThemeContext);

  return (
    <div
      className={`w-[350px] h-[350px] rounded-lg  py-1 px-4 shadow-md relative border-[7px] ${
        theme === "dark" ? dark : light
      }`}
    >
      <Link to={`/note/${id}`}>
        <h2 className="text-2xl font-bold hover:text-orange-500">
          {title.length > 50 ? `${title.slice(0, 20)}...` : title}
        </h2>
      </Link>
      <p className="text-md/[10px] mt-2">{body.length > 350 ? `${body.slice(0, 350)}...` : body}</p>
      <p className="font-normal text-gray-400 text-end absolute bottom-10 right-0 mr-2">{createdAt.slice(0, 10)}</p>
      <div className="flex items-center justify-between absolute bottom-0 left-0 w-full px-3 py-2">
        <button onClick={() => handleDelete(id)} className="text-red-500 font-bold text-xl">
          <FaTrash />
        </button>
        {!archived ? (
          <button onClick={() => handleArchive(id)} className="text-indigo-400 font-bold text-xl">
            <FaArchive />
          </button>
        ) : (
          <button onClick={() => handleActive(id)} className="text-fuchsia-500 font-bold text-xl">
            <RiInboxUnarchiveFill />
          </button>
        )}
      </div>
    </div>
  );
};

Note.propTypes = {
  id: PropTypes.string,
  title: PropTypes.string,
  body: PropTypes.string,
  createdAt: PropTypes.string,
  archived: PropTypes.bool,
  handleDelete: PropTypes.func,
  handleArchive: PropTypes.func,
  handleActive: PropTypes.func,
};

export default Note;
