import React, { useState, useEffect } from "react";

const AdminInfo = () => {
  const [adminInfo, setAdminInfo] = useState({
    Name: "",
    Email: "",
    Phone: "",
    Address: "",
    Bod: "",
  });
  const [isEditing, setIsEditing] = useState(false);
  const [adminId, setAdminId] = useState(null); // Store Admin ID for updates

  // Fetch admin data from backend
  useEffect(() => {
    const fetchAdminData = async () => {
      try {
        const response = await fetch("http://localhost:3009/admin");
        const data = await response.json();
        if (data.length > 0) {
          setAdminInfo(data[0]); // Assuming there's only one admin
          setAdminId(data[0]._id); // Store the admin's ID
        }
      } catch (error) {
        console.error("Error fetching admin data:", error);
      }
    };
    fetchAdminData();
  }, []);

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    try {
      const method = adminId ? "PUT" : "POST"; 
      const url = adminId
        ? `http://localhost:3009/admin/${adminId}`
        : "http://localhost:3009/admin";

      const response = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(adminInfo),
      });

      const result = await response.json();
      console.log("Response from backend:", result);

      if (response.ok) {
        alert("Admin data updated successfully!");
        if (!adminId) {
          setAdminId(result.adminData._id); // Save new ID if created
        }
      } else {
        alert("Error updating data");
      }
    } catch (error) {
      console.error("Error saving admin data:", error);
    }

    setIsEditing(false);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setAdminInfo({ ...adminInfo, [name]: value });
  };

  return (
    <div className="mt-5 mx-4 md:mx-10 lg:mx-20 border rounded-lg p-5 bg-white shadow-sm">
      <p className="text-xl md:text-2xl font-semibold mb-6">Personal Information</p>
      <form onSubmit={handleFormSubmit} className="space-y-4">
        {Object.keys(adminInfo).map((key) => (
          <div key={key}>
            <label className="block mb-1 text-sm md:text-base">{key}</label>
            <input
              className="border border-gray-400 rounded-sm p-2 w-full"
              type={key === "Bod" ? "date" : "text"}
              name={key}
              value={adminInfo[key]}
              onChange={handleChange}
              disabled={!isEditing}
            />
          </div>
        ))}
        <button
          type="button"
          onClick={() => setIsEditing(!isEditing)}
          className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-sm w-full md:w-auto"
        >
          {isEditing ? "Cancel" : "Edit"}
        </button>
        {isEditing && (
          <button
            type="submit"
            className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-sm w-full md:w-auto ml-2"
          >
            Save
          </button>
        )}
      </form>
    </div>
  );
};

export default AdminInfo;
