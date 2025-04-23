import express from "express";
import Blog from "../models/Blog.js";
import authMiddleware from "../middleware/auth.js";

const router = express.Router();

// ✅ Create new blog post
router.post("/", authMiddleware, async (req, res) => {
  try {
    console.log("req.user:", req.user); // ✅ This is where it belongs

    const { title, content, image, isAnonymous } = req.body;

    const newBlog = new Blog({
      title,
      content,
      image,
      isAnonymous: isAnonymous || false,
      author: req.user.id, // 👈 this line will break if req.user is undefined
    });

    await newBlog.save();
    res.status(201).json(newBlog);
  } catch (err) {
    console.error("Error saving blog:", err); // ✅ show real backend error
    res.status(500).json({ error: "Error creating blog" });
  }
});

// ✅ Get all blog posts
router.get("/", async (req, res) => {
  try {
    const blogs = await Blog.find()
      .populate("author", "name email")
      .sort({ createdAt: -1 });

    res.json(blogs);
  } catch (err) {
    res.status(500).json({ error: "Error fetching blogs" });
  }
});

// ✅ Get a single blog by ID
router.get("/:id", async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id).populate("author", "name");
    if (!blog) return res.status(404).json({ error: "Blog not found" });
    res.json(blog);
  } catch (err) {
    res.status(404).json({ error: "Blog not found" });
  }
});

// ✅ Comment on a blog
router.post("/:id/comment", authMiddleware, async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id);
    if (!blog) return res.status(404).json({ error: "Blog not found" });

    blog.comments.push({
      user: req.user.id,
      text: req.body.text,
    });

    await blog.save();
    res.json(blog);
  } catch (err) {
    res.status(500).json({ error: "Error adding comment" });
  }
});

// ✅ Like or unlike a blog
router.post("/:id/like", authMiddleware, async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id);
    if (!blog) return res.status(404).json({ error: "Blog not found" });

    const userId = req.user.id;
    const alreadyLiked = blog.likes.includes(userId);

    if (alreadyLiked) {
      blog.likes.pull(userId); // Unlike
    } else {
      blog.likes.push(userId); // Like
    }

    await blog.save();
    res.json({ likes: blog.likes.length });
  } catch (err) {
    res.status(500).json({ error: "Error updating like status" });
  }
});

export default router;
