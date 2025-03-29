import React from "react";
import img from "../assets/img.png"; // Replace with your actual image path
import { NavLink } from "react-router-dom";

const Header = () => {
  return (
    <div className="flex flex-col md:flex-row items-center justify-between px-4 py-6 md:px-10 ">
  
    {/* Image Section */}
    <div className="w-full md:w-1/2 flex justify-center items-center mb-6 md:mb-0">
      <img src={img} alt="Aniket Mangave" className="w-40 sm:w-52 md:w-64 h-auto" />
    </div>
  
    {/* Text Section */}
    <div className="w-full md:w-1/2 text-center md:text-left flex flex-col justify-center px-2 md:px-5">
      <p className="text-black text-2xl sm:text-5xl sm:font-bold md:text-5xl font-bold leading-tight sm:leading-snug cursor-pointer">
        Hi, I'm Aniket 👋
      </p>
      <p className="font-normal text-xs sm:text-base md:text-lg cursor-pointer mt-2 sm:mt-4">
        Mutual Fund Distributor and Financial Advisor. Passionate about guiding people toward financial growth and security. Helping you make informed investment decisions with confidence.
      </p>
  
      {/* Buttons */}
      <div className="mt-4 flex flex-col sm:flex-row gap-3 justify-center sm:justify-start">

       <a  href="#Service"><button className="border bg-gray-300 border-gray-800 text-black px-4 py-2 rounded-md font-semibold transition duration-300 hover:bg-gray-600  hover:text-white w-full sm:w-auto">
          View My Work →
        </button> </a> 
        <a  href="#Contact"><button className="border border-gray-800 text-black px-4 py-2 rounded-md font-semibold transition duration-300 w-full sm:w-auto">
        Contact Me
        </button> </a> 
      </div>
    </div>
  
  </div>
   
  );
};

export default Header;
