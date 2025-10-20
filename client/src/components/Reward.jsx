import React, { useState, useEffect } from "react";
import axios from "axios";
import { Trophy, Star, Zap, Calendar, Gift, Crown, Target, Award } from "lucide-react";

const iconComponents = { Trophy, Star, Zap, Calendar, Gift, Crown, Target, Award };

const defaultRewardsData = [
  {
    title: "First Login",
    points: 40,
    icon: "Zap",
    color: "text-green-500",
    bgColor: "bg-green-50",
    description: "Welcome to the platform!",
    status: "available",
  },
  {
    title: "Daily Streak 7 Days",
    points: 40,
    icon: "Calendar",
    color: "text-indigo-500",
    bgColor: "bg-indigo-50",
    description: "7 consecutive days of activity",
    status: "locked",
    progress: 0,
    requirement: 7,
  },
  {
    title: "Invite 5 Friends",
    points: 40,
    icon: "Gift",
    color: "text-pink-500",
    bgColor: "bg-pink-50",
    description: "Share the fun with friends",
    status: "locked",
    requirement: "Invite 5 users to unlock",
  },
];

const Reward = () => {
  const [filter, setFilter] = useState("all");
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // ✅ Load rewards from localStorage (persistent state)
  const [rewards, setRewards] = useState(() => {
    const saved = localStorage.getItem("rewards");
    return saved ? JSON.parse(saved) : defaultRewardsData;
  });

  const backendUrl = import.meta.env.VITE_BACKEND_URL || "http://localhost:4000";

  // ✅ Fetch user profile
  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        setLoading(true);
        const token = localStorage.getItem("token");
        if (!token) {
          setError("User not logged in");
          setLoading(false);
          return;
        }

        const res = await axios.get(`${backendUrl}/api/user/profile`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setUser(res.data);
      } catch (err) {
        console.error(err);
        setError(err.response?.data?.message || "Failed to fetch profile");
      } finally {
        setLoading(false);
      }
    };

    fetchUserProfile();
  }, [backendUrl]);

  // ✅ Persist rewards to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem("rewards", JSON.stringify(rewards));
  }, [rewards]);

  // ✅ Claim Reward Function
  const claimReward = async (reward) => {
    if (!user) return;

    try {
      const token = localStorage.getItem("token");
      if (!token) return;

      const res = await axios.put(
        `${backendUrl}/api/user/addpoint`,
        { points: reward.points },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      // Update user's points locally
      setUser((prev) => ({
        ...prev,
        creditBalance: res.data.creditBalance || prev.creditBalance + reward.points,
      }));

      // Update rewards state
      const updatedRewards = rewards.map((r) =>
        r.title === reward.title ? { ...r, status: "claimed" } : r
      );

      // ✅ Persist updated rewards
      setRewards(updatedRewards);
      localStorage.setItem("rewards", JSON.stringify(updatedRewards));

      // ✅ Mark this reward claimed for this user
      localStorage.setItem(`claimed_${user._id}_${reward.title}`, "true");

      console.log(`✅ ${reward.title} claimed successfully`);
    } catch (err) {
      console.error(err);
      alert(err.response?.data?.message || "Failed to claim reward");
    }
  };

  // ✅ Auto-claim “First Login” but only once per user
  useEffect(() => {
    if (!user) return;

    const claimedKey = `claimed_${user._id}_First Login`;
    const alreadyClaimed = localStorage.getItem(claimedKey);

    // Prevent multiple auto-claims
    if (!alreadyClaimed) {
      const firstLoginReward = rewards.find((r) => r.title === "First Login");
      if (firstLoginReward && firstLoginReward.status === "available") {
        claimReward(firstLoginReward);
      }
    }
  }, [user, rewards]); // Wait for user + rewards loaded

  const filteredRewards =
    filter === "all" ? rewards : rewards.filter((r) => r.status === filter);

  return (
    <div className="min-h-screen mt-12 px-6 py-12"
    >
      <div>
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-orange-400 mb-3">Your Rewards</h1>
          <p className="text-orange-300 text-lg mb-6">
            Earn rewards as you progress and engage on the platform 
          </p>

          {loading ? (
            <p className="text-gray-500">Loading your profile...</p>
          ) : error ? (
            <p className="text-red-500">{error}</p>
          ) : user ? (
            <div className="inline-block  rounded-2xl shadow-lg px-8 py-4 border-2 border-purple-200">
              <div className="flex items-center gap-3">
                <Award className="w-8 h-8 text-orange-500" />
                <div className="text-left">
                  <p className="text-sm text-orange-400">Hello, {user.name}</p>
                  <p className="text-3xl font-bold text-orange-600">
                    {user.creditBalance} points
                  </p>
                </div>
              </div>
            </div>
          ) : (
            <p className="text-red-500">User data not available</p>
          )}
        </div>

        {/* Filter Buttons */}
        <div className="flex justify-center gap-3 mb-10 flex-wrap">
          {["all", "claimed", "available", "locked"].map((tab) => (
            <button
              key={tab}
              onClick={() => setFilter(tab)}
              className={`px-6 py-2 rounded-full font-medium transition-all duration-300 ${
                filter === tab
                  ? "bg-orange-600 text-white shadow-lg scale-105"
                  : "bg-white/20 text-white hover:bg-orange-400 shadow"
              }`}
            >
              {tab.charAt(0).toUpperCase() + tab.slice(1)}
            </button>
          ))}
        </div>

        {/* Rewards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredRewards.map((reward, index) => {
            const Icon = iconComponents[reward.icon] || Star;
            return (
              <div
                key={index}
                className={`bg-white/20 rounded-2xl p-6 shadow-md hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 border-2 ${
                  reward.status === "claimed"
                    ? "border-green-200"
                    : reward.status === "locked"
                    ? "border-gray-200 opacity-75"
                    : "border-purple-200"
                }`}
              >
                <div className="flex justify-between items-start mb-4">
                  <div className={`${reward.bgColor} p-3 rounded-xl`}>
                    <Icon className={`w-8 h-8 ${reward.color}`} />
                  </div>
                  <span
                    className={`text-xs font-semibold px-3 py-1 rounded-full ${
                      reward.status === "claimed"
                        ? "bg-green-100 text-green-700"
                        : reward.status === "available"
                        ? "bg-blue-100 text-blue-700"
                        : "bg-gray-100 text-gray-600"
                    }`}
                  >
                    {reward.status.toUpperCase()}
                  </span>
                </div>

                <h3 className="text-xl font-bold text-white mb-2">{reward.title}</h3>
                <p className="text-sm text-orange-700 mb-3">{reward.description}</p>

                {reward.status === "available" && (
                  <button
                    onClick={() => claimReward(reward)}
                    className="w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white font-semibold py-2 rounded-lg hover:from-purple-700 hover:to-pink-700 transition-all duration-300 shadow-md hover:shadow-lg"
                  >
                    Claim Reward
                  </button>
                )}

                {reward.status === "claimed" && (
                  <div className="w-full bg-green-100 text-green-700 font-semibold py-2 rounded-lg text-center">
                    ✓ Claimed
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Reward;
