import React from "react";
import img from "../../assets/img.png";
import { NavLink } from "react-router-dom";
import { motion } from "framer-motion";

const Header = () => {
  return (
    <div className="flex md:mt-10 flex-col md:flex-row items-center justify-between px-4 py-6 md:px-10 ">
      {/* Image Section */}
      <div className="w-full md:w-1/2 flex justify-center items-center mb-6 md:mb-0">
        <img
          src={img}
          alt="Aniket Mangave"
          className="w-40 sm:w-52 md:w-64 h-auto"
        />
      </div>

      {/* Text Section */}
      <div className="w-full md:w-1/2 text-center md:text-left flex flex-col justify-center px-2 md:px-5">
        <p className="text-black text-3xl sm:text-5xl sm:font-bold md:text-5xl font-bold leading-tight sm:leading-snug cursor-pointer hover:underline ">
          Hi, I'm Aniket{" "}
          <motion.span
            initial={{ rotate: 0 }}
            animate={{ rotate: [0, 20, -10, 20, 0] }}
            transition={{ duration: 1.2, ease: "easeInOut", repeat: 2 }}
            style={{
              display: "inline-block",
              filter: "drop-shadow(2px 4px 6px rgba(0, 0, 0, 0.25))", // Adjust values as needed
            }}
          >
            👋
          </motion.span>
        </p>
        <p className="font-normal text-gray-500 text-sm sm:text-base md:text-lg cursor-pointer mt-2 sm:mt-4">
          <span className="text-gray-900 relative cursor-pointer group">
            Mutual Fund Distributor
            <span className="absolute bottom-[-2px] left-0 w-0 h-[1.5px] bg-gray-900 transition-all duration-300 ease-in-out group-hover:w-full"></span>
          </span>{" "}
          and{" "}
          <span className="text-gray-900 relative cursor-pointer group">
            Financial Advisor
            <span className="absolute bottom-[-2px] left-0 w-0 h-[1.5px] bg-gray-900 transition-all duration-300 delay-200 ease-in-out group-hover:w-full"></span>
          </span>
          . Passionate about guiding people toward financial growth and
          security. Helping you make informed investment decisions with
          confidence.
        </p>

        {/* Buttons */}
        <div className="mt-4 flex flex-row sm:flex-row gap-3 justify-center sm:justify-start">
          <a href="#Service">
            <button className="border bg-gray-200 border-gray-400 text-black px-4 py-2 rounded-full font-semibold transition duration-300 hover:bg-gray-600  hover:text-white sm:w-auto">
              View My Work →
            </button>{" "}
          </a>
          <a href="#Contact">
            <button className="border border-gray-800 text-black px-4 py-2 rounded-full font-semibold transition duration-300 sm:w-auto">
              Contact Me
            </button>{" "}
          </a>
        </div>
      </div>
    </div>
  );
};

export default Header;
