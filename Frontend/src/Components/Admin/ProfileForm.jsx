import React, { useState, useEffect } from "react";
import { FaEdit } from "react-icons/fa";
import { BsSave2 } from "react-icons/bs";
import { MdCancel } from "react-icons/md";
import StorageStats from "../../Services/DBStorage";
import { IoImageOutline } from "react-icons/io5";

const FormProfile = () => {
  const [adminInfo, setFormProfile] = useState({
    Image: "",
    Name: "",
    Address: "",
    Bod: "",
    Email: "",
    Phone: "",
  });

  const [isEditing, setIsEditing] = useState(false);
  const [adminId, setAdminId] = useState(null);
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);

  useEffect(() => {
    const fetchFormProfile = async () => {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_BACKEND_URL}/admin/profile`
        );

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();

        if (Array.isArray(data) && data.length > 0) {
          setFormProfile(data[0]);
          setAdminId(data[0]._id);
        } else {
          console.warn("No admin data found.");
        }
      } catch (err) {
        console.error("Error fetching data:", err.message);
      }
    };

    fetchFormProfile();
  }, []);

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (!selectedFile) return;

    const allowedTypes = ["image/jpeg", "image/png", "image/gif"];
    if (!allowedTypes.includes(selectedFile.type)) {
      alert("❌ Only image files (JPG, PNG, GIF) are allowed!");
      return;
    }

    setFile(selectedFile);
    setPreview(URL.createObjectURL(selectedFile));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      let uploadedImageUrl = adminInfo.Image;

      // Handle image upload if a new file is selected
      if (file) {
        const formData = new FormData();
        formData.append("file", file);

        const uploadRes = await fetch(`${import.meta.env.VITE_BACKEND_URL}/profile`, {
          method: "POST",
          body: formData,
        });

        if (!uploadRes.ok) {
          throw new Error("Image upload failed.");
        }

        const uploadData = await uploadRes.json();
        uploadedImageUrl = uploadData.url;
      }

      const updatedProfile = {
        ...adminInfo,
        Image: uploadedImageUrl,
      };

      const method = adminId ? "PUT" : "POST";
      const url = adminId
        ? `${import.meta.env.VITE_BACKEND_URL}/admin/profile/${adminId}`
        : `${import.meta.env.VITE_BACKEND_URL}/admin/profile`;

      const response = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedProfile),
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
      <StorageStats />
      <div className="p-5 m-5 border border-gray-300 rounded sm:m-2 shadow-lg bg-white">
        <h2 className="text-lg font-medium text-gray-700 mt-4">Applicant Information</h2>
        <p className="text-sm text-gray-500 mt-2">Personal details and application</p>

        <hr className="mt-3 col-span-3 mb-4 border-gray-300" />

        <div className="flex flex-col sm:flex-row gap-4 mt-2">
          <dt className="text-sm font-medium text-gray-600">
            <label className="ml-2 block text-base font-medium md:text-base">Profile Image</label>
          </dt>

          <div className="flex flex-row">
            <label className="inline-flex w-fit sm:ml-10 items-center text-black border border-black px-4 py-2 text-sm font-semibold rounded-md transition-transform duration-300 hover:scale-105 cursor-pointer">
              <span className="flex flex-row text-sm font-medium justify-center">
                <IoImageOutline className="mr-2 text-black size-5" /> Choose File
              </span>
              <input
                type="file"
                id="Image"
                name="Image"
                onChange={handleFileChange}
                className="hidden"
              />
            </label>

            {/* File Name and Preview */}
            {(preview || adminInfo.Image) && (
              <div className="ml-5 flex flex-col gap-1">
                <span className="text-gray-700 text-sm truncate max-w-[180px]">
                  {file?.name || adminInfo.Image}
                </span>
                <img
                  src={preview || adminInfo.Image}
                  alt="Preview"
                  className="w-20 h-20 object-cover rounded"
                />
              </div>
            )}
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-3">
          {[
            { label: "Full name", id: "Name", name: "Name", type: "text" },
            { label: "Address", id: "Address", name: "Address", type: "text" },
            { label: "Date of Birth", id: "Bod", name: "Bod", type: "date" },
            { label: "Email", id: "Email", name: "Email", type: "email" },
            { label: "Phone", id: "Phone", name: "Phone", type: "tel" },
          ].map((field) => (
            <div
              key={field.name}
              className="mt-3 py-1 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0"
            >
              <hr className="col-span-3 mb-4 border-gray-300" />
              <dt className="text-sm font-medium text-gray-600">
                <label className="ml-2 block text-base font-medium md:text-base">
                  {field.label}
                </label>
              </dt>
              <dd className="mt-1 text-sm text-gray-600 sm:col-span-2 sm:mt-0">
                <input
                  type={field.type}
                  name={field.name}
                  id={field.id}
                  value={adminInfo[field.name] || ""}
                  onChange={(e) =>
                    setFormProfile({
                      ...adminInfo,
                      [field.name]: e.target.value,
                    })
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
            <button
              type="button"
              onClick={() => setIsEditing(!isEditing)}
              className="inline-flex items-center rounded-md border border-blue-500 px-3 py-2 text-sm font-semibold text-blue-500 transition-transform duration-300 hover:scale-105"
            >
              {isEditing ? (
                <>
                  <MdCancel className="mr-1.5 -ml-0.5 size-5 text-blue-500" />
                  Cancel
                </>
              ) : (
                <>
                  <FaEdit className="mr-1.5 -ml-0.5 size-5 text-blue-500" />
                  Edit
                </>
              )}
            </button>

            {isEditing && (
              <button
                type="submit"
                className="inline-flex items-center text-green-500 rounded-md border border-green-500 px-3 py-2 text-sm font-semibold transition-transform duration-300 hover:scale-105"
              >
                <BsSave2 className="mr-1.5 -ml-0.5 size-5 text-green-500" />
                Publish
              </button>
            )}
          </div>
        </form>
      </div>
    </>
  );
};

export default FormProfile;
