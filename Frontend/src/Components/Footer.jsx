import React from "react";
import Logo from "../assets/AniketLogo.svg";
import { AiFillInstagram } from "react-icons/ai";
import { IoLogoWhatsapp } from "react-icons/io";
import { FaTwitter } from "react-icons/fa6";
import { MdEmail } from "react-icons/md";

const Footer = () => {
  return (
<>
    <div className="bg-gray-700 mt-5 rounded-t-3xl text-gray-200 md:mt-10 p-10 w-full">
      
      <div className="flex flex-col sm:flex-row md:flex-row gap-10">
        <div className="">
          <div className="flex text-center items-center">
            <div className=" h-auto">
              <img
                src={Logo}
                alt="Aniket Logo"
                className="h-12  hover:scale-105 "
              />
            </div>
            <p className="text-3xl font-medium ml-2">Aniket Mangave</p>
          </div>
          <div>
            <p className="text-sm w-full mt-4 text-gray-300">
              Mutual Fund Distributor and Financial Advisor . Passionate about
              guiding people toward financial growth and security. Helping you
              make informed investment decisions with confidence.
            </p>
          </div>
          <div className="mt-4">
            <ul className="flex flex-row gap-3">
              <li>
                < AiFillInstagram className="size-6" />
              </li>
              <li> < IoLogoWhatsapp className="size-6" /></li>
              <li> <FaTwitter  className="size-6" /></li>
              <li> <MdEmail className="size-6"  /> </li>
            </ul>
          </div>
        </div>
        <div className="font-normal text-base "> Navigation <ul className="mt-3">
          <li>Home</li>
          <li>About</li>
          <li>Service</li>
          <li>Contact</li>
          
          </ul> </div>
        <div className="font-normal text-base "> Contact <ul className="mt-3">
          <li>+7028934702</li>
          <li>shreyas@gmail.com</li></ul></div>

      </div>

    <div>  <p className="text-center font-normal text-base mt-5">&copy; {new Date().getFullYear()} Aniket Mangave | All Rights Reserved.</p> </div>
    </div>
    </>
  );
};

export default Footer;
