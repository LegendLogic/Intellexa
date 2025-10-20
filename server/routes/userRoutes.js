import express from "express";
import {registerUser,loginUser , getUserProfile , getAllUsers , addUserPoints , removeUserPoints ,updateVideoCompletion} from "../controllers/userController.js";
import userAuth from "../middleware/auth.js";




const userRouter = express.Router()

userRouter.post('/register',registerUser)
userRouter.post("/login",loginUser)
userRouter.get("/profile", userAuth,getUserProfile);
userRouter.get("/all", getAllUsers);
userRouter.put("/addpoint", userAuth, addUserPoints);
userRouter.put("/removepoint", userAuth, removeUserPoints);
userRouter.put("/videos", userAuth, updateVideoCompletion);



export default userRouter

// http://localhost:4000/api/user/register
// http://localhost:4000/api/user/login