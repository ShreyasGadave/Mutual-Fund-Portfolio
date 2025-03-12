import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { IoMenu, IoClose } from "react-icons/io5";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "About", path: "/#About" },
    { name: "Service", path: "/#Service" },
    { name: "Contact", path: "/#Contact" },
    { name: "Admin", path: "/admin" },
  ];

  return (
    <nav className="bg-gray-100 shadow-md px-6 py-4">
      <div className="flex justify-between items-center">
        <div className="font-bold text-xl">Logo</div>
        <div className="md:hidden" onClick={toggleMenu}>
          {isOpen ? <IoClose size={24} /> : <IoMenu size={24} />}
        </div>
        <ul className="hidden md:flex gap-6">
          {navLinks.map((link, index) => (
            <NavLink
              key={index}
              to={link.path}
              className="text-black font-light hover:text-blue-500"
            >
              {link.name}
            </NavLink>
          ))}
        </ul>
      </div>
      {/* Mobile Menu */}
      {isOpen && (
        <ul className="md:hidden flex flex-col gap-4 mt-4">
          {navLinks.map((link, index) => (
            <NavLink
              key={index}
              to={link.path}
              className="text-black font-light hover:text-blue-500"
              onClick={toggleMenu}
            >
              {link.name}
            </NavLink>
          ))}
        </ul>
      )}
    </nav>
  );
};

export default Navbar;
