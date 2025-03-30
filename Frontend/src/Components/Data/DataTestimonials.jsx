import React, { useState, useEffect } from "react";
import { MdCancel } from "react-icons/md";
import { motion } from "framer-motion";
import { TiDelete } from "react-icons/ti";

const DataTestimonials = ({ title, isAdmin }) => {
  const [testimonalData, setTestimonalData] = useState([]);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false); // State for controlling the delete confirmation modal
  const [itemToDeleteId, setItemToDeleteId] = useState(null); // State to store the ID of the item to delete

  const openDeleteModal = (id) => {
    setItemToDeleteId(id);
    setIsDeleteModalOpen(true);
  };

  const closeDeleteModal = () => {
    setIsDeleteModalOpen(false);
    setItemToDeleteId(null);
  };

  const confirmDelete = async () => {
    if (itemToDeleteId) {
      await handleDelete(itemToDeleteId); // Call the original delete function
    }
    closeDeleteModal();
  };

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
          `${import.meta.env.VITE_BACKEND_URL}/admin/testimonials`,
          { mode: "cors" }
        );
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();
        setTestimonalData(
          Array.isArray(data) ? data : [data, ...data, ...data]
        ); // Duplicate for seamless loop
      } catch (err) {
        console.error("Error fetching data:", err.message);
      }
    };

    fetchAdminInfo();
  }, []);

  return (
    <div className=" relative p-3">
     
      {/* Header */}
      <section className="text-center max-w-xl mx-auto">
        <h2 className="text-3xl font-bold cursor-pointer">{title}</h2>
        <p className="text-gray-500 mt-2 text-sm cursor-pointer">
          See what our clients have to say about their journey with us. We
          believe in trust, transparency, and delivering real value.
        </p>
      </section>

      {/* Infinite Scroll Section */}
      <div className="relative w-full overflow-hidden">
  
      <div
      className="absolute left-0 top-0 h-full  w-10 sm:w-40 bg-gradient-to-r from-white to-transparent pointer-events-none"
      style={{ zIndex: 10 }} // Ensure it's on top
    ></div>
        <motion.div
          className="flex space-x-6 p-4"
          animate={{ x: ["0%", "-100%"] }} // Moves from right to left
          transition={{ repeat: Infinity, duration: 120, ease: "linear" }}
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
                    onClick={() => openDeleteModal(item._id)} // Changed onClick to open the modal
                    className="text-red-500 border border-red-500 px-2 py-1 rounded-md text-sm font-semibold transition-transform duration-300 hover:scale-105 flex items-center"
                  >
                    <MdCancel className="size-5" />
                  </button>
                )}
              </div>
            </div>
          ))}
        </motion.div> 
        <div
      className="absolute right-0 top-0 h-full w-10 sm:w-40 bg-gradient-to-l from-white to-transparent pointer-events-none"
      style={{ zIndex: 10 }} // Ensure it's on top
    ></div>
      </div>

      {/* Delete Confirmation Modal */}
      {isDeleteModalOpen && ( // Conditionally render the modal
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 p-10 flex justify-center items-center">
          
          <motion.div
            className="bg-white rounded-md p-6"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.2 }}
          >
            <div className="flex flex-col justify-center text-center gap-4 ">
              <div>
                <TiDelete className=" m-auto size-10 border border-red-500 rounded-full  text-red-500 bg-red-100 " />
              </div>
              <div>
                <p className="text-base sm:text-lg font-semibold mb-4">
                  Delete Testimonial
                </p>
                <p className="text-sm text-gray-500 max-w-[30ch] ">
                  Are you sure you want to delete this testimonial? This action
                  cannot be undone.
                </p>
              </div>
            </div>
            <div className="flex justify-center mt-4 ">
              <button
                onClick={closeDeleteModal} // Close the modal
                className="px-5 py-1.5 bg-gray-100 border border-gray-500 text-gray-700 font-semibold rounded-md mr-2 hover:bg-gray-400"
              >
                Cancel
              </button>
              <button
                onClick={confirmDelete} // Call the delete confirmation function
                className="px-5 py-1.5 bg-red-600 text-white font-semibold  rounded-md hover:bg-red-600"
              >
                Delete
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
};

export default DataTestimonials;
