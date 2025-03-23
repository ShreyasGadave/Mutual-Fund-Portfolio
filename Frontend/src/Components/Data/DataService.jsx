import React, { useEffect, useState } from "react";
import { MdCancel } from "react-icons/md";
import { FaEdit } from "react-icons/fa";
import { FaSave } from "react-icons/fa";

const DataService = ({ title, isAdmin }) => {
  const [serviceData, setServiceData] = useState([]);
  const [editingItem, setEditingItem] = useState(null);
  const [editedText, setEditedText] = useState("");

  useEffect(() => {
    const fetchAdminInfo = async () => {
      try {
        const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/admin/service`);
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();
        setServiceData(Array.isArray(data) ? data : [data]);
      } catch (err) {
        console.error("Error fetching data:", err.message);
      }
    };

    fetchAdminInfo();
  }, []);

  // Handle Delete
  const handleDelete = async (id) => {
    if (!isAdmin) return;
    try {
      await fetch(`${import.meta.env.VITE_BACKEND_URL}/admin/service/${id}`, {
        method: "DELETE",
      });
      setServiceData(serviceData.filter((item) => item._id !== id));
    } catch (error) {
      console.error("Error deleting:", error);
    }
  };

  // Enable edit mode
  const handleEdit = (item) => {
    setEditingItem(item._id);
    setEditedText(item.Description);
  };

  // Handle saving the edited text
  const handleSave = async (id) => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/admin/service/${id}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ Description: editedText }),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to update service.");
      }

      // Update state with new data
      setServiceData(
        serviceData.map((item) =>
          item._id === id ? { ...item, Description: editedText } : item
        )
      );

      // Reset edit state
      setEditingItem(null);
      setEditedText("");
    } catch (error) {
      console.error("Error updating:", error);
    }
  };

  return (
    <div id="Service">
      <div className="bg-gray-100 p-3 border m-3 border-gray-300 rounded sm:m-4 shadow-lg">
        <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
          <div className="mx-auto max-w-2xl py-5 sm:py-2 lg:max-w-none lg:py-4">
            <h2 className="text-2xl font-bold text-gray-900">{title}</h2>

            <div className="mt-6 space-y-12 lg:grid lg:grid-cols-3 lg:gap-x-6 lg:space-y-0">
              {serviceData.map((item) => (
                <div key={item._id} className="group relative p-4 rounded-lg ">
                  <img
                    src={item.ImageURL}
                    className="w-full rounded-lg bg-gray-200 object-cover group-hover:opacity-75 max-sm:h-80 sm:aspect-2/1 lg:aspect-square"
                  />

                  {/* Show Input Field When Editing */}
                  {editingItem === item._id ? (
                    <input
                      type="text"
                      value={editedText}
                      onChange={(e) => setEditedText(e.target.value)}
                      className="w-full p-1 border border-gray-300 rounded-md mt-2"
                    />
                  ) : (
                    <>
                      <h3 className="mt-4 text-sm text-gray-500">
                        {item.Title}
                        <p className="text-base font-semibold text-gray-900">
                          {item.Description}
                        </p>
                      </h3>
                    </>
                  )}

                  {/* Admin-only edit/delete buttons */}
                  {isAdmin && (
                    <div className="mt-4 flex gap-2">
                      {editingItem === item._id ? (
                        <button
                          type="button"
                          onClick={() => handleSave(item._id)}
                          className="inline-flex items-center text-green-500 rounded-md border border-green-500 px-2 py-1 text-sm font-semibold transition-transform duration-300 hover:scale-105"
                        >
                          <FaSave className="mr-1.5 size-5 text-green-500" />
                          Save
                        </button>
                      ) : (
                        <button
                          type="button"
                          onClick={() => handleEdit(item)}
                          className="inline-flex items-center text-green-500 rounded-md border border-green-500 px-2 py-1 text-sm font-semibold transition-transform duration-300 hover:scale-105"
                        >
                          <FaEdit className=" size-5 text-green-500" />
                          {/* Edit */}
                        </button>
                      )}

                      <button
                        type="button"
                        onClick={() => handleDelete(item._id)}
                        className="inline-flex items-center text-red-500 rounded-md border border-red-500 px-2 py-1 text-sm font-semibold transition-transform duration-300 hover:scale-105"
                      >
                        <MdCancel className=" size-5 text-red-500" />
                        {/* Delete */}
                      </button>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DataService;
