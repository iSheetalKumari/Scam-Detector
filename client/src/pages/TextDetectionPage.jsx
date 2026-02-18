import { useState } from "react";
import { detectTextScam } from "../services/api";

export default function TextDetectionPage() {
  const [message, setMessage] = useState("");
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleDetect = async () => {
    if (!message.trim()) {
      alert("Please enter a message first!");
      return;
    }

    setLoading(true);
    setResult(null);

    try {
      const res = await detectTextScam(message);
      setResult(res);
    } catch (err) {
      console.error(err);
      alert("Something went wrong while detecting scam!");
    }

    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-gray-100 flex justify-center px-4 py-10">
      <div className="w-full max-w-3xl">
        <h1 className="text-3xl font-bold mb-6 text-gray-800">
          Text Scam Detection
        </h1>

        <div className="bg-white shadow-lg rounded-xl p-6">
          <label className="block text-lg font-semibold text-gray-700 mb-3">
            Enter SMS / WhatsApp Message
          </label>

          <textarea
            rows="6"
            className="w-full border border-gray-300 rounded-lg p-4 text-gray-700 focus:ring-2 focus:ring-blue-500 outline-none resize-none"
            placeholder="Paste your suspicious SMS/WhatsApp message here..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />

          <div className="flex justify-between items-center mt-5">
            <button
              onClick={handleDetect}
              className="bg-blue-600 text-white px-6 py-2 rounded-lg font-semibold hover:bg-blue-700 transition"
              disabled={loading}
            >
              {loading ? "Detecting..." : "Detect Scam"}
            </button>

            <button
              onClick={() => {
                setMessage("");
                setResult(null);
              }}
              className="bg-gray-200 text-gray-700 px-6 py-2 rounded-lg font-semibold hover:bg-gray-300 transition"
            >
              Clear
            </button>
          </div>
        </div>

        {/* RESULT BOX */}
        {result && (
          <div className="mt-8 bg-white shadow-lg rounded-xl p-6 border-l-8 
            border-red-500">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">
              Detection Result
            </h2>

            <p className="text-lg text-gray-700 mb-2">
              <span className="font-semibold">Type:</span>{" "}
              <span className="text-blue-600 font-bold">{result.type}</span>
            </p>

            <p className="text-lg text-gray-700 mb-2">
              <span className="font-semibold">Risk:</span>{" "}
              <span className="text-red-600 font-bold">
                {result.riskPercentage}%
              </span>
            </p>

            <p className="text-lg text-gray-700">
              <span className="font-semibold">Suggestion:</span>{" "}
              {result.suggestion}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
