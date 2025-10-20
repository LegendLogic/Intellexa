import express from "express";
import { chatController } from "../controllers/chatController.js";


const router = express.Router();

router.post("/chat", chatController);

export default router;
