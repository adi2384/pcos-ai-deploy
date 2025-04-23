import { useNavigate } from "react-router-dom";

const DoctorHome = () => {
  const navigate = useNavigate();

  return (
    <div className="bg-hormoniq min-h-screen flex items-center justify-center">
      <div className="bg-white/10 p-8 rounded-2xl shadow-2xl text-center w-96 backdrop-blur-md">
        <h1 className="text-3xl font-bold text-gray-800 mb-6 font-playfair">Doctor Portal</h1>
        <p className="text-gray-600 mb-6 font-playfair">Login or Sign up to manage appointments</p>
        <div className="space-y-4">
          <button
            onClick={() => navigate("/doctor/login")}
            className="w-full bg-[#ffe6e6] text-gray-800 py-2 rounded-lg shadow-lg hover:bg-pink-300 transition-all"
          >
            Login
          </button>
          <button
            onClick={() => navigate("/doctor/signup")}
            className="w-full bg-[#ffe6e6] text-gray-800 py-2 rounded-lg shadow-lg hover:bg-pink-300 transition-all"
          >
            Sign Up
          </button>
        </div>
      </div>
    </div>
  );
};

export default DoctorHome;
