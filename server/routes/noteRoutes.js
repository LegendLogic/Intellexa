import express from "express";
import {
  getNotes,
  addNote,
  updateNote,
  deleteNote,
} from "../controllers/noteController.js";
import userAuth from "../middleware/auth.js"; // same as used in userRouter

const noteRouter = express.Router();

// ✅ Get all notes of logged-in user
noteRouter.get("/get", userAuth, getNotes);

// ✅ Add a new note
noteRouter.post("/add", userAuth, addNote);

// ✅ Update an existing note
noteRouter.put("/:id", userAuth, updateNote);

// ✅ Delete a note
noteRouter.delete("/:id", userAuth, deleteNote);

export default noteRouter;

/*
🔗 Example Endpoints:
GET     http://localhost:4000/api/notes        → Fetch all user notes
POST    http://localhost:4000/api/notes/add        → Add new note
PUT     http://localhost:4000/api/notes/:id    → Update note
DELETE  http://localhost:4000/api/notes/:id    → Delete note
*/
