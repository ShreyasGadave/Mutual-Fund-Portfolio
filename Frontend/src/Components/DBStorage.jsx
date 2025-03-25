import { useEffect, useState } from "react";

export default function StorageStats() {
  const [stats, setStats] = useState(null);

  useEffect(() => {
    fetch("http://localhost:3009/api/storage")
      .then((res) => res.json())
      .then((data) => setStats(data))
      .catch((err) => console.error("Error fetching stats:", err));
  }, []);

  return (
    <div className="p-6 bg-gray-100 rounded-lg shadow-md">
      <h2 className="text-xl font-bold">MongoDB Storage Stats</h2>
      {stats ? (
        <ul className="mt-3">
          <li>📦 Storage Size: {stats.storageSizeMB} MB</li>
          <li>📂 Collections: {stats.collections}</li>
          <li>
  📦 Storage Available: {(100 - ((stats.storageSizeMB / 512) * 100)).toFixed(2)}%
</li>

        </ul>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}
