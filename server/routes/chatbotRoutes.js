import express from "express";
import { chatWithMentor } from "../controllers/chatbotController.js";

const router = express.Router();

// POST route for chatbot messages
router.post("/", chatWithMentor);

export default router;
