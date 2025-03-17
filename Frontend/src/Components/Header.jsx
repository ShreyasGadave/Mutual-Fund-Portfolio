import React from "react";
import img from "../assets/img.png";

const Header = () => {
  return (
    <div className="flex flex-col md:flex-row items-center justify-between px-6 md:px-10 py-4 lg:mt-10">
      <div className="w-full md:w-1/2 flex justify-center items-center mb-10 ">
        <div className="relative w-48 h-48 md:w-64 md:h-64">
          <img src={img} alt="Aniket Mangave" className="w-full " />
        </div>
      </div>

      <div className="md:w-1/2 text-center md:text-left flex flex-col justify-center">
        <button className="bg-black text-white px-3 py-2 rounded-md w-fit">
          👋🏻 Hello All
        </button>

        <p className="text-black text-2xl md:text-5xl mt-2 font-light md:leading-[60px] ">
          I'm Aniket Mangave, <br />
          A Mutual Fund Distributor <br /> 
          and Financial Advisor
        </p>

        <div className="mt-3 flex flex-col md:flex-row gap-4 justify-center md:justify-start">
          <button className="bg-black text-white px-4 py-2 rounded-md font-semibold transition duration-300 hover:bg-gray-800">
           <a href="#Service"> View My Work → </a>
          </button>
          <button className="border-2 border-gray-400 px-4 py-2 rounded-md font-semibold text-gray-700 transition duration-300 hover:bg-gray-100">
             <a href="#Contact"> Contact Me </a>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Header;
