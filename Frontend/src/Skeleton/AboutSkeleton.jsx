import React from "react";

const AboutSkeleton = ({ aboutData }) => {
  return (
    <div>
        <div className="rounded p-5 py-10">     
        <section className="text-center max-w-xl mx-auto">
          <h2 className="text-3xl font-bold cursor-pointer">About Me</h2>
          <p className="text-gray-500 mt-2 text-sm cursor-pointer">
          To help you make informed decisions for a secure and prosperous future, we offer expert financial guidance, investment solutions, and mutual fund distribution services, carefully tailored to your needs.
          </p>
        </section>
          <div className="flex flex-row justify-between mt-3">
            <div className="font-medium bg-slate-300 h-6 animate-pulse rounded-lg  w-40">
          
            </div>
          </div>
          <hr className="col-span-3 mt-3 border-gray-300" />
          <p className="mt-2  bg-slate-300 h-40 animate-pulse rounded-lg w-full">
           
          </p>
          <hr className="col-span-3 mt-3 border-gray-300" />
          <ul className="list-disc text-sm ml-5 mt-2">
                <li className=" bg-slate-300 h-7 animate-pulse rounded-lg w-20 mt-2"> </li>
                <li className=" bg-slate-300 h-7 animate-pulse rounded-lg w-20 mt-2"> </li>
          </ul>
          <button className=" bg-slate-300 h-7 animate-pulse rounded-lg w-20 mt-2"> </button>
        </div>
    </div>
  );
};

export default AboutSkeleton;
