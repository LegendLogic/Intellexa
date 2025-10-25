import axios from "axios";
import { GoogleGenerativeAI } from "@google/generative-ai";
import dotenv from "dotenv";

dotenv.config();

export const getLearningResources = async (req, res) => {
  try {
    const { prompt } = req.body;

    if (!prompt || prompt.trim() === "") {
      return res.status(400).json({ success: false, message: "Please provide a prompt" });
    }

    // 🔹 Function to generate a learning roadmap
    const generateRoadmap = async () => {
      // Try Gemini first
      if (process.env.GEMINI_API_KEY) {
        try {
          const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
          const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });
          const result = await model.generateContent(
            `Generate a 5-step learning roadmap for: ${prompt}. Each step should have a title and short description.`
          );
          return result.response.text();
        } catch (geminiError) {
          console.warn("❌ Gemini failed, falling back to OpenAI:", geminiError.message);
        }
      }

      // Fallback to OpenAI
      const openaiResp = await axios.post(
        "https://api.openai.com/v1/chat/completions",
        {
          model: process.env.OPENAI_MODEL || "gpt-4o-mini",
          messages: [
            { role: "system", content: "You are a helpful AI that generates learning roadmaps." },
            { role: "user", content: `Generate a 5-step learning roadmap for: ${prompt}. Each step should have a title and short description.` }
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

      return openaiResp?.data?.choices?.[0]?.message?.content || "No roadmap found.";
    };

    // 🔹 YouTube API call
    const ytCall = axios.get("https://www.googleapis.com/youtube/v3/search", {
      params: {
        part: "snippet",
        q: `${prompt} tutorial`,
        type: "video",
        maxResults: 3,
        key: process.env.YOUTUBE_API_KEY,
      },
    });

    // 🔹 SerpAPI call
    const serpCall = axios.get("https://serpapi.com/search.json", {
      params: {
        q: `${prompt} learning articles`,
        engine: "google",
        api_key: process.env.SERPAPI_KEY,
      },
    });

    // 🔹 Execute all requests concurrently
    const [roadmap, ytResp, serpResp] = await Promise.all([generateRoadmap(), ytCall, serpCall]);

    // 🔹 Parse YouTube response
    const videos = ytResp.data.items?.map(item => ({
      title: item.snippet.title,
      channel: item.snippet.channelTitle,
      thumbnail: item.snippet.thumbnails?.medium?.url,
      url: `https://www.youtube.com/watch?v=${item.id.videoId}`,
    })) || [];

    // 🔹 Parse SerpAPI response
    const articles = (serpResp.data.organic_results || []).slice(0, 3).map(a => ({
      title: a.title,
      url: a.link,
      snippet: a.snippet,
    })) || [];

    // 🔹 Send final response
    res.status(200).json({
      success: true,
      roadmap,
      videos,
      articles,
    });

  } catch (error) {
    console.error("❌ Error fetching learning resources:", error.response?.data || error.message);
    res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.response?.data || error.message,
    });
  }
};
