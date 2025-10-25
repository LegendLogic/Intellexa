import express from "express";
import { testSerpAPI } from "../controllers/serpController.js";

const router = express.Router();
router.post("/test-serpapi", testSerpAPI);

export default router;
