import React, { useState, useEffect } from "react";
import { Play, CheckCircle, Clock, Award, TrendingUp, BookOpen, Code, Zap } from "lucide-react";

const recommendedVideos = [
  {
    step: "Step 1: React Basics",
    icon: "⚛️",
    color: "from-blue-500 to-cyan-500",
    videos: [
      { title: "React JS Crash Course", url: "https://www.youtube.com/embed/w7ejDZ8SWv8", timestamp: "0:00", duration: "1h 24m", difficulty: "Beginner" },
      { title: "JavaScript Tutorial for Beginners", url: "https://www.youtube.com/embed/W6NZfCO5SIk", timestamp: "0:00", duration: "3h 26m", difficulty: "Beginner" },
      { title: "Tailwind CSS Full Course", url: "https://www.youtube.com/embed/dFgzHOX84xQ", timestamp: "0:00", duration: "2h 15m", difficulty: "Intermediate" },
    ],
  },
  {
    step: "Step 2: Node & Backend",
    icon: "🚀",
    color: "from-purple-500 to-pink-500",
    videos: [
      { title: "Node.js Crash Course", url: "https://www.youtube.com/embed/fBNz5xF-Kx4", timestamp: "0:00", duration: "1h 30m", difficulty: "Intermediate" },
      { title: "Full Stack Web Development Tutorial", url: "https://www.youtube.com/embed/4UZrsTqkcW4", timestamp: "0:00", duration: "5h 0m", difficulty: "Advanced" },
    ],
  },
];

const Webdev = () => {
  const [trackedVideos, setTrackedVideos] = useState([]);
  const [activeVideo, setActiveVideo] = useState(null);
  const [hoveredVideo, setHoveredVideo] = useState(null);
  const [stats, setStats] = useState({ totalVideos: 0, completed: 0, hours: 0 });
  const [showConfetti, setShowConfetti] = useState(false);

  useEffect(() => {
    const total = recommendedVideos.reduce((acc, step) => acc + step.videos.length, 0);
    const completed = trackedVideos.length;
    setStats({ totalVideos: total, completed, hours: Math.floor(completed * 2.5) });
    
    if (completed === total && completed > 0) {
      setShowConfetti(true);
      setTimeout(() => setShowConfetti(false), 3000);
    }
  }, [trackedVideos]);

  const handleTrackVideo = (video) => {
    if (!trackedVideos.some((v) => v.url === video.url)) {
      setTrackedVideos([...trackedVideos, video]);
    }
  };

  const closeModal = () => {
    setActiveVideo(null);
  };

  const getDifficultyColor = (difficulty) => {
    switch(difficulty) {
      case "Beginner": return "bg-green-100 text-green-700";
      case "Intermediate": return "bg-yellow-100 text-yellow-700";
      case "Advanced": return "bg-red-100 text-red-700";
      default: return "bg-gray-100 text-gray-700";
    }
  };

  const overallProgress = stats.totalVideos > 0 ? (stats.completed / stats.totalVideos) * 100 : 0;

  return (
    <div className="min-h-screen   relative overflow-hidden"
    style={{
    background:
      "radial-gradient(circle 600px at 60% 20%, rgba(249,115,22,0.25), transparent 70%), radial-gradient(circle 800px at 10% 80%, rgba(255,56,0,0.15), transparent 70%), #0e0b11",
  }}
    >
      {/* Animated Background Elements */}
    

      {/* Confetti Effect */}
      

      <div className="relative max-w-7xl mt-20 mx-auto p-4 md:p-8 space-y-8">
        {/* Header Section */}
        <div className="text-center space-y-4 animate-fade-in">
          <div className="inline-block">
            <div className="flex items-center gap-3 bg-white/10 backdrop-blur-lg px-6 py-3 rounded-full border border-white/20">
              <Code className="w-6 h-6 text-orange-400" />
              <span className="text-white font-semibold">Web Development Mastery Path</span>
              <Zap className="w-5 h-5 text-orange-400" />
            </div>
          </div>
          <h1 className="text-5xl md:text-6xl text-orange-400 font-bold  bg-clip-text ">
            Your Learning Journey
          </h1>
          <p className="text-white text-lg max-w-2xl mx-auto">
            Master web development with curated video tutorials and track your progress in real-time
          </p>
        </div>

        {/* Stats Dashboard */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20 hover:bg-white/15 transition-all hover:scale-105 transform">
            <div className="flex items-center justify-between mb-2">
              <BookOpen className="w-8 h-8 text-cyan-400" />
              <span className="text-3xl font-bold text-white">{stats.totalVideos}</span>
            </div>
            <p className="text-gray-300 text-sm">Total Courses</p>
          </div>

          <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20 hover:bg-white/15 transition-all hover:scale-105 transform">
            <div className="flex items-center justify-between mb-2">
              <CheckCircle className="w-8 h-8 text-green-400" />
              <span className="text-3xl font-bold text-white">{stats.completed}</span>
            </div>
            <p className="text-gray-300 text-sm">Completed</p>
          </div>

          <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20 hover:bg-white/15 transition-all hover:scale-105 transform">
            <div className="flex items-center justify-between mb-2">
              <Clock className="w-8 h-8 text-purple-400" />
              <span className="text-3xl font-bold text-white">{stats.hours}h</span>
            </div>
            <p className="text-gray-300 text-sm">Learning Time</p>
          </div>

          <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20 hover:bg-white/15 transition-all hover:scale-105 transform">
            <div className="flex items-center justify-between mb-2">
              <TrendingUp className="w-8 h-8 text-pink-400" />
              <span className="text-3xl font-bold text-white">{Math.round(overallProgress)}%</span>
            </div>
            <p className="text-gray-300 text-sm">Overall Progress</p>
          </div>
        </div>

        {/* Overall Progress Bar */}
        <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-white font-semibold flex items-center gap-2">
              <Award className="w-5 h-5 text-yellow-400" />
              Total Progress
            </h3>
            <span className="text-white font-bold">{Math.round(overallProgress)}%</span>
          </div>
          <div className="relative w-full h-4 bg-white/10 rounded-full overflow-hidden">
            <div
              className="absolute top-0 left-0 h-full bg-gradient-to-r from-cyan-500 via-purple-500 to-pink-500 rounded-full transition-all duration-700 ease-out"
              style={{ width: `${overallProgress}%` }}
            >
              <div className="absolute inset-0 bg-white/30 animate-pulse"></div>
            </div>
          </div>
        </div>

        {/* Course Steps */}
        {recommendedVideos.map((step, index) => {
          const completed = step.videos.filter((v) => trackedVideos.some((t) => t.url === v.url)).length;
          const total = step.videos.length;
          const progress = (completed / total) * 100;

          return (
            <div
              key={index}
              className="bg-white/10 backdrop-blur-lg rounded-2xl border border-white/20 overflow-hidden hover:border-white/40 transition-all"
            >
              <div className={`bg-gradient-to-r ${step.color} p-6`}>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="text-5xl">{step.icon}</div>
                    <div>
                      <h2 className="text-2xl font-bold text-white">{step.step}</h2>
                      <p className="text-white/80 text-sm mt-1">
                        {completed} of {total} videos completed
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-3xl font-bold text-white">{Math.round(progress)}%</div>
                    <div className="text-white/80 text-sm">Complete</div>
                  </div>
                </div>

                {/* Progress Bar */}
                <div className="mt-4 w-full h-3 bg-white/20 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-white rounded-full transition-all duration-500 shadow-lg"
                    style={{ width: `${progress}%` }}
                  ></div>
                </div>
              </div>

              <div className="p-6 space-y-3">
                {step.videos.map((video, idx) => {
                  const isTracked = trackedVideos.some((v) => v.url === video.url);
                  const isHovered = hoveredVideo === `${index}-${idx}`;

                  return (
                    <div
                      key={idx}
                      className={`relative group bg-white/5 hover:bg-white/10 rounded-xl p-4 border transition-all duration-300 ${
                        isTracked ? "border-green-500/50" : "border-white/10 hover:border-purple-500/50"
                      } ${isHovered ? "scale-102 shadow-2xl" : ""}`}
                      onMouseEnter={() => setHoveredVideo(`${index}-${idx}`)}
                      onMouseLeave={() => setHoveredVideo(null)}
                    >
                      <div className="flex items-start justify-between gap-4">
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-2">
                            <button
                              onClick={() => setActiveVideo(video)}
                              className={`flex items-center gap-2 text-lg font-semibold transition-all ${
                                isTracked ? "text-green-400" : "text-cyan-400 hover:text-cyan-300"
                              }`}
                            >
                              {isTracked ? (
                                <CheckCircle className="w-5 h-5" />
                              ) : (
                                <Play className="w-5 h-5" />
                              )}
                              {video.title}
                            </button>
                          </div>

                          <div className="flex flex-wrap items-center gap-3 text-sm">
                            <span className="flex items-center gap-1 text-gray-400">
                              <Clock className="w-4 h-4" />
                              {video.duration}
                            </span>
                            <span className={`px-3 py-1 rounded-full text-xs font-medium ${getDifficultyColor(video.difficulty)}`}>
                              {video.difficulty}
                            </span>
                            <span className="text-gray-500">Start: {video.timestamp}</span>
                          </div>
                        </div>

                        <button
                          onClick={() => handleTrackVideo(video)}
                          disabled={isTracked}
                          className={`px-6 py-3 rounded-xl font-semibold transition-all transform ${
                            isTracked
                              ? "bg-green-500/20 text-green-400 cursor-default border border-green-500/50"
                              : "bg-gradient-to-r from-purple-500 to-pink-500 text-white hover:from-purple-600 hover:to-pink-600 hover:scale-105 shadow-lg hover:shadow-purple-500/50"
                          }`}
                        >
                          {isTracked ? "✓ Tracked" : "Track Progress"}
                        </button>
                      </div>

                      {/* Hover Glow Effect */}
                      {isHovered && !isTracked && (
                        <div className="absolute inset-0 bg-gradient-to-r from-purple-500/10 to-pink-500/10 rounded-xl pointer-events-none"></div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>

      {/* Video Modal */}
      {activeVideo && (
        <div
          className="fixed inset-0 bg-black/90 backdrop-blur-sm flex items-center justify-center z-50 p-4 animate-fade-in"
          onClick={closeModal}
        >
          <div
            className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-3xl shadow-2xl max-w-5xl w-full relative border border-white/20 overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="bg-gradient-to-r from-purple-600 to-pink-600 p-6">
              <button
                onClick={closeModal}
                className="absolute top-4 right-4 w-10 h-10 flex items-center justify-center bg-white/10 hover:bg-white/20 rounded-full text-white font-bold transition-all hover:scale-110 z-10"
              >
                ✕
              </button>
              <h2 className="text-2xl font-bold text-white pr-12">{activeVideo.title}</h2>
              <div className="flex items-center gap-3 mt-2">
                <span className="text-white/80 text-sm">{activeVideo.duration}</span>
                <span className={`px-3 py-1 rounded-full text-xs font-medium ${getDifficultyColor(activeVideo.difficulty)}`}>
                  {activeVideo.difficulty}
                </span>
              </div>
            </div>

            {/* Video Container */}
            <div className="p-6">
              <div className="relative w-full" style={{ paddingTop: '56.25%' }}>
                <iframe
                  src={activeVideo.url}
                  title={activeVideo.title}
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  className="absolute top-0 left-0 w-full h-full rounded-xl shadow-2xl"
                ></iframe>
              </div>

              <button
                onClick={() => {
                  handleTrackVideo(activeVideo);
                  closeModal();
                }}
                disabled={trackedVideos.some((v) => v.url === activeVideo.url)}
                className={`w-full mt-6 px-6 py-4 rounded-xl font-bold text-lg transition-all ${
                  trackedVideos.some((v) => v.url === activeVideo.url)
                    ? "bg-green-500/20 text-green-400 cursor-default"
                    : "bg-gradient-to-r from-purple-500 to-pink-500 text-white hover:from-purple-600 hover:to-pink-600 shadow-lg hover:shadow-purple-500/50"
                }`}
              >
                {trackedVideos.some((v) => v.url === activeVideo.url) ? "✓ Already Tracked" : "Mark as Completed"}
              </button>
            </div>
          </div>
        </div>
      )}

      <style>{`
        @keyframes fall {
          to {
            transform: translateY(100vh) rotate(360deg);
            opacity: 0;
          }
        }
        @keyframes fade-in {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fade-in {
          animation: fade-in 0.6s ease-out;
        }
        .scale-102 {
          transform: scale(1.02);
        }
      `}</style>
    </div>
  );
};

export default Webdev;