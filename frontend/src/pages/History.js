// src/pages/History.js
import React, { useEffect, useState } from "react";
import axios from "axios";

const History = () => {
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get("http://localhost:3000/api/history", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setHistory(response.data.history);
      } catch (err) {
        setError("Failed to fetch history");
      } finally {
        setLoading(false);
      }
    };

    fetchHistory();
  }, []);

  

  if (loading) return <div className="text-center p-4">Loading...</div>;
  if (error) return <div className="text-red-500 p-4">{error}</div>;

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Prediction History</h2>
      <div className="space-y-4">
        {history.length === 0 ? (
          <p>No history found.</p>
        ) : (
          history.map((entry, index) => (
            <div key={index} className="p-4 border rounded-lg shadow">
              <p className="font-semibold">Prediction: {entry.prediction}</p>
              <p className="text-sm text-gray-500 mb-2">
                Time: {new Date(entry.createdAt).toLocaleString()}
              </p>
              <details>
                <summary className="cursor-pointer text-blue-600 underline">View Features</summary>
                <ul className="grid grid-cols-2 gap-x-6 mt-2 text-sm">
                  {Object.entries(entry.inputFeatures).map(([key, value]) => (
                    <li key={key}>
                      <strong>{key}</strong>: {value}
                    </li>
                  ))}
                </ul>
              </details>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default History;
