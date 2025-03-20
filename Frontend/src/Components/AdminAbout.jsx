import { useState } from "react";
import Navbar from "./Navbar";
import AdminNavbar from "./AdminNavbar";
import { MdAddCard, MdDelete } from "react-icons/md";
import { MdPlaylistAdd } from "react-icons/md";
import { RiResetLeftLine } from "react-icons/ri";

const AdminAbout = () => {
  const [adminInfo, setAdminInfo] = useState({
    Title: "",
    Description: "",
    List: [],
  });

  const [listItem, setListItem] = useState("");

  // Handle Adding New List Item
  const addListItem = () => {
    if (listItem.trim() !== "") {
      setAdminInfo((prev) => ({
        ...prev,
        List: [...prev.List, listItem.trim()],
      }));
      setListItem(""); // Clear input after adding
    }
  };

  // Handle Removing List Item
  const removeListItem = (index) => {
    setAdminInfo((prev) => ({
      ...prev,
      List: prev.List.filter((_, i) => i !== index),
    }));
  };

  const resetForm = () => {
    setAdminInfo({ Title: "", Description: "", List: [] });
    setListItem("");
  };

  const ServiceHandler = async (e) => {
    e.preventDefault();
    console.log(adminInfo);
    
    try {
      const response = await fetch("http://localhost:3009/admin", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(adminInfo),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      console.log("Response from server:", await response.json());
      resetForm();
    } catch (err) {
      console.error("Error submitting data:", err.message);
    }
  };

  return (
    <>
      <Navbar />
      <AdminNavbar />

      <div className="p-5 m-5 border border-gray-300 rounded sm:m-2 shadow-lg bg-white">
        <h2 className="text-lg font-semibold text-gray-900">About</h2>
        <p className="mt-1 text-sm text-gray-600">
          This information will be displayed publicly, so be careful what you share.
        </p>

        <form onSubmit={ServiceHandler} className="space-y-4">
        <hr className="col-span-3 mt-2 border-gray-300" />

          {/* Title Input */}
          <div className="space-y-2">
            <label className="block text-base font-medium text-gray-900">Title</label>
            <input
              type="text"
              name="Title"
              value={adminInfo.Title}
              onChange={(e) => setAdminInfo({ ...adminInfo, Title: e.target.value })}
              placeholder="Enter list Title..."
              className="w-full p-2  rounded-md  focus:outline-none focus:ring-2 focus:ring-gray-700 bg-transparent"
            />
          </div>
          <hr className="col-span-3 mt-2 border-gray-300" />
          {/* Description Textarea */}
          <div className="space-y-2">
            <label className="block text-base font-medium text-gray-900">Description</label>
            <textarea
              name="Description"
              value={adminInfo.Description}
              onChange={(e) => setAdminInfo({ ...adminInfo, Description: e.target.value })}
              placeholder="Enter list Description..."
              className="w-full p-2  rounded-md  focus:outline-none focus:ring-2 focus:ring-gray-700 bg-transparent"
              rows="4"
            />
          </div>
          <hr className="col-span-3 mt-2 border-gray-300" />

          {/* Dynamic List Section */}
          <div className="space-y-2">
            <label className="block text-base font-medium text-gray-900">List</label>
            <div className="flex gap-2">
              <input
                type="text"
                value={listItem}
                onChange={(e) => setListItem(e.target.value)}
                className="w-full p-2  rounded-md focus:outline-none focus:ring-2 focus:ring-gray-700 bg-transparent"
                placeholder="Enter list item..."
              />
              <button
                type="button"
                onClick={addListItem}
                className="px-3 py-2 border border-blue-500   text-blue-500 font-semibold rounded-md transition-transform duration-300 hover:scale-105"
              >
                <MdPlaylistAdd className="size-5" />
              </button>
            </div>

            {/* Display List Items */}
            <ul className="mt-2 space-y-2">
              {adminInfo.List.map((item, index) => (
                <li key={index} className="flex  justify-between items-center p-2  rounded-md bg-gray-100">
                  <span className="text-sm">{item}</span>
                  <button onClick={() => removeListItem(index)} className="text-red-500 transition-transform duration-300 hover:scale-105">
                    <MdDelete className="size-5 " />
                  </button>
                </li>
              ))}
            </ul>
          </div>
          <hr className="col-span-3 mt-2 border-gray-300" />

          {/* Submit Button */}
          <div className="mt-4 flex gap-3">
            <button
              type="submit"
              className="inline-flex items-center text-blue-500 border border-blue-500 px-4 py-2 text-sm font-semibold rounded-md transition-transform duration-300 hover:scale-105"
            >
              <MdAddCard className="mr-2 text-blue-500 size-5" aria-hidden="true" />
              Add
            </button>
            <button
              type="button"
              onClick={resetForm}
              className="inline-flex items-center text-red-500  border border-red-500 px-4 py-2 text-sm font-semibold transition-transform duration-300 hover:scale-105 rounded-md"
            > 
           <RiResetLeftLine  className="mr-2 text-red-500 size-5" aria-hidden="true" />
              Reset
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default AdminAbout;
