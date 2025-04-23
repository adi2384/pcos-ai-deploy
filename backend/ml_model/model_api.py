from flask import Flask, request, jsonify
import joblib
import numpy as np
from flask_cors import CORS
import os
import json

app = Flask(__name__)
CORS(app)  # Allow requests from Node.js backend

# Load the trained PCOS model
model_path = os.path.join(os.path.dirname(__file__), "pcos_model.pkl")
model = joblib.load(model_path)

# Blood Group Mapping
blood_group_mapping = {
    "A+": 1, "A-": 2, "B+": 3, "B-": 4,
    "AB+": 5, "AB-": 6, "O+": 7, "O-": 8
}

@app.route("/predict", methods=["POST"])
def predict():
    try:
        data = request.json  # Get JSON data from the request

        # Print received data and types for debugging
        print("\nReceived Data:", json.dumps(data, indent=4, ensure_ascii=True))
        print("\nData Types:")
        for key, value in data.items():
            print(f"{key}: {type(value)}")  # Print type of each value

        # Ensure all required features are present
        required_fields = [
            "Age (yrs)", "Weight (Kg)", "Height(Cm)", "BMI",
            "Blood Group", "Pulse rate(bpm)", "RR (breaths/min)", "Hb(g/dl)",
            "Cycle(R/I)", "Cycle length(days)", "Marraige Status (Yrs)", "Pregnant(Y/N)",
            "No. of abortions", "I_beta-HCG(mIU/mL)", "II_beta-HCG(mIU/mL)", "FSH(mIU/mL)",
            "LH(mIU/mL)", "FSH/LH", "Hip(inch)", "Waist(inch)", "Waist:Hip Ratio",
            "TSH (mIU/L)", "AMH(ng/mL)", "PRL(ng/mL)", "Vit D3 (ng/mL)", "PRG(ng/mL)",
            "RBS(mg/dl)", "Weight gain(Y/N)", "hair growth(Y/N)", "Skin darkening (Y/N)",
            "Hair loss(Y/N)", "Pimples(Y/N)", "Fast food (Y/N)", "Reg.Exercise(Y/N)",
            "BP _Systolic (mmHg)", "BP _Diastolic (mmHg)", "Follicle No. (L)", "Follicle No. (R)",
            "Avg. F size (L) (mm)", "Avg. F size (R) (mm)", "Endometrium (mm)"
        ]

        for field in required_fields:
            if field not in data:
                return jsonify({"error": f"Missing required field: {field}"}), 400

        # Convert categorical Yes/No fields to numeric (0 for No, 1 for Yes)
        def convert_yes_no(value):
            return 1 if str(value).lower() in ["yes", "y", "1"] else 0

        # Convert Blood Group from string to int
        blood_group = blood_group_mapping.get(data["Blood Group"].strip().upper())
        if blood_group is None:
            return jsonify({"error": f"Invalid Blood Group: {data['Blood Group']}"}), 400

        # Convert all values to numeric types
        try:
            features = np.array([
                float(data["Age (yrs)"]), float(data["Weight (Kg)"]), float(data["Height(Cm)"]), float(data["BMI"]),
                blood_group, float(data["Pulse rate(bpm)"]), float(data["RR (breaths/min)"]), float(data["Hb(g/dl)"]),
                int(data["Cycle(R/I)"]), int(data["Cycle length(days)"]), int(data["Marraige Status (Yrs)"]), convert_yes_no(data["Pregnant(Y/N)"]),
                int(data["No. of abortions"]), float(data["I_beta-HCG(mIU/mL)"]), float(data["II_beta-HCG(mIU/mL)"]), float(data["FSH(mIU/mL)"]),
                float(data["LH(mIU/mL)"]), float(data["FSH/LH"]), float(data["Hip(inch)"]), float(data["Waist(inch)"]), float(data["Waist:Hip Ratio"]),
                float(data["TSH (mIU/L)"]), float(data["AMH(ng/mL)"]), float(data["PRL(ng/mL)"]), float(data["Vit D3 (ng/mL)"]), float(data["PRG(ng/mL)"]),
                float(data["RBS(mg/dl)"]), convert_yes_no(data["Weight gain(Y/N)"]), convert_yes_no(data["hair growth(Y/N)"]), convert_yes_no(data["Skin darkening (Y/N)"]),
                convert_yes_no(data["Hair loss(Y/N)"]), convert_yes_no(data["Pimples(Y/N)"]), convert_yes_no(data["Fast food (Y/N)"]), convert_yes_no(data["Reg.Exercise(Y/N)"]),
                float(data["BP _Systolic (mmHg)"]), float(data["BP _Diastolic (mmHg)"]), int(data["Follicle No. (L)"]), int(data["Follicle No. (R)"]),
                float(data["Avg. F size (L) (mm)"]), float(data["Avg. F size (R) (mm)"]), float(data["Endometrium (mm)"])
            ]).reshape(1, -1)
        except ValueError as e:
            return jsonify({"error": "Invalid data type. Ensure all numerical values are correctly formatted.", "details": str(e)}), 400

        # Make a prediction
        prediction = model.predict(features)[0]

        # Send response
        return jsonify({"prediction": int(prediction)})

    except Exception as e:
        return jsonify({"error": "Something went wrong while predicting PCOS.", "details": str(e)}), 500


if __name__ == "__main__":
    app.run(port=5001, debug=True)  # Run on a different port to avoid conflicts
