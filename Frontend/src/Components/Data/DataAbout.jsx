import React from "react";
import { useState, useEffect } from "react";
import { MdCancel } from "react-icons/md";

const DataAbout = ({ title, isAdmin }) => {
  const [aboutData, setAboutData] = useState([]);

  useEffect(() => {
    const fetchAdminInfo = async () => {
      try {
        const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/admin/about`, { mode: 'cors' });
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();
        setAboutData(Array.isArray(data) ? data : [data]);
      } catch (err) {
        console.error("Error fetching data:", err.message);
      }
    };

    fetchAdminInfo();
  }, []);

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

  return (
    <div>
      <div className="p-5 m-5 border border-gray-300 rounded sm:m-2 shadow-lg bg-white">
        <h2 className="text-lg font-semibold text-gray-900">{title}</h2>
        {aboutData.map((item) => (
          <div
            key={item._id}
            className="border mt-3 rounded border-gray-200 shadow p-4"
          >
            <div className="flex flex-row justify-between">
              <div className="block text-base font-medium text-gray-900">
                {item.Title}
              </div>
              <div></div>

              <button
                type="button"
                onClick={() => handleDelete(item._id)}
                className="inline-flex items-center text-red-500 rounded-md border border-red-500 px-2 py-1 text-sm font-semibold transition-transform duration-300 hover:scale-105"
              >
                <MdCancel className=" size-5 text-red-500" />
              </button>
            </div>
            <hr className="col-span-3 mt-3 border-gray-300" />
            <p className="mt-2 block text-sm font-normal text-gray-900">
              {item.Description}
            </p>
            <hr className="col-span-3 mt-3 border-gray-300" />
            <ul className="list-disc text-sm  ml-5 mt-2">
              {item.List.map((item, index) => (
                <li key={index}>{item}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DataAbout;
