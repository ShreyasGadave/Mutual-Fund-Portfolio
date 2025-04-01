import React from "react";

const ServiceSkeleton = () => {
  return (
    <div className="mt-20  p-3  rounded sm:m-4 ">
      <section className="text-center max-w-xl mx-auto">
        <h2 className="text-3xl font-bold cursor-pointer">Our Services</h2>
        <p className="text-gray-500 mt-2 text-sm cursor-pointer">
          We provide expert financial guidance, investment solutions, and mutual
          fund distribution services tailored to your needs. Our goal is to help
          you make informed decisions for a secure and prosperous future.
        </p>
      </section>
      <div className="flex flex-col justify-center items-center">
      <div className="border  border-gray-300  shadow rounded-lg mt-10 md:w-1/3">
      <div className=" bg-slate-400 h-80 animate-pulse rounded"></div>
      <div className="p-2">
      <div className=" bg-slate-400 h-6 mt-4 animate-pulse rounded"></div>
        <div className=" bg-slate-400 h-20 mt-4  animate-pulse rounded"></div>
      </div>
      </div>
      </div>
    </div>
  );
};

export default ServiceSkeleton;
