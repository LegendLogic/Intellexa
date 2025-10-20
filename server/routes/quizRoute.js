import express from "express";
import {
  getAllQuizQuestions,
  addQuizQuestion,
  getSingleQuizQuestion,
  deleteQuizQuestion,
  updateQuizQuestion,
  submitAnswer, // import the new controller
} from "../controllers/quizController.js";
import userAuth from "../middleware/auth.js";

const quizRouter = express.Router();

// Get all quiz questions
quizRouter.get("/all", getAllQuizQuestions);

// Get single question by ID
quizRouter.get("/id", getSingleQuizQuestion);

// Add new question (admin or authenticated)
quizRouter.post("/add-question", addQuizQuestion);

// ✅ Submit answer & update user points
quizRouter.post("/submit-answer", userAuth, submitAnswer);

// Update question
quizRouter.put("/update", userAuth, updateQuizQuestion);

// Delete question
quizRouter.delete("/delete", userAuth, deleteQuizQuestion);

export default quizRouter;
