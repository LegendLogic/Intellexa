import React, { useEffect, useState } from "react";
import { User, Mail, Trophy, Calendar, TrendingUp, Award, Target, Activity, Star, Video, FileQuestion, Edit, Trash2, X, Save } from "lucide-react";
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const UserDashboard = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [currentUser, setCurrentUser] = useState(null);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [formData, setFormData] = useState({ name: "", email: "" });
  const [deletePassword, setDeletePassword] = useState("");
  const [actionLoading, setActionLoading] = useState(false);

  const backendUrl = import.meta.env.VITE_BACKEND_URL || "http://localhost:4000";

  // Fetch User Profile
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          setError("You are not logged in.");
          toast.error("You are not logged in. Please login to continue.");
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
            toast.error("Session expired. Please login again.");
          } else {
            throw new Error("Failed to load profile.");
          }
          setLoading(false);
          return;
        }

        const data = await response.json();
        const userData = data?.user || data;
        setCurrentUser(userData);
        setFormData({
          name: userData.name || "",
          email: userData.email || "",
          joinedDate:currentUser?.joinedDate ||"",

        });



        localStorage.setItem("user", JSON.stringify(userData));
        toast.success(`Welcome back, ${userData.name?.split(" ")[0] || "User"}!`);
      } catch (err) {
        console.error("Error fetching user profile:", err);
        setError(err.message || "Failed to load profile.");
        toast.error(err.message || "Failed to load profile.");
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, [backendUrl]);

  // Update Profile Function
  const updateProfile = async () => {
    if (!formData.name.trim() || !formData.email.trim()) {
      toast.warning("Please fill in all required fields");
      return;
    }

    setActionLoading(true);
    const updateToast = toast.loading("Updating your profile...");

    try {
      const token = localStorage.getItem("token");

      if (!token) {
        toast.update(updateToast, {
          render: "Authentication token not found. Please login again.",
          type: "error",
          isLoading: false,
          autoClose: 3000
        });
        return;
      }

      const response = await axios.put(
        `${backendUrl}/api/user/profile-updates`,
        formData,
        {
          headers: {
            "Authorization": `Bearer ${token}`,
            "Content-Type": "application/json"
          }
        }
      );

      if (response.data) {
        const updatedUser = response.data.user || response.data;
        setCurrentUser(updatedUser);
        localStorage.setItem("user", JSON.stringify(updatedUser));

        toast.update(updateToast, {
          render: "Profile updated successfully! 🎉",
          type: "success",
          isLoading: false,
          autoClose: 3000
        });

        setShowEditModal(false);
      }

    } catch (error) {
      console.error("Error updating profile:", error);

      let errorMessage = "Failed to update profile";
      if (error.response) {
        errorMessage = error.response.data.message || errorMessage;
      } else if (error.request) {
        errorMessage = "No response from server. Please check your connection.";
      } else {
        errorMessage = error.message || "An unexpected error occurred";
      }

      toast.update(updateToast, {
        render: errorMessage,
        type: "error",
        isLoading: false,
        autoClose: 3000
      });
    } finally {
      setActionLoading(false);
    }
  };

  // Delete Account Function
  const deleteAccount = async () => {
    if (!deletePassword.trim()) {
      toast.warning("Please enter your password to confirm deletion");
      return;
    }

    const confirmDelete = window.confirm(
      "⚠️ Are you absolutely sure? This action CANNOT be undone. Your account and all data will be permanently deleted."
    );

    if (!confirmDelete) return;

    setActionLoading(true);
    const deleteToast = toast.loading("Deleting your account...");

    try {
      const token = localStorage.getItem("token");

      if (!token) {
        toast.update(deleteToast, {
          render: "Authentication token not found. Please login again.",
          type: "error",
          isLoading: false,
          autoClose: 3000
        });
        return;
      }

      const response = await axios.delete(
        `${backendUrl}/api/user/delete`,
        {
          headers: {
            "Authorization": `Bearer ${token}`,
            "Content-Type": "application/json"
          },
          data: { password: deletePassword }
        }
      );

      if (response.data) {
        localStorage.removeItem("token");
        localStorage.removeItem("user");

        toast.update(deleteToast, {
          render: "Account deleted successfully. Redirecting to login...",
          type: "success",
          isLoading: false,
          autoClose: 2000
        });

        setTimeout(() => {
          window.location.href = "/login";
        }, 2000);
      }

    } catch (error) {
      console.error("Error deleting account:", error);

      let errorMessage = "Failed to delete account";
      if (error.response) {
        errorMessage = error.response.data.message || errorMessage;
      } else if (error.request) {
        errorMessage = "No response from server. Please check your connection.";
      } else {
        errorMessage = error.message || "An unexpected error occurred";
      }

      toast.update(deleteToast, {
        render: errorMessage,
        type: "error",
        isLoading: false,
        autoClose: 3000
      });
    } finally {
      setActionLoading(false);
    }
  };

  // Handle form input changes
  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  // Calculate completed videos count
  const calculateCompletedVideos = () => {
    if (!currentUser?.completedVideos) return 0;

    // Count all videos marked as true in completedVideos object
    const completed = Object.values(currentUser.completedVideos).filter(value => value === true).length;
    return completed;
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-purple-400 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-orange-600 text-lg">Loading your dashboard...</p>
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



  const completedVideosCount = calculateCompletedVideos();
  const completedQuizCount = currentUser?.completedQuizzes?.length || 0;

  return (
    <div
      className="min-h-screen p-4 md:p-6 pb-16"
      style={{
        background:
          "radial-gradient(circle 600px at 60% 20%, rgba(249,115,22,0.25), transparent 70%), radial-gradient(circle 800px at 10% 80%, rgba(255,56,0,0.15), transparent 70%), #0e0b11",
      }}
    >
      {/* Toast Container */}
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={true}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />

      <div className="max-w-6xl mx-auto mt-8">
        {/* Header Section */}
        <div className="text-center mb-12">
          <div className="relative inline-block mb-4">
            <div className="w-24 mt-10 h-24 bg-orange-600 rounded-full flex items-center justify-center shadow-2xl shadow-purple-500/50">
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

          {/* Action Buttons */}
          <div className="flex gap-4 justify-center mt-6">
            <button
              onClick={() => setShowEditModal(true)}
              className="bg-orange-600 hover:bg-orange-700 text-white px-6 py-2 rounded-lg transition-all flex items-center gap-2 shadow-lg"
            >
              <Edit className="w-4 h-4" />
              Edit Profile
            </button>
            <button
              onClick={() => setShowDeleteModal(true)}
              className="bg-red-600 hover:bg-red-700 text-white px-6 py-2 rounded-lg transition-all flex items-center gap-2 shadow-lg"
            >
              <Trash2 className="w-4 h-4" />
              Delete Account
            </button>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mb-8">
          <Card icon={User} label="Full Name" value={currentUser?.name || "N/A"} color="blue" />
          <Card icon={Mail} label="Email" value={currentUser?.email || "N/A"} color="purple" />
          <Card icon={Trophy} label="Total Points" value={points.toLocaleString()} color="yellow" />
          <Card icon={Calendar} label="Member Since" value={currentUser?.joinedDate} color="green" />
          <Card icon={FileQuestion} label="Completed Quizzes" value={completedQuizCount} color="green" />
          <Card icon={Video} label="Completed Videos" value={completedVideosCount} color="green" />
        </div>

        {/* Progress Section */}
        <ProgressSection
          points={points}
          level={level}
          nextLevelPoints={nextLevelPoints}
          progress={progress}
          creditBalance={currentUser?.creditBalance || 0}
        />

        {/* Achievements Section */}
        <Achievements points={points} />

        {/* Quick Stats */}
        <QuickStats
          points={points}
          level={level}
          progress={progress}
          completedVideos={completedVideosCount}
          completedQuizzes={completedQuizCount}
        />
      </div>

      {/* Footer */}
      <div className="text-center mt-12">
        <p className="text-purple-300/60 text-sm">
          © {new Date().getFullYear()} Intellexa Dashboard • Crafted with passion
        </p>
      </div>

      {/* Edit Profile Modal */}
      {showEditModal && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-slate-900 border border-orange-500/30 rounded-2xl p-8 max-w-md w-full shadow-2xl">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-orange-500 flex items-center gap-2">
                <Edit className="w-6 h-6" />
                Edit Profile
              </h2>
              <button
                onClick={() => setShowEditModal(false)}
                className="text-gray-400 hover:text-white transition-colors"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <label className="text-purple-300 text-sm mb-2 block">Full Name</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className="w-full bg-slate-800 border border-purple-500/30 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-orange-500"
                  placeholder="Enter your name"
                />
              </div>

              <div>
                <label className="text-purple-300 text-sm mb-2 block">Email</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="w-full bg-slate-800 border border-purple-500/30 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-orange-500"
                  placeholder="Enter your email"
                />
              </div>

              <button
                onClick={updateProfile}
                disabled={actionLoading}
                className="w-full bg-orange-600 hover:bg-orange-700 disabled:bg-gray-600 text-white px-6 py-3 rounded-lg transition-all flex items-center justify-center gap-2 font-semibold"
              >
                {actionLoading ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    Updating...
                  </>
                ) : (
                  <>
                    <Save className="w-5 h-5" />
                    Save Changes
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Delete Account Modal */}
      {showDeleteModal && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-slate-900 border border-red-500/30 rounded-2xl p-8 max-w-md w-full shadow-2xl">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-red-500 flex items-center gap-2">
                <Trash2 className="w-6 h-6" />
                Delete Account
              </h2>
              <button
                onClick={() => setShowDeleteModal(false)}
                className="text-gray-400 hover:text-white transition-colors"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            <div className="bg-red-500/10 border border-red-500/30 rounded-lg p-4 mb-6">
              <p className="text-red-300 text-sm">
                ⚠️ <strong>Warning:</strong> This action cannot be undone. All your data, progress, and achievements will be permanently deleted.
              </p>
            </div>

            <div className="space-y-4">
              <div>
                <label className="text-purple-300 text-sm mb-2 block">Enter your password to confirm</label>
                <input
                  type="password"
                  value={deletePassword}
                  onChange={(e) => setDeletePassword(e.target.value)}
                  className="w-full bg-slate-800 border border-red-500/30 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-red-500"
                  placeholder="Enter password"
                />
              </div>

              <button
                onClick={deleteAccount}
                disabled={actionLoading}
                className="w-full bg-red-600 hover:bg-red-700 disabled:bg-gray-600 text-white px-6 py-3 rounded-lg transition-all flex items-center justify-center gap-2 font-semibold"
              >
                {actionLoading ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    Deleting...
                  </>
                ) : (
                  <>
                    <Trash2 className="w-5 h-5" />
                    Delete My Account
                  </>
                )}
              </button>

              <button
                onClick={() => setShowDeleteModal(false)}
                className="w-full bg-slate-700 hover:bg-slate-600 text-white px-6 py-3 rounded-lg transition-all"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserDashboard;

// Card Component
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
          <p className="text-white text-sm mb-1">{label}</p>
          <p className="text-red-400 font-semibold truncate">{value}</p>
        </div>
      </div>
    </div>
  );
};

// Progress Section Component
const ProgressSection = ({ points, level, nextLevelPoints, progress, creditBalance }) => (
  <div className="bg-gradient-to-br from-purple-500/20 to-orange-400/20 backdrop-blur-md border border-purple-500/30 rounded-2xl p-8 mb-8">
    <div className="flex items-center justify-between mb-4">
      <div>
        <h2 className="text-2xl font-bold text-orange-600 mb-1">Level {level}</h2>
        <p className="text-purple-200">
          {points} / {nextLevelPoints} points to Level {level + 1}
        </p>
      </div>
      <div className="text-right">
        <p className="text-purple-300 text-sm">Credit Balance</p>
        <p className="text-3xl font-bold text-orange-600">{creditBalance}</p>
      </div>
    </div>
    <div className="w-full bg-slate-800/50 rounded-full h-4 overflow-hidden">
      <div
        className="h-full bg-gradient-to-r from-orange-500 to-orange-500 rounded-full transition-all duration-500 flex items-center justify-end pr-2"
        style={{ width: `${progress}%` }}
      >
        {progress > 10 && <span className="text-xs text-white font-bold">{Math.round(progress)}%</span>}
      </div>
    </div>
  </div>
);

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
      <h2 className="text-2xl font-bold text-orange-400 mb-6 flex items-center gap-2">
        <Award className="w-6 h-6 text-yellow-400" />
        Achievements
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {achievements.map((achievement, idx) => {
          const colors = colorClasses[achievement.color] || colorClasses.blue;
          return (
            <div
              key={idx}
              className={`p-4 rounded-xl border-2 transition-all ${achievement.unlocked
                ? `${colors.bg} ${colors.border}`
                : "bg-slate-800/30 border-slate-700/50 opacity-50"
                }`}
            >
              <div className="flex flex-col items-center text-center">
                <div
                  className={`w-16 h-16 rounded-full flex items-center justify-center mb-3 ${achievement.unlocked ? colors.iconBg : "bg-slate-700/30"
                    }`}
                >
                  <achievement.icon className={`w-8 h-8 ${achievement.unlocked ? colors.text : "text-orange-500"}`} />
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

// Quick Stats Component
const QuickStats = ({ points, level, progress, completedVideos, completedQuizzes }) => (
  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
    <StatCard icon={TrendingUp} label="Current Level" value={level} color="purple" />
    <StatCard icon={Trophy} label="Total Points" value={points.toLocaleString()} color="yellow" />
    <StatCard icon={Video} label="Videos Completed" value={completedVideos} color="blue" />
    <StatCard icon={Target} label="Progress" value={`${Math.round(progress)}%`} color="green" />
  </div>
);

const StatCard = ({ icon: Icon, label, value, color }) => {
  const colorClasses = {
    purple: "text-purple-400",
    yellow: "text-yellow-400",
    green: "text-green-400",
    blue: "text-blue-400"
  };

  return (
    <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-xl p-6 text-center hover:bg-white/10 transition-all">
      <Icon className={`w-8 h-8 ${colorClasses[color] || "text-orange-400"} mx-auto mb-3`} />
      <p className="text-gray-400 text-sm mb-1">{label}</p>
      <p className="text-3xl font-bold text-orange-400">{value}</p>
    </div>
  );
};