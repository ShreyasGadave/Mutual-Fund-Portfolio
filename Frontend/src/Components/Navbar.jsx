import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { IoMenu, IoClose } from "react-icons/io5";
import Logo from "../assets/AniketLogo.svg";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "About", path: "#About" },
    { name: "Service", path: "#Service" },
    { name: "Contact", path: "#Contact" },
    { name: "Admin", path: "admin/profile" },
  ];

  return (
    <nav className="bg-gray-100 shadow-md px-6 py-2 relative">
      <div className="flex justify-between items-center">
        {/* Logo */}
        <div className="w-32 h-auto"> 
            <NavLink to='/'>  
            <img src={Logo} alt="Aniket Logo" className="h-8" /></NavLink>
        
        </div>
        {/* Mobile Menu Icon */}
        <div className="md:hidden z-30 relative" onClick={toggleMenu}>
          {isOpen ? <IoClose size={35} /> : <IoMenu size={35} />}
        </div>
        {/* Desktop Navigation */}
        <ul className="hidden md:flex  items-center justify-center gap-6">
  <a href="/" className="text-black font-light hover:text-blue-500">Home</a>
  <a href="/#About" className="text-black font-light hover:text-blue-500">About</a>
  <a href="/#Service" className="text-black font-light hover:text-blue-500">Service</a>
  <a href="/#Contact" className="text-black font-light hover:text-blue-500">Contact</a>
  <NavLink to='/admin/profile'>
  <button
    type="button"
    className="text-black border border-gray-500 px-3 py-1 text-sm font-light transition-transform duration-300 hover:scale-105 rounded-md"
  >
    Admin
  </button>
  </NavLink>
</ul>

      </div>
      {/* Overlay Background */}
      <div
        className={`fixed top-0 left-0 w-full h-full bg-gray-900 bg-opacity-50 z-20 transition-opacity duration-300 ${
          isOpen ? "opacity-100 visible" : "opacity-0 invisible"
        }`}
        onClick={toggleMenu} // Click outside to close
      ></div>
      {/* Right-Side Sliding Menu */}
      <div
        className={`fixed top-0 right-0 w-3/4 h-full bg-white z-20 shadow-lg transform transition-transform duration-300 ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <ul className="flex flex-col gap-6 p-6">
        <a href="/#Home"  onClick={toggleMenu} className="text-black font-light hover:text-blue-500">Home</a>
  <a href="/#About"  onClick={toggleMenu} className="text-black font-light hover:text-blue-500">About</a>
  <a href="/#Service"  onClick={toggleMenu} className="text-black font-light hover:text-blue-500">Service</a>
  <a href="/#Contact"  onClick={toggleMenu} className="text-black font-light hover:text-blue-500">Contact</a>
  <NavLink to='/admin/profile'>
  <button
    type="button"  onClick={toggleMenu}
    className="text-black border border-gray-500 px-3 py-1 text-sm font-light transition-transform duration-300 hover:scale-105 rounded-md"
  >
    Admin
  </button>
  </NavLink>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
