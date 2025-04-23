// src/pages/GetAppointmentForm.js
import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { requestAppointment } from "../services/api";

const GetAppointmentForm = () => {
  const { doctorId } = useParams();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    patientName: "",
    age: "",
    contact: "",
    symptoms: "",
    preferredTime: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await requestAppointment({ ...formData, doctorId });
      alert("Appointment request sent!");
      navigate("/"); // or show confirmation
    } catch (err) {
      console.error("Error submitting appointment:", err);
      alert("Failed to request appointment.");
    }
  };

  return (
    <div className="min-h-screen bg-hormoniq p-6 flex justify-center">
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded-xl shadow-md max-w-md w-full">
        <h2 className="text-xl font-bold mb-4 text-center">Appointment Request</h2>
        <input name="patientName" placeholder="Your Name" onChange={handleChange} className="mb-3 p-2 w-full border rounded" required />
        <input name="age" placeholder="Age" onChange={handleChange} className="mb-3 p-2 w-full border rounded" required />
        <input name="contact" placeholder="Contact Number" onChange={handleChange} className="mb-3 p-2 w-full border rounded" required />
        <textarea name="symptoms" placeholder="Describe your symptoms" onChange={handleChange} className="mb-3 p-2 w-full border rounded" required />
        <input name="preferredTime" placeholder="Preferred Time (e.g., Mon 10 AM)" onChange={handleChange} className="mb-4 p-2 w-full border rounded" required />
        <button type="submit" className="bg-[#c7f0db] hover:bg-[#a7e8c2] px-4 py-2 rounded w-full font-semibold">
          Submit Request
        </button>
      </form>
    </div>
  );
};

export default GetAppointmentForm;
