import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const [features, setFeatures] = useState([]);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchDashboard = async () => {
      try {
        const token = localStorage.getItem("token");

        const response = await axios.get("http://localhost:3000/api/dashboard", {
          headers: { Authorization: `Bearer ${token}` },
        });

        setFeatures(response.data.features);
      } catch (err) {
        console.error("Error fetching dashboard:", err);
        setError("Unable to load dashboard. Please try logging in again or check your network.");
      }
    };

    fetchDashboard();
  }, [navigate]);

  if (error) {
    return (
      <div className="p-6 text-center">
        <p className="text-red-500 mb-4">{error}</p>
        <button
          onClick={() => navigate("/login")}
          className="bg-pink-200 px-4 py-2 rounded hover:bg-pink-300"
        >
          Go to Login
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Pink Header */}
      <div className="bg-pink-200 w-full px-6 py-10 flex flex-col items-center">
        <h1 className="text-4xl md:text-5xl font-extrabold text-black mb-6">
          Dashboard
        </h1>
        <div className="flex flex-wrap justify-center gap-8">
          {features.map((feature, index) => (
            <button
              key={index}
              onClick={() => navigate(feature.path)}
              className="text-black text-lg md:text-xl font-medium hover:underline transition"
            >
              {feature.name}
            </button>
          ))}
        </div>
      </div>
  
      {/* Info Sections */}
      <div className="px-6 py-12 flex flex-col items-center">
        {/* About Section */}
        <h2 className="text-2xl font-bold text-black mb-4 mt-10">About Our Website</h2>
        <p className="text-gray-700 text-lg leading-relaxed max-w-4xl">
          Welcome to <strong>HormoniQ</strong>, your supportive space for understanding and managing PCOS. 
          Our website offers a variety of tools to help you take control of your health, including:
          <br /><br />
          - A <strong>PCOS Prediction Tool</strong> where you can input 41 medical features to assess your risk.<br />
          - A <strong>Blog Section</strong> where you can share your personal journey or read about others navigating similar experiences.<br />
          - A <strong>News & Awareness Hub</strong> featuring:
          <ul className="list-disc list-inside ml-4">
            <li><strong>Nova</strong>, our AI Summarizer, which gives quick and easy summaries of any article you share.</li>
            <li><strong>Symptoms & Trending News</strong> to keep you informed with reliable, updated content.</li>
          </ul>
          - A <strong>Connect with a Doctor</strong> feature that allows you to speak with certified professionals through our platform.
          <br /><br />
          At HormoniQ, you’re never alone. We’re here to support you with knowledge, care, and community every step of the way.
        </p>
  
        {/* Stats Section */}
        <h2 className="text-2xl font-bold text-black mb-4 mt-12">PCOS Stats</h2>
        <p className="text-gray-700 text-lg leading-relaxed max-w-4xl">
          Polycystic Ovary Syndrome (PCOS) affects approximately <strong>1 in 5 women</strong> of reproductive age in India.
          <br /><br />
          - It is one of the most common hormonal disorders among women globally.
          <br />
          - Early detection can help manage symptoms and prevent long-term complications such as infertility, diabetes, and heart disease.
          <br /><br />
          Our mission is to raise awareness, support early diagnosis, and empower women to understand and manage their hormonal health with confidence.
        </p>
      </div>
    </div>
  );
  
};

export default Dashboard;
