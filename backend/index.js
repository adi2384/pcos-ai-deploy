import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import bodyParser from "body-parser";
import connectDB from "./config/config.js"; // Database connection
import authRoutes from "./routes/auth.js"; // Auth routes
import predictRoute from "./routes/predict.js"; // PCOS prediction
import dashboardRoutes from "./routes/dashboard.js"; // ✅ Fixed import
import blogRoutes from "./routes/Blog.js";
import newsRoutes from "./routes/News.js";
import predictionRoutes from "./routes/savePrediction.js";
import appointmentRoutes from "./routes/appointments.js";
import doctorRoutes from "./routes/doctor.js";
import doctorDashboardRoutes from "./routes/doctorDashboard.js"; 





dotenv.config();
connectDB(); // Connect to MongoDB

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Routes
app.use("/auth", authRoutes);
app.use("/predict", predictRoute);
app.use("/api/dashboard", dashboardRoutes); // ✅ Dashboard route
app.use("/api/blogs", blogRoutes);
app.use("/news", newsRoutes);
app.use("/api", predictionRoutes); // Handles /save-prediction and /history
app.use("/api/appointments", appointmentRoutes); // ✅ FIXED
app.use("/api/doctor", doctorRoutes);
app.use("/api/doctor/dashboard", doctorDashboardRoutes);
// Default route
app.get("/", (req, res) => {
    res.send("PCOS Detection API is running...");
});

// Start server
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
