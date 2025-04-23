import { useState } from "react";
import { signupUser } from "../services/api";
import { useNavigate } from "react-router-dom";

const Signup = () => {
  const [userData, setUserData] = useState({ name: "", email: "", password: "" });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();
    setError("");

    try {
      await signupUser(userData);
      navigate("/login");
    } catch (err) {
      setError(err.response?.data?.message || "Signup failed");
    }
  };

  return (
    <div className="bg-hormoniq min-h-screen flex items-center justify-center">
      <div className="bg-white/40 p-8 rounded-2xl shadow-2xl text-center w-96 backdrop-blur-md">
        <h2 className="text-2xl font-bold mb-4 font-playfair">Signup</h2>
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

export default Signup;
