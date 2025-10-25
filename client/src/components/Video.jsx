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

  const backendUrl = import.meta.env.VITE_BACKEND_URL || "http://localhost:4000";

  // Fetch User Info
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

  // Fetch Videos
  useEffect(() => {
    const fetchVideos = async () => {
      try {
        setLoading(true);
        const res = await axios.get(`${backendUrl}/api/video/get-video`);
        if (res.data.success && Array.isArray(res.data.data)) {
          setVideos(res.data.data);
          setCurrentVideo(res.data.data[0]);
        } else {
          console.error("Videos data is invalid:", res.data);
          setVideos([]);
          setCurrentVideo(null);
        }
      } catch (error) {
        console.error("Error fetching videos:", error);
        setVideos([]);
        setCurrentVideo(null);
      } finally {
        setLoading(false);
      }
    };
    fetchVideos();
  }, [backendUrl]);

  // Categories
  const categories = ["All", ...new Set(videos.map((v) => v.category))];

  const filteredVideos =
    selectedCategory === "All"
      ? videos
      : videos.filter((v) => v.category === selectedCategory);

  // Recommendations
  const getRecommendations = (videoId) => {
    const current = videos.find((v) => v._id === videoId);
    if (!current) return [];
    return videos
      .filter((v) => v._id !== videoId && v.category === current.category)
      .slice(0, 3);
  };

  const recommendations =
    currentVideo && videos.length > 0
      ? getRecommendations(currentVideo._id)
      : [];

  // Progress
  const completedCount = Object.values(completedVideos).filter(Boolean).length;
  const progressPercentage = videos.length
    ? Math.round((completedCount / videos.length) * 100)
    : 0;

  // Toggle Completion
  const toggleCompletion = async (videoId) => {
    const token = localStorage.getItem("token");
    if (!token) return alert("You must be logged in to mark a video complete");

    try {
      // Optimistic UI update
      setCompletedVideos((prev) => ({
        ...prev,
        [videoId]: !prev[videoId],
      }));

      // Call backend API
      await axios.post(
        `${backendUrl}/api/user/complete-video`,
        { videoId },
        { headers: { Authorization: `Bearer ${token}` } }
      );
    } catch (error) {
      console.error("Error updating completion:", error);
      // Revert UI on failure
      setCompletedVideos((prev) => ({
        ...prev,
        [videoId]: !prev[videoId],
      }));
    }
  };

  // Loading / Empty states
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
          "radial-gradient(circle 600px at 60% 20%, rgba(249,115,22,0.25), transparent 70%), radial-gradient(circle 800px at 10% 80%, rgba(255,56,0,0.15), transparent 70%), #0e0b11",
      }}
    >
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* User Info */}
        <div className="max-w-4xl w-full mt-20 bg-transparent border border-white shadow-lg rounded-2xl p-8">
          <h1 className="text-4xl font-bold text-red-500 mb-6 text-center">
            User Data
          </h1>

          {userLoading ? (
            <p className="text-gray-400 text-center">Loading profile...</p>
          ) : currentUser ? (
            <div className="text-center mb-6 bg-transparent rounded-lg p-4 shadow">
              <p className="text-lg font-semibold text-red-400">
                Hello, {currentUser.name} 👋
              </p>
              <p className="text-white">
                Credit Balance:{" "}
                <span className="font-semibold text-white">
                  {currentUser.creditBalance}
                </span>{" "}
                points
              </p>
            </div>
          ) : (
            <p className="text-red-500 text-center">User info not available.</p>
          )}
        </div>

        {/* Progress */}
        <div className="border rounded-2xl shadow-lg p-6 mb-6">
          <h1 className="text-3xl sm:text-4xl font-bold text-orange-300 mb-2">
            Video Learning Hub
          </h1>
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 sm:gap-4 text-sm text-white">
            <span className="text-red-600">
              Progress: {completedCount}/{videos.length} videos completed
            </span>
            <div className="flex-1 bg-gray-200 rounded-full h-2 max-w-xs">
              <div
                className="bg-blue-500 h-2 rounded-full transition-all duration-300"
                style={{ width: `${progressPercentage}%` }}
              />
            </div>
            <span className="font-semibold text-blue-600">
              {progressPercentage}%
            </span>
          </div>
        </div>

        {/* Category Filter */}
        <div className="mb-6 flex flex-wrap gap-2">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                selectedCategory === category
                  ? "bg-orange-400 text-white shadow-md"
                  : "bg-transparent border text-white hover:bg-red-500"
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Main Section */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Video */}
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
              <div className="relative w-full aspect-video bg-black">
                <iframe
                  src={currentVideo.url}
                  title={currentVideo.title}
                  className="w-full h-full"
                  allowFullScreen
                />
              </div>

              <div className="p-6 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div className="flex-1">
                  <h2 className="text-2xl font-bold text-gray-800 mb-2">
                    {currentVideo.title}
                  </h2>
                  <p className="text-gray-600 mb-3">{currentVideo.description}</p>
                  <div className="flex flex-wrap gap-3 text-sm">
                    <span className="px-3 py-1 border bg-blue-100 text-blue-700 rounded-full">
                      {currentVideo.category}
                    </span>
                    <span className="px-3 py-1 border bg-green-100 text-green-700 rounded-full">
                      {currentVideo.level?.join(", ")}
                    </span>
                    <span className="px-3 py-1 border bg-purple-100 text-purple-700 rounded-full">
                      {currentVideo.duration}
                    </span>
                    <span className="px-3 py-1 border bg-orange-100 text-orange-700 rounded-full">
                      {currentVideo.instructor?.join(", ")}
                    </span>
                  </div>
                </div>

                <button
                  onClick={() => toggleCompletion(currentVideo._id)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all hover:scale-105 ${
                    completedVideos[currentVideo._id]
                      ? "bg-green-500 text-white"
                      : "bg-gray-200 text-gray-700"
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

            {/* Recommendations */}
            {recommendations.length > 0 && (
              <div className="rounded-2xl shadow-lg p-6">
                <h3 className="text-xl font-bold text-white mb-4">
                  Recommended for You
                </h3>
                <div className="space-y-3">
                  {recommendations.map((video) => (
                    <div
                      key={video._id}
                      onClick={() => setCurrentVideo(video)}
                      className="flex items-center gap-4 p-3 rounded-xl hover:bg-orange-300 cursor-pointer transition-all border border-gray-100"
                    >
                      <div
                        className={`w-16 h-16 ${video.color} rounded-lg flex items-center justify-center text-2xl flex-shrink-0`}
                      >
                        <Play size={24} className="text-white" fill="white" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h4 className="font-semibold text-white truncate">
                          {video.title}
                        </h4>
                        <p className="text-sm text-white">
                          {video.instructor?.join(", ")} · {video.duration}
                        </p>
                      </div>
                      {completedVideos[video._id] && (
                        <CheckCircle
                          size={20}
                          className="text-green-500 flex-shrink-0"
                        />
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Sidebar Playlist */}
          <div className="lg:col-span-1 border-2 rounded-2xl shadow-lg p-6 sticky top-6 max-h-[calc(100vh-2rem)] overflow-y-auto">
            <h3 className="text-xl font-bold text-white mb-4">
              Course Playlist
            </h3>
            <div className="space-y-2">
              {filteredVideos.map((video) => (
                <div
                  key={video._id}
                  onClick={() => setCurrentVideo(video)}
                  className={`flex items-start gap-3 p-3 rounded-xl cursor-pointer transition-all ${
                    currentVideo._id === video._id
                      ? "border-white bg-white/20"
                      : "hover:bg-orange-500 border-2"
                  }`}
                >
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleCompletion(video._id);
                    }}
                    className="mt-1 flex-shrink-0"
                  >
                    {completedVideos[video._id] ? (
                      <CheckCircle size={20} className="text-green-500" />
                    ) : (
                      <Circle size={20} className="text-gray-400" />
                    )}
                  </button>
                  <div className="flex-1 min-w-0">
                    <h4
                      className={`font-semibold text-sm mb-1 ${
                        currentVideo._id === video._id
                          ? "text-white"
                          : "text-gray-300"
                      }`}
                    >
                      {video.title}
                    </h4>
                    <p className="text-xs text-white">{video.duration}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      <Chatbot />
    </div>
  );
};

export default Video;
