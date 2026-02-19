import React, { useState } from "react";

export default function VoiceDetectionPage() {
  const [text, setText] = useState("");
  const [result, setResult] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSpeechToText = () => {
    const SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition;

    if (!SpeechRecognition) {
      alert("Speech Recognition not supported in your browser");
      return;
    }

    const recognition = new SpeechRecognition();
    recognition.lang = "en-US";
    recognition.start();

    recognition.onresult = (event) => {
      const spokenText = event.results[0][0].transcript;
      setText(spokenText);
    };

    recognition.onerror = () => {
      alert("Error while recording voice");
    };
  };

  const handleDetect = async () => {
    if (!text.trim()) {
      alert("Please speak something first");
      return;
    }

    setLoading(true);
    setResult("");

    try {
      const res = await fetch("http://127.0.0.1:5001/predict", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ text }),
      });

      const data = await res.json();

      if (!res.ok) {
        setResult(data.error || "Something went wrong");
        setLoading(false);
        return;
      }

      if (data.scam) {
        setResult("⚠️ Scam Voice Detected! Be careful.");
      } else {
        setResult("✅ Safe Voice Message");
      }
    } catch (error) {
      console.log(error);
      setResult("❌ Server Error");
    }

    setLoading(false);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 px-4">
      <div className="bg-white shadow-lg rounded-lg p-6 w-full max-w-lg">
        <h2 className="text-2xl font-bold text-center mb-4">
          Voice Scam Detection
        </h2>

        <button
          onClick={handleSpeechToText}
          className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700 mb-4"
        >
          🎤 Speak Now
        </button>

        <textarea
          rows="4"
          className="w-full border p-3 rounded mb-4"
          placeholder="Voice will convert into text here..."
          value={text}
          onChange={(e) => setText(e.target.value)}
        />

        <button
          onClick={handleDetect}
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
        >
          {loading ? "Detecting..." : "Detect Scam"}
        </button>

        {result && (
          <p className="mt-4 text-center font-semibold text-lg">{result}</p>
        )}
      </div>
    </div>
  );
}
