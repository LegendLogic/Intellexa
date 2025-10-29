import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    image: { type: String, required: false, default: "" },
    joinedDate: { type: Date, default: Date.now },


    // 🧠 Points earned from quizzes, rewards, etc.
    points: { type: Number, default: 0 },

    // 💰 Credit balance (for quizzes, tools, etc.)
    creditBalance: { type: Number, default: 5 },

    // 🎥 Track completed videos or lessons
    completedVideos: {
      type: Map,
      of: Boolean, // true if video completed
      default: {},
    },

    completedVideoCount: {
    type: Number,
    default: 0,
  },


    // 📅 Profile & activity data
    joinedDate: { type: Date, default: Date.now },

    
    // 📝 Notes reference
    notes: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Note",
      },
    ],


    // 🔥 Daily streak tracking
    currentStreak: { type: Number, default: 0 },
    longestStreak: { type: Number, default: 0 },
    lastActiveDate: { type: Date, default: null },

    // ⏱️ Total coding hours / learning time
    totalHours: { type: Number, default: 0 },
    dailyAverage: { type: Number, default: 0 },

    // 🏆 Weekly stats
    weeklyStats: {
      thisWeek: { type: Number, default: 0 },
      lastWeek: { type: Number, default: 0 },
      growth: { type: Number, default: 0 },
    },


    // ⚙️ Optional: user role or settings
    role: { type: String, enum: ["user", "admin"], default: "user" },
  },
  { timestamps: true }
);

export default mongoose.model("User", userSchema);
