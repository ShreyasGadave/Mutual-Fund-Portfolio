import { useState } from "react";
import Navbar from "./Navbar";
import AdminNavbar from "./AdminNavbar";
import { MdAddCard } from "react-icons/md";
import { RiResetLeftLine } from "react-icons/ri";

const AdminTestimonials = () => {
  const [adminInfo, setAdminInfo] = useState({
    Title: "",
    Description: ""
  });

  const [loading, setLoading] = useState(false);

  const resetForm = () => {
    setAdminInfo({ Title: "", Description: "" });
  };

  const TestimonialsHandler = async (e) => {
    e.preventDefault();
  
    if (!adminInfo.Title || !adminInfo.Description) {
      alert("Please fill in all fields before submitting.");
      return;
    }

    setLoading(true);
    console.log("Sending Data:", adminInfo);
    
    try {
      const response = await fetch("http://localhost:3009/admin/testimonials", {
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
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Navbar />
      <AdminNavbar />

      <div className="p-5 m-5 border border-gray-300 rounded sm:m-2 shadow-lg bg-white">
        <h2 className="text-lg font-semibold text-gray-900">Testimonials</h2>
        <p className="mt-1 text-sm text-gray-600">
          This information will be displayed publicly, so be careful what you share.
        </p>

        <form onSubmit={TestimonialsHandler} className="space-y-4">
        <hr className="col-span-3 mt-2 border-gray-300" />

          {/* Name Input */}
          <div className="space-y-2">
            <label className="block text-base font-medium text-gray-900">Title</label>
            <input
              type="text"
              name="Title"
              value={adminInfo.Name}
              onChange={(e) => setAdminInfo({ ...adminInfo, Title: e.target.value })}
              placeholder="Enter your name..."
              className="w-full p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-700 bg-transparent border"
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
              placeholder="Enter your feedback..."
              className="w-full p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-700 bg-transparent border"
              rows="4"
            />
          </div>
          <hr className="col-span-3 mt-2 border-gray-300" />

          {/* Submit Button */}
          <div className="mt-4 flex gap-3">
            <button
              type="submit"
              className="inline-flex items-center text-blue-500 border border-blue-500 px-4 py-2 text-sm font-semibold rounded-md transition-transform duration-300 hover:scale-105"
              disabled={loading}
            >
              {loading ? "Adding..." : (
                <>
                  <MdAddCard className="mr-2 text-blue-500 size-5" aria-hidden="true" />
                  Add
                </>
              )}
            </button>
            <button
              type="button"
              onClick={resetForm}
              className="inline-flex items-center text-red-500 border border-red-500 px-4 py-2 text-sm font-semibold transition-transform duration-300 hover:scale-105 rounded-md"
            > 
              <RiResetLeftLine className="mr-2 text-red-500 size-5" aria-hidden="true" />
              Reset
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default AdminTestimonials;
