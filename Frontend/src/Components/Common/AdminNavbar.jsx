import React from "react";
import { NavLink } from "react-router-dom";
import Navbar from "./Navbar";

const AdminNavbar = () => {
  return (
    <>
      <Navbar />
      <div className="m-5 flex flex-row gap-3 md:gap-2 sm:gap-1 overflow-scroll scrollbar-hide">
        {[
          { path: "/", label: "Home" },
          { path: "/admin/profile", label: "Profile" },
          { path: "/admin/about", label: "About" },
          { path: "/admin/service", label: "Service" },
          { path: "/admin/testimonials", label: "Testimonials" },
        ].map((link, index) => (
          <NavLink
            key={index}
            to={link.path}
            className={({ isActive }) =>
              `inline-flex border items-center rounded-md px-4 py-1 text-base font-medium ring-1 ring-inset cursor-pointer transition-all
              ${
                isActive
                  ? "bg-blue-500 text-white border-blue-600 ring-blue-600"
                  : "border-gray-500 bg-gray-50 text-gray-600 ring-gray-500/10 hover:bg-blue-400 hover:text-white"
              }`
            }
          >
            {link.label}
          </NavLink>
        ))}
      </div>
    </>
  );
};

export default AdminNavbar;
