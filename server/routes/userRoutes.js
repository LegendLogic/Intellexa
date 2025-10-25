import express from "express";
import {registerUser,loginUser , getUserProfile , getAllUsers , addUserPoints , removeUserPoints , completedVideo} from "../controllers/userController.js";
import userAuth from "../middleware/auth.js";
import upload from "../middleware/multer.js";




const userRouter = express.Router()

userRouter.post('/register', upload.single("profileImage"),registerUser)
userRouter.post("/login",upload.single("profileImage"),loginUser)
userRouter.get("/profile", userAuth,getUserProfile);
userRouter.get("/all", getAllUsers);
userRouter.put("/addpoint", userAuth, addUserPoints);
userRouter.put("/removepoint", userAuth, removeUserPoints);
userRouter.post("/complete-video", userAuth, completedVideo);



export default userRouter

// http://localhost:4000/api/user/register
// http://localhost:4000/api/user/login