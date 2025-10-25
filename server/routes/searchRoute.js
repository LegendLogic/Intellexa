import express from "express";
import { getLearningResources } from "../controllers/SearchController.js";

const searchRouter = express.Router();

// POST endpoint to get learning resources
searchRouter.post("/get-learning", getLearningResources);

export default searchRouter;
