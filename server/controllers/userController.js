import User from "../model/userModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import RecommandVideo from "../model/videoModel.js";
import mongoose from "mongoose"; 

// ================== REGISTER ==================
const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res
        .status(400)
        .json({ success: false, message: "Missing details" });
    }

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res
        .status(400)
        .json({ success: false, message: "User already exists" });
    }

    // Handle uploaded image
    let imagePath = "";
    if (req.file) {
      imagePath = `/uploads/${req.file.filename}`;
    } else {
      imagePath = "/uploads/default-avatar.png"; // fallback
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create new user
    const newUser = new User({
      name,
      email,
      password: hashedPassword,
      creditBalance: 5, // default
      image: imagePath,
    });

    const user = await newUser.save();

    // Generate JWT token
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });

    return res.status(201).json({
      success: true,
      token,
      user: {
        name: user.name,
        email: user.email,
        image: user.image,
        creditBalance: user.creditBalance,
      },
    });
  } catch (error) {
    console.error("Register error:", error);
    return res.status(500).json({ success: false, message: error.message });
  }
};

// ================== LOGIN ==================
const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Find user
    const user = await User.findOne({ email });
    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User does not exist" });
    }

    // Check password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res
        .status(401)
        .json({ success: false, message: "Invalid credentials" });
    }

    // Generate JWT token
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });

    return res.status(200).json({
      success: true,
      token,
      user: {
        name: user.name,
        email: user.email,
        image: user.image,
        creditBalance: user.creditBalance,
      },
    });
  } catch (error) {
    console.error("Login error:", error);
    return res.status(500).json({ success: false, message: error.message });
  }
};

// ================== GET USER PROFILE ==================
const getUserProfile = async (req, res) => {
  try {
    const userId = req.user._id;

    const user = await User.findById(userId).select(
      "name email image creditBalance completedVideos joinedDate"
    );

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // ✅ Convert Map to object (if needed)
    const completedVideos = Object.fromEntries(user.completedVideos || []);

    // ✅ Count completed videos
    const completedCount = Object.values(completedVideos).filter(v => v === true).length;

    // ✅ Format joinedDate: "29 Oct 2025"
    const joinedDate = user.joinedDate
      ? new Date(user.joinedDate).toLocaleDateString("en-GB", {
          day: "2-digit",
          month: "short",
          year: "numeric",
        })
      : null;

    return res.status(200).json({
      name: user.name,
      email: user.email,
      image: user.image,
      creditBalance: user.creditBalance,
      completedVideos,
      completedCount,
      joinedDate, // e.g. "29 Oct 2025"
    });
  } catch (error) {
    console.error("Get profile error:", error);
    return res.status(500).json({ message: "Server error" });
  }
};



// const imageUpload =  await cloudinary.uploader.upload(imageFile.path,{resource_type:'image'})

// ================== GET ALL USERS ==================
const getAllUsers = async (req, res) => {
  try {
    const users = await User.find().select("-password");
    return res.status(200).json({ success: true, users });
  } catch (error) {
    console.error("Get all users error:", error);
    return res.status(500).json({ message: "Server error" });
  }
};

// ================== ADD USER POINTS ==================
const addUserPoints = async (req, res) => {
  try {
    const userId = req.user._id;
    const user = await User.findById(userId);

    if (!user)
      return res.status(404).json({ success: false, message: "User not found" });

    user.creditBalance = (user.creditBalance || 0) + 40;
    await user.save();

    return res.status(200).json({
      success: true,
      message: "Points added successfully",
      creditBalance: user.creditBalance,
    });
  } catch (error) {
    console.error("Add points error:", error);
    return res.status(500).json({ success: false, message: "Server error" });
  }
};

// ================== REMOVE USER POINTS ==================
const removeUserPoints = async (req, res) => {
  try {
    const userId = req.user._id;
    const user = await User.findById(userId);

    if (!user)
      return res.status(404).json({ success: false, message: "User not found" });

    user.creditBalance = Math.max(0, user.creditBalance - 40);
    await user.save();

    return res.status(200).json({
      success: true,
      message: "Points deducted successfully",
      creditBalance: user.creditBalance,
    });
  } catch (error) {
    console.error("Remove points error:", error);
    return res.status(500).json({ success: false, message: "Server error" });
  }
};

// ================== COMPLETE VIDEO ==================
const completedVideo = async (req, res) => {
  try {
    const userId = req.user._id;
    const { videoId } = req.body;

    // ✅ Validate input
    if (!videoId) {
      return res.status(400).json({
        success: false,
        message: "videoId is required",
      });
    }

    // ✅ Find user
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    // ✅ Find video
    const video = await RecommandVideo.findById(videoId);
    if (!video) {
      return res.status(404).json({
        success: false,
        message: "Video not found",
      });
    }

    // ✅ Initialize completedVideos map if not present
    if (!user.completedVideos) {
      user.completedVideos = new Map();
    }

    // ✅ Mark video as completed only if not already done
    if (!user.completedVideos.get(videoId)) {
      user.completedVideos.set(videoId, true);
      await user.save();
    }

    // ✅ Calculate progress
    const totalVideos = await RecommandVideo.countDocuments();
    const completedCount = Array.from(user.completedVideos.values()).filter(Boolean).length;
    const progressPercentage = totalVideos
      ? Math.round((completedCount / totalVideos) * 100)
      : 0;

    // ✅ Return response
    return res.status(200).json({
      success: true,
      message: `✅ Video "${video.title}" marked as completed.`,
      completedVideos: Object.fromEntries(user.completedVideos),
      progress: {
        completedCount,
        totalVideos,
        progressPercentage,
      },
    });

  } catch (error) {
    console.error("❌ Complete video error:", error);
    return res.status(500).json({
      success: false,
      message: "Server error while marking video as completed.",
    });
  }
};


const updateStreak = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    const today = new Date().toDateString();
    const lastActive = user.lastActiveDate ? new Date(user.lastActiveDate).toDateString() : null;

    if (lastActive === today) {
      return res.status(200).json({ success: true, message: "Already counted for today" });
    }

    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);

    if (lastActive === yesterday.toDateString()) {
      user.currentStreak += 1;
    } else {
      user.currentStreak = 1;
    }

    user.longestStreak = Math.max(user.longestStreak, user.currentStreak);
    user.lastActiveDate = new Date();

    await user.save();
    res.status(200).json({
      success: true,
      currentStreak: user.currentStreak,
      longestStreak: user.longestStreak,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: "Failed to update streak" });
  }
};


const resetProgress = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    user.points = 0;
    user.creditBalance = 5;
    user.completedVideos = {};
    user.totalHours = 0;
    user.currentStreak = 0;
    user.longestStreak = 0;

    await user.save();
    res.status(200).json({ success: true, message: "Progress reset successfully" });
  } catch (error) {
    res.status(500).json({ success: false, message: "Failed to reset progress" });
  }
};

 const deleteAccount = async (req, res) => {
  try {
    const { password } = req.body;

    // ✅ Ensure user is authenticated (req.user is set by auth middleware)
    const user = await User.findById(req.user._id);
    if (!user) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    // ✅ Optional: Require password confirmation before deletion
    if (!password) {
      return res.status(400).json({ success: false, message: "Password is required for deletion" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ success: false, message: "Incorrect password" });
    }

    // ✅ Delete user account
    await User.findByIdAndDelete(req.user._id);

    res.status(200).json({
      success: true,
      message: "Account deleted successfully",
    });
  } catch (error) {
    console.error("Error deleting account:", error);
    res.status(500).json({ success: false, message: "Failed to delete account" });
  }
};




const updateActivityStats = async (req, res) => {
  try {
    const { hoursToday } = req.body; // e.g., from frontend tracker
    const user = await User.findById(req.user._id);

    user.totalHours += hoursToday;
    user.dailyAverage = (user.totalHours / 30).toFixed(1);
    user.weeklyStats.thisWeek += hoursToday;

    await user.save();
    res.status(200).json({ success: true, message: "Stats updated", user });
  } catch (error) {
    res.status(500).json({ success: false, message: "Failed to update stats" });
  }
};


const updateProfile = async (req, res) => {
  try {
    const { name, email } = req.body;

    // Find current user
    const user = await User.findById(req.user._id);
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    // ✅ Update name if provided
    if (name && name.trim().length > 0) {
      user.name = name.trim();
    }

    // ✅ Update email if provided and not already taken by another user
    if (email && email.trim().length > 0 && email !== user.email) {
      const existingEmail = await User.findOne({ email: email.trim() });
      if (existingEmail) {
        return res.status(400).json({
          success: false,
          message: "Email is already in use by another account",
        });
      }
      user.email = email.trim();
    }

    // ✅ Handle profile image upload (Cloudinary)
    if (req.file && req.file.path) {
      user.image = req.file.path; // Cloudinary provides secure URL
    }

    await user.save();

    return res.status(200).json({
      success: true,
      message: "Profile updated successfully",
      user: {
        name: user.name,
        email: user.email,
        image: user.image,
        creditBalance: user.creditBalance,
      },
    });
  } catch (error) {
    console.error("Update Profile Error:", error);
    res.status(500).json({
      success: false,
      message: "Profile update failed. Try again later.",
    });
  }
};





const redeemCredits = async (req, res) => {
  try {
    const { amount } = req.body;
    const user = await User.findById(req.user._id);
    if (user.creditBalance < amount)
      return res.status(400).json({ success: false, message: "Insufficient credits" });

    user.creditBalance -= amount;
    await user.save();
    res.status(200).json({
      success: true,
      message: "Credits redeemed successfully",
      remaining: user.creditBalance,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: "Redeem failed" });
  }
};

 // Make sure you have this model imported

// ------------------------------------------------------
// 📘 Get User Profile — Returns all user details
// ------------------------------------------------------
// 📘 Get User Profile (Detailed by ID)
const getUserProfileInDetails = async (req, res) => {
  try {
    const userId = req.params.id;

    // ✅ Validate user ID
    if (!userId || !mongoose.Types.ObjectId.isValid(userId)) {
      return res.status(400).json({ success: false, message: "Invalid user ID" });
    }

    const user = await User.findById(userId).select("-password");
    if (!user) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    // ✅ Prepare completed videos
    const completedVideos = user.completedVideos || {};
    const allDates = Object.keys(completedVideos);

    // ✅ Initialize default stats
    let totalHours = 0;
    let todayHours = 0;
    let currentStreak = user.currentStreak || 0;
    let longestStreak = user.longestStreak || 0;

    // ✅ Get today and yesterday
    const today = new Date().toISOString().split("T")[0];
    const yesterday = new Date(Date.now() - 86400000).toISOString().split("T")[0];

    if (allDates.length > 0) {
      // ✅ Calculate total hours
      totalHours = Object.values(completedVideos).reduce((sum, val) => {
        const num = parseFloat(val);
        return sum + (isNaN(num) ? 0 : num);
      }, 0);

      // ✅ Sort dates ascending
      const sortedDates = allDates
        .map((d) => new Date(d.split("T")[0]))
        .sort((a, b) => a - b);

      // ✅ Calculate base streak from past data
      let streak = 1;
      let longest = 1;

      for (let i = 1; i < sortedDates.length; i++) {
        const prev = sortedDates[i - 1];
        const curr = sortedDates[i];
        const diffDays = Math.round((curr - prev) / (1000 * 60 * 60 * 24));
        if (diffDays === 1) {
          streak++;
          longest = Math.max(longest, streak);
        } else if (diffDays > 1) {
          streak = 1;
        }
      }

      currentStreak = streak;
      longestStreak = longest;
      todayHours = parseFloat(completedVideos[today]) || 0;
    }

    // ✅ Handle login streak logic
    const lastLoginDate = user.lastLogin
      ? new Date(user.lastLogin).toISOString().split("T")[0]
      : null;

    // If logged in next day → streak++
    if (lastLoginDate && lastLoginDate === yesterday) {
      currentStreak += 1;
      longestStreak = Math.max(longestStreak, currentStreak);
    }
    // If missed a day → reset streak
    else if (lastLoginDate && lastLoginDate !== today) {
      const diffDays = Math.round(
        (new Date(today) - new Date(lastLoginDate)) / (1000 * 60 * 60 * 24)
      );
      if (diffDays > 1) currentStreak = 1;
    }

    // ✅ Update user record in DB
    user.lastLogin = new Date();
    user.currentStreak = currentStreak;
    user.longestStreak = longestStreak;
    await user.save();

    // ✅ Format joined date
    const formattedJoinedDate = user.joinedDate
      ? new Date(user.joinedDate).toLocaleDateString("en-GB", {
          day: "2-digit",
          month: "long",
          year: "numeric",
        })
      : "Unknown";

    // ✅ Response
    res.status(200).json({
      success: true,
      message: "User profile fetched successfully",
      data: {
        _id: user._id,
        name: user.name,
        email: user.email,
        profileImage: user.profileImage,
        points: user.points,
        creditBalance: user.creditBalance,
        totalHours: Number(totalHours || 0).toFixed(1),
        todayHours: Number(todayHours || 0).toFixed(1),
        currentStreak,
        longestStreak,
        completedVideos: Object.keys(completedVideos).length,
        joinedDate: formattedJoinedDate,
        lastLogin: user.lastLogin,
        createdAt: user.createdAt,
        updatedAt: user.updatedAt,
      },
    });
  } catch (error) {
    console.error("❌ Error fetching user profile:", error.message);
    res.status(500).json({
      success: false,
      message: "Error fetching user profile",
      error: error.message,
    });
  }
};






export {
  registerUser,
  loginUser,
  getUserProfile,
  getAllUsers,
  addUserPoints,
  removeUserPoints,
  completedVideo,
  updateStreak,
  resetProgress,
  updateActivityStats,
  updateProfile,
  redeemCredits,
  deleteAccount,
  getUserProfileInDetails
};
