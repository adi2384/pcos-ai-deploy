import React, { useState } from "react";
import { summarizeArticle } from "../services/api";
import { useNavigate } from "react-router-dom";

const News = () => {
  const [url, setUrl] = useState("");
  const [summary, setSummary] = useState("");
  const [error, setError] = useState(null);
  const [loadingSummary, setLoadingSummary] = useState(false);
  const navigate = useNavigate();

  const handleSummarize = async () => {
    if (!url.trim()) {
      setError("Please enter a valid article URL.");
      return;
    }

    setLoadingSummary(true);
    try {
      const res = await summarizeArticle(url.trim());
      setSummary(res.summary);
      setError(null);
    } catch (err) {
      setError("Failed to generate summary.");
      console.error("Summary error:", err.message);
    } finally {
      setLoadingSummary(false);
    }
  };

  return (
    <div className="flex flex-col md:flex-row p-6 gap-6">
      {/* Left content */}
      <div className="md:w-3/4 w-full">
        <h1 className="text-2xl font-bold mb-4">
          Hello Aditi, I'm <span className="text-pink-600 font-semibold">Nova</span> — your PCOS news assistant!
        </h1>

        {/* Summary Input Section */}
        <div className="mb-6">
          <label className="block mb-2 font-medium">Paste news article URL:</label>
          <div className="flex gap-2">
            <input
              type="text"
              placeholder="https://www.example.com/article"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              className="border px-4 py-2 rounded w-full"
            />
            <button
              onClick={handleSummarize}
              className="bg-pink-500 text-white px-4 py-2 rounded hover:bg-pink-600"
            >
              Summarize
            </button>
          </div>
        </div>

        {/* Summary Box */}
        {loadingSummary ? (
          <p className="text-blue-500 mb-4">Generating summary...</p>
        ) : summary ? (
          <div className="bg-gray-100 p-4 rounded shadow mb-6">
            <h2 className="font-semibold mb-2">📝 Summary:</h2>
            <p>{summary}</p>
          </div>
        ) : null}

        {/* Error Message */}
        {error && <p className="text-red-500 mb-4">{error}</p>}
      </div>

      {/* Right Sidebar */}
      <div className="md:w-1/4 w-full">
        <div className="sticky top-6 space-y-4">
          {/* Symptoms Button */}
          <button
            onClick={() => navigate("/news/symptoms")}
            className="w-full bg-pink-100 hover:bg-pink-200 text-pink-800 py-4 px-4 rounded-xl shadow text-left"
          >
            <h3 className="text-xl font-semibold mb-2">🩺 Symptoms</h3>
            <ul className="list-disc list-inside text-sm">
              <li>Irregular periods</li>
              <li>Weight gain</li>
              <li>Acne</li>
              <li>Hair thinning</li>
            </ul>
          </button>

          {/* Trending News Button */}
          <button
            onClick={() => navigate("/news/trending")}
            className="w-full bg-blue-100 hover:bg-blue-200 text-blue-800 py-4 px-4 rounded-xl shadow text-left"
          >
            <h3 className="text-xl font-semibold mb-2">🔥 Trending</h3>
            <ul className="list-disc list-inside text-sm">
              <li>New PCOS Guidelines 2025</li>
              <li>AI in Women’s Health</li>
              <li>Diet tips for hormonal balance</li>
            </ul>
          </button>
        </div>
      </div>
    </div>
  );
};

export default News;
