import React from "react";
import { Link } from "react-router-dom";

function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-700 text-white flex flex-col justify-center items-center px-6">
      <h1 className="text-4xl md:text-6xl font-bold text-center mb-4">
        AI Scam Detector
      </h1>

      <p className="text-lg md:text-xl text-center max-w-2xl mb-8 opacity-90">
        Detect fraud messages, fake job offers, OTP scams, UPI scams, fake bank calls,
        and scam links using AI.
      </p>

      <div className="flex gap-4 flex-wrap justify-center">
        <Link
          to="/text-detection"
          className="bg-white text-blue-700 px-6 py-3 rounded-lg font-semibold shadow-lg hover:scale-105 transition"
        >
          Try Text Detection
        </Link>

        <Link
          to="/voice-detection"
          className="bg-black bg-opacity-30 border border-white px-6 py-3 rounded-lg font-semibold shadow-lg hover:scale-105 transition"
        >
          Try Voice Detection
        </Link>

        <Link
          to="/tips"
          className="bg-yellow-400 text-black px-6 py-3 rounded-lg font-semibold shadow-lg hover:scale-105 transition"
        >
          Safety Tips
        </Link>
      </div>

      <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl w-full">
        <div className="bg-white bg-opacity-10 p-6 rounded-xl shadow-lg">
          <h2 className="text-xl font-bold mb-2">📩 SMS Scam Detection</h2>
          <p className="opacity-90">
            Paste suspicious SMS and get scam probability + suggestion.
          </p>
        </div>

        <div className="bg-white bg-opacity-10 p-6 rounded-xl shadow-lg">
          <h2 className="text-xl font-bold mb-2">📞 Call Scam Detection</h2>
          <p className="opacity-90">
            Convert voice calls to text and detect scam instantly.
          </p>
        </div>

        <div className="bg-white bg-opacity-10 p-6 rounded-xl shadow-lg">
          <h2 className="text-xl font-bold mb-2">🔗 Scam Link Checker</h2>
          <p className="opacity-90">
            Detect fake WhatsApp/Instagram links and fraud domains.
          </p>
        </div>
      </div>
    </div>
  );
}

export default HomePage;
