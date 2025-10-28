import express from "express";
import {testSerpAPI} from "../controllers/serpController.js";

const router = express.Router();
router.get("/test-serpapi", testSerpAPI);


export default router;
