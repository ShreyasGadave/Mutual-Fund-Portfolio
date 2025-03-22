import React from "react";
import { useState, useEffect } from "react";
import {  MdDelete } from "react-icons/md";


const DataAbout = () => {
  const [aboutData, setAboutData] = useState([]);

  useEffect(() => {
    const fetchAdminInfo = async () => {
      try {
        const response = await fetch("http://localhost:3009/admin/about");
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();
        setAboutData(Array.isArray(data) ? data : [data]);
        console.log(data);
      } catch (err) {
        console.error("Error fetching data:", err.message);
      }
    };

    fetchAdminInfo();
  }, []);

  return (
    <div>
      <div className="p-5 m-5 border border-gray-300 rounded sm:m-2 shadow-lg bg-white">
        <h2 className="text-lg font-semibold text-gray-900">About Data</h2>
        {aboutData.map((section) => (
          <div
            key={section._id}
            className="border mt-3 rounded border-gray-200 shadow p-4"
          >
            <div className="flex flex-row justify-between">
              <div className="block text-base font-medium text-gray-900">
                {section.Title}
              </div>
              <div></div>
              <MdDelete className="mr-2 text-red-500 size-5" />
            </div>
            <hr className="col-span-3 mt-3 border-gray-300" />
            <p className="mt-2 block text-sm font-normal text-gray-900">
              {section.Description}
            </p>
            <hr className="col-span-3 mt-3 border-gray-300" />
            <ul className="list-disc text-sm  ml-5 mt-2">
              {section.List.map((item, index) => (
                <li key={index}>{item}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DataAbout;
