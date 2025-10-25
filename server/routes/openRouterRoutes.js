import express from "express";
import { analyzeImage } from "../controllers/openRouterController.js";

const router = express.Router();

// POST route to analyze an image using OpenRouter AI
router.post("/analyze-image", analyzeImage);

export default router;
