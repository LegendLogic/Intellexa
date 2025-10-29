// controllers/noteController.js
import Note from "../model/noteModel.js";
import User from "../model/userModel.js";

/**
 * ✅ Get all notes of logged-in user
 */
export const getNotes = async (req, res) => {
  try {
    const notes = await Note.find({ user: req.user._id }).sort({ createdAt: -1 });
    res.status(200).json({ success: true, notes });
  } catch (error) {
    console.error("Error fetching notes:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

/**
 * ✅ Create a new note
 */
export const addNote = async (req, res) => {
  try {
    const { title, content } = req.body;

    if (!content || content.trim() === "") {
      return res.status(400).json({ success: false, message: "Note content is required" });
    }

    // Create note and link it to the user
    const note = await Note.create({
      user: req.user._id,
      title: title || "",
      content,
    });

    // Push note reference into user's notes array
    await User.findByIdAndUpdate(req.user._id, {
      $push: { notes: note._id },
    });

    res.status(201).json({ success: true, note });
  } catch (error) {
    console.error("Error adding note:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

/**
 * ✅ Update a note
 */
export const updateNote = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, content } = req.body;

    const note = await Note.findById(id);
    if (!note) {
      return res.status(404).json({ success: false, message: "Note not found" });
    }

    // Check ownership
    if (note.user.toString() !== req.user._id.toString()) {
      return res.status(403).json({ success: false, message: "Not authorized" });
    }

    // Update fields
    if (title !== undefined) note.title = title;
    if (content !== undefined) note.content = content;

    const updatedNote = await note.save();

    res.status(200).json({ success: true, note: updatedNote });
  } catch (error) {
    console.error("Error updating note:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

/**
 * ✅ Delete a note
 */
export const deleteNote = async (req, res) => {
  try {
    const { id } = req.params;

    const note = await Note.findById(id);
    if (!note) {
      return res.status(404).json({ success: false, message: "Note not found" });
    }

    if (note.user.toString() !== req.user._id.toString()) {
      return res.status(403).json({ success: false, message: "Not authorized" });
    }

    await note.deleteOne();

    // Remove from user's notes array
    await User.findByIdAndUpdate(req.user._id, {
      $pull: { notes: id },
    });

    res.status(200).json({ success: true, message: "Note deleted successfully" });
  } catch (error) {
    console.error("Error deleting note:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};
