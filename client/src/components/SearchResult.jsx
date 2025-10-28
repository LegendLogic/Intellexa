import React, { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { motion } from "framer-motion";
import { FaArrowLeft, FaExternalLinkAlt, FaYoutube } from "react-icons/fa";
import axios from "axios";

const backendUrl = "http://localhost:4000";

const SearchResult = () => {
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState("");
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const query = searchParams.get("query") || "";

  useEffect(() => {
    if (!query) {
      setLoading(false);
      setResults([]);
      return;
    }

    const fetchResults = async () => {
      setLoading(true);
      setErrorMsg("");

      try {
        const response = await axios.post(`${backendUrl}/api/search/get-learning`, { prompt: query });
        const data = response.data;

        if (data.success) {
          // Filter and validate videos
          const validVideos = Array.isArray(data.videos) 
            ? data.videos.filter(video => {
                if (!video || !video.url) return false;
                // Extract video ID and validate
                const videoId = extractYouTubeId(video.url);
                return videoId !== null;
              })
            : [];

          // Filter and validate articles
          const validArticles = Array.isArray(data.articles)
            ? data.articles.filter(article => {
                return article && article.url && article.title;
              })
            : [];

          const learningData = {
            title: query,
            roadmap: data.roadmap || "",
            videos: validVideos,
            articles: validArticles,
          };
          setResults([learningData]);
        } else {
          setResults([]);
          setErrorMsg("No results found.");
        }
      } catch (err) {
        console.error("Error fetching API:", err);
        setResults([]);
        setErrorMsg(err.response?.data?.message || "Failed to fetch results.");
      } finally {
        setLoading(false);
      }
    };

    fetchResults();
  }, [query]);

  const handleBackToHome = () => navigate("/");

  // 💫 Beautiful Loading Screen
  if (loading)
    return (
      <div
        className="min-h-screen flex flex-col items-center justify-center text-white"
        style={{
          background:
            "radial-gradient(circle 600px at 60% 20%, rgba(249,115,22,0.25), transparent 70%), radial-gradient(circle 800px at 10% 80%, rgba(255,56,0,0.15), transparent 70%), #0e0b11",
        }}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
          className="relative"
        >
          <div className="w-24 h-24 border-4 border-transparent border-t-orange-500 border-l-orange-400 rounded-full animate-spin"></div>
          <div className="absolute inset-0 border-4 border-orange-400/30 rounded-full blur-md"></div>
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.8 }}
          className="mt-6 text-orange-300 text-lg font-medium tracking-wide"
        >
          Fetching INTELLEXA learning results...
        </motion.p>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: [0.2, 1, 0.2] }}
          transition={{ repeat: Infinity, duration: 1.5 }}
          className="mt-2 text-sm text-orange-400"
        >
          INTELLEXA is analyzing your query 🔍
        </motion.div>
      </div>
    );

  // 🧠 No Results
  if (!results.length)
    return (
      <div
        className="min-h-screen flex flex-col items-center justify-center text-white"
        style={{
          background:
            "radial-gradient(circle 600px at 60% 20%, rgba(249,115,22,0.25), transparent 70%), radial-gradient(circle 800px at 10% 80%, rgba(255,56,0,0.15), transparent 70%), #0e0b11",
        }}
      >
        <p className="text-2xl text-orange-300 mb-6">
          {errorMsg || `No results found for "${query}"`}
        </p>
        <button
          onClick={handleBackToHome}
          className="bg-gradient-to-r from-orange-500 to-red-500 px-6 py-3 rounded-full text-white font-semibold hover:scale-105 transition-transform duration-300 shadow-lg flex items-center gap-2"
        >
          <FaArrowLeft /> Back to Home
        </button>
      </div>
    );

  // ✅ Results Section
  return (
    <div
      className="min-h-screen px-6 py-12 text-white"
      style={{
        background:
          "radial-gradient(circle 600px at 60% 20%, rgba(249,115,22,0.25), transparent 70%), radial-gradient(circle 800px at 10% 80%, rgba(255,56,0,0.15), transparent 70%), #0e0b11",
      }}
    >
      <div className="max-w-6xl mt-20 mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-10">
          <h1 className="text-4xl font-bold text-orange-400">
            Results for "{query}"
          </h1>
          <button
            onClick={handleBackToHome}
            className="bg-gradient-to-r from-orange-500 to-red-500 px-5 py-2.5 rounded-full text-white font-semibold hover:scale-105 transition-transform duration-300 shadow-lg flex items-center gap-2"
          >
            <FaArrowLeft /> Back
          </button>
        </div>

        {/* Results */}
        {results.map((item, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="mb-10 p-6 bg-gray-800/50 rounded-2xl shadow-2xl border border-gray-700"
          >
            <h2 className="text-2xl font-semibold text-orange-400 mb-4">
              {item.title}
            </h2>

            {item.roadmap && (
              <div className="mb-6 p-4 bg-gray-700/50 rounded-xl text-gray-200 whitespace-pre-line">
                <h3 className="text-xl font-semibold text-orange-300 mb-2">
                  Your Answers
                </h3>
                <p>{item.roadmap}</p>
              </div>
            )}

            {item.videos?.length > 0 && (
              <VideoSection videos={item.videos} />
            )}

            {item.articles?.length > 0 && (
              <div>
                <h3 className="text-xl font-semibold text-indigo-400 mb-4">
                  Articles ({item.articles.length})
                </h3>
                <ul className="space-y-3">
                  {item.articles.map((article, aIdx) => (
                    <li key={aIdx}>
                      <a
                        href={article.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-orange-300 hover:underline flex items-center gap-2"
                      >
                        {article.title} <FaExternalLinkAlt size={12} />
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </motion.div>
        ))}
      </div>
    </div>
  );
};

// Helper function to extract YouTube video ID from various URL formats
const extractYouTubeId = (url) => {
  if (!url) return null;
  
  // Handle different YouTube URL formats
  const patterns = [
    /(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)([^&\n?#]+)/,
    /^([a-zA-Z0-9_-]{11})$/ // Direct video ID
  ];
  
  for (const pattern of patterns) {
    const match = url.match(pattern);
    if (match && match[1]) {
      return match[1];
    }
  }
  
  return null;
};

// Extracted Video Section Component
const VideoSection = ({ videos }) => {
  return (
    <div className="mb-6">
      <h3 className="text-xl font-semibold text-indigo-400 mb-4 flex items-center gap-2">
        <FaYoutube className="text-red-500" /> Videos ({videos.length})
      </h3>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {videos.map((video, vIdx) => (
          <VideoCard key={vIdx} video={video} />
        ))}
      </div>
    </div>
  );
};

// Individual Video Card Component
const VideoCard = ({ video }) => {
  const [showPlayer, setShowPlayer] = useState(false);
  const videoId = extractYouTubeId(video.url);
  const thumbnail = videoId ? `https://img.youtube.com/vi/${videoId}/hqdefault.jpg` : "";

  if (!videoId) {
    return null; // Skip invalid videos
  }

  return (
    <div
      onClick={() => setShowPlayer(true)}
      className="bg-gray-700/50 rounded-xl hover:bg-gray-600/50 transition-all transform hover:scale-105 p-3 shadow-lg cursor-pointer"
    >
      {!showPlayer ? (
        <>
          <img
            src={thumbnail}
            alt={video.title}
            className="rounded-lg mb-2 w-full h-40 object-cover"
          />
          <p className="text-orange-300 font-medium line-clamp-2">
            {video.title}
          </p>
        </>
      ) : (
        <iframe
          width="100%"
          height="200"
          src={`https://www.youtube.com/embed/${videoId}?autoplay=1`}
          title={video.title}
          className="rounded-lg"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        ></iframe>
      )}
    </div>
  );
};

export default SearchResult;