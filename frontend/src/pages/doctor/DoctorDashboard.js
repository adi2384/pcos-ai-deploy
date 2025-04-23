import { useNavigate } from "react-router-dom";

const DoctorDashboard = () => {
  const navigate = useNavigate();

  return (
    <div className="bg-hormoniq min-h-screen flex items-center justify-center">
      <div className="bg-white/50 p-10 rounded-2xl shadow-2xl backdrop-blur-md w-[500px] text-center">
        <h2 className="text-3xl font-bold mb-6 font-playfair text-gray-800">Doctor Dashboard</h2>
        <p className="mb-8 text-gray-700">Manage your appointments</p>

        <div className="space-y-6">
        <button
  onClick={() => navigate("/doctor/pending-appointments")}
  className="w-full bg-[#c7f0db] text-gray-900 px-4 py-3 rounded-lg font-medium shadow-md hover:bg-[#a7e8c2] transition-all"
>
  Pending Appointment Requests
</button>


          
        </div>
      </div>
    </div>
  );
};

export default DoctorDashboard;
