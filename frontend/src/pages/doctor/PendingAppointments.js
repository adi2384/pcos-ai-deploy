import React, { useEffect, useState } from "react";
import axios from "axios";

const PendingAppointments = () => {
  const [appointments, setAppointments] = useState([]);

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const token = localStorage.getItem("doctorToken"); // Make sure token is stored with this key
        const response = await axios.get("http://localhost:3000/api/appointments/pending", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setAppointments(response.data);
      } catch (error) {
        console.error("Error fetching appointments:", error.response?.data || error.message);
      }
    };

    fetchAppointments();
  }, []);

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Pending Appointments</h2>
      {appointments.length === 0 ? (
        <p>No pending appointments.</p>
      ) : (
        <ul className="space-y-4">
          {appointments.map((appointment) => (
            <li key={appointment._id} className="border p-4 rounded">
              <p><strong>Name:</strong> {appointment.name}</p>
              <p><strong>Age:</strong> {appointment.age}</p>
              <p><strong>Problem:</strong> {appointment.problem}</p>
              <p><strong>Status:</strong> {appointment.status}</p>
              {/* Future: Add approve button here */}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default PendingAppointments;
