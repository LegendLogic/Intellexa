import express from 'express';
import {

  createRecommandVideo,
  getAllVideos,
  getVideos
  

} 
from '../controllers/videoController.js';

import userAuth from "../middleware/auth.js";


const VideoRouter = express.Router();


//
// ✅ ADMIN LOGIN
VideoRouter.post('/post-video', createRecommandVideo);
VideoRouter.get("/get-video", getAllVideos);
VideoRouter.get("/get-recomm", getVideos);



export default VideoRouter;
