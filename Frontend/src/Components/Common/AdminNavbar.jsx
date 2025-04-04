import React from "react";
import { NavLink } from "react-router-dom";
import Navbar from "./Navbar";
import { IoMdLogOut } from "react-icons/io";
import { LogOut } from "../../Services/Firebase";

const AdminNavbar = () => {
  return (
    <>
      <Navbar />
      <div className=" relative">
      <div
  className="absolute right-0 top-4 h-10 w-20 sm:w-40 bg-gradient-to-l from-white via-white to-transparent pointer-events-none"
  style={{ zIndex: 10 }}
></div>
      </div>
      <div className=" relative m-5 flex flex-row gap-3 md:gap-2 sm:gap-1 overflow-scroll scrollbar-hide">
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
              `inline-flex border items-center rounded-md px-4 py-1 text-base font-medium ring-1 ring-inset cursor-pointer transition-all shadow
              ${
                isActive
                  ? "bg-blue-500 text-white border-blue-600 ring-blue-600"
                  : "border-gray-500 bg-gray-50 text-gray-600 ring-gray-500/10 hover:bg-blue-200 hover:text-white"
              }`
            }
          >
            {link.label}
          </NavLink>
        ))}
<button className=" text-gray-600 mr-40 border border-gray-500 rounded-full hover:bg-red-300 "     type="button"  onClick={LogOut}> <IoMdLogOut size={30} className="font-normal "/></button>

      </div>
    </>
  );
};

export default AdminNavbar;
