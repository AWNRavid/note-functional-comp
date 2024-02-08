import { Navigate, Route, Routes } from "react-router-dom";
import AddNewNotePage from "./pages/AddNewNotePage";
import RegisterPage from "./pages/RegisterPage";
import SignInPage from "./pages/SignInPage";
import ActiveNotesPage from "./pages/ActiveNotesPage";
import Navbar from "./components/Navbar";
import { useContext } from "react";
import { UserContext } from "./context/userContext";
import ProtectedRoute from "./components/ProtectedRoute ";
import ArchivedNotePage from "./pages/ArchivedNotePage";
import Note from "./pages/Note";
import { ThemeContext } from "./context/themeContext";

const dark = "bg-slate-500";
const light = "bg-white";

function App() {
  const { user } = useContext(UserContext);
  const { theme } = useContext(ThemeContext);

  return (
    <div className={`app ${theme === "dark" ? dark : light}`}>
      <Navbar />
      <Routes>
        <Route index element={user ? <ActiveNotesPage /> : <SignInPage />} />
        <Route path="/register" element={!user ? <RegisterPage /> : <Navigate to={"/notes"} />} />
        <Route path="/sign-in" element={!user ? <SignInPage /> : <Navigate to={"/notes"} />} />
        {/* <Route path="/notes" element={user ? <ActiveNotesPage user={user}/> : <SignInPage />} /> */}
        <Route
          path="/notes"
          element={
            <ProtectedRoute user={user}>
              <ActiveNotesPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/archive"
          element={
            <ProtectedRoute user={user}>
              <ArchivedNotePage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/new-note"
          element={
            <ProtectedRoute user={user}>
              <AddNewNotePage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/note/:id"
          element={
            <ProtectedRoute user={user}>
              <Note />
            </ProtectedRoute>
          }
        />
        <Route path="*" element={<h1>NOT FOUND</h1>} />
      </Routes>
    </div>
  );
}

export default App;
