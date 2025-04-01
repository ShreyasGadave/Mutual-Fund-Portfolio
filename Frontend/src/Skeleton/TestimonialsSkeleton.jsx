import React from "react";

const TestimonialsSkeleton = () => {
  return (
    <div className="mt-20  p-3  rounded sm:m-4 ">
      <section className="text-center max-w-xl mx-auto">
        <h2 className="text-3xl font-bold cursor-pointer">Testimonials</h2>
        <p className="text-gray-500 mt-2 text-sm cursor-pointer">
        To help you make informed decisions for a secure and prosperous
            future, we offer expert financial guidance, investment solutions,
            and mutual fund distribution services, carefully tailored to your
            needs.
        </p>
      </section>
      <div className="flex flex-col justify-center sm:items-center">
      <div className="border  border-gray-300  shadow rounded-lg mt-10 md:w-1/3">
      <div className=" bg-slate-300 h-40 animate-pulse rounded"></div>
      <hr className="col-span-3 mt-3 border-gray-300" />
      <div className="p-2">
      <div className=" bg-slate-300 h-6 mt-4 animate-pulse rounded"></div>
      </div>
      </div>
      </div>
    </div>
  );
};

export default TestimonialsSkeleton;
