import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:3000/", // backend base URL
  headers: {
    "Content-Type": "application/json",
  },
});

// Attach JWT token to every request if present
API.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// ---------- USER APIs ----------
export const signupUser = async (userData) => {
  const response = await API.post("/auth/signup", userData);
  return response.data;
};

export const loginUser = async (userData) => {
  const response = await API.post("/auth/login", userData);
  return response.data;
};

// ---------- DOCTOR APIs ----------
export const signupDoctor = async (doctorData) => {
  try {
    const response = await API.post("/api/doctor/signup", doctorData);
    return response.data;
  } catch (err) {
    throw err;
  }
};

export const loginDoctor = async (doctorData) => {
  const response = await API.post("/api/doctor/login", doctorData);
  return response.data;
};

// ---------- DOCTOR DASHBOARD ----------
export const getDoctorDashboard = async () => {
  const response = await API.get("/api/doctor/dashboard");
  return response.data;
};

export const getPendingAppointments = async () => {
  const response = await API.get("/api/doctor/dashboard/appointments/pending");
  return response.data;
};

export const getApprovedAppointments = async () => {
  const response = await API.get("/api/doctor/dashboard/appointments/upcoming");
  return response.data;
};

// ---------- USER DASHBOARD ----------
export const fetchDashboardFeatures = async () => {
  const response = await API.get("/dashboard");
  return response.data.features;
};

// ---------- PCOS Prediction ----------
export const predictPCOS = async (formData) => {
  const response = await API.post("/predict", formData);
  return response.data.result;
};

// ---------- Blog ----------
export const createBlog = async (blogData) => {
  const response = await API.post("/api/blogs", blogData);
  return response.data;
};

export const fetchBlogs = async () => {
  const response = await API.get("/api/blogs");
  return response.data;
};

export const likeBlog = async (blogId) => {
  const response = await API.post(`/api/blogs/${blogId}/like`);
  return response.data;
};

export const commentOnBlog = async (blogId, commentText) => {
  const response = await API.post(`/api/blogs/${blogId}/comment`, {
    text: commentText,
  });
  return response.data;
};

// ---------- History ----------
export const fetchPredictionHistory = async () => {
  const response = await API.get("/history");
  return response.data.history;
};

// ---------- News ----------
export const fetchNews = async (query = "PCOS") => {
  const response = await axios.get(`http://localhost:3000/news?q=${query}`);
  return response.data.articles;
};

export const summarizeArticle = async (url) => {
  const response = await API.post("/news/summarize", { url });
  return response.data;
};

export const fetchAllDoctors = async () => {
  const response = await API.get("/api/doctor/doctors");
  return response.data;
};

export const requestAppointment = async (appointmentData) => {
  const res = await fetch("http://localhost:3000/api/appointments/request", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(appointmentData),
  });
  if (!res.ok) throw new Error("Failed to send appointment request");
  return res.json();
};



export default API;
