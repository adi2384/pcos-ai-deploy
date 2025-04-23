import React, { useEffect, useState } from "react";
import axios from "axios";

const NewsTrending = () => {
  const [articles, setArticles] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:3000/news/trending")
      .then((res) => setArticles(res.data.articles))
      .catch((err) => console.error("Error fetching trending news:", err));
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-semibold mb-4 text-center text-pink-700">Trending PCOS News</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {articles.map((article, index) => (
          <div
            key={index}
            className="bg-white rounded-xl shadow-md hover:shadow-lg p-4 border border-pink-200"
          >
            <img
              src={article.image || "https://via.placeholder.com/150"}
              alt="thumbnail"
              className="rounded-md w-full h-40 object-cover mb-3"
            />
            <h2 className="text-lg font-bold text-pink-800">{article.title}</h2>
            <p className="text-gray-600 text-sm mt-2">{article.description}</p>
            <a
              href={article.url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block mt-3 text-pink-600 hover:underline text-sm font-medium"
            >
              Read more →
            </a>
          </div>
        ))}
      </div>
    </div>
  );
};

export default NewsTrending;
