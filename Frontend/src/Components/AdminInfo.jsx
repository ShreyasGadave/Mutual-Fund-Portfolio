import React, { useState, useEffect } from "react"; // Import React and hooks

const AdminInfo = () => {
  const [adminInfo, setAdminInfo] = useState({}); // State to store admin information
  const [isEditing, setIsEditing] = useState(false); // State to track edit mode
  const [adminId, setAdminId] = useState(null); // State to store admin ID

  // Fetch admin data from API on component mount
  useEffect(() => {
    fetch("http://localhost:3009/admin")
      .then((res) => res.json())
      .then((data) => {
        if (data.length) {
          setAdminInfo(data[0]); // Set first admin data
          setAdminId(data[0]._id); // Store admin ID
        }
      })
      .catch((err) => console.error("Error fetching data:", err));
  }, []);

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    const method = adminId ? "PUT" : "POST"; // Determine request method
    const url = adminId
      ? `http://localhost:3009/admin/${adminId}`
      : "http://localhost:3009/admin"; // API endpoint

    fetch(url, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(adminInfo),
    })
      .then((res) => res.json())
      .then((data) => {
        if (!adminId) setAdminId(data._id); // Store new admin ID if created
        setIsEditing(false); // Exit editing mode
      })
      .catch((err) => console.error("Error saving data:", err));
  };

  return (
    <div className="p-5 border rounded shadow bg-white">
      <h2 className="text-xl font-semibold mb-4">Admin Info</h2>
      <form onSubmit={handleSubmit} className="space-y-3">
        {/* Name Field */}
        <div>
          <label className="block text-sm font-medium">Name</label>
          <input
            type="text"
            name="Name"
            value={adminInfo.Name || ""}
            onChange={(e) => setAdminInfo({ ...adminInfo, Name: e.target.value })}
            disabled={!isEditing}
            className="w-full p-2 border rounded"
          />
        </div>

        {/* Address Field */}
        <div>
          <label className="block text-sm font-medium">Address</label>
          <input
            type="text"
            name="Address"
            value={adminInfo.Address || ""}
            onChange={(e) => setAdminInfo({ ...adminInfo, Address: e.target.value })}
            disabled={!isEditing}
            className="w-full p-2 border rounded"
          />
        </div>

        {/* Birth Date Field */}
        <div>
          <label className="block text-sm font-medium">Date of Birth</label>
          <input
            type="date"
            name="Bod"
            value={adminInfo.Bod || ""}
            onChange={(e) => setAdminInfo({ ...adminInfo, Bod: e.target.value })}
            disabled={!isEditing}
            className="w-full p-2 border rounded"
          />
        </div>

        {/* Email Field */}
        <div>
          <label className="block text-sm font-medium">Email</label>
          <input
            type="email"
            name="Email"
            value={adminInfo.Email || ""}
            onChange={(e) => setAdminInfo({ ...adminInfo, Email: e.target.value })}
            disabled={!isEditing}
            className="w-full p-2 border rounded"
          />
        </div>

        {/* Phone Field */}
        <div>
          <label className="block text-sm font-medium">Phone</label>
          <input
            type="tel"
            name="Phone"
            value={adminInfo.Phone || ""}
            onChange={(e) => setAdminInfo({ ...adminInfo, Phone: e.target.value })}
            disabled={!isEditing}
            className="w-full p-2 border rounded"
          />
        </div>

        {/* Buttons */}
        <div className="flex gap-2">
          <button
            type="button"
            onClick={() => setIsEditing(!isEditing)}
            className="bg-blue-500 text-white px-4 py-2 rounded"
          >
            {isEditing ? "Cancel" : "Edit"}
          </button>

          {isEditing && (
            <button
              type="submit"
              className="bg-green-500 text-white px-4 py-2 rounded"
            >
              Save
            </button>
          )}
        </div>
      </form>
    </div>
  );
};

export default AdminInfo;
