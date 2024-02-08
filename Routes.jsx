import { Route, createBrowserRouter, createRoutesFromElements } from "react-router-dom";
import NotFoundPage from "./src/pages/NotFoundPage";
import SignInPage from "./src/pages/SignInPage";
import Layout from "./Layout/Layout";
import RegisterPage from "./src/pages/RegisterPage";
import AddNewNotePage from "./src/pages/AddNewNotePage";
import Note from "./src/pages/Note";
import ArchivedNotePage from "./src/pages/ArchivedNotePage";

export const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Layout />} errorElement={<NotFoundPage />}>
      <Route path="login" element={<SignInPage />} />
      <Route path="register" element={<RegisterPage />} />

      <Route element={<RequireAuth />}>
        {/* route di dalam `<Outlet />` RequireAuth: */}

        {/* path "/" otomatis akan mengakses `<Route index>` */}
        <Route index element={<HomePage />} />

        <Route path="archive" element={<ArchivesPage />} />
        <Route path="notes/:id" element={<Detail />} />
        <Route path="new" element={<AddNote />} />
      </Route>

      <Route element={<RequireAuth />}>
        {/* route di dalam `<Outlet />` RequireAuth: */}

        {/* path "/" otomatis akan mengakses `<Route index>` */}
        <Route index element={<HomePage />} />

        <Route path="archive" element={<ArchivedNotePage />} />
        <Route path="notes/:id" element={<Note />} />
        <Route path="new" element={<AddNewNotePage />} />
      </Route>
    </Route>
  )
);
