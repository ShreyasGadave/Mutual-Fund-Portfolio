import { useEffect, useState } from "react";
import Navbar from "../Components/Navbar";
import { useParams } from "react-router-dom";

const Service = () => {
  const { id } = useParams(); // Extract id from URL

  const [serviceData, setServiceData] = useState(null); // Store service data
  const [error, setError] = useState(null); // Store errors

  useEffect(() => {
    const fetchServiceInfo = async () => {
      try {
        const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/service/${id}`, { 
          mode: "cors" 
        });

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        console.log(data);
        
        setServiceData(data); // Set the service data in state
      } catch (err) {
        setError(err.message);
      }
    };

    if (id) fetchServiceInfo(); // Fetch only if id exists
  }, [id]); // Fetch data when id changes

  return (
    <div>
      <Navbar />
      <div className=" p-3 space-y-12">
        {error && <p className="text-red-500">{error}</p>}
        {!serviceData ? (
          <p>Loading...</p>
        ) : (
          <div key={serviceData._id} className="group border shadow-lg relative p-4 rounded-lg">
            <img
              src={serviceData.ImageURL}
              className="w-full rounded-lg bg-gray-200 object-cover"
            />
            <h3 className="text-xl mt-4 font-normal text-gray-900">{serviceData.Title}</h3>
            <p className="mt-4 text-base text-gray-800 sm:text-sm ">
              {serviceData.Description}
            </p>
            <ul className="list-disc text-sm  ml-5 mt-2">
              {serviceData.List.map((item, index) => (
                <li key={index}>{item}</li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default Service;
