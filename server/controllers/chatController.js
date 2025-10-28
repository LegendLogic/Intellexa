// server/controllers/chatController.js
import { GoogleGenerativeAI } from "@google/generative-ai";




export const chatController = async (req, res) => {
  try {
    const { prompt } = req.body;

    if (!prompt) {
      return res.status(400).json({ error: "Prompt is required" });
    }

    // Initialize Gemini API client with API key
    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

    // Select the model (you can use "gemini-1.5-flash" or "gemini-1.5-pro")
    const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

    // Generate content from the prompt
    const result = await model.generateContent(prompt);

    // Access the text output
    const responseText = result.response.text();

    // Send JSON response back to client
    res.json({ response: responseText });

  } catch (error) {
    console.error("Chatbot API Error:", error);
    res.status(500).json({ error: error.message || "Internal Server Error" });
  }
};
