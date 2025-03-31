import { useState } from "react";
import { MdAddCard, MdDelete, MdPlaylistAdd } from "react-icons/md";
import { RiResetLeftLine } from "react-icons/ri";

const FormAbout = () => {
  const [adminInfo, setAdminInfo] = useState({
    Title: "",
    Description: "",
    List: [],
  });
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
  const AboutHandler = async (e) => {
    e.preventDefault();
  
    if (!adminInfo.Description ) {
      alert("Please fill in all fields before submitting.");
      return;
    }
  
    console.log("Before sending:", adminInfo);  // ✅ Debug adminInfo before submission
  
    setLoading(true);

    const requestData = {
      Title: adminInfo.Title,
      Description: adminInfo.Description,
    };
  
    // ✅ Only include List if it has items
    if (adminInfo.List.length > 0) {
      requestData.List = adminInfo.List;
    }
  
    console.log("Sending data:  requestData :", requestData); 
    try {
      const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/admin/about`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(adminInfo), // ✅ Ensure List is included
      });
  
      const data = await response.json();
      console.log("Response from server:", data);
  
      resetForm(); // Reset only if successful
    } catch (err) {
      console.error("Error submitting data:", err.message);
      alert("Failed to submit data. Please try again.");
    } finally {
      setLoading(false);
    }
  };
  


  return (
    <div>
      <div className="p-5 m-5 border border-gray-300 rounded sm:m-2 shadow-lg bg-white">
        <h2 className="text-lg font-medium text-gray-700 mt-4">About</h2>
        <p className="text-sm text-gray-500 mt-2">About details and Features</p>
        <form onSubmit={AboutHandler} className="space-y-4">
          <hr className="col-span-3 mt-2 border-gray-300" />
          <div className="space-y-2">
            <label className="block text-base font-medium text-gray-600">
              Title <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="Title"
              value={adminInfo.Title}
              onChange={(e) =>
                setAdminInfo({ ...adminInfo, Title: e.target.value })
              }
              placeholder="Enter list Title..."
              className="w-full p-2 text-bas text-gray-500  rounded focus:outline-none focus:ring-1 focus:ring-gray-500 bg-transparent "
            />
          </div>
          <hr className="bg-gray-500" />
          <div className="space-y-2">
            <label className="block text-base font-medium text-gray-600">
              Description <span className="text-red-500">*</span>
            </label>
            <textarea
              name="Description"
              value={adminInfo.Description}
              onChange={(e) =>
                setAdminInfo({ ...adminInfo, Description: e.target.value })
              }
              placeholder="Enter list Description..."
              className="w-full p-2 text-base text-gray-500 rounded focus:outline-none focus:ring-1 focus:ring-gray-500 bg-transparent "
              rows="4"
            />
          </div>
          <hr className="col-span-3 mt-2 border-gray-300" />

          <div className="space-y-2">
            <label className="block text-base font-medium text-gray-600">
              List
            </label>
            <div className="flex gap-2">
              <input
                type="text"
                value={listItem}
                onChange={(e) => setListItem(e.target.value)}
                className="w-full p-2 text-base text-gray-500  rounded  focus:outline-none focus:ring-1 focus:ring-gray-500 bg-transparent "
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
    </div>
  );
};

export default FormAbout