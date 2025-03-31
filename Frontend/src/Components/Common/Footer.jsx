import React from "react";
import Logo from "../../assets/AniketLogo.svg";
import { AiFillInstagram } from "react-icons/ai";
import { IoLogoWhatsapp } from "react-icons/io";
import { FaTwitter } from "react-icons/fa6";
import { MdEmail } from "react-icons/md";
import { FaFacebook } from "react-icons/fa";
import { FaLinkedin } from "react-icons/fa";

const Footer = () => {
  return (
    <>
      <div className="bg-gray-700 mt-10 rounded-t-3xl text-gray-200 md:mt-10 p-10 w-full">
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
                  <a href="https://www.instagram.com/aniketmangave?igsh=NDFxbzQwZzE5Nzd1">
                    <AiFillInstagram className="size-6" />
                  </a>
                </li>
                <li>
                  <a href="https://www.facebook.com/share/1FnSeX7Dbr/">
                    <FaFacebook className="size-6" />
                  </a>
                </li>
                <li>
                  <a href="https://wa.me/918379094949">
                    <IoLogoWhatsapp className="size-6" />
                  </a>
                </li>
                <li>
                  <a href="https://x.com/MangaveAniket?t=HMiyPoZ0NWg-jhIFlIkalA&s=09">
                    <FaTwitter className="size-6" />
                  </a>
                </li>
                <li>
                  <a href="aniketadisha@gmail.com">
                    <MdEmail className="size-6" /> 
                  </a>
                </li>
                <li>
                  <a href="https://www.linkedin.com/in/aniket-mangave-96446a140?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app">
                    <FaLinkedin className="size-6" /> 
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div className="font-normal text-base ">
            Navigation
            <ul className="mt-3">
              <a href="#Home" className="hover:text-blue-500">
                <li>Home</li>
              </a>
              <a href="#About" className="hover:text-blue-500">
                <li>About</li>
              </a>
              <a href="#Service" className="hover:text-blue-500">
                <li>Service</li>
              </a>
              <a href="#Contact" className="hover:text-blue-500">
                <li>Contact</li>
              </a>
            </ul>
          </div>
          <div className="font-normal text-base ">
            Contact
            <ul className="mt-3">
              <li> +91 83790 94949</li>
              <li>aniketadisha@gmail.com</li>
            </ul>
          </div>
        </div>

        <div>
          <p className="text-center font-normal text-sm mt-5">
            &copy; {new Date().getFullYear()} Aniket Mangave | All Rights
            Reserved.
          </p>
        </div>
      </div>
    </>
  );
};

export default Footer;
