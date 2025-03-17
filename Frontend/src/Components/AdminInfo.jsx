import React, { useState, useEffect } from "react";

const AdminInfo = () => {
  const [adminInfo, setAdminInfo] = useState({
    Name: "",
    Address: "",
    Bod: "",
    Email: "",
    Phone: ""
  });
  const [isEditing, setIsEditing] = useState(false);
  const [adminId, setAdminId] = useState(null);

  useEffect(() => {
    const fetchAdminInfo = async () => {
      try {
        const response = await fetch("http://localhost:3009/admin");
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();
        if (Array.isArray(data) && data.length > 0) {
          setAdminInfo(data[0]);
          setAdminId(data[0]._id);
        } else {
          console.warn("No admin data found.");
        }
      } catch (err) {
        console.error("Error fetching data:", err.message);
      }
    };

    fetchAdminInfo();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const method = adminId ? "PUT" : "POST";
    const url = adminId
      ? `http://localhost:3009/admin/${adminId}`
      : "http://localhost:3009/admin";

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
    <div className="p-5 m-5 sm:m-2 shadow bg-white">
      <h2 className="text-xl font-semibold mb-4">Admin Info</h2>
      <form onSubmit={handleSubmit} className="space-y-3">
        {[
          { label: "Name", name: "Name", type: "text" },
          { label: "Address", name: "Address", type: "text" },
          { label: "Date of Birth", name: "Bod", type: "date" },
          { label: "Email", name: "Email", type: "email" },
          { label: "Phone", name: "Phone", type: "tel" }
        ].map((field) => (
          <div key={field.name} className="mt-3"> {/* Added margin-top for spacing */}
          <hr className="mb-4"/> {/* Added bottom margin to separate input fields */}
          <div className="flex flex-row items-center"> {/* Added items-center for vertical alignment */}
            <div className="w-1/3">
              <label className="block text-base font-medium md:text-base">{field.label}</label>
            </div>
            <div className="w-2/3 text-gray-600">
              <input
                type={field.type}
                name={field.name}
                value={adminInfo[field.name] || ""}
                onChange={(e) => setAdminInfo({ ...adminInfo, [field.name]: e.target.value })}
                disabled={!isEditing}
                className="w-full p-2 bg-transparent"
              />
            </div>
          </div>
        </div>
        
        ))}

        {/* Buttons */}
        <div className="flex gap-2 mt-4">
          <button
            type="button"
            onClick={() => setIsEditing(!isEditing)}
            className="text-blue-500 border border-blue-500 font-light  px-4 py-1 rounded"
          >
            {isEditing ? "Cancel" : "Edit"}
          </button>

          {isEditing && (
            <button
              type="submit"
              className="text-green-500 border border-green-500 font-light  px-4 py-1 rounded"
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
