import { useState } from "react";
import { loginDoctor } from "../../services/api"; // Doctor-specific API function
import { useNavigate } from "react-router-dom";

const DoctorLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");

    try {
      console.log("Doctor Logging in with:", { email, password });

      const response = await loginDoctor({ email, password });

      console.log("Doctor Login response:", response);

      localStorage.setItem("token", response.token);
      localStorage.setItem("role", "doctor");
      navigate("/doctor/dashboard"); // Redirect to doctor dashboard
    } catch (err) {
      console.error("Doctor Login error:", err.response?.data || err.message);
      setError(err.response?.data?.message || "Login failed");
    }
  };

  return (
    <div className="bg-hormoniq min-h-screen flex items-center justify-center">
      <div className="bg-white/40 p-8 rounded-2xl shadow-2xl text-center w-96 backdrop-blur-md">
        <h2 className="text-2xl font-bold mb-4 font-playfair">Doctor Login</h2>
        {error && <p className="text-red-500 mb-4">{error}</p>}
        <form className="space-y-4" onSubmit={handleLogin}>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="border p-2 w-full mb-2"
            placeholder="Email"
            required
          />
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="border p-2 w-full mb-2"
            placeholder="Password"
            required
          />
          <button
            type="submit"
            className="bg-[#ffe6e6] text-gray-800 px-4 py-2 rounded w-full hover:bg-pink-300 transition-all"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default DoctorLogin;
