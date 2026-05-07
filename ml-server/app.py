from flask import Flask, request, jsonify
import joblib
from flask_cors import CORS
import os

app = Flask(__name__)
CORS(app)

model = joblib.load("scam_model.pkl")

@app.route("/predict", methods=["POST"])
def predict():
    data = request.get_json()
    text = data.get("text")

    if not text:
        return jsonify({"error": "Text is required"}), 400

    prediction = model.predict([text])[0]

    # label 1 = scam, label 0 = safe
    scam = True if int(prediction) == 1 else False

    return jsonify({
        "scam": scam,
        "label": int(prediction)
    })

# IMPORTANT FOR RENDER
if __name__ == "__main__":
    port = int(os.environ.get("PORT", 5001))
    app.run(host="0.0.0.0", port=port)