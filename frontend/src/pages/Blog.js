import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "../services/api";

const Blogs = () => {
  const [blogs, setBlogs] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        //const res = await axios.get("/blogs");
        const res = await axios.get("/api/blogs");

        setBlogs(res.data);
      } catch (err) {
        console.error("Failed to fetch blogs", err);
      }
    };
    fetchBlogs();
  }, []);

  return (
    <div className="min-h-screen bg-white">
      {/* Top black bar like Medium */}
     {/* Top bar with heading and black line below it */}
<div className="bg-red-100 px-6 pt-4">
  <h2 className="text-lg font-semibold text-black">Community Blogs</h2>
  <div className="border-b-2 border-black mt-1 w-full"></div>
</div>



      {/* Hero Section (50% screen height) */}
      <div className="bg-red-100 text-black h-[50vh] flex flex-col justify-center px-10">
        <h1 className="text-5xl font-bold font-['Playfair_Display'] mb-4">HormoniQ</h1>
        <p className="text-xl mb-6 max-w-xl">
          Connect. Share. Heal. Join a community that understands your PCOS journey.
        </p>
        <button
          className="bg-black text-white px-6 py-2 rounded-full hover:bg-gray-800 transition w-fit"
          onClick={() => navigate("/write-blog")}
        >
          Start writing
        </button>
      </div>

      {/* Blog List Section */}
      <div className="bg-white px-8 py-10">
        <div className="space-y-6">
          {blogs.length > 0 ? (
            blogs.map((blog) => (
              <div
                key={blog._id}
                className="p-6 border rounded-xl shadow-sm hover:shadow-md transition"
              >
                <h3 className="text-xl font-bold mb-2">{blog.title}</h3>
                <p className="text-gray-700 mb-2">
                  {blog.content.slice(0, 200)}...
                </p>
                <p className="text-sm text-gray-500">
                  By {blog.author?.name || "Anonymous"} on{" "}
                  {new Date(blog.createdAt).toLocaleDateString()}
                </p>
                <div className="flex items-center gap-4 mt-2 text-sm text-gray-600">
                  ❤️ {blog.likes?.length || 0} &nbsp;|&nbsp; 💬{" "}
                  {blog.comments?.length || 0}
                </div>
              </div>
            ))
          ) : (
            <p className="text-gray-500 text-center">No blogs available yet.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Blogs;
