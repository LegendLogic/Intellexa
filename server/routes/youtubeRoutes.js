import express from "express";
import { testYouTube } from "../controllers/youtubeController.js";

const router = express.Router();
router.post("/test-youtube", testYouTube);

export default router;
