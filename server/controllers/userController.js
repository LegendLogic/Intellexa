import User from "../model/userModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import RecommandVideo from "../model/videoModel.js";
import path from "path";
import fs from "fs";

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
      "name email image creditBalance completedVideos"
    );

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    return res.status(200).json({
      name: user.name,
      email: user.email,
      image: user.image,
      creditBalance: user.creditBalance,
      completedVideos: Object.fromEntries(user.completedVideos),
    });
  } catch (error) {
    console.error("Get profile error:", error);
    return res.status(500).json({ message: "Server error" });
  }
};

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

    if (!videoId)
      return res
        .status(400)
        .json({ success: false, message: "videoId is required" });

    const user = await User.findById(userId);
    if (!user)
      return res.status(404).json({ success: false, message: "User not found" });

    const video = await RecommandVideo.findById(videoId);
    if (!video)
      return res.status(404).json({ success: false, message: "Video not found" });

    // Mark video as completed
    user.completedVideos.set(videoId, true);
    await user.save();

    const totalVideos = await RecommandVideo.countDocuments();
    const completedCount = Array.from(user.completedVideos.values()).filter(Boolean)
      .length;
    const progressPercentage = totalVideos
      ? Math.round((completedCount / totalVideos) * 100)
      : 0;

    return res.status(200).json({
      success: true,
      message: `Video "${video.title}" marked as completed`,
      completedVideos: Object.fromEntries(user.completedVideos),
      progress: {
        completedCount,
        totalVideos,
        progressPercentage,
      },
    });
  } catch (error) {
    console.error("Complete video error:", error);
    return res.status(500).json({ success: false, message: "Server error" });
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
};
