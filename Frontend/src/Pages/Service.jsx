import { useEffect, useState } from "react";
import Navbar from "../Components/Navbar";
import { useParams } from "react-router-dom";
import Contact from "../Components/Contact";
import Footer from "../Components/Footer";

const Service = () => {
  const { id } = useParams(); // Extract id from URL

  const [serviceData, setServiceData] = useState(null); // Store service data
  const [error, setError] = useState(null); // Store errors

  useEffect(() => {
    const fetchServiceInfo = async () => {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_BACKEND_URL}/service/${id}`,
          {
            mode: "cors",
          }
        );

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();

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
      <div className="mx-5  mt-4 space-y-12">
        {error && <p className="text-red-500">{error}</p>}
        {!serviceData ? (
          <p>Loading...</p>
        ) : (
          <div
            key={serviceData._id}
            className="group border shadow-lg relative p-4 rounded-lg"
          >
            <img
              src={serviceData.ImageURL}
              className="w-full rounded-lg bg-gray-200 object-cover"
            />
            <h3 className=" relative text-xl mt-4 font-normal text-gray-900">
              {serviceData.Title}
              <a
                href={`https://wa.me/7028934703`}
                target="_blank"
                rel="noopener noreferrer"
              >
                <p className="text-base  font-medium absolute right-0 top-0 border text-gray-900 bg-green-200 rounded-full border-green-400 px-3 cursor-pointer hover:bg-green-500">
                  Book Now
                </p>
              </a>{" "}
            </h3>
            <p className="mt-4 text-sm sm:text-lg  text-gray-800  ">
              {serviceData.Description}
            </p>
            <ul className="list-disc text-sm sm:text-lg ml-5 mt-2">
              {serviceData.List.map((item, index) => (
                <li key={index}>{item}</li>
              ))}
            </ul>
          </div>
        )}
      </div>
      <Contact />
      <Footer />
    </div>
  );
};

export default Service;
