import express from "express";
import authMiddleware from "../middleware/auth.js";

const router = express.Router();

router.get("/", authMiddleware, (req, res) => {
    res.json({
        features: [
            { name: "PCOS Detection", path: "/predict" },
            { name: "Blogs", path: "/blogs" },
            { name: "News & Awareness", path: "/news" },
            { name: "AI Chatbox", path: "/chat" },
            { name: "Get in Touch with Doctor", path: "/get-doctors" },
            { name: "View Prediction History" , path: "/history"}
        ]
    });
});

export default router;
