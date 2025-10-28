import axios from "axios";
import { GoogleGenerativeAI } from "@google/generative-ai";
import dotenv from "dotenv";
import NodeCache from "node-cache";

dotenv.config();
const cache = new NodeCache({ stdTTL: 3600 }); // short cache (AI)
const longCache = new NodeCache({ stdTTL: 21600 }); // long cache (YouTube, Articles)

// ------------------------------
// ⚡ Utility: Background Cache Update
// ------------------------------
const backgroundRefresh = async (key, fetchFn, cacheLayer) => {
  try {
    const data = await fetchFn();
    if (data) cacheLayer.set(key, data);
  } catch {
    // silently ignore background errors
  }
};

// ------------------------------
// 🧠 AI Roadmap Generator (Gemini + OpenAI Race)
// ------------------------------
const generateRoadmap = async (prompt) => {
  const cacheKey = `roadmap:${prompt}`;
  const cached = cache.get(cacheKey);
  if (cached) {
    backgroundRefresh(cacheKey, () => _generateRoadmap(prompt), cache);
    return cached;
  }
  return await _generateRoadmap(prompt);
};

const _generateRoadmap = async (prompt) => {
  const geminiPromise = (async () => {
    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
    const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });
    const result = await model.generateContent(
      `Generate a  learning  for: ${prompt}.
       Each step must have a title and a 5-6 line description.`
    );
    return result.response.text();
  })();

  const openaiPromise = (async () => {
    const res = await axios.post(
      "https://api.openai.com/v1/chat/completions",
      {
        model: process.env.OPENAI_MODEL || "gpt-4o-mini",
        messages: [
          { role: "system", content: "You are an AI that creates learning roadmaps." },
          {
            role: "user",
            content: `Generate a  learning  for: ${prompt}. 
                      Each step should have a title and short description.`,
          },
        ],
        max_tokens: 400,
        temperature: 0.4,
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
          "Content-Type": "application/json",
        },
        timeout: 7000,
      }
    );
    return res.data.choices?.[0]?.message?.content || "No roadmap generated.";
  })();

  const roadmap = await Promise.any([geminiPromise, openaiPromise]);
  cache.set(`roadmap:${prompt}`, roadmap);
  return roadmap;
};

// ------------------------------
// 🎥 Fetch YouTube Videos (fixed cacheKey)
// ------------------------------
const fetchYouTubeVideos = async (prompt) => {
  const cacheKey = `videos:${prompt}`;
  const cached = longCache.get(cacheKey);
  if (cached) {
    backgroundRefresh(cacheKey, () => _fetchYouTubeVideos(prompt, cacheKey), longCache);
    return cached;
  }
  return await _fetchYouTubeVideos(prompt, cacheKey);
};

const _fetchYouTubeVideos = async (prompt, cacheKey) => {
  try {
    const ytResp = await axios.get("https://www.googleapis.com/youtube/v3/search", {
      params: {
        part: "snippet",
        q: `${prompt} tutorial`,
        type: "video",
        maxResults: 3,
        key: process.env.YOUTUBE_API_KEY,
        fields: "items(id/videoId,snippet/title,snippet/channelTitle,snippet/thumbnails/medium/url)",
      },
      timeout: 4000,
    });

    const videos =
      ytResp.data.items?.map((item) => ({
        title: item.snippet.title,
        channel: item.snippet.channelTitle,
        thumbnail: item.snippet.thumbnails.medium.url,
        url: `https://www.youtube.com/watch?v=${item.id.videoId}`,
      })) || [];

    longCache.set(cacheKey, videos);
    return videos;
  } catch (err) {
    console.warn("⚠️ YouTube fetch failed:", err.message);
    return [];
  }
};

// ------------------------------
// 📚 Fetch Articles (fixed cacheKey)
// ------------------------------
const fetchArticles = async (prompt) => {
  const cacheKey = `articles:${prompt}`;
  const cached = longCache.get(cacheKey);
  if (cached) {
    backgroundRefresh(cacheKey, () => _fetchArticles(prompt, cacheKey), longCache);
    return cached;
  }
  return await _fetchArticles(prompt, cacheKey);
};

const _fetchArticles = async (prompt, cacheKey) => {
  try {
    const serpResp = await axios.get("https://serpapi.com/search.json", {
      params: {
        q: `${prompt} learning articles`,
        engine: "google",
        api_key: process.env.SERPAPI_KEY,
      },
      timeout: 4000,
    });

    const articles =
      (serpResp.data.organic_results || []).slice(0, 3).map((a) => ({
        title: a.title,
        url: a.link,
        snippet: a.snippet,
      })) || [];

    longCache.set(cacheKey, articles);
    return articles;
  } catch (err) {
    console.warn("⚠️ SerpAPI fetch failed:", err.message);
    return [];
  }
};

// ------------------------------
// 🚀 Main Controller
// ------------------------------
export const getLearningResources = async (req, res) => {
  try {
    const { prompt } = req.body;
    if (!prompt?.trim()) {
      return res.status(400).json({ success: false, message: "Please provide a prompt" });
    }

    const roadmap = cache.get(`roadmap:${prompt}`);
    const videos = longCache.get(`videos:${prompt}`);
    const articles = longCache.get(`articles:${prompt}`);

    if (roadmap && videos && articles) {
      // Refresh everything silently in the background
      backgroundRefresh(`roadmap:${prompt}`, () => _generateRoadmap(prompt), cache);
      backgroundRefresh(`videos:${prompt}`, () => _fetchYouTubeVideos(prompt, `videos:${prompt}`), longCache);
      backgroundRefresh(`articles:${prompt}`, () => _fetchArticles(prompt, `articles:${prompt}`), longCache);

      return res.status(200).json({ success: true, roadmap, videos, articles, cached: true });
    }

    const [r, v, a] = await Promise.allSettled([
      roadmap || generateRoadmap(prompt),
      videos || fetchYouTubeVideos(prompt),
      articles || fetchArticles(prompt),
    ]);

    res.status(200).json({
      success: true,
      roadmap: r.status === "fulfilled" ? r.value : "Unavailable",
      videos: v.status === "fulfilled" ? v.value : [],
      articles: a.status === "fulfilled" ? a.value : [],
    });
  } catch (error) {
    console.error("❌ Server error:", error.message);
    res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message,
    });
  }
};
