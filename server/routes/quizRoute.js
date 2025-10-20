import express from "express";
import {
  getAllQuizQuestions,
  addQuizQuestion,
  getSingleQuizQuestion,
  deleteQuizQuestion,
  updateQuizQuestion,
  addQuizPoints,
} from "../controllers/quizController.js";
import userAuth from "../middleware/auth.js"; // if you want to protect some routes

const quizRouter = express.Router();

// ✅ Get all quiz questions
quizRouter.get("/all", getAllQuizQuestions);

// ✅ Get a single question by ID
quizRouter.get("/id", getSingleQuizQuestion);

// ✅ Add a new quiz question (admin or authenticated)
quizRouter.post("/add-question", addQuizQuestion);

// add the user point after the correct 
quizRouter.put('/add-point', userAuth, addQuizPoints)

// ✅ Update an existing quiz question
quizRouter.put("/update", userAuth, updateQuizQuestion);

// ✅ Delete a question
quizRouter.delete("/delete", userAuth, deleteQuizQuestion);

export default quizRouter;
