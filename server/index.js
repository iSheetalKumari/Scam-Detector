const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const axios = require("axios");
const authRoutes = require("./routes/authRoutes");

require("dotenv").config();

const connectDB = require("./config/db");

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use("/api/auth", authRoutes);

// Connect MongoDB
connectDB();

// Test route
app.get("/", (req, res) => res.send("AI Scam Detection Backend Running"));

// Scam Detection Route
app.post("/detect-scam", async (req, res) => {
  const { text } = req.body;

  if (!text) return res.status(400).json({ error: "Text is required" });

  try {
    const response = await axios.post(
      "https://api.openai.com/v1/chat/completions",
      {
        model: "gpt-4o-mini",
        messages: [
          { role: "system", content: "You are an AI scam detection assistant." },
          {
            role: "user",
            content: `Analyze this message for scams and respond ONLY in JSON format with keys: type, probability (0-100), suggestion. Message: "${text}"`
          }
        ],
        temperature: 0
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
          "Content-Type": "application/json"
        }
      }
    );

    const aiText = response.data.choices[0].message.content;

    let result;
    try {
      result = JSON.parse(aiText);
    } catch {
      result = { type: "Unknown", probability: 0, suggestion: aiText };
    }

    res.json({ result });
  } catch (err) {
    console.error("OpenAI Error:", err.response?.data || err.message);
    res.status(500).json({ error: "AI detection failed" });
  }
});

// Start server
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
