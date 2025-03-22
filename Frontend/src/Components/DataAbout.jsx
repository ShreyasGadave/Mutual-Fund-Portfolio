import React, { useState, useEffect } from "react";

const DataTestimonials = () => {
  const [testimonials, setTestimonials] = useState([]); // Ensures it's always an array
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTestimonials = async () => {
      try {
        const response = await fetch("http://localhost:3009/admin/testimonials");
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();
        console.log("Fetched Testimonials:", data);
        setTestimonials(Array.isArray(data) ? data : [data]); // Ensure it's an array
      } catch (err) {
        console.error("Error fetching testimonials:", err.message);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchTestimonials();
  }, []);

  return (
    <div className="p-5 m-5 border border-gray-300 rounded sm:m-2 shadow-lg bg-white">
      <h2 className="text-lg font-semibold text-gray-900">Testimonials</h2>

      {/* Handle loading and error states */}
      {loading ? (
        <p className="text-gray-600">Loading testimonials...</p>
      ) : error ? (
        <p className="text-red-500">Error: {error}</p>
      ) : testimonials?.length > 0 ? (
        testimonials.map((testimonial, index) => (
          <div key={testimonial._id || index} className="border mt-3 rounded border-gray-200 shadow p-4">
            <p className="text-sm text-gray-900">{testimonial.Description || "No testimonial available"}</p>
            <hr className="mt-3 border-gray-300" />
            <div className="text-base font-medium text-gray-900">{testimonial.Name || "Anonymous"}</div>
          </div>
        ))
      ) : (
        <p className="text-gray-600">No testimonials available.</p>
      )}
    </div>
  );
};

export default DataTestimonials;
