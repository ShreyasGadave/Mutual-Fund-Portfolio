import { useEffect, useState } from "react";

export default function StorageStats() {
  const [stats, setStats] = useState(null);

  useEffect(() => {
    fetch(`${import.meta.env.VITE_BACKEND_URL}/api/storage`)
      .then((res) => res.json())
      .then((data) => setStats(data))
      .catch((err) => console.error("Error fetching stats:", err));
  }, []);

  return (
    <div className="p-5 m-5 border border-gray-300 rounded sm:m-2 shadow-lg bg-white">
      <h2 className="text-base text-gray-700 font-medium">MongoDB Storage Stats</h2>
      {stats ? (
        <ul className="mt-3">
          <li className="mt-2 block text-base font-normal text-gray-600"> Storage Size: {stats.storageSizeMB} MB</li>
          <hr className="col-span-3 mt-2 border-gray-300" />

          <li className="mt-2 block text-base font-normal text-gray-600">Collections: 0{stats.collections}</li>
          <hr className="col-span-3 mt-2 border-gray-300" />

          <li className="mt-2 block text-base font-normal text-gray-600"> Storage Available: {(100 - ((stats.storageSizeMB / 512) * 100)).toFixed(2)}%
</li>

        </ul>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}
