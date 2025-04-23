import { useState } from "react";
import { signupDoctor } from "../../services/api";
import { useNavigate } from "react-router-dom";

const DoctorSignup = () => {
  const [userData, setUserData] = useState({
    name: "",
    email: "",
    password: "",
    doctorCode: "",
    specialization: "",
    contact: "",
    bio: "",
    availability: "",
  });

  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();
    setError("");

    try {
      // Convert availability string to array (split by commas)
      const formattedData = {
        ...userData,
        availability: userData.availability, // it's already an array now
      };
      

      console.log("Doctor Signup data (formatted):", formattedData);
      await signupDoctor(formattedData);
      navigate("/doctor/login");
    } catch (err) {
      console.error("Doctor Signup error:", err.response?.data || err.message);
      setError(err.response?.data?.message || "Signup failed");
    }
  };

  return (
    <div className="bg-hormoniq min-h-screen flex items-center justify-center">
      <div className="bg-white/40 p-8 rounded-2xl shadow-2xl text-center w-96 backdrop-blur-md">
        <h2 className="text-2xl font-bold mb-4 font-playfair">Doctor Signup</h2>
        {error && <p className="text-red-500 mb-4">{error}</p>}
        <form className="space-y-4" onSubmit={handleSignup}>
          <input
            type="text"
            placeholder="Name"
            onChange={(e) => setUserData({ ...userData, name: e.target.value })}
            className="border p-2 w-full mb-2"
            required
          />
          <input
            type="email"
            placeholder="Email"
            onChange={(e) => setUserData({ ...userData, email: e.target.value })}
            className="border p-2 w-full mb-2"
            required
          />
          <input
            type="password"
            placeholder="Password"
            onChange={(e) => setUserData({ ...userData, password: e.target.value })}
            className="border p-2 w-full mb-2"
            required
          />
          <input
            type="text"
            placeholder="Doctor Code"
            onChange={(e) => setUserData({ ...userData, doctorCode: e.target.value })}
            className="border p-2 w-full mb-2"
            required
          />
          <input
            type="text"
            placeholder="Specialization"
            onChange={(e) => setUserData({ ...userData, specialization: e.target.value })}
            className="border p-2 w-full mb-2"
            required
          />
          <input
            type="text"
            placeholder="Contact Number"
            onChange={(e) => setUserData({ ...userData, contact: e.target.value })}
            className="border p-2 w-full mb-2"
            required
          />
          <textarea
            placeholder="Bio (Optional)"
            onChange={(e) => setUserData({ ...userData, bio: e.target.value })}
            className="border p-2 w-full mb-2"
          />
          <input
           type="text"
           placeholder="Availability (e.g., Mon 10 AM - 12 PM)"
           onChange={(e) =>
           setUserData({ ...userData, availability: [e.target.value] })
           }
           className="border p-2 w-full mb-2"
          />

          <button
            type="submit"
            className="bg-[#ffe6e6] text-gray-800 px-4 py-2 rounded w-full hover:bg-pink-300 transition-all"
          >
            Signup
          </button>
        </form>
      </div>
    </div>
  );
};

export default DoctorSignup;
