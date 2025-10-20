import mongoose from "mongoose";

const QuizQuestion = new mongoose.Schema(
  {
    question: {
      type: String,
      required: true,
    },
    options: {
      type: [String], // Array of strings
      required: true,
    },
    answer: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      default: "general", // optional: e.g. "React", "JavaScript", etc.
    },
    points: {
      type: Number,
      default: 20, // optional: points per correct answer
    },
    
  },
  { timestamps: true }
);

export default mongoose.model("QuizQuestion", QuizQuestion);
