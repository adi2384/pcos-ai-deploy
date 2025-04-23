import { Link } from "react-router-dom";

const Welcome = () => {
  return (
    <div className="h-screen flex items-center justify-center bg-gradient-to-r from-purple-400 to-lilac-300">
      <div className="bg-white p-8 rounded-2xl shadow-xl text-center w-96">
        <h1 className="text-3xl font-bold text-gray-800 mb-6">Welcome to PCOS Detection</h1>
        <p className="text-gray-600 mb-6">Login or Sign up to check your results</p>
        <div className="space-y-4">
          <Link to="/login">
            <button className="w-full bg-purple-600 text-white py-2 rounded-lg shadow hover:bg-purple-700">
              Login
            </button>
          </Link>
          <Link to="/signup">
            <button className="w-full bg-lilac-500 text-white py-2 rounded-lg shadow hover:bg-lilac-600">
              Sign Up
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Welcome;
