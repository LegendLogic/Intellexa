import express from "express";
import {registerUser,loginUser, deleteAccount,getUserProfileInDetails , getUserProfile , resetProgress,updateStreak, updateActivityStats, redeemCredits , getAllUsers,updateProfile,   addUserPoints , removeUserPoints , completedVideo} from "../controllers/userController.js";
import userAuth from "../middleware/auth.js";
import upload from "../middleware/multer.js";




const userRouter = express.Router()

userRouter.post('/register', upload.single("profileImage"),registerUser)
userRouter.post("/login",loginUser)
userRouter.get("/profile", userAuth,getUserProfile);

userRouter.get("/all", getAllUsers);
userRouter.put("/addpoint", userAuth, addUserPoints);
userRouter.put("/removepoint", userAuth, removeUserPoints);
userRouter.post("/complete-video", userAuth, completedVideo);


userRouter.post("/redeem", userAuth, redeemCredits);
userRouter.get("/profile/:id", getUserProfileInDetails);



userRouter.put("/profile-updates", userAuth, updateProfile);
userRouter.delete("/delete", userAuth, deleteAccount);

userRouter.put("/reset", userAuth, resetProgress);





export default userRouter

// http://localhost:4000/api/user/register
// http://localhost:4000/api/user/login