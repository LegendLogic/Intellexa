import express from "express";
import cors from "cors";
import "dotenv/config";
import connectDB from "./config/mongodb.js";
import connectCloudinary from "./config/cloudinary.js";
import userRouter from "./routes/userRoutes.js";
import quizRouter from "./routes/quizRoute.js";
import chatRoutes from "./routes/chatRoutes.js";
import VideoRouter from "./routes/videoRoute.js";
import searchRouter from "./routes/searchRoute.js";
import youtubeRoutes from "./routes/youtubeRoutes.js";
import serpRoutes from "./routes/serpRoutes.js";
import openRouterRoutes from "./routes/openRouterRoutes.js";
import roadmapRouter from "./routes/roadmapRouter.js";
import noteRoutes from "./routes/noteRoutes.js";
// App config
const app = express();
const port = process.env.PORT || 4000;

// Connect to DB and Cloudinary
connectDB();
connectCloudinary();

// ✅ CORS setup (important!)
const allowedOrigins = [
  "http://localhost:5173", // your frontend (Vite)
  "https://your-production-domain.com", // optional for deployment
];

app.use(
  cors({
    origin: function (origin, callback) {
      // allow requests with no origin (like mobile apps or curl)
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true, // ✅ allow cookies / sessions
  })
);

// Middleware
app.use(express.json());

// API Routes
app.use("/api/user", userRouter);
app.use("/api/quiz", quizRouter);
app.use("/api", chatRoutes);
app.use("/api/video", VideoRouter);
app.use('/api/search', searchRouter);
app.use('/api/roadmap',roadmapRouter)
app.use("/api/notes", noteRoutes);

// ✅ Register test routes

app.use("/api/youtube", youtubeRoutes);
app.use("/api/serpapi", serpRoutes);
// Register route
app.use("/api/openrouter", openRouterRoutes);

// ✅ Add image generation route


app.use("/roadmap", roadmapRouter);




app.use("/uploads", express.static("uploads"));


// Default route
app.get("/", (req, res) => {
  res.send("🚀 API is working great!");
});

// Start server
app.listen(port, () => console.log(`✅ Server running on port ${port}`));
