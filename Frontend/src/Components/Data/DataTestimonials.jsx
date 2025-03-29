import React, { useState, useEffect } from "react";
import { MdCancel } from "react-icons/md";
import { motion } from "framer-motion";

const DataTestimonials = ({ title, isAdmin }) => {
  const [testimonalData, setTestimonalData] = useState([]);

  const handleDelete = async (id) => {
    if (!isAdmin) return;
    try {
      await fetch(`${import.meta.env.VITE_BACKEND_URL}/admin/testimonials/${id}`, {
        method: "DELETE",
      });
      setTestimonalData(testimonalData.filter((item) => item._id !== id));
    } catch (error) {
      console.error("Error deleting:", error);
    }
  };

  useEffect(() => {
    const fetchAdminInfo = async () => {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_BACKEND_URL}/admin/testimonials`,
          { mode: "cors" }
        );
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();
        setTestimonalData(Array.isArray(data) ? data : [data, ...data, ...data]); // Duplicate for seamless loop
      } catch (err) {
        console.error("Error fetching data:", err.message);
      }
    };

    fetchAdminInfo();
  }, []);

  return (
    <div className="p-5 mt-10 sm:m-2 bg-white">
      {/* Header */}
      <section className="text-center max-w-xl mx-auto">
        <h2 className="text-3xl font-bold cursor-pointer">{title}</h2>
        <p className="text-gray-500 mt-2 text-sm cursor-pointer">
          See what our clients have to say about their journey with us. We believe in trust, transparency, and delivering real value.
        </p>
      </section>

      {/* Infinite Scroll Section */}
      <div className="relative w-full overflow-hidden">
        <motion.div
          className="flex space-x-6 p-4"
          animate={{ x: ["0%", "-100%"] }} // Moves from right to left
          transition={{ repeat: Infinity, duration: 20, ease: "linear" }}
        >
          {testimonalData.map((item, index) => (
            <div
              key={index}
              className="p-3 mt-6 rounded-2xl border shadow-lg text-black min-w-[300px] sm:w-[80%] md:min-w-[350px] md:max-w-sm"
            >
              {/* Description */}
              <p className="mt-3 text-black text-sm">{item.Description}</p>

              {/* Divider */}
              <hr className="mt-4 border-gray-400" />

              {/* Actions */}
              <div className="mt-4 flex justify-between items-center">
                <span className="block text-base font-medium text-gray-900">
                  {item.Name}
                </span>
                {isAdmin && (
                  <button
                    type="button"
                    onClick={() => handleDelete(item._id)}
                    className="text-red-500 border border-red-500 px-2 py-1 rounded-md text-sm font-semibold transition-transform duration-300 hover:scale-105 flex items-center"
                  >
                    <MdCancel className="size-5" />
                  </button>
                )}
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </div>
  );
};

export default DataTestimonials;
