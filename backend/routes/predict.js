import express from "express";
import axios from "axios";
import dotenv from "dotenv";

dotenv.config();
const router = express.Router();

// Use environment variable for Flask API URL
const FLASK_API_URL = process.env.FLASK_API_URL || "http://localhost:5001/predict";

router.post("/", async (req, res) => {
    try {
        const data = req.body;

        // Check if all required 41 features are provided
        const requiredFields = [
            "age", "weight", "height", "bmi", "blood_group", "pulse_rate", "respiratory_rate", "hemoglobin",
            "cycle_type", "cycle_length", "marriage_years", "pregnant", "abortions", "beta_hcg1", "beta_hcg2",
            "fsh", "lh", "fsh_lh_ratio", "hip", "waist", "waist_hip_ratio", "tsh", "amh", "prl", "vit_d3",
            "progesterone", "rbs", "weight_gain", "hair_growth", "skin_darkening", "hair_loss", "pimples",
            "fast_food", "regular_exercise", "bp_systolic", "bp_diastolic", "follicle_no_left", "follicle_no_right",
            "avg_follicle_size_left", "avg_follicle_size_right", "endometrium_thickness"
        ];

        const missingFields = requiredFields.filter(field => data[field] === undefined);
        if (missingFields.length > 0) {
            return res.status(400).json({ error: `Missing required fields: ${missingFields.join(", ")}` });
        }

        // Send data to Flask API for prediction
        const response = await axios.post(FLASK_API_URL, {
            "Age (yrs)": data.age,
            "Weight (Kg)": data.weight,
            "Height(Cm)": data.height,
            "BMI": data.bmi,
            "Blood Group": data.blood_group,
            "Pulse rate(bpm)": data.pulse_rate,
            "RR (breaths/min)": data.respiratory_rate,
            "Hb(g/dl)": data.hemoglobin,
            "Cycle(R/I)": data.cycle_type,
            "Cycle length(days)": data.cycle_length,
            "Marraige Status (Yrs)": data.marriage_years,
            "Pregnant(Y/N)": data.pregnant,
            "No. of abortions": data.abortions,
            "I_beta-HCG(mIU/mL)": data.beta_hcg1,
            "II_beta-HCG(mIU/mL)": data.beta_hcg2,
            "FSH(mIU/mL)": data.fsh,
            "LH(mIU/mL)": data.lh,
            "FSH/LH": data.fsh_lh_ratio,
            "Hip(inch)": data.hip,
            "Waist(inch)": data.waist,
            "Waist:Hip Ratio": data.waist_hip_ratio,
            "TSH (mIU/L)": data.tsh,
            "AMH(ng/mL)": data.amh,
            "PRL(ng/mL)": data.prl,
            "Vit D3 (ng/mL)": data.vit_d3,
            "PRG(ng/mL)": data.progesterone,
            "RBS(mg/dl)": data.rbs,
            "Weight gain(Y/N)": data.weight_gain,
            "hair growth(Y/N)": data.hair_growth,
            "Skin darkening (Y/N)": data.skin_darkening,
            "Hair loss(Y/N)": data.hair_loss,
            "Pimples(Y/N)": data.pimples,
            "Fast food (Y/N)": data.fast_food,
            "Reg.Exercise(Y/N)": data.regular_exercise,
            "BP _Systolic (mmHg)": data.bp_systolic,
            "BP _Diastolic (mmHg)": data.bp_diastolic,
            "Follicle No. (L)": data.follicle_no_left,
            "Follicle No. (R)": data.follicle_no_right,
            "Avg. F size (L) (mm)": data.avg_follicle_size_left,
            "Avg. F size (R) (mm)": data.avg_follicle_size_right,
            "Endometrium (mm)": data.endometrium_thickness
        }, {
            headers: { "Content-Type": "application/json" }
        });

        // Get prediction result
        const prediction = response.data.prediction;

        // Send response back to frontend
        res.json({
            message: "PCOS prediction successful",
            result: prediction === 1 ? "PCOS Detected" : "No PCOS"
        });

    } catch (error) {
        console.error("Error calling Flask API:", error.response?.data || error.message);
        
        res.status(500).json({
            error: "Something went wrong while predicting PCOS.",
            details: error.response?.data || error.message
        });
    }
});
router.get("/", (req, res) => {
    res.send("Predict route is working!");
});

export default router;
