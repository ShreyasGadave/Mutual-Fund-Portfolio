import React, { useState, useEffect } from "react";
import { MdCancel } from "react-icons/md";
import { useNavigate } from "react-router-dom";

const DataAbout = ({ title, isAdmin, limit }) => {
  const [aboutData, setAboutData] = useState([]);
  const [loading, setLoading] = useState(true);

  const navigate=useNavigate()

  useEffect(() => {
    const fetchAdminInfo = async () => {
      try {
        const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/admin/about`, { mode: 'cors' });
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

  if (loading) return <p className="text-center text-gray-500">Loading...</p>;
  if (aboutData.length === 0) return <p className="text-center text-gray-500">No About Data Found</p>;

  return (
    <div id="About">
      <div className="p-5 rounded sm:m-2  py-10 bg-white">
      <h2 className=" flex flex-col text-2xl items-center text-center lg:text-3xl font-bold text-gray-900 cursor-pointer">{title}</h2>
        {aboutData.map((item) => (
          <div
            key={item._id}
            className=" rounded p-2"
          >
            <div className="flex flex-row justify-between">
              <div className="block text-base  font-medium text-gray-900">
                {item.Title}
              </div>
             
              {isAdmin && (
                <button
                  type="button"
                  onClick={() => handleDelete(item._id)}
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
                <li key={index}>{listItem}</li>
              ))}
            </ul>

          </div>
        ))}
         {limit >= 2 ? null : ( // ✅ Corrected conditional rendering
          <p
            onClick={() => navigate("/about")}
            className=" cursor-pointer px-4 py-1 border bg-gray-100 rounded-full border-gray-600 w-fit text-base"
          >
            About more...
          </p>
        )}
      </div>
    </div>
  );
};

export default DataAbout;
