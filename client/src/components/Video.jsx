import React, { useState, useEffect } from "react";
import { CheckCircle, Circle, Play } from "lucide-react";
import axios from "axios";
import Chatbot from "./Chatbot";

const Video = () => {
  const [videos, setVideos] = useState([]);
  const [currentVideo, setCurrentVideo] = useState(null);
  const [completedVideos, setCompletedVideos] = useState({});
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [currentUser, setCurrentUser] = useState(null);
  const [userLoading, setUserLoading] = useState(true);
  const [loading, setLoading] = useState(true);

  const backendUrl =
    import.meta.env.VITE_BACKEND_URL || "http://localhost:4000";

  // ✅ Fetch User Info
  useEffect(() => {
    const fetchUser = async () => {
      try {
        setUserLoading(true);
        const token = localStorage.getItem("token");
        if (!token) return setCurrentUser(null);

        const res = await axios.get(`${backendUrl}/api/user/profile`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        setCurrentUser(res.data);
        setCompletedVideos(res.data.completedVideos || {});
      } catch (error) {
        console.error("Failed to fetch user profile:", error);
        setCurrentUser(null);
      } finally {
        setUserLoading(false);
      }
    };
    fetchUser();
  }, [backendUrl]);

  // ✅ Fetch Videos
  useEffect(() => {
    const fetchVideos = async () => {
      try {
        setLoading(true);
        const res = await axios.get(`${backendUrl}/api/video/get-video`);
        if (res.data.success && Array.isArray(res.data.data)) {
          setVideos(res.data.data);
          setCurrentVideo(res.data.data[0]);
        } else {
          console.error("Invalid video data:", res.data);
          setVideos([]);
          setCurrentVideo(null);
        }
      } catch (error) {
        console.error("Error fetching videos:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchVideos();
  }, [backendUrl]);

  // ✅ Categories
  const categories = ["All", ...new Set(videos.map((v) => v.category))];
  const filteredVideos =
    selectedCategory === "All"
      ? videos
      : videos.filter((v) => v.category === selectedCategory);

  // ✅ Progress Calculation
  const completedCount = Object.values(completedVideos).filter(Boolean).length;
  const progressPercentage = videos.length
    ? Math.round((completedCount / videos.length) * 100)
    : 0;

  // ✅ Toggle Completion
  const toggleCompletion = async (videoId) => {
    const token = localStorage.getItem("token");
    if (!token) return alert("Please login to mark a video complete.");

    try {
      setCompletedVideos((prev) => ({
        ...prev,
        [videoId]: !prev[videoId],
      }));

      await axios.post(
        `${backendUrl}/api/user/complete-video`,
        { videoId },
        { headers: { Authorization: `Bearer ${token}` } }
      );
    } catch (error) {
      console.error("Error marking complete:", error);
      setCompletedVideos((prev) => ({
        ...prev,
        [videoId]: !prev[videoId],
      }));
    }
  };

  // ✅ Loading / Empty States
  if (loading)
    return (
      <div className="flex justify-center items-center h-screen text-white text-lg">
        Loading videos...
      </div>
    );

  if (!currentVideo)
    return (
      <div className="flex justify-center items-center h-screen text-white text-lg">
        No videos found.
      </div>
    );

  return (
    <div
      className="min-h-screen"
      style={{
        background:
          "radial-gradient(circle at 30% 30%, rgba(249,115,22,0.25), transparent 70%), radial-gradient(circle at 80% 70%, rgba(255,56,0,0.15), transparent 70%), #0e0b11",
      }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
        {/* 🌟 User Info */}
        <div className="mt-16 bg-white/5 border border-white/20 backdrop-blur-md rounded-2xl p-6 shadow-md">
          <h1 className="text-3xl font-bold text-orange-400 mb-4 text-center">
            Welcome to Video Learning Hub
          </h1>

          {userLoading ? (
            <p className="text-gray-400 text-center">Loading profile...</p>
          ) : currentUser ? (
            <div className="text-center">
              <p className="text-lg font-semibold text-orange-300">
                Hello, {currentUser.name} 👋
              </p>
              <p className="text-white mt-1">
                Credit Balance:{" "}
                <span className="font-semibold text-orange-400">
                  {currentUser.creditBalance}
                </span>{" "}
                points
              </p>
            </div>
          ) : (
            <p className="text-red-400 text-center">User not found.</p>
          )}
        </div>

        {/* 📈 Progress Bar */}
        <div className="mt-6 bg-white/10 rounded-2xl p-5 border border-white/20">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3 text-white text-sm">
            <span>
              Progress: {completedCount}/{videos.length} videos completed
            </span>
            <div className="w-full sm:w-1/2 bg-gray-700 rounded-full h-2 overflow-hidden">
              <div
                className="bg-gradient-to-r from-orange-400 to-red-500 h-2 rounded-full transition-all duration-300"
                style={{ width: `${progressPercentage}%` }}
              />
            </div>
            <span className="text-orange-400 font-semibold">
              {progressPercentage}%
            </span>
          </div>
        </div>

        {/* 🏷️ Category Filter */}
        <div className="flex flex-wrap gap-2 mt-6 justify-center sm:justify-start">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                selectedCategory === category
                  ? "bg-orange-500 text-white shadow-lg"
                  : "bg-white/10 border border-white/20 text-gray-300 hover:bg-orange-400 hover:text-white"
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* 🎥 Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-8">
          {/* 📜 Playlist Sidebar */}
          <div className="lg:col-span-1 order-2 lg:order-1">
            <div className="bg-white/10 border border-white/20 rounded-2xl p-5 shadow-md sticky top-6 max-h-[80vh] overflow-y-auto">
              <h3 className="text-xl font-semibold text-white mb-4 text-center lg:text-left">
                Course Playlist
              </h3>
              <div className="space-y-2">
                {filteredVideos.map((video) => (
                  <div
                    key={video._id}
                    onClick={() => setCurrentVideo(video)}
                    className={`flex items-center gap-3 p-3 rounded-lg transition-all cursor-pointer ${
                      currentVideo._id === video._id
                        ? "bg-orange-500 text-white"
                        : "bg-white/5 hover:bg-orange-400/40 text-gray-200"
                    }`}
                  >
                    {completedVideos[video._id] ? (
                      <CheckCircle size={18} className="text-green-400" />
                    ) : (
                      <Circle size={18} className="text-gray-400" />
                    )}
                    <div className="flex-1">
                      <p className="text-sm font-medium truncate">
                        {video.title}
                      </p>
                      <p className="text-xs text-gray-300">{video.duration}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* 🎬 Video Player + Recommendations */}
          <div className="lg:col-span-2 order-1 lg:order-2 space-y-6">
            <div className="bg-white/10 rounded-2xl border border-white/20 overflow-hidden shadow-lg">
              <div className="aspect-video bg-black">
                <iframe
                  src={currentVideo.url}
                  title={currentVideo.title}
                  className="w-full h-full"
                  allowFullScreen
                />
              </div>

              <div className="p-5">
                <h2 className="text-2xl font-bold text-white mb-2">
                  {currentVideo.title}
                </h2>
                <p className="text-gray-300 mb-3">
                  {currentVideo.description}
                </p>

                <div className="flex flex-wrap gap-2 text-sm mb-4">
                  <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full">
                    {currentVideo.category}
                  </span>
                  <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full">
                    {currentVideo.level?.join(", ")}
                  </span>
                  <span className="px-3 py-1 bg-purple-100 text-purple-700 rounded-full">
                    {currentVideo.duration}
                  </span>
                </div>

                <button
                  onClick={() => toggleCompletion(currentVideo._id)}
                  className={`flex items-center gap-2 px-5 py-2 rounded-lg font-medium transition-all duration-300 ${
                    completedVideos[currentVideo._id]
                      ? "bg-green-500 text-white"
                      : "bg-gray-200 text-gray-700 hover:bg-orange-400 hover:text-white"
                  }`}
                >
                  {completedVideos[currentVideo._id] ? (
                    <>
                      <CheckCircle size={20} />
                      Completed
                    </>
                  ) : (
                    <>
                      <Circle size={20} />
                      Mark Complete
                    </>
                  )}
                </button>
              </div>
            </div>

            {/* 🎬 Recommendations */}
            {videos.length > 1 && (
              <div className="bg-white/10 rounded-2xl border border-white/20 p-5">
                <h3 className="text-xl font-semibold text-white mb-3">
                  Recommended for You
                </h3>
                <div className="space-y-3">
                  {videos
                    .filter((v) => v._id !== currentVideo._id)
                    .slice(0, 3)
                    .map((video) => (
                      <div
                        key={video._id}
                        onClick={() => setCurrentVideo(video)}
                        className="flex items-center gap-4 p-3 rounded-xl hover:bg-orange-400/30 cursor-pointer transition-all border border-white/10"
                      >
                        <div className="w-14 h-14 bg-orange-400 rounded-lg flex items-center justify-center flex-shrink-0">
                          <Play size={22} className="text-white" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <h4 className="font-semibold text-white truncate">
                            {video.title}
                          </h4>
                          <p className="text-xs text-gray-300">
                            {video.duration}
                          </p>
                        </div>
                        {completedVideos[video._id] && (
                          <CheckCircle
                            size={18}
                            className="text-green-400 flex-shrink-0"
                          />
                        )}
                      </div>
                    ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
      <Chatbot />
    </div>
  );
};

export default Video;
