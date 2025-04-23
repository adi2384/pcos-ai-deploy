import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "../services/api";

const WriteBlog = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [anonymous, setAnonymous] = useState(false);
  const [image, setImage] = useState(null);
  const navigate = useNavigate();

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => {
      setImage(reader.result); // base64 string
    };
    reader.readAsDataURL(file);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");

    try {
      
        await axios.post(
            "/api/blogs",
            { title, content, image, isAnonymous: anonymous }, // 👈 fix the field name here
            { headers: { Authorization: `Bearer ${token}` } }
          );
        
      navigate("/blogs");
    } catch (err) {
      

      console.error("Failed to post blog", err.response?.data || err.message);

    }
  };

  return (
    <div className="min-h-screen p-8 bg-red-50">
      <h1 className="text-3xl font-bold font-['Playfair_Display'] mb-6">Write Your Blog</h1>
      <form onSubmit={handleSubmit} className="space-y-6 max-w-2xl mx-auto bg-white p-6 rounded-xl shadow-md">
        <input
          type="text"
          placeholder="Blog Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
          className="w-full px-4 py-2 border rounded"
        />
        <textarea
          placeholder="Write your experience..."
          value={content}
          onChange={(e) => setContent(e.target.value)}
          rows="8"
          required
          className="w-full px-4 py-2 border rounded"
        />
        <div className="flex items-center gap-2">
          <input
            type="checkbox"
            checked={anonymous}
            onChange={(e) => setAnonymous(e.target.checked)}
          />
          <label>Post as anonymous</label>
        </div>
        <input type="file" accept="image/*" onChange={handleImageChange} />
        <button type="submit" className="bg-black text-white px-6 py-2 rounded-full hover:bg-gray-800">
          Publish
        </button>
      </form>
    </div>
  );
};

export default WriteBlog;
