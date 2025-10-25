import { GoogleGenerativeAI } from "@google/generative-ai";
import dotenv from "dotenv";

dotenv.config();

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
