import React, { useState, useEffect } from "react";
import { FaEdit } from "react-icons/fa";
import { BsSave2 } from "react-icons/bs";
import { MdCancel } from "react-icons/md";
import AdminNavbar from "./AdminNavbar";

const AdminInfo = () => {
  const [adminInfo, setAdminInfo] = useState({
    Name: "",
    Address: "",
    Bod: "",
    Email: "",
    Phone: "",
  });
  const [isEditing, setIsEditing] = useState(false);
  const [adminId, setAdminId] = useState(null);

  useEffect(() => {
    const fetchAdminInfo = async () => {
      try {
        const response = await fetch("http://localhost:3009/admin/profile");
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();
        if (Array.isArray(data) && data.length > 0) {
          setAdminInfo(data[0]);
          setAdminId(data[0]._id);
          // toast.success("Admin data fetched successfully!"); // ✅ Success toast
        } else {
          console.warn("No admin data found.");
          // toast.warn("No admin data available."); // ⚠️ Warning toast
        }
      } catch (err) {
        console.error("Error fetching data:", err.message);
        // toast.error(`Error: ${err.message}`); // ❌ Error toast
      }
    };

    fetchAdminInfo();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const method = adminId ? "PUT" : "POST";
    const url = adminId
      ? `http://localhost:3009/admin//profile/${adminId}`
      : "http://localhost:3009/admin/profile";

    try {
      const response = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(adminInfo),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();
      if (!adminId) setAdminId(data._id);
      setIsEditing(false);
    } catch (err) {
      console.error("Error saving data:", err.message);
    }
  };

  return (
    <>
      <AdminNavbar />
      <div className="p-5 m-5 border border-gray-300 rounded sm:m-2 shadow-lg bg-white">
        <h2 className="text-lg font-semibold text-gray-900">Profile</h2>
        <form onSubmit={handleSubmit} className="space-y-3">
          {[
            { label: "Name", name: "Name", type: "text" },
            { label: "Address", name: "Address", type: "text" },
            { label: "Date of Birth", name: "Bod", type: "date" },
            { label: "Email", name: "Email", type: "email" },
            { label: "Phone", name: "Phone", type: "tel" },
          ].map((field) => (
            <div
              key={field.name}
              className="mt-3  py-1 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0"
            >
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
                  value={adminInfo[field.name] || ""}
                  onChange={(e) =>
                    setAdminInfo({ ...adminInfo, [field.name]: e.target.value })
                  }
                  disabled={!isEditing}
                  className="w-full p-2 bg-transparent"
                />
              </dd>
            </div>
          ))}

          <hr className="col-span-3 mt-2 border-gray-300" />

          {/* Buttons */}
          <div className="flex gap-2 mt-4">
            <span className=" sm:block">
              <button
                type="button"
                onClick={() => setIsEditing(!isEditing)}
                className="inline-flex items-center rounded-md border border-blue-500 px-3 py-2 text-sm font-semibold text-blue-500 transition-transform duration-300 hover:scale-105"
              >
                {isEditing ? (
                  <>
                    <MdCancel
                      aria-hidden="true"
                      className="mr-1.5 -ml-0.5 size-5 text-blue-500"
                    />{" "}
                    Cancel
                  </>
                ) : (
                  <>
                    <FaEdit
                      aria-hidden="true"
                      className="mr-1.5 -ml-0.5 size-5 text-blue-500"
                    />{" "}
                    Edit
                  </>
                )}
              </button>
            </span>

            {isEditing && (
              <span className="sm:ml-3">
                <button
                  type="submit"
                  className="inline-flex items-center text-green-500 rounded-md border border-green-500 px-3 py-2 text-sm font-semibold transition-transform duration-300 hover:scale-105 "
                >
                  <BsSave2
                    aria-hidden="true"
                    className="mr-1.5 -ml-0.5 size-5 text-green-500"
                  />
                  Publish
                </button>
              </span>
            )}
          </div>
        </form>
      </div>
    </>
  );
};

export default AdminInfo;
