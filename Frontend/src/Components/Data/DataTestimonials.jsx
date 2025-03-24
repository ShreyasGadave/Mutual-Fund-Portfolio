import React from "react";
import { useState, useEffect } from "react";
import { MdCancel } from "react-icons/md";

const DataTestimonials = ({ title, isAdmin }) => {
  const [testimonalData, setTestimonalData] = useState([]);

  const handleDelete = async (id) => {
    if (!isAdmin) return;
    try {
      await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/admin/testimonials/${id}`,
        {
          method: "DELETE",
        }
      );
      setTestimonalData(testimonalData.filter((item) => item._id !== id));
    } catch (error) {
      console.error("Error deleting:", error);
    }
  };

  useEffect(() => {
    const fetchAdminInfo = async () => {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_BACKEND_URL}/admin/testimonials `,
          { mode: "cors" }
        );
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();
        setTestimonalData(Array.isArray(data) ? data : [data]);
      } catch (err) {
        console.error("Error fetching data:", err.message);
      }
    };

    fetchAdminInfo();
  }, []);
  return (
    <div>
      <div className=" p-5 m-5 sm:m-2  bg-white">
        <h2 className="text-lg font-semibold text-gray-900">
          Testimonials Database
        </h2>
        <div className="relative w-full ">
  {/* Scrollable Container */}
  <div className="flex overflow-x-auto space-x-6 p-4  scrollbar-hide snap-x snap-mandatory">
  {testimonalData.map((item) => (
    <div
      key={item._id}
      className="p-3 rounded-2xl border shadow-lg text-black min-w-[300px] sm:w-[80%] md:min-w-[350px] md:max-w-sm snap-start"
    >
      {/* Description */}
      <p className="mt-3 text-black text-sm">{item.Description}</p>

      {/* Divider */}
      <hr className="mt-4 border-gray-400" />

      {/* Actions */}
      <div className="mt-4 flex justify-between items-center">
        <span className="block text-base font-medium text-gray-900">{item.Name}</span>
        <button
          type="button"
          onClick={() => handleDelete(item._id)}
          className="text-red-500 border border-red-500 px-2 py-1 rounded-md text-sm font-semibold transition-transform duration-300 hover:scale-105 flex items-center"
        >
          <MdCancel className="size-5 " />
        </button>
      </div>
    </div>
  ))}
</div>

</div>

      </div>
    </div>
  );
};

export default DataTestimonials;
