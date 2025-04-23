import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { predictPCOS } from "../services/api";

const Predict = () => {
  const [formData, setFormData] = useState({});
  const [prediction, setPrediction] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
    }
  }, [navigate]);

  // Handle input changes, ensuring decimal values are correctly captured
  const handleChange = (e) => {
    const { name, value, type } = e.target;
    setFormData({
      ...formData,
      [name]: type === "number" && value !== "" ? parseFloat(value) : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const result = await predictPCOS(formData);
      setPrediction(result);
    } catch (error) {
      console.error("Error:", error);
      setPrediction("Error in prediction");
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
      <h1 className="text-3xl font-bold mb-4">PCOS Prediction</h1>
      <form onSubmit={handleSubmit} className="bg-white p-6 shadow-md rounded w-full max-w-lg">
        {Object.keys(formData).map((key) => (
          <input
            key={key}
            type={key.includes("blood_group") || key.includes("pregnant") ? "text" : "number"}
            name={key}
            placeholder={key.replace(/_/g, " ").toUpperCase()}
            step="0.01"
            onChange={handleChange}
            className="border p-2 w-full mb-2"
            required
          />
        ))}
        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded w-full">
          Predict
        </button>
      </form>
      {prediction && <h2 className="mt-4 text-xl font-bold">Result: {prediction}</h2>}
    </div>
  );
};

export default Predict;
