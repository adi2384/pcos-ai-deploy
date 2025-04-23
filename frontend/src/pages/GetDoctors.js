import React, { useEffect, useState } from "react";
import { fetchAllDoctors } from "../services/api";
import { useNavigate } from "react-router-dom";

const GetDoctors = () => {
  const [doctors, setDoctors] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const loadDoctors = async () => {
      try {
        const data = await fetchAllDoctors();
        setDoctors(data);
      } catch (err) {
        console.error("Error fetching doctors:", err);
      }
    };

    loadDoctors();
  }, []);

  const recommendedDoctors = [
    {
      name: "Dr. (Prof.) Sadhana Kala",
      specialization: "Gynecologist/Obstetrician",
      location: "Kalkaji, Delhi",
      experience: "47 years",
      fee: "₹1500",
      rating: "97%",
      reviews: "538 Patient Stories",
    },
    {
      name: "Dr. Ruchi Malhotra",
      specialization: "Gynecologist/Obstetrician",
      location: "Kingsway Camp, Delhi",
      experience: "33 years",
      fee: "₹1000",
      rating: "89%",
      reviews: "192 Patient Stories",
    },
    {
      name: "Dr. Malvika Sabharwal",
      specialization: "Gynecologist/Obstetrician",
      location: "Karol Bagh, Delhi",
      experience: "44 years",
      fee: "₹1100",
      rating: "88%",
      reviews: "N/A",
    },
  ];

  return (
    <div className="min-h-screen bg-pink-100 p-6">
      <h1 className="text-3xl font-bold text-center mb-8 text-gray-800">
        Available Doctors
      </h1>

      {/* Available Doctors Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {doctors.map((doc) => (
          <div
            key={doc._id}
            className="bg-white/70 backdrop-blur p-6 rounded-xl shadow-lg"
          >
            <h2 className="text-xl font-semibold text-gray-900">{doc.name}</h2>
            <p className="text-gray-700 font-medium">
              Specialization: {doc.specialization}
            </p>
            <p className="text-gray-700">Email: {doc.email}</p>
            <p className="text-gray-700">Contact: {doc.contact}</p>
            {doc.bio && (
              <p className="text-gray-600 text-sm mt-2 italic">"{doc.bio}"</p>
            )}
            {doc.availability?.length > 0 && (
              <div className="mt-2">
                <p className="font-medium text-sm text-gray-800">Availability:</p>
                <ul className="list-disc list-inside text-sm text-gray-700">
                  {doc.availability.map((slot, index) => (
                    <li key={index}>{slot}</li>
                  ))}
                </ul>
              </div>
            )}
            <button
              onClick={() => navigate(`/get-appointment/${doc._id}`)}
              className="mt-4 bg-[#c7f0db] hover:bg-[#a7e8c2] px-4 py-2 rounded-lg shadow font-medium"
            >
              Get an Appointment
            </button>
          </div>
        ))}
      </div>

      {/* Recommended Doctors Section */}
      <h2 className="text-2xl font-bold text-center mt-16 mb-6 text-gray-800">
        Recommended Doctors
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {recommendedDoctors.map((doc, index) => (
          <div
            key={index}
            className="bg-white/90 p-6 rounded-xl shadow-md border border-green-100"
          >
            <h3 className="text-lg font-bold text-gray-900">{doc.name}</h3>
            <p className="text-gray-700">{doc.specialization}</p>
            <p className="text-sm text-gray-600">{doc.location}</p>
            <p className="text-sm text-gray-600">Experience: {doc.experience}</p>
            <p className="text-sm text-gray-600">Fee: {doc.fee}</p>
            <p className="text-sm text-green-700 font-semibold">Rating: {doc.rating}</p>
            <p className="text-sm text-gray-500">{doc.reviews}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default GetDoctors;
