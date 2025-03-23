import { useState } from "react";
import axios from "axios";
import { MdAddCard, MdDelete, MdPlaylistAdd } from "react-icons/md";
import { IoImageOutline } from "react-icons/io5";
import { RiResetLeftLine } from "react-icons/ri";

const FormService = () => {
  const [adminInfo, setAdminInfo] = useState({
    Image: "",
    Title: "",
    Description: "",
    List: [],
  });
  const [file, setFile] = useState(null)
  const [listItem, setListItem] = useState("");
  const [loading, setLoading] = useState(false);

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
  
    if (!adminInfo.Title || !adminInfo.Description || adminInfo.List.length === 0 || !file) {
      alert("Please fill in all fields and upload an image.");
      return;
    }
  
    setLoading(true);
  
    const formData = new FormData();
    formData.append("image", file);
    formData.append("Title", adminInfo.Title);
    formData.append("Description", adminInfo.Description);
    formData.append("List", JSON.stringify(adminInfo.List));
  
    // Debugging: Log the formData content
    console.log("FormData before sending:");
    for (let [key, value] of formData.entries()) {
      console.log(`${key}:`, value);
    }
  
    try {
      const res = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/admin/service`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
  
      console.log("Response from server:", res.data);
      resetForm();
    } catch (err) {
      console.error("Error submitting data:", err);
      if (err.response) {
        console.log("Server Response Data:", err.response.data);
      }
      alert("Failed to submit data. Please check the backend logs.");
    } finally {
      setLoading(false);
    }
  };
  

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
  
    if (!selectedFile) return;
  
    // Validate file type
    const allowedTypes = ["image/jpeg", "image/png", "image/gif"];
    if (!allowedTypes.includes(selectedFile.type)) {
      alert("❌ Only image files (JPG, PNG, GIF) are allowed!");
      return;
    }
  
    // Update state with file & preview
    setFile(selectedFile);
    setAdminInfo((prev) => ({
      ...prev,
      Image: URL.createObjectURL(selectedFile),
      ImageName: selectedFile.name,
    }));
  };
  

  return (
    <>
      <div className="p-5 m-5 border border-gray-300 rounded sm:m-2 shadow-lg bg-white">
        <h2 className="text-lg font-semibold text-gray-900">Service</h2>
        <form onSubmit={ServiceHandler} className="space-y-4">
          <hr className="col-span-3 mt-2 border-gray-300" />
          <div>
          <label className="block text-base font-medium text-gray-900">
              Service Image
            </label>
            <div className="flex items-center gap-4 mt-2">
  {/* File Upload Button */}
  <label className="inline-flex items-center text-black border border-black px-4 py-2 text-sm font-semibold rounded-md transition-transform duration-300 hover:scale-105 cursor-pointer">
    <span className="flex flex-row text-sm font-semibold justify-center">
      <IoImageOutline className="mr-2 text-black size-5" /> Choose File
    </span>
    <input
      type="file"
      name="Image"
      onChange={handleFileChange}
      className="hidden"
    />
  </label>

  {/* Show File Name & Image Preview */}
  {adminInfo.Image && (
    <div className="relative group w-40">
      {/* File Name with Hover */}
      <span
        className="text-gray-700 cursor-pointer truncate block w-full"
        title={adminInfo.ImageName} // Show full name on hover
      >
        {adminInfo.ImageName}
      </span>

      {/* Image Preview on Hover */}
      <div className="absolute left-0 top-6 hidden group-hover:flex items-center justify-center bg-black bg-opacity-75 p-1 rounded-lg z-10">
        <img
          src={adminInfo.Image}
          alt="Uploaded Preview"
          className="w-32 h-32 object-cover rounded-md border border-gray-400"
        />
      </div>
    </div>
  )}
</div>

            <p className="mt-3 text-sm text-gray-600">
              Note : Only image files (JPG, PNG, JPEG) will be accepted.
            </p>
          </div>
          <hr className="bg-gray-500" />

          <div className="space-y-2">
            <label className="block text-base font-medium text-gray-900">
              Title
            </label>
            <input
              type="text"
              name="Title"
              value={adminInfo.Title}
              onChange={(e) =>
                setAdminInfo({ ...adminInfo, Title: e.target.value })
              }
              placeholder="Enter list Title..."
              className="w-full p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-700 bg-transparent "
            />
          </div>
          <hr className="bg-gray-500" />
          <div className="space-y-2">
            <label className="block text-base font-medium text-gray-900">
              Description
            </label>
            <textarea
              name="Description"
              value={adminInfo.Description}
              onChange={(e) =>
                setAdminInfo({ ...adminInfo, Description: e.target.value })
              }
              placeholder="Enter list Description..."
              className="w-full p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-700 bg-transparent "
              rows="4"
            />
          </div>
          <hr className="col-span-3 mt-2 border-gray-300" />

          <div className="space-y-2">
            <label className="block text-base font-medium text-gray-900">
              List
            </label>
            <div className="flex gap-2">
              <input
                type="text"
                value={listItem}
                onChange={(e) => setListItem(e.target.value)}
                className="w-full p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-700 bg-transparent "
                placeholder="Enter list item..."
              />
              <button
                type="button"
                onClick={addListItem}
                className="px-3 py-2 border border-blue-500 text-blue-500 font-semibold rounded-md transition-transform duration-300 hover:scale-105"
              >
                <MdPlaylistAdd className="size-5" />
              </button>
            </div>
            <ul className="mt-2 space-y-2">
              {adminInfo.List.map((item, index) => (
                <li
                  key={index}
                  className="flex justify-between items-center p-2 rounded-md bg-gray-100"
                >
                  <span className="text-sm">{item}</span>
                  <button
                    onClick={() => removeListItem(index)}
                    className="text-red-500 transition-transform duration-300 hover:scale-105"
                  >
                    <MdDelete className="size-5" />
                  </button>
                </li>
              ))}
            </ul>
          </div>
          <hr className="col-span-3 mt-2 border-gray-300" />

          <div className="mt-4 flex gap-3">
            <button
              type="submit"
              className="inline-flex items-center text-blue-500 border border-blue-500 px-4 py-2 text-sm font-semibold rounded-md transition-transform duration-300 hover:scale-105"
              disabled={loading}
            >
              {loading ? (
                "Adding..."
              ) : (
                <>
                  <MdAddCard className="mr-2 text-blue-500 size-5" /> Add
                </>
              )}
            </button>
            <button
              type="button"
              onClick={resetForm}
              className="inline-flex items-center text-red-500 border border-red-500 px-4 py-2 text-sm font-semibold transition-transform duration-300 hover:scale-105 rounded-md"
            >
              <RiResetLeftLine className="mr-2 text-red-500 size-5" /> Reset
            </button>
          </div>
        </form>
      </div>
    </>
  );
};



export default FormService