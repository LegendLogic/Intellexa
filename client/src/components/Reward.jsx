import React, { useState } from "react";
import { Trophy, Star, Zap, Calendar, Gift, Crown, Target, Award } from "lucide-react";

// Enhanced rewards data with status and progress
const rewardsData = [
  { 
    title: "First Login", 
    points: 50, 
    icon: "Zap", 
    color: "text-green-500",
    bgColor: "bg-green-50",
    status: "claimed",
    description: "Welcome to the platform!",
    date: "Oct 15, 2025"
  },
  { 
    title: "Daily Streak 7 Days", 
    points: 100, 
    icon: "Calendar", 
    color: "text-indigo-500",
    bgColor: "bg-indigo-50",
    status: "claimed",
    description: "7 consecutive days of activity",
    date: "Oct 16, 2025"
  },
  { 
    title: "Complete Game Level 1", 
    points: 75, 
    icon: "Target", 
    color: "text-yellow-500",
    bgColor: "bg-yellow-50",
    status: "available",
    description: "Finish the first level",
    progress: 85
  },
  { 
    title: "Top 3 Leaderboard", 
    points: 150, 
    icon: "Trophy", 
    color: "text-orange-500",
    bgColor: "bg-orange-50",
    status: "locked",
    description: "Reach top 3 in any category",
    requirement: "Complete 5 games"
  },
  { 
    title: "Premium Upgrade", 
    points: 200, 
    icon: "Crown", 
    color: "text-purple-500",
    bgColor: "bg-purple-50",
    status: "locked",
    description: "Upgrade to premium membership",
    requirement: "Level 10 required"
  },
  { 
    title: "Invite 5 Friends", 
    points: 125, 
    icon: "Gift", 
    color: "text-pink-500",
    bgColor: "bg-pink-50",
    status: "available",
    description: "Share the fun with friends",
    progress: 60
  },
];

const iconComponents = {
  Trophy, Star, Zap, Calendar, Gift, Crown, Target, Award
};

const Reward = () => {
  const [filter, setFilter] = useState("all");
  const [totalPoints] = useState(225);
  
  const filteredRewards = rewards => {
    if (filter === "all") return rewards;
    return rewards.filter(r => r.status === filter);
  };

  const claimReward = (index) => {
    // Simulate claiming a reward
    alert(`Claimed ${rewardsData[index].title}! +${rewardsData[index].points} points`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-pink-50 px-6 py-12">
      <div className="max-w-6xl mx-auto">
        {/* Header Section */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full mb-4">
            <Star className="w-10 h-10 text-white" fill="white" />
          </div>
          <h1 className="text-5xl font-bold text-gray-800 mb-3">Your Rewards</h1>
          <p className="text-gray-600 text-lg mb-6">
            Keep earning points, unlock achievements, and climb the ranks! 🎉
          </p>
          
          {/* Points Summary Card */}
          <div className="inline-block bg-white rounded-2xl shadow-lg px-8 py-4 border-2 border-purple-200">
            <div className="flex items-center gap-3">
              <Award className="w-8 h-8 text-purple-500" />
              <div className="text-left">
                <p className="text-sm text-gray-500">Total Points</p>
                <p className="text-3xl font-bold text-purple-600">{totalPoints}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Filter Tabs */}
        <div className="flex justify-center gap-3 mb-10 flex-wrap">
          {[
            { key: "all", label: "All Rewards" },
            { key: "claimed", label: "Claimed" },
            { key: "available", label: "Available" },
            { key: "locked", label: "Locked" }
          ].map(tab => (
            <button
              key={tab.key}
              onClick={() => setFilter(tab.key)}
              className={`px-6 py-2 rounded-full font-medium transition-all duration-300 ${
                filter === tab.key
                  ? "bg-purple-600 text-white shadow-lg scale-105"
                  : "bg-white text-gray-700 hover:bg-gray-100 shadow"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Rewards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredRewards(rewardsData).map((reward, index) => {
            const IconComponent = iconComponents[reward.icon] || Star;
            
            return (
              <div
                key={index}
                className={`bg-white rounded-2xl p-6 shadow-md hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 border-2 ${
                  reward.status === "claimed" 
                    ? "border-green-200" 
                    : reward.status === "locked" 
                    ? "border-gray-200 opacity-75" 
                    : "border-purple-200"
                }`}
              >
                {/* Status Badge */}
                <div className="flex justify-between items-start mb-4">
                  <div className={`${reward.bgColor} p-3 rounded-xl`}>
                    <IconComponent className={`w-8 h-8 ${reward.color}`} />
                  </div>
                  <span className={`text-xs font-semibold px-3 py-1 rounded-full ${
                    reward.status === "claimed" 
                      ? "bg-green-100 text-green-700"
                      : reward.status === "available"
                      ? "bg-blue-100 text-blue-700"
                      : "bg-gray-100 text-gray-600"
                  }`}>
                    {reward.status.toUpperCase()}
                  </span>
                </div>

                {/* Reward Info */}
                <h3 className="text-xl font-bold text-gray-800 mb-2">{reward.title}</h3>
                <p className="text-sm text-gray-500 mb-3">{reward.description}</p>
                
                {/* Points */}
                <div className="flex items-center gap-2 mb-4">
                  <Star className="w-5 h-5 text-yellow-500" fill="currentColor" />
                  <span className="text-lg font-bold text-gray-700">{reward.points} points</span>
                </div>

                {/* Progress Bar (for available rewards) */}
                {reward.progress && (
                  <div className="mb-4">
                    <div className="flex justify-between text-xs text-gray-600 mb-1">
                      <span>Progress</span>
                      <span>{reward.progress}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-gradient-to-r from-purple-500 to-pink-500 h-2 rounded-full transition-all duration-500"
                        style={{ width: `${reward.progress}%` }}
                      />
                    </div>
                  </div>
                )}

                {/* Requirement (for locked rewards) */}
                {reward.requirement && (
                  <div className="mb-4 p-2 bg-gray-50 rounded-lg">
                    <p className="text-xs text-gray-600">
                      🔒 {reward.requirement}
                    </p>
                  </div>
                )}

                {/* Date (for claimed rewards) */}
                {reward.date && (
                  <p className="text-xs text-gray-400 mb-3">Claimed on {reward.date}</p>
                )}

                {/* Action Button */}
                {reward.status === "available" && (
                  <button
                    onClick={() => claimReward(index)}
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

        {/* Empty State */}
        {filteredRewards(rewardsData).length === 0 && (
          <div className="text-center py-16">
            <Trophy className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <p className="text-gray-500 text-lg">No rewards found in this category</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Reward;