// server/routes/roadmapRouter.js
import express from "express";
import { generateRoadmapContent } from "../controllers/roadmapController.js";

const router = express.Router();

// POST /roadmap/generate
router.post("/generate", generateRoadmapContent);

export default router;
