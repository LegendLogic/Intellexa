import express from "express";
import {registerUser,loginUser , getUserProfile , getAllUsers , addUserPoints ,} from "../controllers/userController.js";
import userAuth from "../middleware/auth.js";




const userRouter = express.Router()

userRouter.post('/register',registerUser)
userRouter.post("/login",loginUser)
userRouter.get("/profile", userAuth,getUserProfile);
userRouter.get("/all", getAllUsers);
userRouter.put("/addpoint", userAuth, addUserPoints);



export default userRouter

// http://localhost:4000/api/user/register
// http://localhost:4000/api/user/login