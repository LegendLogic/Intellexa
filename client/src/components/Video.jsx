import React, { useState } from "react";
import { CheckCircle, Circle, Play } from "lucide-react";

// Professional video data with categories and recommendations
const videos = [
  {
    id: 1,
    title: "React - The Complete Guide 2024",
    description: "Master React with hooks, routing, Redux, and more from Maximilian Schwarzmüller.",
    url: "https://www.youtube.com/embed/Ke90Tje7VS0",
    color: "bg-blue-500",
    category: "Frontend Development",
    duration: "8:45:00",
    level: "Beginner to Advanced",
    instructor: "Academind",
  },
  {
    id: 2,
    title: "JavaScript Full Course for Beginners",
    description: "Complete JavaScript tutorial covering ES6+, async/await, and modern practices.",
    url: "https://www.youtube.com/embed/PkZNo7MFNFg",
    color: "bg-yellow-500",
    category: "Programming Fundamentals",
    duration: "7:45:00",
    level: "Beginner",
    instructor: "freeCodeCamp",
  },
  {
    id: 3,
    title: "System Design Interview",
    description: "Learn how to approach system design interviews with real examples.",
    url: "https://www.youtube.com/embed/bUHFg8CZFws",
    color: "bg-red-500",
    category: "System Design",
    duration: "2:15:00",
    level: "Intermediate",
    instructor: "Gaurav Sen",
  },
  {
    id: 4,
    title: "Tailwind CSS Full Course",
    description: "Build beautiful, responsive UIs rapidly with utility-first CSS framework.",
    url: "https://www.youtube.com/embed/ft30zcMlFao",
    color: "bg-cyan-500",
    category: "Frontend Development",
    duration: "3:30:00",
    level: "Beginner",
    instructor: "Traversy Media",
  },
  {
    id: 5,
    title: "Data Structures and Algorithms",
    description: "Master DSA concepts with practical examples and problem-solving techniques.",
    url: "https://www.youtube.com/embed/8hly31xKli0",
    color: "bg-green-500",
    category: "Computer Science",
    duration: "5:00:00",
    level: "Intermediate",
    instructor: "freeCodeCamp",
  },
  {
    id: 6,
    title: "Node.js & Express Complete Course",
    description: "Build scalable backend applications with Node.js and Express framework.",
    url: "https://www.youtube.com/embed/Oe421EPjeBE",
    color: "bg-emerald-600",
    category: "Backend Development",
    duration: "8:15:00",
    level: "Intermediate",
    instructor: "freeCodeCamp",
  },
  {
    id: 7,
    title: "Git & GitHub for Beginners",
    description: "Version control essentials every developer needs to know.",
    url: "https://www.youtube.com/embed/RGOj5yH7evk",
    color: "bg-orange-500",
    category: "Developer Tools",
    duration: "1:08:00",
    level: "Beginner",
    instructor: "freeCodeCamp",
  },
  {
    id: 8,
    title: "Python for Everybody",
    description: "Learn Python programming from basics to advanced concepts.",
    url: "https://www.youtube.com/embed/8DvywoWv6fI",
    color: "bg-indigo-500",
    category: "Programming Fundamentals",
    duration: "13:15:00",
    level: "Beginner",
    instructor: "freeCodeCamp",
  },
  {
    id: 9,
    title: "SQL Tutorial - Full Course",
    description: "Master database management and SQL queries from scratch.",
    url: "https://www.youtube.com/embed/HXV3zeQKqGY",
    color: "bg-purple-500",
    category: "Database",
    duration: "4:20:00",
    level: "Beginner to Intermediate",
    instructor: "freeCodeCamp",
  },
];

const Video = () => {
  const [currentVideo, setCurrentVideo] = useState(videos[0]);
  const [completedVideos, setCompletedVideos] = useState({});
  const [selectedCategory, setSelectedCategory] = useState("All");

  // Get unique categories
  const categories = ["All", ...new Set(videos.map((v) => v.category))];

  // Toggle video completion
  const toggleCompletion = (videoId) => {
    setCompletedVideos((prev) => ({
      ...prev,
      [videoId]: !prev[videoId],
    }));
  };

  // Filter videos by category
  const filteredVideos =
    selectedCategory === "All"
      ? videos
      : videos.filter((v) => v.category === selectedCategory);

  // Get recommended videos based on current video
  const getRecommendations = (currentVideoId) => {
    const current = videos.find((v) => v.id === currentVideoId);
    return videos
      .filter((v) => v.id !== currentVideoId && v.category === current.category)
      .slice(0, 3);
  };

  const recommendations = getRecommendations(currentVideo.id);

  // Calculate progress
  const completedCount = Object.values(completedVideos).filter(Boolean).length;
  const progressPercentage = Math.round((completedCount / videos.length) * 100);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-6">
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-800 mb-2">
            🎓 Video Learning Hub
          </h1>
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 sm:gap-4 text-sm text-gray-600">
            <span>Progress: {completedCount}/{videos.length} videos completed</span>
            <div className="flex-1 bg-gray-200 rounded-full h-2 max-w-xs">
              <div
                className="bg-blue-500 h-2 rounded-full transition-all duration-300"
                style={{ width: `${progressPercentage}%` }}
              />
            </div>
            <span className="font-semibold text-blue-600">{progressPercentage}%</span>
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
                  ? "bg-blue-500 text-white shadow-md"
                  : "bg-white text-gray-700 hover:bg-gray-100"
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Video Section */}
          <div className="lg:col-span-2 space-y-6">
            {/* Video Player */}
            <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
              <div className="relative w-full aspect-video bg-black">
                <iframe
                  src={currentVideo.url}
                  title={currentVideo.title}
                  className="w-full h-full"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              </div>

              {/* Video Info */}
              <div className="p-6 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div className="flex-1">
                  <h2 className="text-2xl font-bold text-gray-800 mb-2">
                    {currentVideo.title}
                  </h2>
                  <p className="text-gray-600 mb-3">{currentVideo.description}</p>
                  <div className="flex flex-wrap gap-3 text-sm">
                    <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full">
                      {currentVideo.category}
                    </span>
                    <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full">
                      {currentVideo.level}
                    </span>
                    <span className="px-3 py-1 bg-purple-100 text-purple-700 rounded-full">
                      ⏱️ {currentVideo.duration}
                    </span>
                    <span className="px-3 py-1 bg-orange-100 text-orange-700 rounded-full">
                      👨‍🏫 {currentVideo.instructor}
                    </span>
                  </div>
                </div>
                <button
                  onClick={() => toggleCompletion(currentVideo.id)}
                  className="flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all hover:scale-105"
                  style={{
                    backgroundColor: completedVideos[currentVideo.id] ? "#10b981" : "#e5e7eb",
                    color: completedVideos[currentVideo.id] ? "white" : "#374151",
                  }}
                >
                  {completedVideos[currentVideo.id] ? (
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
              <div className="bg-white rounded-2xl shadow-lg p-6">
                <h3 className="text-xl font-bold text-gray-800 mb-4">
                  📚 Recommended for You
                </h3>
                <div className="space-y-3">
                  {recommendations.map((video) => (
                    <div
                      key={video.id}
                      onClick={() => setCurrentVideo(video)}
                      className="flex items-center gap-4 p-3 rounded-xl hover:bg-gray-50 cursor-pointer transition-all border border-gray-100"
                    >
                      <div
                        className={`w-16 h-16 ${video.color} rounded-lg flex items-center justify-center text-2xl flex-shrink-0`}
                      >
                        <Play size={24} className="text-white" fill="white" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h4 className="font-semibold text-gray-800 truncate">
                          {video.title}
                        </h4>
                        <p className="text-sm text-gray-600">
                          {video.instructor} · {video.duration}
                        </p>
                      </div>
                      {completedVideos[video.id] && (
                        <CheckCircle size={20} className="text-green-500 flex-shrink-0" />
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Sidebar - Video List */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl shadow-lg p-6 sticky top-6 max-h-[calc(100vh-2rem)] overflow-y-auto">
              <h3 className="text-xl font-bold text-gray-800 mb-4">
                📋 Course Playlist
              </h3>
              <div className="space-y-2">
                {filteredVideos.map((video) => (
                  <div
                    key={video.id}
                    onClick={() => setCurrentVideo(video)}
                    className={`flex items-start gap-3 p-3 rounded-xl cursor-pointer transition-all ${
                      currentVideo.id === video.id
                        ? "bg-blue-50 border-2 border-blue-500"
                        : "hover:bg-gray-50 border-2 border-transparent"
                    }`}
                  >
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleCompletion(video.id);
                      }}
                      className="mt-1 flex-shrink-0"
                    >
                      {completedVideos[video.id] ? (
                        <CheckCircle size={20} className="text-green-500" />
                      ) : (
                        <Circle size={20} className="text-gray-400" />
                      )}
                    </button>
                    <div className="flex-1 min-w-0">
                      <h4
                        className={`font-semibold text-sm mb-1 ${
                          currentVideo.id === video.id ? "text-blue-700" : "text-gray-800"
                        }`}
                      >
                        {video.title}
                      </h4>
                      <p className="text-xs text-gray-600">{video.duration}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Video;
