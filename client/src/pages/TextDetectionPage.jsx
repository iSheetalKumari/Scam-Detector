import React, { useState } from "react";

export default function TextDetectionPage() {
  const [text, setText] = useState("");
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleDetect = async () => {
    if (!text.trim()) {
      alert("Please enter some text!");
      return;
    }

    setLoading(true);
    setResult(null);

    try {
      const res = await fetch("https://scam-detector-production.up.railway.app/predict", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ text }),
      });

      const data = await res.json();

      if (!res.ok) {
        alert(data.error || "Something went wrong!");
        setLoading(false);
        return;
      }

      // data = { scam: true/false, label: 0/1 }
      setResult(data);
    } catch (err) {
      console.error(err);
      alert("Server error while detecting scam!");
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
          <textarea
            rows="7"
            className="w-full border border-gray-300 rounded-lg p-4 text-gray-700 focus:ring-2 focus:ring-blue-500 outline-none resize-none"
            placeholder="Enter SMS / Email / Message text here..."
            value={text}
            onChange={(e) => setText(e.target.value)}
          />

          <div className="flex gap-4 mt-5">
            <button
              onClick={handleDetect}
              className="bg-blue-600 text-white px-6 py-2 rounded-lg font-semibold hover:bg-blue-700 transition"
              disabled={loading}
            >
              {loading ? "Detecting..." : "Detect Scam"}
            </button>

            <button
              onClick={() => {
                setText("");
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
          <div
            className={`mt-8 bg-white shadow-lg rounded-xl p-6 border-l-8 ${
              result.scam ? "border-red-600" : "border-green-600"
            }`}
          >
            <h2 className="text-2xl font-bold text-gray-800 mb-4">
              Detection Result
            </h2>

            {result.scam ? (
              <p className="text-xl font-bold text-red-600">
                ❌ Scam Text Detected! Be careful.
              </p>
            ) : (
              <p className="text-xl font-bold text-green-600">
                ✅ Safe Text Message
              </p>
            )}

            <p className="mt-4 text-gray-700 text-lg">
              <span className="font-semibold">Label:</span> {result.label}
            </p>

            <p className="mt-2 text-gray-700 text-lg">
              <span className="font-semibold">Suggestion:</span>{" "}
              {result.scam
                ? "Do not click links or share OTP. Verify sender first."
                : "Looks safe, but still verify before making payments."}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
