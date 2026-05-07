import { useState, useRef } from "react";
import { detectVoiceScam } from "../services/api";

export default function VoiceDetectionPage() {
  const [transcript, setTranscript] = useState("");
  const [result, setResult] = useState(null);
  const [listening, setListening] = useState(false);
  const [loading, setLoading] = useState(false);

  const recognitionRef = useRef(null);

  // ✅ Initialize only once
  if ("webkitSpeechRecognition" in window && !recognitionRef.current) {
    recognitionRef.current = new window.webkitSpeechRecognition();
    recognitionRef.current.continuous = true;
    recognitionRef.current.interimResults = true;
    recognitionRef.current.lang = "en-IN";

    recognitionRef.current.onend = () => {
      setListening(false);
    };

    recognitionRef.current.onerror = (event) => {
      console.error("Speech Error:", event.error);
      setListening(false);
    };
  }

  // ✅ Preprocessing
  const preprocessText = (text) => {
    return text
      .toLowerCase()
      .replace(/,/g, "")
      .replace(/\d+/g, " number ")
      .replace(/[^a-z\s]/g, "")
      .trim();
  };

  const startListening = () => {
    if (!recognitionRef.current) {
      alert("Speech recognition not supported in this browser!");
      return;
    }

    setTranscript("");
    setListening(true);

    try {
      recognitionRef.current.start();
    } catch (err) {
      console.log("Already started");
    }

    recognitionRef.current.onresult = (event) => {
      let finalText = "";
      for (let i = 0; i < event.results.length; i++) {
        finalText += event.results[i][0].transcript;
      }
      setTranscript(finalText);
    };
  };

  const stopListening = () => {
    if (recognitionRef.current) {
      recognitionRef.current.stop();
    }
    setListening(false);
  };

  const handleDetect = async () => {
    if (!transcript.trim()) {
      alert("Please record some voice first!");
      return;
    }

    const cleanText = preprocessText(transcript);

    setLoading(true);
    setResult(null);

    try {
      const res = await detectVoiceScam(cleanText);
      console.log("API RESPONSE:", res);
      setResult(res);
    } catch (err) {
      console.error("ERROR:", err);
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
              className="bg-green-600 text-white px-6 py-2 rounded-lg font-semibold"
              disabled={listening}
            >
              🎤 Start
            </button>

            <button
              onClick={stopListening}
              className="bg-red-600 text-white px-6 py-2 rounded-lg font-semibold"
              disabled={!listening}
            >
              Stop
            </button>

            <button
              onClick={handleDetect}
              className="bg-blue-600 text-white px-6 py-2 rounded-lg font-semibold"
              disabled={loading}
            >
              {loading ? "Detecting..." : "Detect Scam"}
            </button>
          </div>

          <textarea
            rows="7"
            className="w-full border border-gray-300 rounded-lg p-4"
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
              className="bg-gray-200 px-6 py-2 rounded-lg"
            >
              Clear
            </button>
          </div>
        </div>

        {result && (
          <div
            className={`mt-8 bg-white shadow-lg rounded-xl p-6 border-l-8 ${
              result.scam ? "border-red-500" : "border-green-500"
            }`}
          >
            <h2 className="text-2xl font-bold mb-4">
              Detection Result
            </h2>

            <p className="text-lg mb-2">
              <b>Result:</b>{" "}
              {result.scam ? "⚠️ Scam Detected" : "✅ Safe Message"}
            </p>

            <p className="text-lg">
              <b>Label:</b> {result.label}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}