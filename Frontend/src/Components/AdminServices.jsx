import { useState } from "react";
import { toast } from "react-toastify";
import Navbar from "./Navbar";
import AdminNavbar from "./AdminNavbar";

const AdminServices = () => {
  const [adminInfo, setAdminInfo] = useState({
    Title: "",
    Description: "",
    List: "",
  });

  const [isEditing, setIsEditing] = useState(false);

  const ServiceHandler = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:3009/admin", {
        method: "POST", // Change method to POST
        headers: {
          "Content-Type": "application/json", // Specify JSON format
        },
        body: JSON.stringify(adminInfo), // Convert state to JSON
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const result = await response.json();
      toast.success("Data submitted successfully!");
      console.log("Response from server:", result);
      
      // Optionally, clear the form after submission
      setAdminInfo({ Title: "", Description: "", List: "" });
    } catch (err) {
      console.error("Error submitting data:", err.message);
      toast.error(`Error: ${err.message}`);
    }
  };

  return (
<>
    <Navbar/>
    <AdminNavbar/>

    <div className="p-5 m-5 border border-gray-300 rounded sm:m-2 shadow-lg bg-white">
      <h2 className="text-base/7 font-semibold text-gray-900">Service</h2>
      <p className="mt-1 text-sm/6 text-gray-600">
        This information will be displayed publicly, so be careful what you share.
      </p>
      <form onSubmit={ServiceHandler} className="space-y-3">
        {[
          { label: "Title", name: "Title", type: "text" },
          { label: "Description", name: "Description", type: "text" },
          { label: "List", name: "List", type: "text" },
        ].map((field) => (
          <div key={field.name} className="mt-3 px-4 py-1 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
            <hr className="col-span-3 mb-4 border-gray-300" />
            <dt className="text-sm font-medium text-gray-900">
              <label className="ml-2 block text-base font-medium md:text-base">
                {field.label}
              </label>
            </dt>
            <dd className="mt-1 text-sm text-gray-700 sm:col-span-2 sm:mt-0">
              <input
                type={field.type}
                name={field.name}
                value={adminInfo[field.name]}
                onChange={(e) => setAdminInfo({ ...adminInfo, [field.name]: e.target.value })}
                className="w-full p-2 bg-transparent  rounded-md"
              />
            </dd>
          </div>
        ))}

        {/* Buttons */}
        <div className="flex gap-2 mt-4">
          <button
            type="button"
            onClick={() => setIsEditing(!isEditing)}
            className="inline-flex items-center rounded-md border border-blue-500 px-3 py-2 text-sm font-semibold text-black"
          >
            {isEditing ? "Cancel" : "Edit"}
          </button>
          
          <button
            type="submit"
            className="inline-flex items-center rounded-md border border-green-500 px-3 py-2 text-sm font-semibold text-black"
          >
            Submit
          </button>
        </div>
      </form>
    </div>
    </>
  );

};

export default AdminServices;
