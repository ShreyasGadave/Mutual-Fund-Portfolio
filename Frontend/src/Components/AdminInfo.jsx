import React, { useState } from "react";

const AdminInfo = () => {
  const [AdminInfo, setAdminInfo] = useState({
    Img: "",
    Name: "",
    Email: "",
    Phone: "",
    Address: "",
    Bod: "",
  });

  const [isEditing, setIsEditing] = useState(false); // State to track edit mode

  const FormHandler = (e) => {
    e.preventDefault();
    if (isEditing) {
      console.log("Saved Data:", AdminInfo); // Save the data
    }
    setIsEditing(!isEditing); // Toggle edit mode
  };

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "Img") {
      setAdminInfo({
        ...AdminInfo,
        [name]: files[0], // Store the file object
      });
    } else {
      setAdminInfo({
        ...AdminInfo,
        [name]: value,
      });
    }
  };

  return (
    <div className="mt-5 mx-4 md:mx-10 lg:mx-20 border rounded-lg p-5 bg-white shadow-sm">
      <p className="text-xl md:text-2xl font-semibold mb-6">Personal Information</p>
      <form onSubmit={FormHandler} className="space-y-4">
        {/* Profile Image */}
        <div>
          <label className="block mb-1 text-sm md:text-base">Profile Image</label>
          <input
            type="file"
            name="Img"
            onChange={handleChange}
            className="border border-gray-400 rounded-sm p-2 w-full"
            disabled={!isEditing} // Disable when not in edit mode
          />
        </div>

        {/* Name */}
        <div>
          <label className="block mb-1 text-sm md:text-base">Name</label>
          <input
            className="border border-gray-400 rounded-sm p-2 w-full"
            type="text"
            name="Name"
            value={AdminInfo.Name}
            placeholder="Name"
            onChange={handleChange}
            disabled={!isEditing} // Disable when not in edit mode
          />
        </div>

        {/* Email */}
        <div>
          <label className="block mb-1 text-sm md:text-base">Email</label>
          <input
            className="border border-gray-400 rounded-sm p-2 w-full"
            type="email"
            name="Email"
            value={AdminInfo.Email}
            placeholder="Email"
            onChange={handleChange}
            disabled={!isEditing} // Disable when not in edit mode
          />
        </div>

        {/* Phone */}
        <div>
          <label className="block mb-1 text-sm md:text-base">Phone</label>
          <input
            className="border border-gray-400 rounded-sm p-2 w-full"
            type="tel"
            name="Phone"
            value={AdminInfo.Phone}
            placeholder="Phone"
            onChange={handleChange}
            disabled={!isEditing} // Disable when not in edit mode
          />
        </div>

        {/* Address */}
        <div>
          <label className="block mb-1 text-sm md:text-base">Address</label>
          <input
            className="border border-gray-400 rounded-sm p-2 w-full"
            type="text"
            name="Address"
            value={AdminInfo.Address}
            placeholder="Address"
            onChange={handleChange}
            disabled={!isEditing} // Disable when not in edit mode
          />
        </div>

        {/* Date of Birth */}
        <div>
          <label className="block mb-1 text-sm md:text-base">Date of Birth</label>
          <input
            className="border border-gray-400 rounded-sm p-2 w-full"
            type="date"
            name="Bod"
            value={AdminInfo.Bod}
            placeholder="Date of Birth"
            onChange={handleChange}
            disabled={!isEditing} // Disable when not in edit mode
          />
        </div>

        {/* Edit/Save Button */}
        <button
          type="submit"
          className={`${
            isEditing ? "bg-green-500 hover:bg-green-600" : "bg-blue-500 hover:bg-blue-600"
          } text-white px-4 py-2 rounded-sm w-full md:w-auto`}
        >
          {isEditing ? "Save" : "Edit"} {/* Change button text based on mode */}
        </button>
      </form>
    </div>
  );
};

export default AdminInfo;