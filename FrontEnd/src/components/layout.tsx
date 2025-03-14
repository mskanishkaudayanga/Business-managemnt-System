import { Outlet } from "react-router-dom";
import Navbar from "./navBar";

const Layout = () => {
  return (
    <div>
      <Navbar /> {/* Navbar is always visible */}
      <main className="mt-4 px-6">
        <Outlet /> {/* This renders the current page */}
      </main>
    </div>
  );
};

export default Layout;
