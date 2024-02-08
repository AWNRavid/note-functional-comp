import { Outlet, ScrollRestoration } from "react-router-dom";
import Navbar from "../src/components/Navbar";

const Layout = () => {
  return (
    <div>
      {/* <h1>Note app</h1> */}
      <Navbar />
      {/* route seperti `login`, `index` akan berada di dalam `Outlet` */}
      <Outlet />
      {/* mengembalikan posisi scrollbar ke atas setelah pindah halaman */}
      <ScrollRestoration />
    </div>
  );
};

export default Layout;
