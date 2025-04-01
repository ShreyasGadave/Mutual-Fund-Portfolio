import React, { useState, useEffect } from "react";
import { MdCancel } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { TiDelete } from "react-icons/ti";
import AboutSkeleton from "../../Skeleton/AboutSkeleton";

const DataAbout = ({ title, isAdmin, limit }) => {
  const [aboutData, setAboutData] = useState([]);
  const [loading, setLoading] = useState(true);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [itemToDeleteId, setItemToDeleteId] = useState(null);

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

  const navigate = useNavigate();

  useEffect(() => {
    const fetchAdminInfo = async () => {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_BACKEND_URL}/admin/about`,
          { mode: "cors" }
        );
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();
        const formattedData = Array.isArray(data) ? data : [data];
        setAboutData(limit ? formattedData.slice(0, limit) : formattedData); // ✅ Apply limit if provided
      } catch (err) {
        console.error("Error fetching data:", err.message);
      } finally {
          setLoading(false);
      }
    };

    fetchAdminInfo();
  }, [limit]);

  const handleDelete = async (id) => {
    if (!isAdmin) return;
    try {
      await fetch(`${import.meta.env.VITE_BACKEND_URL}/admin/about/${id}`, {
        method: "DELETE",
      });
      setAboutData(aboutData.filter((item) => item._id !== id));
    } catch (error) {
      console.error("Error deleting:", error);
    }
  };

  if (loading) return <AboutSkeleton />;
  if (aboutData.length === 0)
    return <p className="text-center text-gray-500 py-20">No About Data Found</p>;

  return (
    <div id="About">
      <div className="p-5 rounded sm:m-2  py-10 bg-white">
        <section className="text-center max-w-xl mx-auto">
          <h2 className="text-3xl font-bold cursor-pointer">{title}</h2>
          <p className="text-gray-500 mt-2 text-sm cursor-pointer">
            To help you make informed decisions for a secure and prosperous
            future, we offer expert financial guidance, investment solutions,
            and mutual fund distribution services, carefully tailored to your
            needs.
          </p>
        </section>
        {aboutData.map((item) => (
          <div key={item._id} className=" rounded p-2 mt-3">
            <div className="flex flex-row justify-between">
              <div className="block text-base sm:text-lg font-medium text-gray-900">
                {item.Title}
              </div>

              {isAdmin && (
                <button
                  type="button"
                  onClick={() => openDeleteModal(item._id)}
                  className="inline-flex items-center text-red-500 rounded-md border border-red-500 px-2 py-1 text-sm font-semibold transition-transform duration-300 hover:scale-105"
                >
                  <MdCancel className="size-5 text-red-500" />
                </button>
              )}
            </div>
            <hr className="col-span-3 mt-3 border-gray-300" />
            <p className="mt-2  block text-sm sm:text-lg font-normal text-gray-900">
              {item.Description}
            </p>
            <hr className="col-span-3 mt-3 border-gray-300" />
            <ul className="list-disc text-sm ml-5 mt-2">
              {item.List.map((listItem, index) => (
                <li key={index} className="text-base sm:text-lg">
                  {listItem}
                </li>
              ))}
            </ul>
          </div>
        ))}
        {limit >= 2 ? null : ( // ✅ Corrected conditional rendering
          <p
            onClick={() => {
              navigate("/about"); // Navigate to the about page
              window.scrollTo({ top: 0, behavior: "smooth" }); // Scroll to top smoothly
            }}
            className=" cursor-pointer px-4 py-1 border bg-gray-100 rounded-full border-gray-600 w-fit text-base"
          >
            About more...
          </p>
        )}

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
                        Delete Service
                      </p>
                      <p className="text-sm text-gray-500 max-w-[30ch] ">
                        Are you sure you want to delete this Service? This
                        action cannot be undone.
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
    </div>
  );
};

export default DataAbout;
