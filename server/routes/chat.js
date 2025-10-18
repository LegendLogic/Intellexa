import express from "express";
import fetch from "node-fetch";
import dotenv from "dotenv";

dotenv.config();
const router = express.Router();

router.post("/", async (req, res) => {
  try {
    const { message } = req.body;

    if (!message) {
      return res.status(400).json({ error: "Message is required." });
    }

    const GEMINI_API_KEY = process.env.GEMINI_API_KEY;
    if (!GEMINI_API_KEY) {
      console.error("❌ Missing GEMINI_API_KEY in .env file");
      return res.status(500).json({ error: "API key missing in environment variables." });
    }

    // Gemini API Endpoint
    const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${GEMINI_API_KEY}`;

    // Request body for Gemini
    const body = {
      contents: [
        {
          role: "user",
          parts: [
            {
              text: `The user asked: "${message}". 
Suggest 3 high-quality YouTube courses related to this topic. 
For each, include:
1️⃣ Course Title  
2️⃣ Channel Name  
3️⃣ YouTube URL  
Keep the response well formatted and friendly.`,
            },
          ],
        },
      ],
    };

    // API Call
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });

    const data = await response.json();

    if (!response.ok) {
      console.error("❌ Gemini API Error:", data);
      return res.status(500).json({ error: "Gemini API call failed", details: data });
    }

    // Extract text safely
    const botReply =
      data?.candidates?.[0]?.content?.parts?.[0]?.text ||
      "🤖 Sorry, I couldn’t find anything relevant right now.";

    res.status(200).json({ reply: botReply });
  } catch (error) {
    console.error("❌ Chat route error:", error);
    res.status(500).json({ error: "Server error. Please try again later." });
  }
});

export default router;
