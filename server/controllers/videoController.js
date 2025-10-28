import RecommandVideo from "../model/videoModel.js";
import axios from "axios";



/* --------------------------------------------------
 📌 Create a new recommended video
-------------------------------------------------- */
export const createRecommandVideo = async (req, res) => {
  try {
    const {
      id,
      title,
      description,
      url,
      color,
      category,
      duration,
      level,
      instructor,
      complete,
      recommendations,
    } = req.body;

    // ✅ Validation
    if (
      !id ||
      !title ||
      !description ||
      !url ||
      !color ||
      !category ||
      !duration ||
      !level ||
      !instructor
    ) {
      return res.status(400).json({
        success: false,
        message: "All required fields must be provided.",
      });
    }

    // ✅ Create new video
    const newVideo = new RecommandVideo({
      id,
      title,
      description,
      url,
      color,
      category,
      duration,
      level,
      instructor,
      complete: complete || false,
      recommendations: recommendations || 0,
    });

    // ✅ Save to MongoDB
    const savedVideo = await newVideo.save();

    res.status(201).json({
      success: true,
      message: "Recommended video created successfully!",
      video: savedVideo,
    });
  } catch (error) {
    console.error("❌ Error creating recommended video:", error.message);
    res.status(500).json({ success: false, message: "Server error", error: error.message });
  }
};

/* --------------------------------------------------
 📊 Get dashboard data (recommendations & progress)
-------------------------------------------------- */
export const getDashboardData = async (req, res) => {
  try {
    const { videoId } = req.params;

    const recommendations = await RecommandVideo.getRecommendations(videoId);
    const progress = await RecommandVideo.calculateProgress();

    res.status(200).json({ success: true, recommendations, progress });
  } catch (error) {
    console.error("❌ Error fetching dashboard data:", error.message);
    res.status(500).json({ success: false, message: error.message });
  }
};

/* --------------------------------------------------
 🎬 Get all videos from MongoDB
-------------------------------------------------- */
export const getAllVideos = async (req, res) => {
  try {
    const videos = await RecommandVideo.find().lean();

    res.status(200).json({
      success: true,
      count: videos.length,
      data: videos,
    });
  } catch (error) {
    console.error("❌ Error fetching videos:", error.message);
    res.status(500).json({
      success: false,
      message: "Server error while fetching videos",
      error: error.message,
    });
  }
};

/* --------------------------------------------------
 🎥 Fetch YouTube videos dynamically
-------------------------------------------------- */
export const getVideos = async (req, res) => {
  try {
    const prompt = req.body?.prompt || req.query?.prompt; // ✅ Works for both

    if (!prompt || !prompt.trim()) {
      return res.status(400).json({
        success: false,
        message: "Please provide a valid prompt",
      });
    }

    const ytResp = await axios.get("https://www.googleapis.com/youtube/v3/search", {
      params: {
        part: "snippet",
        q: `${prompt} tutorial`,
        type: "video",
        maxResults: 3,
        key: process.env.YOUTUBE_API_KEY,
      },
    });

    const videos =
      ytResp.data.items?.map((item) => ({
        title: item.snippet.title,
        channel: item.snippet.channelTitle,
        thumbnail: item.snippet.thumbnails?.medium?.url,
        url: `https://www.youtube.com/watch?v=${item.id.videoId}`,
      })) || [];

    res.status(200).json({ success: true, videos });
  } catch (error) {
    console.warn("⚠️ YouTube API fetch failed:", error.message);
    res.status(500).json({
      success: false,
      message: "YouTube API error",
      error: error.message,
    });
  }
};

