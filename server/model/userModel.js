import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: { 
      type: String, 
      required: true 
    },
    email: { 
      type: String, 
      required: true, 
      unique: true 
    },
    password: { 
      type: String, 
      required: true 
    },
    image:{
      type:String,
      require:true,
    },
    // 🧠 Points earned from quizzes, rewards, etc.
    points: { 
      type: Number, 
      default: 0 
    },

    // 💰 Credit balance (used in your React quiz system)
    creditBalance: { 
      type: Number, 
      default: 5 
    },

    // 🎥 Track completed videos or lessons
    completedVideos: {
      type: Map,
      of: Boolean, // true if video completed
      default: {},
    },
  },

  { timestamps: true }

);

// <img src={image? URL.createObjectURL(image):assets.upload_area} alt="" />

export default mongoose.model("User", userSchema);
