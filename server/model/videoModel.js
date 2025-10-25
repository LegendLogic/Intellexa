import mongoose from "mongoose";

const RecommandVideoSchema = new mongoose.Schema(
  {
    id: {
      type: String,
      required: true, // ✅ correct spelling: "required"
    },
    title: {
      type: String, // ✅ use String, not [String], unless it's meant to be an array
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    url: {
      type: String,
      required: true,
    },
    color: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
    duration: {
      type: String,
      required: true,
    },
    level: {
      type: [String], // ✅ keep as array if you plan to have multiple levels
      required: true,
    },
    instructor: { // ✅ fixed spelling ("instructure" → "instructor")
      type: [String],
      required: true,
    },
    complete: {
      type: Boolean,
      default: false,
    },
    recommendations: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

//
// 🔹 STATIC METHOD: Get Recommendations for a video
//
RecommandVideoSchema.statics.getRecommendations = async function (videoId) {
  const currentVideo = await this.findOne({ id: videoId });
  if (!currentVideo) return [];

  // Example logic: find videos from the same category but exclude the current one
  return this.find({
    id: { $ne: videoId },
    category: currentVideo.category,
  }).limit(5);
};

//
// 🔹 STATIC METHOD: Calculate Progress (based on all videos)
//
RecommandVideoSchema.statics.calculateProgress = async function () {
  const totalVideos = await this.countDocuments();
  const completedCount = await this.countDocuments({ complete: true });

  const progressPercentage = totalVideos
    ? Math.round((completedCount / totalVideos) * 100)
    : 0;

  return { completedCount, totalVideos, progressPercentage };
};

export default mongoose.model("RecommandVideo", RecommandVideoSchema);
