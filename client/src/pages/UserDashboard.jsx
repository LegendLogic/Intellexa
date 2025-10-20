import React, { useEffect, useState } from "react";
import { User, Mail, Trophy, Calendar, TrendingUp, Award, Target, Activity, Star } from "lucide-react";

const UserDashboard = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [currentUser, setCurrentUser] = useState(null);

  const backendUrl = "http://localhost:4000";

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          setError("You are not logged in.");
          setLoading(false);
          return;
        }

        const response = await fetch(`${backendUrl}/api/user/profile`, {
          method: "GET",
          headers: { 
            "Authorization": `Bearer ${token}`,
            "Content-Type": "application/json"
          },
        });

        if (!response.ok) {
          if (response.status === 401) {
            localStorage.removeItem("token");
            setError("Session expired. Please login again.");
          } else {
            throw new Error("Failed to load profile.");
          }
          setLoading(false);
          return;
        }

        const data = await response.json();
        const userData = data?.user || data;
        setCurrentUser(userData);
        localStorage.setItem("user", JSON.stringify(userData));
      } catch (err) {
        console.error("Error fetching user profile:", err);
        setError(err.message || "Failed to load profile.");
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, [backendUrl]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-purple-400 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-purple-200 text-lg">Loading your dashboard...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div
        className="min-h-screen flex items-center justify-center"
        style={{
          background:
            "radial-gradient(circle 600px at 60% 20%, rgba(249,115,22,0.25), transparent 70%), radial-gradient(circle 800px at 10% 80%, rgba(255,56,0,0.15), transparent 70%), #0e0b11",
        }}
      >
        <div className="bg-red-500/10 border border-red-500/50 rounded-2xl p-8 backdrop-blur-sm max-w-md">
          <div className="text-center">
            <div className="w-16 h-16 bg-red-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-3xl">⚠️</span>
            </div>
            <p className="text-red-300 text-lg mb-4">{error}</p>
            <button
              onClick={() => (window.location.href = "/login")}
              className="bg-red-500 hover:bg-red-600 text-white px-6 py-2 rounded-lg transition-colors"
            >
              Go to Login
            </button>
          </div>
        </div>
      </div>
    );
  }

  const points = currentUser?.points || currentUser?.creditBalance || 0;
  const level = Math.floor(points / 100) + 1;
  const nextLevelPoints = level * 100;
  const progress = ((points % 100) / 100) * 100;
  const memberSince = currentUser?.createdAt
    ? new Date(currentUser.createdAt).toLocaleDateString("en-US", { month: "long", year: "numeric" })
    : "Recently";

  return (
    <div
      className="min-h-screen p-4 md:p-6 pb-16"
      style={{
        background:
          "radial-gradient(circle 600px at 60% 20%, rgba(249,115,22,0.25), transparent 70%), radial-gradient(circle 800px at 10% 80%, rgba(255,56,0,0.15), transparent 70%), #0e0b11",
      }}
    >
      <div className="max-w-6xl mx-auto mt-8">
        {/* Header Section */}
        <div className="text-center mb-12">
          <div className="relative inline-block mb-4">
            <div className="w-24 mt-10 h-24 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center shadow-2xl shadow-purple-500/50">
              <User className="w-12 h-12 text-white" />
            </div>
            <div className="absolute -bottom-1 -right-1 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full w-8 h-8 flex items-center justify-center border-4 border-slate-900">
              <span className="text-white text-xs font-bold">{level}</span>
            </div>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-2">
            Welcome back, {currentUser?.name?.split(" ")[0] || "User"}!
          </h1>
          <p className="text-purple-300 text-lg flex items-center justify-center gap-2">
            <Star className="w-5 h-5 text-yellow-400 fill-yellow-400" />
            Level {level} Explorer
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mb-8">
          <Card icon={User} label="Full Name" value={currentUser?.name || "N/A"} color="blue" />
          <Card icon={Mail} label="Email" value={currentUser?.email || "N/A"} color="purple" />
          <Card icon={Trophy} label="Total Points" value={points.toLocaleString()} color="yellow" />
          <Card icon={Calendar} label="Member Since" value={memberSince} color="green" />
        </div>

        {/* Progress Section */}
        <ProgressSection points={points} level={level} nextLevelPoints={nextLevelPoints} progress={progress} creditBalance={currentUser?.creditBalance || 0} />

        {/* Achievements Section */}
        <Achievements points={points} />

        {/* Quick Stats */}
        <QuickStats points={points} level={level} progress={progress} />
      </div>

      {/* Footer */}
      <div className="text-center mt-12">
        <p className="text-purple-300/60 text-sm">
          © {new Date().getFullYear()} Intellexa Dashboard • Crafted with passion
        </p>
      </div>
    </div>
  );
};

export default UserDashboard;

// -----------------------------
// Reusable Card Component
const Card = ({ icon: Icon, label, value, color }) => {
  const colorClasses = {
    blue: { bg: "bg-blue-500/20", text: "text-blue-400" },
    purple: { bg: "bg-purple-500/20", text: "text-purple-400" },
    yellow: { bg: "bg-yellow-500/20", text: "text-yellow-400" },
    green: { bg: "bg-green-500/20", text: "text-green-400" }
  };

  const colors = colorClasses[color] || colorClasses.blue;

  return (
    <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-6 hover:bg-white/15 transition-all duration-300 hover:scale-105 cursor-pointer group">
      <div className="flex items-start gap-3">
        <div className={`w-12 h-12 ${colors.bg} rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform`}>
          <Icon className={`w-6 h-6 ${colors.text}`} />
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-gray-400 text-sm mb-1">{label}</p>
          <p className="text-white font-semibold truncate">{value}</p>
        </div>
      </div>
    </div>
  );
};

// -----------------------------
// Progress Section Component
const ProgressSection = ({ points, level, nextLevelPoints, progress, creditBalance }) => (
  <div className="bg-gradient-to-br from-purple-500/20 to-pink-500/20 backdrop-blur-md border border-purple-500/30 rounded-2xl p-8 mb-8">
    <div className="flex items-center justify-between mb-4">
      <div>
        <h2 className="text-2xl font-bold text-white mb-1">Level {level}</h2>
        <p className="text-purple-200">
          {points} / {nextLevelPoints} points to Level {level + 1}
        </p>
      </div>
      <div className="text-right">
        <p className="text-purple-300 text-sm">Credit Balance</p>
        <p className="text-3xl font-bold text-white">{creditBalance}</p>
      </div>
    </div>
    <div className="w-full bg-slate-800/50 rounded-full h-4 overflow-hidden">
      <div
        className="h-full bg-gradient-to-r from-purple-500 to-pink-500 rounded-full transition-all duration-500 flex items-center justify-end pr-2"
        style={{ width: `${progress}%` }}
      >
        {progress > 10 && <span className="text-xs text-white font-bold">{Math.round(progress)}%</span>}
      </div>
    </div>
  </div>
);

// -----------------------------
// Achievements Component
const Achievements = ({ points }) => {
  const achievements = [
    { icon: Trophy, name: "First Steps", desc: "Earned your first 100 points", unlocked: points >= 100, color: "yellow" },
    { icon: Award, name: "Rising Star", desc: "Reached 500 points", unlocked: points >= 500, color: "blue" },
    { icon: Target, name: "Point Master", desc: "Accumulated 1000 points", unlocked: points >= 1000, color: "purple" },
    { icon: Activity, name: "Elite Explorer", desc: "Achieved 2500 points", unlocked: points >= 2500, color: "green" },
  ];

  const colorClasses = {
    yellow: { bg: "bg-yellow-500/20", border: "border-yellow-500/50", iconBg: "bg-yellow-500/30", text: "text-yellow-400" },
    blue: { bg: "bg-blue-500/20", border: "border-blue-500/50", iconBg: "bg-blue-500/30", text: "text-blue-400" },
    purple: { bg: "bg-purple-500/20", border: "border-purple-500/50", iconBg: "bg-purple-500/30", text: "text-purple-400" },
    green: { bg: "bg-green-500/20", border: "border-green-500/50", iconBg: "bg-green-500/30", text: "text-green-400" }
  };

  return (
    <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-8 mb-8">
      <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
        <Award className="w-6 h-6 text-yellow-400" />
        Achievements
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {achievements.map((achievement, idx) => {
          const colors = colorClasses[achievement.color] || colorClasses.blue;
          return (
            <div
              key={idx}
              className={`p-4 rounded-xl border-2 transition-all ${
                achievement.unlocked
                  ? `${colors.bg} ${colors.border}`
                  : "bg-slate-800/30 border-slate-700/50 opacity-50"
              }`}
            >
              <div className="flex flex-col items-center text-center">
                <div
                  className={`w-16 h-16 rounded-full flex items-center justify-center mb-3 ${
                    achievement.unlocked ? colors.iconBg : "bg-slate-700/30"
                  }`}
                >
                  <achievement.icon className={`w-8 h-8 ${achievement.unlocked ? colors.text : "text-slate-500"}`} />
                </div>
                <h3 className="font-bold text-white mb-1">{achievement.name}</h3>
                <p className="text-sm text-gray-400">{achievement.desc}</p>
                {achievement.unlocked && (
                  <div className="mt-2 text-xs text-green-400 font-semibold">✓ Unlocked</div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

// -----------------------------
// Quick Stats Component
const QuickStats = ({ points, level, progress }) => (
  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 md:gap-6">
    <StatCard icon={TrendingUp} label="Current Level" value={level} color="purple" />
    <StatCard icon={Trophy} label="Total Points" value={points.toLocaleString()} color="yellow" />
    <StatCard icon={Target} label="Progress" value={`${Math.round(progress)}%`} color="green" />
  </div>
);

const StatCard = ({ icon: Icon, label, value, color }) => {
  const colorClasses = {
    purple: "text-purple-400",
    yellow: "text-yellow-400",
    green: "text-green-400"
  };

  return (
    <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-xl p-6 text-center hover:bg-white/10 transition-all">
      <Icon className={`w-8 h-8 ${colorClasses[color] || "text-purple-400"} mx-auto mb-3`} />
      <p className="text-gray-400 text-sm mb-1">{label}</p>
      <p className="text-3xl font-bold text-white">{value}</p>
    </div>
  );
};