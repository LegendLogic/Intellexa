import { GoogleGenerativeAI } from "@google/generative-ai";
import dotenv from "dotenv";




// ------------------------------
// 🎯 Generate AI Roadmap
// ------------------------------
export const getRoadmap = async (req, res) => {
  try {
    const { prompt } = req.body;
    if (!prompt?.trim()) {
      return res.status(400).json({ success: false, message: "Please provide a prompt" });
    }

    // Try Gemini first
    if (process.env.GEMINI_API_KEY) {
      try {
        const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
        const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });
        const result = await model.generateContent(
          `Create a 5-step learning roadmap for: ${prompt}. 
           Each step must have a short title and 1–2 line description.`
        );
        const text = result.response.text();
        if (text?.trim()) {
          return res.status(200).json({ success: true, roadmap: text });
        }
      } catch (err) {
        console.warn("⚠️ Gemini failed, switching to OpenAI:", err.message);
      }
    }

    // Fallback to OpenAI
    const openaiResp = await axios.post(
      "https://api.openai.com/v1/chat/completions",
      {
        model: process.env.OPENAI_MODEL || "gpt-4o-mini",
        messages: [
          { role: "system", content: "You are an AI that creates learning roadmaps." },
          {
            role: "user",
            content: `Generate a 5-step learning roadmap for: ${prompt}. 
                      Each step should have a title and short description.`,
          },
        ],
        max_tokens: 500,
        temperature: 0.4,
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
          "Content-Type": "application/json",
        },
      }
    );

    const roadmap = openaiResp.data.choices?.[0]?.message?.content || "No roadmap generated.";
    res.status(200).json({ success: true, roadmap });
  } catch (error) {
    console.error("❌ Roadmap error:", error.message);
    res.status(500).json({ success: false, message: "Internal server error", error: error.message });
  }
};



// wait for it

export const generateRoadmapContent = async (req, res) => {
  try {
    const { prompt } = req.body;

    if (!prompt || prompt.trim() === "") {
      return res.status(400).json({ error: "Prompt is required" });
    }

    // Initialize Gemini API client with API key or service account credentials
    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

    // Select the model (e.g., gemini-2.5-flash)
    const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

    // Generate roadmap content
    const result = await model.generateContent(prompt);

    // Extract the text output
    const responseText = result.response.text();

    // Send JSON response
    res.status(200).json({ result: responseText });
  } catch (error) {
    console.error("Roadmap API Error:", error);
    res.status(500).json({ error: error.message || "Failed to generate roadmap" });
  }
};
