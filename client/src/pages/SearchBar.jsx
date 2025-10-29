import React, { useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import { Youtube, FileText, Compass } from "lucide-react";
import TakeNote from "../components/TakeNote";

const backendUrl = "http://localhost:4000";

const SearchBar = () => {
  const [roadmapPrompt, setRoadmapPrompt] = useState("");
  const [videoPrompt, setVideoPrompt] = useState("");
  const [articlePrompt, setArticlePrompt] = useState("");

  const [roadmap, setRoadmap] = useState("");
  const [videos, setVideos] = useState([]);
  const [articles, setArticles] = useState([]);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // 🧠 Generate AI Roadmap
  const fetchRoadmap = async () => {
    if (!roadmapPrompt.trim()) return;
    setLoading(true);
    setError("");
    setRoadmap("");
    try {
      const { data } = await axios.post(`${backendUrl}/api/roadmap/generate`, {
        prompt: roadmapPrompt,
      });
      setRoadmap(data.result || "No roadmap generated.");
    } catch (err) {
      console.error(err);
      setError("❌ Failed to fetch roadmap. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // 🎬 Fetch YouTube Videos
  const fetchVideos = async () => {
    if (!videoPrompt.trim()) return;
    setLoading(true);
    setError("");
    setVideos([]);
    try {
      const { data } = await axios.get(`${backendUrl}/api/video/get-recomm`, {
        params: { prompt: videoPrompt }, // ✅ Using query param
      });
      setVideos(data.videos || []);
    } catch (err) {
      console.error(err);
      setError("❌ Failed to fetch videos. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // 📚 Fetch Articles from SerpAPI
 const fetchArticles = async () => {
  if (!articlePrompt.trim()) return;
  setLoading(true);
  setError("");
  setArticles([]);

  try {
    const { data } = await axios.get(`${backendUrl}/api/serpapi/test-serpapi`, {
      params: { prompt: articlePrompt }, // ✅ CORRECT way to send query in GET
    });
    setArticles(data.articles || []);
  } catch (err) {
    console.error(err);
    setError("❌ Failed to fetch articles. Please try again.");
  } finally {
    setLoading(false);
  }
};


  return (
    <div
      className="min-h-screen flex flex-col items-center px-6 py-12 text-white"
      style={{
        background:
          "radial-gradient(circle 700px at 70% 10%, rgba(255,87,34,0.25), transparent 70%), radial-gradient(circle 800px at 10% 80%, rgba(255,0,0,0.2), transparent 70%), #0a0a0f",
      }}
    >
      {/* 🧠 Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-10"
      >
        <h1 className="text-5xl mt-20 font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-orange-500 via-red-500 to-pink-500 mb-3">
          INTELLEXA Learning Resource Finder
        </h1>
        <p className="text-gray-400 text-lg">
          Unlock curated AI-powered learning roadmaps, videos & articles and other things ill .
        </p>
      </motion.div>

      {/* 🧩 Main Content */}
      <motion.div
        initial={{ opacity: 0, scale: 0.98 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.2 }}
        className="max-w-5xl w-full bg-white/5 border border-white/10 backdrop-blur-lg shadow-2xl rounded-3xl p-10"
      >
        {error && <p className="text-red-500 text-center mb-4">{error}</p>}
        {loading && <p className="text-orange-400 text-center mb-4">⏳ Loading...</p>}

        {/* 🚀 Roadmap Section */}
        <div className="mb-10">
          <h2 className="flex items-center justify-center text-2xl font-semibold text-orange-400 mb-4">
            <Compass className="mr-2 text-orange-500" /> Generate AI Roadmap or any Answer
          </h2>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              fetchRoadmap();
            }}
            className="flex flex-col md:flex-row justify-center gap-4"
          >
            <input
              type="text"
              value={roadmapPrompt}
              onChange={(e) => setRoadmapPrompt(e.target.value)}
              placeholder="e.g. Learn Generative AI step-by-step"
              className="flex-1 px-5 py-3 rounded-xl bg-black/30 border border-gray-700 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-orange-500"
            />
            <button
              type="submit"
              className="px-6 py-3 bg-gradient-to-r from-orange-600 to-red-600 rounded-xl font-semibold hover:scale-105 transition"
            >
              Generate
            </button>
          </form>

          {roadmap && (
            <motion.pre
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="mt-6 bg-black/40 text-gray-200 p-5 rounded-xl border border-gray-700 whitespace-pre-wrap text-left"
            >
              {roadmap}
            </motion.pre>
          )}
        </div>

        {/* 🎬 Video Section */}
        <div className="mb-10">
          <h2 className="flex items-center justify-center text-2xl font-semibold text-red-400 mb-4">
            <Youtube className="mr-2 text-red-500" /> Search Any Videos
          </h2>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              fetchVideos();
            }}
            className="flex flex-col md:flex-row justify-center gap-4"
          >
            <input
              type="text"
              value={videoPrompt}
              onChange={(e) => setVideoPrompt(e.target.value)}
              placeholder="e.g. Neural Networks tutorials"
              className="flex-1 px-5 py-3 rounded-xl bg-black/30 border border-gray-700 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-red-500"
            />
            <button
              type="submit"
              className="px-6 py-3 bg-gradient-to-r from-red-600 to-pink-600 rounded-xl font-semibold hover:scale-105 transition"
            >
              Search
            </button>
          </form>

          <div className="grid md:grid-cols-2 gap-6 mt-6">
            {videos.map((v, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                className="bg-black/40 p-4 rounded-xl border border-gray-700 hover:border-red-500 transition"
              >
                <img
                  src={v.thumbnail}
                  alt={v.title}
                  className="w-full rounded-lg mb-3"
                />
                <h4 className="text-lg font-semibold text-orange-300">{v.title}</h4>
                <p className="text-gray-400">{v.channel}</p>
                <a
                  href={v.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-400 hover:underline mt-2 inline-block"
                >
                  ▶ Watch on YouTube
                </a>
              </motion.div>
            ))}
          </div>
        </div>

        {/* 📚 Article Section */}
        <div>
          <h2 className="flex items-center justify-center text-2xl font-semibold text-yellow-400 mb-4">
            <FileText className="mr-2 text-yellow-500" /> Search Any Articles
          </h2>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              fetchArticles();
            }}
            className="flex flex-col md:flex-row justify-center gap-4"
          >
            <input
              type="text"
              value={articlePrompt}
              onChange={(e) => setArticlePrompt(e.target.value)}
              placeholder="e.g. AI ethics and model bias"
              className="flex-1 px-5 py-3 rounded-xl bg-black/30 border border-gray-700 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-yellow-500"
            />
            <button
              type="submit"
              className="px-6 py-3 bg-gradient-to-r from-yellow-500 to-orange-500 rounded-xl font-semibold hover:scale-105 transition"
            >
              Discover
            </button>
          </form>

          <div className="space-y-4 mt-6">
            {articles.map((a, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-black/40 p-5 rounded-xl border border-gray-700 hover:border-yellow-500 transition"
              >
                <a
                  href={a.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-lg font-semibold text-yellow-400 hover:underline"
                >
                  {a.title}
                </a>
                <p className="text-gray-400 mt-2">{a.snippet}</p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* 🌟 Footer */}
        <p className="text-center text-orange-600 text-lg mt-12 font-semibold">
          © {new Date().getFullYear()} INTELLEXA RESOURCE FINDER — Powered by AI
        </p>
      </motion.div>
      <TakeNote/>
    </div>
  );
};

export default SearchBar;
