import { useNavigate } from "react-router-dom";

const RoleSelection = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col items-center justify-start bg-[#fdecea] pt-10">
      {/* Heading - now at the top */}
      <div className="mb-9">
        <h1 className="text-5xl md:text-6xl font-playfair text-gray-700">
          <span className="text-[#f5b4bd]">Welcome to</span>{" "}
          <span className="text-7xl md:text-8xl font-bold" style={{ color: "#9D4D4B" }}>HormoniQ</span>
        </h1>
      </div>

      {/* Description paragraph - bigger and closer */}
      <p className="text-xl md:text-2xl text-[#984b4b] max-w-3xl mt-16 mb-12 leading-relaxed font-semibold">
        HormoniQ is your trusted companion for early PCOS detection and awareness.
        Our AI-powered tools, informative resources, and doctor-connect services are designed to
        support women's reproductive health with confidence, care, and community.
      </p>

      {/* Role Selection Buttons */}
      <div className="space-y-6">
        <button
          onClick={() => navigate("/user-home")}
          className="w-80 bg-[#ffb3b3] text-xl px-6 py-4 rounded-lg text-gray-800 hover:bg-pink-300 transition-all"
        >
          I am a User
        </button>

        <button
          onClick={() => navigate("/doctor-home")}
          className="w-80 bg-[#ffb3b3] hover:bg-pink-300 text-xl px-6 py-4 rounded-lg text-gray-800 hover:bg-blue-300 transition-all"
        >
          I am a Doctor
        </button>
      </div>
    </div>
  );
};

export default RoleSelection;
