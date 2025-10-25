import RecommandVideo from "../model/videoModel.js";

// @desc    Create (POST) a new recommended video
// @route   POST /api/recommand-videos
// @access  Public or Admin (depending on your setup)
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

    // Validation (optional but recommended)
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
      return res.status(400).json({ message: "All required fields must be provided." });
    }

    // Create new video document
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

    // Save to MongoDB
    const savedVideo = await newVideo.save();

    res.status(201).json({
      message: "Recommand video created successfully!",
      video: savedVideo,
    });
  } catch (error) {
    console.error("Error creating recommand video:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

export const getDashboardData = async (req, res) => {
  try {
    const recommendations = await RecommandVideo.getRecommendations(req.params.videoId);
    const progress = await RecommandVideo.calculateProgress();

    res.status(200).json({ recommendations, progress });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
export const getAllVideos = async (req, res) => {
  try {
    // Fetch all videos from MongoDB
    const videos = await RecommandVideo.find().lean();

    // Return response
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




