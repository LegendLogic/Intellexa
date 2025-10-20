import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import { AuthContext } from "../context/AuthContext";
import { User, Mail, Trophy, Calendar, TrendingUp, Award, Target, Activity, Star } from "lucide-react";

const UserDashboard = () => {
  const { user, setUser } = useContext(AuthContext);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [currentUser, setCurrentUser] = useState(null);

  const backendUrl = import.meta.env.VITE_BACKEND_URL || "http://localhost:4000";

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const token = user?.token || localStorage.getItem("token");
        if (!token) {
          setError("You are not logged in.");
          setLoading(false);
          return;
        }

        const res = await axios.get(`${backendUrl}/api/user/profile`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        const userData = res.data?.user || res.data;
        setCurrentUser({ ...userData, token });
        setUser({ ...userData, token });
      } catch (err) {
        console.error("Error fetching user profile:", err);
        setError(err.response?.data?.message || "Failed to load profile.");
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, [backendUrl, setUser, user?.token]);

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
      <div className="min-h-screen flex items-center justify-center "
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
              onClick={() => window.location.href = '/login'}
              className="bg-red-500 hover:bg-red-600 text-white px-6 py-2 rounded-lg transition-colors"
            >
              Go to Login
            </button>
          </div>
        </div>
      </div>
    );
  }

  const points = currentUser?.points || 0;
  const level = Math.floor(points / 100) + 1;
  const nextLevelPoints = level * 100;
  const progress = ((points % 100) / 100) * 100;
  const memberSince = currentUser?.createdAt 
    ? new Date(currentUser.createdAt).toLocaleDateString("en-US", { 
        month: "long", 
        year: "numeric" 
      })
    : "Recently";

  return (
    <div className="min-h-screen p-4 md:p-6 pb-16" 
    style={{
    background:
      "radial-gradient(circle 600px at 60% 20%, rgba(249,115,22,0.25), transparent 70%), radial-gradient(circle 800px at 10% 80%, rgba(255,56,0,0.15), transparent 70%), #0e0b11",
  }}>
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
            Welcome back, {currentUser?.name?.split(' ')[0] || 'User'}!
          </h1>
          <p className="text-purple-300 text-lg flex items-center justify-center gap-2">
            <Star className="w-5 h-5 text-yellow-400 fill-yellow-400" />
            Level {level} Explorer
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mb-8">
          {/* Profile Card */}
          <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-6 hover:bg-white/15 transition-all duration-300 hover:scale-105 cursor-pointer group">
            <div className="flex  items-start gap-3">
              <div className="w-12 h-12 bg-blue-500/20 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform">
                <User className="w-6 h-6 text-blue-400" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-gray-400 text-sm mb-1">Full Name</p>
                <p className="text-white font-semibold truncate">{currentUser?.name || "N/A"}</p>
              </div>
            </div>
          </div>

          {/* Email Card */}
          <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-6 hover:bg-white/15 transition-all duration-300 hover:scale-105 cursor-pointer group">
            <div className="flex items-start gap-3">
              <div className="w-12 h-12 bg-purple-500/20 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform">
                <Mail className="w-6 h-6 text-purple-400" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-gray-400 text-sm mb-1">Email</p>
                <p className="text-white font-semibold text-sm truncate">
                  {currentUser?.email || "N/A"}
                </p>
              </div>
            </div>
          </div>

          {/* Points Card */}
          <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-6 hover:bg-white/15 transition-all duration-300 hover:scale-105 cursor-pointer group">
            <div className="flex items-start gap-3">
              <div className="w-12 h-12 bg-yellow-500/20 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform">
                <Trophy className="w-6 h-6 text-yellow-400" />
              </div>
              <div className="flex-1">
                <p className="text-gray-400 text-sm mb-1">Total Points</p>
                <p className="text-white font-bold text-2xl">{points.toLocaleString()}</p>
              </div>
            </div>
          </div>

          {/* Member Since Card */}
          <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-6 hover:bg-white/15 transition-all duration-300 hover:scale-105 cursor-pointer group">
            <div className="flex items-start gap-3">
              <div className="w-12 h-12 bg-green-500/20 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform">
                <Calendar className="w-6 h-6 text-green-400" />
              </div>
              <div className="flex-1">
                <p className="text-gray-400 text-sm mb-1">Member Since</p>
                <p className="text-white font-semibold">{memberSince}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Progress Section */}
        <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-6 md:p-8 mb-8">
          <div className="flex flex-col md:flex-row md:items-center justify-between mb-6 gap-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-purple-500/20 rounded-lg flex items-center justify-center">
                <TrendingUp className="w-5 h-5 text-purple-400" />
              </div>
              <div>
                <h2 className="text-xl md:text-2xl font-bold text-white">Your Progress</h2>
                <p className="text-gray-400 text-sm">Keep going to reach the next level!</p>
              </div>
            </div>
            <div className="text-left md:text-right">
              <p className="text-gray-400 text-sm">Next Level</p>
              <p className="text-white font-bold text-2xl">Level {level + 1}</p>
            </div>
          </div>
          
          <div>
            <div className="flex justify-between text-sm mb-2">
              <span className="text-purple-300 font-semibold">{points} points</span>
              <span className="text-purple-300 font-semibold">{currentUser?.creditBalance || "N/A"} points</span>
            </div>
            <div className="w-full bg-gray-700/50 rounded-full h-5 overflow-hidden shadow-inner">
              <div 
                className="h-full bg-gradient-to-r from-purple-500 via-pink-500 to-orange-500 rounded-full transition-all duration-500 shadow-lg shadow-purple-500/50 relative overflow-hidden"
                style={{ width: `${progress}%` }}
              >
                <div className="absolute inset-0 bg-white/20 animate-pulse"></div>
              </div>
            </div>
            <p className="text-center text-gray-400 text-sm mt-3">
              <span className="text-white font-semibold">{nextLevelPoints - points}</span> points to next level
            </p>
          </div>
        </div>

        {/* Achievements Section */}
        <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-6 md:p-8 mb-8">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 bg-yellow-500/20 rounded-lg flex items-center justify-center">
              <Award className="w-5 h-5 text-yellow-400" />
            </div>
            <div>
              <h2 className="text-xl md:text-2xl font-bold text-white">Achievements</h2>
              <p className="text-gray-400 text-sm">Unlock badges as you progress</p>
            </div>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { name: "Beginner", icon: Target, required: 0, unlocked: points >= 0, color: "blue" },
              { name: "Explorer", icon: TrendingUp, required: 100, unlocked: points >= 100, color: "purple" },
              { name: "Expert", icon: Award, required: 500, unlocked: points >= 500, color: "pink" },
              { name: "Master", icon: Trophy, required: 1000, unlocked: points >= 1000, color: "yellow" },
            ].map((achievement, idx) => (
              <div 
                key={idx}
                className={`${
                  achievement.unlocked 
                    ? 'bg-gradient-to-br from-yellow-500/20 to-orange-500/20 border-yellow-500/50' 
                    : 'bg-gray-800/50 border-gray-700/50'
                } border rounded-xl p-4 text-center transition-all duration-300 hover:scale-105 cursor-pointer relative overflow-hidden`}
              >
                {achievement.unlocked && (
                  <div className="absolute inset-0 bg-gradient-to-br from-yellow-400/10 to-transparent animate-pulse"></div>
                )}
                <achievement.icon 
                  className={`w-10 h-10 mx-auto mb-2 relative z-10 ${
                    achievement.unlocked ? 'text-yellow-400' : 'text-gray-600'
                  }`} 
                />
                <p className={`text-sm font-semibold relative z-10 ${
                  achievement.unlocked ? 'text-white' : 'text-gray-500'
                }`}>
                  {achievement.name}
                </p>
                <p className="text-xs text-gray-400 mt-1 relative z-10">
                  {achievement.required} pts
                </p>
                {achievement.unlocked && (
                  <div className="mt-2 relative z-10">
                    <span className="text-xs bg-yellow-500/30 text-yellow-200 px-2 py-1 rounded-full border border-yellow-500/50">
                      ✓ Unlocked
                    </span>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
          <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-6 hover:bg-white/15 transition-all duration-300">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 bg-blue-500/20 rounded-lg flex items-center justify-center">
                <Activity className="w-5 h-5 text-blue-400" />
              </div>
              <h3 className="text-white font-semibold">Activity</h3>
            </div>
            <p className="text-3xl md:text-4xl font-bold text-white mb-1">
              {Math.floor(points / 10)}
            </p>
            <p className="text-gray-400 text-sm">tasks completed</p>
          </div>

          <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-6 hover:bg-white/15 transition-all duration-300">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 bg-purple-500/20 rounded-lg flex items-center justify-center">
                <Trophy className="w-5 h-5 text-purple-400" />
              </div>
              <h3 className="text-white font-semibold">Level Rank</h3>
            </div>
            <p className="text-3xl md:text-4xl font-bold text-white mb-1">
              Level {level}
            </p>
            <p className="text-gray-400 text-sm">current standing</p>
          </div>

          <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-6 hover:bg-white/15 transition-all duration-300">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 bg-green-500/20 rounded-lg flex items-center justify-center">
                <Target className="w-5 h-5 text-green-400" />
              </div>
              <h3 className="text-white font-semibold">Goal Progress</h3>
            </div>
            <p className="text-3xl md:text-4xl font-bold text-white mb-1">
              {Math.round(progress)}%
            </p>
            <p className="text-gray-400 text-sm">to next level</p>
          </div>
        </div>
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