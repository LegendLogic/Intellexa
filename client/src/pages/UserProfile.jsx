import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import {
  Clock,
  Moon,
  Flame,
  Calendar,
  Zap,
  Coffee,
  TrendingUp,
  Code2,
} from "lucide-react";

const backendUrl = import.meta.env.VITE_BACKEND_URL || "http://localhost:4000";

const UserProfile = () => {
  const { id } = useParams();
  const [activeTab, setActiveTab] = useState("overview");
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState(null);
  const [heatmapData, setHeatmapData] = useState([]);
  const [userProfile, setUserProfile] = useState(null);

  const generateHeatmapData = () => {
    const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    return days.map((day) => ({
      day,
      values: Array.from({ length: 14 }, () => Math.random()),
    }));
  };

  const getHeatmapColor = (value) => {
    if (value < 0.2) return "bg-gray-700";
    if (value < 0.4) return "bg-orange-900/40";
    if (value < 0.6) return "bg-orange-700/60";
    if (value < 0.8) return "bg-orange-600/80";
    return "bg-orange-500";
  };

  const getSafeName = (name) =>
    typeof name === "object" ? Object.values(name)[0] : name;

  const fetchUserData = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem("token");
      const userId = id || "68ff38423c705e9a0a140a82";

      const { data } = await axios.get(
        `${backendUrl}/api/user/profile/${userId}`,
        {
          headers: token ? { Authorization: `Bearer ${token}` } : {},
        }
      );

      const user = data?.data || {};

      setUserProfile({
        name: getSafeName(user.name) || "Unknown User",
        email: user.email || "unknown@example.com",
        image: user.image || "/uploads/default-avatar.png",
        creditBalance: user.creditBalance ?? 0,
        points: user.points ?? 0,
        joinedDate:user.joinedDate ?? 0
        
      });

      setStats({
        totalHours: user.totalHours || 0,
        allNighters: user.allNighters || 0,
        streak: user.currentStreak || 0,
        dailyAverage: user.dailyAverage || 0,
        peakDay: user.peakDay || "N/A",
        activeDays: user.activeDays || 0,
        longestSession: user.longestSession || 0,
        weekly: {
          current: user.weeklyStats?.thisWeek || 0,
          last: user.weeklyStats?.lastWeek || 0,
          growth: user.weeklyStats?.growth || 0,
        },
      });

      setHeatmapData(user.heatmap || generateHeatmapData());
    } catch (error) {
      console.error("Error fetching user data:", error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUserData();
  }, [id]);

  if (loading || !stats || !userProfile) {
    return (
      <div className="min-h-screen flex items-center justify-center text-orange-400">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500 mx-auto mb-4"></div>
          Loading user profile...
        </div>
      </div>
    );
  }

  return (
    <div
      className="min-h-screen text-white px-4 sm:px-6 md:px-10 py-6"
      style={{
        background:
          "radial-gradient(circle 700px at 70% 10%, rgba(255,87,34,0.25), transparent 70%), radial-gradient(circle 800px at 10% 80%, rgba(255,0,0,0.2), transparent 70%), #0a0a0f",
      }}
    >
      <div className="max-w-7xl mx-auto">
        {/* HEADER */}
        <div className="flex flex-col sm:flex-row items-center sm:items-start mt-16 sm:mt-20 gap-6 mb-8 text-center sm:text-left">
          {/* Avatar */}
          <div className="relative flex-shrink-0">
            <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-full bg-gradient-to-br from-orange-500 to-pink-500 p-1">
              <div className="w-full h-full rounded-full bg-gray-800 flex items-center justify-center text-3xl font-bold overflow-hidden">
                {userProfile.image &&
                userProfile.image !== "/uploads/default-avatar.png" ? (
                  <img
                    src={`${backendUrl}${userProfile.image}`}
                    alt={userProfile.name}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  getSafeName(userProfile.name)
                    .split(" ")
                    .map((n) => n[0])
                    .join("")
                    .toUpperCase()
                )}
              </div>
            </div>
            <div className="absolute -bottom-1 -right-1 bg-green-500 w-5 h-5 sm:w-6 sm:h-6 rounded-full border-4 border-gray-900"></div>
          </div>

          {/* Info */}
          <div className="flex-1">
            <h1 className="text-2xl sm:text-4xl font-bold mb-2">
              {getSafeName(userProfile.name)}
            </h1>
            <p className="text-gray-400 flex items-center justify-center sm:justify-start gap-2 text-sm sm:text-base">
              <Calendar className="w-4 h-4" /> {userProfile.joinedDate}
            </p>
            <p className="text-gray-400 flex items-center justify-center sm:justify-start gap-2 mt-1 text-sm sm:text-base">
              <Code2 className="w-4 h-4" /> {userProfile.email}
            </p>
            <p className="text-orange-400 flex items-center justify-center sm:justify-start gap-2 mt-1 text-sm sm:text-base">
              <Flame className="w-4 h-4" /> Credits: {userProfile.creditBalance}
            </p>
          </div>

          <div className="bg-orange-500 px-3 py-1 sm:px-4 sm:py-2 rounded-full text-xs sm:text-sm font-semibold">
            Online
          </div>
        </div>

        {/* STATS GRID */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
          <StatCard
            icon={<Clock />}
            label="Total Hours"
            value={stats.totalHours}
            sub="Learning in progress 🚀"
          />
          <StatCard
            icon={<Moon />}
            label="All-Nighters"
            value={stats.allNighters}
            sub="Keep hustling 🌙"
          />
          <StatCard
            icon={<Flame />}
            label="Current Streak"
            value={`${stats.streak} days`}
            sub="Stay consistent 🔥"
          />
        </div>

        {/* TABS */}
        <div className="flex flex-wrap justify-center sm:justify-start gap-2 mb-6">
          {["overview", "activity", "stats"].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-4 sm:px-6 py-2 sm:py-3 rounded-lg font-medium transition-all text-sm sm:text-base ${
                activeTab === tab
                  ? "bg-gray-800 text-white"
                  : "text-gray-400 hover:text-white hover:bg-gray-800/50"
              }`}
            >
              {tab.charAt(0).toUpperCase() + tab.slice(1)}
            </button>
          ))}
        </div>

        {/* MAIN SECTION */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* ACTIVITY SECTION */}
          <div className="lg:col-span-2 bg-gray-800/50 rounded-2xl p-4 sm:p-6 border border-gray-700/50">
            <div className="flex flex-col sm:flex-row sm:items-center gap-3 mb-4">
              <Calendar className="w-5 h-5 text-orange-500" />
              <h2 className="text-lg sm:text-xl font-bold">Activity Overview</h2>
            </div>
            <p className="text-gray-400 text-sm sm:text-base mb-6">
              Search activity (last 30 days)
            </p>

            <div className="space-y-2 overflow-x-auto pb-2">
              {heatmapData.map((row) => (
                <div key={row.day} className="flex items-center gap-3 min-w-[400px] sm:min-w-full">
                  <span className="text-xs text-gray-400 w-8">{row.day}</span>
                  <div className="flex gap-1 flex-1">
                    {row.values.map((value, idx) => (
                      <div
                        key={idx}
                        className={`flex-1 aspect-square rounded ${getHeatmapColor(
                          value
                        )} transition-all hover:scale-110 cursor-pointer`}
                        title={`${(value * 5).toFixed(1)} hours`}
                      ></div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* RIGHT SIDEBAR */}
          <div className="space-y-6">
            <div className="bg-gray-800/50 rounded-2xl p-4 sm:p-6 border border-gray-700/50">
              <h3 className="text-base sm:text-lg font-bold mb-4">
                Daily Stats
              </h3>
              <DailyStat
                label="Peak Day"
                value={stats.peakDay}
                icon={<Zap />}
                note="Most productive"
              />
              <DailyStat
                label="Active Days"
                value={stats.activeDays}
                note="Keep up the momentum ⚡"
              />
              <DailyStat
                label="Longest Session"
                value={`${stats.longestSession}h`}
                icon={<Coffee />}
                note="Focused energy!"
              />
            </div>

            <div className="bg-gradient-to-br from-orange-500/10 to-pink-500/10 rounded-2xl p-4 sm:p-6 border border-orange-500/20">
              <h3 className="text-base sm:text-lg font-bold mb-4">
                Weekly Insights
              </h3>
              <Insight
                label="This Week"
                value={`${stats.weekly.current}h`}
                color="text-orange-400"
              />
              <Insight label="Last Week" value={`${stats.weekly.last}h`} />
              <Insight
                label="Growth"
                value={`+${stats.weekly.growth}%`}
                icon={<TrendingUp />}
                color="text-green-400"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Helper Components
const StatCard = ({ icon, label, value, sub }) => (
  <div className="bg-gray-800/50 rounded-2xl p-4 sm:p-6 border border-gray-700/50 text-center sm:text-left">
    <div className="flex justify-center sm:justify-start items-center gap-3 text-orange-500 mb-2 sm:mb-3">
      {icon}
      <span className="text-sm sm:text-base font-medium">{label}</span>
    </div>
    <div className="text-3xl sm:text-4xl font-bold mb-1 sm:mb-2">{value}</div>
    <div className="text-green-400 text-xs sm:text-sm">{sub}</div>
  </div>
);

const DailyStat = ({ label, value, icon, note }) => (
  <div className="mb-4">
    <div className="flex justify-between items-center mb-1">
      <span className="text-gray-400 text-sm sm:text-base">{label}</span>
      <span className="font-bold text-sm sm:text-base">{value}</span>
    </div>
    <div className="flex items-center gap-2 text-xs sm:text-sm text-orange-400">
      {icon}
      <span>{note}</span>
    </div>
  </div>
);

const Insight = ({ label, value, icon, color }) => (
  <div className="flex justify-between items-center pt-2 border-t border-gray-700 text-sm sm:text-base">
    <span className="text-gray-300">{label}</span>
    <span className={`font-bold flex items-center gap-1 ${color}`}>
      {icon} {value}
    </span>
  </div>
);

export default UserProfile;
