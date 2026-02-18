import { useState } from "react";
import { detectVoiceScam } from "../services/api";

export default function VoiceDetectionPage() {
  const [transcript, setTranscript] = useState("");
  const [result, setResult] = useState(null);
  const [listening, setListening] = useState(false);
  const [loading, setLoading] = useState(false);

  let recognition;

  if ("webkitSpeechRecognition" in window) {
    recognition = new window.webkitSpeechRecognition();
    recognition.continuous = true;
    recognition.interimResults = true;
    recognition.lang = "en-IN";
  }

  const startListening = () => {
    if (!recognition) {
      alert("Speech recognition not supported in your browser!");
      return;
    }

    setListening(true);
    recognition.start();

    recognition.onresult = (event) => {
      let finalText = "";
      for (let i = 0; i < event.results.length; i++) {
        finalText += event.results[i][0].transcript;
      }
      setTranscript(finalText);
    };
  };

  const stopListening = () => {
    if (recognition) recognition.stop();
    setListening(false);
  };

  const handleDetect = async () => {
    if (!transcript.trim()) {
      alert("Please record some voice first!");
      return;
    }

    setLoading(true);
    setResult(null);

    try {
      const res = await detectVoiceScam(transcript);
      setResult(res);
    } catch (err) {
      console.error(err);
      alert("Error while detecting voice scam!");
    }

    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-gray-100 flex justify-center px-4 py-10">
      <div className="w-full max-w-3xl">
        <h1 className="text-3xl font-bold mb-6 text-gray-800">
          Voice Scam Detection
        </h1>

        <div className="bg-white shadow-lg rounded-xl p-6">
          <div className="flex gap-4 mb-5">
            <button
              onClick={startListening}
              className="bg-green-600 text-white px-6 py-2 rounded-lg font-semibold hover:bg-green-700 transition"
              disabled={listening}
            >
              Start
            </button>

            <button
              onClick={stopListening}
              className="bg-red-600 text-white px-6 py-2 rounded-lg font-semibold hover:bg-red-700 transition"
              disabled={!listening}
            >
              Stop
            </button>

            <button
              onClick={handleDetect}
              className="bg-blue-600 text-white px-6 py-2 rounded-lg font-semibold hover:bg-blue-700 transition"
              disabled={loading}
            >
              {loading ? "Detecting..." : "Detect Scam"}
            </button>
          </div>

          <textarea
            rows="7"
            className="w-full border border-gray-300 rounded-lg p-4 text-gray-700 focus:ring-2 focus:ring-blue-500 outline-none resize-none"
            placeholder="Transcript will appear here..."
            value={transcript}
            onChange={(e) => setTranscript(e.target.value)}
          />

          <div className="flex justify-end mt-4">
            <button
              onClick={() => {
                setTranscript("");
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
          <div className="mt-8 bg-white shadow-lg rounded-xl p-6 border-l-8 border-red-500">
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
