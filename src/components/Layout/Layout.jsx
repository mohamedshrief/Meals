import React from "react";
import Sidebar from "../Sidebar/Sidebar";
import { Outlet } from "react-router-dom";
import Footer from "../Footer/Footer";

export default function Layout() {
  return (
    <>
      <Sidebar />
      <div className="sm:ps-64 bg-[#F4F2EE]">
        <Outlet />
      </div>
      <Footer />
    </>
  );
}
