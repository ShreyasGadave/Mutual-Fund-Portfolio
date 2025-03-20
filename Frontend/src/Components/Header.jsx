import React from "react";
import img from "../assets/img.png"; // Replace with your actual image path

const Header = () => {
  return (
    <div className="flex flex-col md:flex-row items-center justify-between px-6 md:px-10 py-4 lg:mt-10">
      
      {/* Right Image (Appears on Top in Mobile) */}
      <div className="w-full md:w-1/2 flex justify-center items-center mb-10 md:mb-0">
        <div className="relative w-48 h-48 md:w-64 md:h-64">
          <img
            src={img}
            alt="Aniket Mangave"
            className="w-full "
          />
        </div>
      </div>

      {/* Left Content (Text & Buttons) */}
      <div className="md:w-1/2 text-center md:text-left flex flex-col justify-center">
        <button className="bg-black text-white px-5 py-2 rounded-md text-sm font-medium w-fit">
          👋🏻 Hello All
        </button>
        <p className="text-black text-3xl md:text-5xl font-bold mt-4 leading-tight md:leading-snug">
          I'm Aniket Mangave, <br />
          A Mutual Fund <br />
          and Developer
        </p>
        
        {/* Buttons */}
        <div className="mt-6 flex flex-col md:flex-row gap-4 justify-center md:justify-start">
          <button className="bg-black text-white px-6 py-3 rounded-md font-semibold transition duration-300 hover:bg-gray-800">
            View My Work →
          </button>
          <button className="border-2 border-gray-400 px-6 py-3 rounded-md font-semibold text-gray-700 transition duration-300 hover:bg-gray-100">
            Contact Me
          </button>
        </div>
      </div>

    </div>
  );
};

export default Header;
