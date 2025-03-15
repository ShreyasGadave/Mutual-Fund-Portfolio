import React, { useState, useEffect } from "react"; // Importing React and necessary hooks

const AdminInfo = () => {
  const [adminInfo, setAdminInfo] = useState({}); // State to store admin information
  const [isEditing, setIsEditing] = useState(false); // State to track if editing mode is enabled
  const [adminId, setAdminId] = useState(null); // State to store admin ID

  useEffect(() => {
    fetch("http://localhost:3009/admin") // Fetch admin data from API
      .then((res) => res.json()) // Convert response to JSON
      .then((data) => {
        if (data.length) { // If data exists
          setAdminInfo(data[0]); // Set first admin data
          setAdminId(data[0]._id); // Store admin ID
        }
      })
      .catch((err) => console.error("Error fetching data:", err)); // Handle errors
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent default form submission behavior
    const method = adminId ? "PUT" : "POST"; // Determine request method
    const url = adminId ? `http://localhost:3009/admin/${adminId}` : "http://localhost:3009/admin"; // API endpoint
    
    fetch(url, {
      method, // Use determined method (PUT or POST)
      headers: { "Content-Type": "application/json" }, // Set content type to JSON
      body: JSON.stringify(adminInfo), // Convert adminInfo to JSON and send
    })
      .then((res) => res.json()) // Convert response to JSON
      .then((data) => {
        if (!adminId) setAdminId(data._id); // If new admin, store ID
        setIsEditing(false); // Exit editing mode
        alert("Data saved successfully!"); // Show success message
      })
      .catch((err) => console.error("Error saving data:", err)); // Handle errors
  };

  return (
    <div className="p-5 border rounded shadow bg-white"> {/* Container with styling */}
      <h2 className="text-xl font-semibold mb-4">Admin Info</h2> {/* Title */}
      <form onSubmit={handleSubmit} className="space-y-3"> {/* Form with spacing */}
        {Object.entries(adminInfo).map(([key, value]) => ( /* Loop through admin info */
          <div key={key}> {/* Field container */}
            <label className="block text-sm font-medium">{key}</label> {/* Label */}
            <input
              type={key === "Bod" ? "date" : "text"} // Set input type
              name={key} // Set input name
              value={value || ""} // Set input value, default empty
              onChange={(e) => setAdminInfo({ ...adminInfo, [key]: e.target.value })} // Update state on change
              disabled={!isEditing} // Disable if not editing
              className="w-full p-2 border rounded" // Styling for input
            />
          </div>
        ))}
        <button type="button" onClick={() => setIsEditing(!isEditing)} className="bg-blue-500 text-white px-4 py-2 rounded"> {/* Toggle edit mode button */}
          {isEditing ? "Cancel" : "Edit"} {/* Button text changes based on mode */}
        </button>
        {isEditing && <button type="submit" className="bg-green-500 text-white px-4 py-2 rounded ml-2">Save</button>} {/* Save button, only visible in edit mode */}
      </form>
    </div>
  );
};

export default AdminInfo; // Export component