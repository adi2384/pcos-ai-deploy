import React, { useState } from "react";
import axios from "axios";
//import { useNavigate } from "react-router-dom";
import "../index.css";
import pcosLeftImage from "../assets/hello.png";


function App() {
  const [formData, setFormData] = useState({
    age: "", weight: "", height: "", bmi: "", blood_group: "", pulse_rate: "",
    respiratory_rate: "", hemoglobin: "", cycle_type: "", cycle_length: "",
    marriage_years: "", pregnant: "", abortions: "", beta_hcg1: "", beta_hcg2: "",
    fsh: "", lh: "", fsh_lh_ratio: "", hip: "", waist: "", waist_hip_ratio: "",
    tsh: "", amh: "", prl: "", vit_d3: "", progesterone: "", rbs: "",
    weight_gain: "", hair_growth: "", skin_darkening: "", hair_loss: "",
    pimples: "", fast_food: "", regular_exercise: "", bp_systolic: "",
    bp_diastolic: "", follicle_no_left: "", follicle_no_right: "",
    avg_follicle_size_left: "", avg_follicle_size_right: "", endometrium_thickness: ""
  });

  const [prediction, setPrediction] = useState(null);
  //const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value, type } = e.target;
    setFormData({
      ...formData,
      [name]: type === "number" && value !== "" ? parseFloat(value) : value,
    });
  };
  const [isSubmitting, setIsSubmitting] = useState(false);
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (isSubmitting) return; // Prevent further submissions while submitting
    
    setIsSubmitting(true); // Set to true when the form starts submitting
    
    try {
      const response = await axios.post("http://localhost:3000/predict", formData);
      setPrediction(response.data.result);
      
      // Map formData keys to the saved report keys
      const reportData = {
        age: formData.age,
        weight: formData.weight,
        height: formData.height,
        bmi: formData.bmi,
        blood_group: formData.blood_group,
        pulse_rate: formData.pulse_rate,
        respiratory_rate: formData.respiratory_rate,
        hemoglobin: formData.hemoglobin,
        cycle_type: formData.cycle_type,
        cycle_length: formData.cycle_length,
        marriage_years: formData.marriage_years,
        pregnant: formData.pregnant,
        abortions: formData.abortions,
        beta_hcg1: formData.beta_hcg1,
        beta_hcg2: formData.beta_hcg2,
        fsh: formData.fsh,
        lh: formData.lh,
        fsh_lh_ratio: formData.fsh_lh_ratio,
        hip: formData.hip,
        waist: formData.waist,
        waist_hip_ratio: formData.waist_hip_ratio,
        tsh: formData.tsh,
        amh: formData.amh,
        prl: formData.prl,
        vit_d3: formData.vit_d3,
        progesterone: formData.progesterone,
        rbs: formData.rbs,
        weight_gain: formData.weight_gain,
        hair_growth: formData.hair_growth,
        skin_darkening: formData.skin_darkening,
        hair_loss: formData.hair_loss,
        pimples: formData.pimples,
        fast_food: formData.fast_food,
        regular_exercise: formData.regular_exercise,
        bp_systolic: formData.bp_systolic,
        bp_diastolic: formData.bp_diastolic,
        follicle_no_left: formData.follicle_no_left,
        follicle_no_right: formData.follicle_no_right,
        avg_follicle_size_left: formData.avg_follicle_size_left,
        avg_follicle_size_right: formData.avg_follicle_size_right,
        endometrium_thickness: formData.endometrium_thickness
      };
      
      // Save the report to history
      try {
        const token = localStorage.getItem("token");
        await axios.post("http://localhost:3000/api/save-prediction", {
          inputFeatures: reportData,
          prediction: response.data.result, // Use the prediction from the response
        }, {
          headers: {
            Authorization: `Bearer ${token}`,
          }
        });
        
        console.log("Prediction saved successfully.");
      } catch (saveError) {
        console.error("Failed to save prediction:", saveError);
      }
  
    } catch (error) {
      console.error("Error:", error);
      setPrediction("Error in prediction");
    } finally {
      setIsSubmitting(false); // Reset to allow further submissions
    }
  };
  

  

  const saveReport = async () => {
    try {
      const token = localStorage.getItem("token");
      await axios.post("http://localhost:3000/api/save-prediction", {
        inputFeatures: formData,
        prediction,
      }, {
        headers: {
          Authorization: `Bearer ${token}`,
        }
      });
      alert("✅ Report saved successfully!");
    } catch (err) {
      console.error(err);
      alert("❌ Failed to save report.");
    }
  };

  return (
    <div className="min-h-screen flex font-['Playfair_Display'] bg-gray-100">
      <div
        className="hidden md:block md:w-1/2 bg-contain bg-no-repeat bg-center min-h-screen"
        style={{ backgroundImage: `url(${pcosLeftImage})` }}
      ></div>

      <div className="w-full md:w-1/2 flex items-center justify-center p-8 bg-pink-100">
        <div className="w-full max-w-5xl bg-white/80 p-6 rounded-xl shadow-2xl overflow-y-auto max-h-[90vh]">
          <h1 className="text-4xl font-bold text-black text-center mb-8">PCOS Prediction</h1>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 text-black font-bold">
              {[
                { name: "age", label: "Age", type: "number" },
                { name: "weight", label: "Weight (Kg)", type: "number", step: "0.01" },
                { name: "height", label: "Height (Cm)", type: "number", step: "0.01" },
                { name: "bmi", label: "BMI", type: "number", step: "0.01" },
                { name: "blood_group", label: "Blood Group", type: "text" },
                { name: "pulse_rate", label: "Pulse Rate (bpm)", type: "number" },
                { name: "respiratory_rate", label: "Respiratory Rate", type: "number" },
                { name: "hemoglobin", label: "Hemoglobin", type: "number", step: "0.01" },
                { name: "cycle_type", label: "Cycle Type", type: "text" },
                { name: "cycle_length", label: "Cycle Length", type: "number" },
                { name: "marriage_years", label: "Years Married", type: "number" },
                { name: "pregnant", label: "Pregnant (Y/N)", type: "text" },
                { name: "abortions", label: "Abortions", type: "number" },
                { name: "beta_hcg1", label: "β-HCG I", type: "number", step: "0.01" },
                { name: "beta_hcg2", label: "β-HCG II", type: "number", step: "0.01" },
                { name: "fsh", label: "FSH", type: "number", step: "0.01" },
                { name: "lh", label: "LH", type: "number", step: "0.01" },
                { name: "fsh_lh_ratio", label: "FSH/LH Ratio", type: "number", step: "0.01" },
                { name: "hip", label: "Hip", type: "number", step: "0.01" },
                { name: "waist", label: "Waist", type: "number", step: "0.01" },
                { name: "waist_hip_ratio", label: "Waist:Hip Ratio", type: "number", step: "0.01" },
                { name: "tsh", label: "TSH", type: "number", step: "0.01" },
                { name: "amh", label: "AMH", type: "number", step: "0.01" },
                { name: "prl", label: "PRL", type: "number", step: "0.01" },
                { name: "vit_d3", label: "Vitamin D3", type: "number", step: "0.01" },
                { name: "progesterone", label: "Progesterone", type: "number", step: "0.01" },
                { name: "rbs", label: "RBS", type: "number", step: "0.01" },
                { name: "weight_gain", label: "Weight Gain (Y/N)", type: "text" },
                { name: "hair_growth", label: "Hair Growth (Y/N)", type: "text" },
                { name: "skin_darkening", label: "Skin Darkening (Y/N)", type: "text" },
                { name: "hair_loss", label: "Hair Loss (Y/N)", type: "text" },
                { name: "pimples", label: "Pimples (Y/N)", type: "text" },
                { name: "fast_food", label: "Fast Food (Y/N)", type: "text" },
                { name: "regular_exercise", label: "Exercise (Y/N)", type: "text" },
                { name: "bp_systolic", label: "BP Systolic", type: "number" },
                { name: "bp_diastolic", label: "BP Diastolic", type: "number" },
                { name: "follicle_no_left", label: "Follicles Left", type: "number" },
                { name: "follicle_no_right", label: "Follicles Right", type: "number" },
                { name: "avg_follicle_size_left", label: "Follicle Size Left", type: "number", step: "0.01" },
                { name: "avg_follicle_size_right", label: "Follicle Size Right", type: "number", step: "0.01" },
                { name: "endometrium_thickness", label: "Endometrium Thickness", type: "number", step: "0.01" },
              ].map(({ name, label, type, step }) => (
                <div key={name}>
                  <input
                    type={type}
                    name={name}
                    placeholder={label}
                    step={step}
                    onChange={handleChange}
                    required
                    className="w-full p-2 rounded-md border border-gray-300 focus:ring-2 focus:ring-pink-400 bg-white text-black font-semibold placeholder-gray-600"
                  />
                </div>
              ))}
            </div>

            <div className="flex justify-center mt-6">
              <button
                type="submit"
                className="px-6 py-3 bg-pink-600 text-white rounded-lg hover:bg-pink-700 font-bold transition"
              >
                Predict
              </button>
            </div>
          </form>

          {prediction && (
            <div className="mt-6 text-center text-black">
              <div className="text-xl font-bold mb-4">Result: {prediction}</div>
              <button
                onClick={saveReport}
                className="px-5 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-semibold transition"
              >
                Save as Report
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
