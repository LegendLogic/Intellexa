import React, { useState } from "react";
import { toast } from "react-toastify";
import { motion, AnimatePresence } from "framer-motion";

const COLORS = ["bg-indigo-100", "bg-pink-100", "bg-green-100", "bg-yellow-100", "bg-purple-100"];

const Notes = () => {
  const [note, setNote] = useState("");
  const [notesList, setNotesList] = useState([]);

  // Add a new note
  const addNote = () => {
    if (!note.trim()) {
      toast.error("Note cannot be empty!");
      return;
    }
    const newNote = {
      id: Date.now(),
      text: note,
      color: COLORS[Math.floor(Math.random() * COLORS.length)],
    };
    setNotesList([newNote, ...notesList]);
    setNote("");
    toast.success("Note added successfully!");
  };

  // Delete a note
  const deleteNote = (id) => {
    setNotesList(notesList.filter((n) => n.id !== id));
    toast.info("Note deleted!");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex flex-col items-center px-4 py-12">
      <div className="max-w-4xl w-full bg-white shadow-2xl rounded-3xl p-8">
        <h1 className="text-4xl font-extrabold text-gray-800 mb-6 text-center">📝 My Notes</h1>

        {/* Input for new note */}
        <div className="flex flex-col sm:flex-row mb-6 gap-3">
          <input
            type="text"
            value={note}
            onChange={(e) => setNote(e.target.value)}
            placeholder="Write your note..."
            className="flex-1 px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all duration-300"
          />
          <button
            onClick={addNote}
            className="bg-indigo-600 text-white px-6 py-3 rounded-xl hover:bg-indigo-700 transition duration-300 font-semibold"
          >
            Add
          </button>
        </div>

        {/* Notes list */}
        <div className="max-h-[400px] overflow-y-auto space-y-4">
          {notesList.length === 0 ? (
            <p className="text-gray-500 text-center py-10">No notes yet. Start adding!</p>
          ) : (
            <AnimatePresence>
              {notesList.map((n) => (
                <motion.li
                  key={n.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ type: "spring", stiffness: 120 }}
                  className={`${n.color} flex justify-between items-center px-4 py-3 rounded-xl shadow hover:shadow-lg transition-all duration-300`}
                >
                  <span className="break-words">{n.text}</span>
                  <button
                    onClick={() => deleteNote(n.id)}
                    className="text-red-500 hover:text-red-700 font-bold transition duration-200"
                  >
                    Delete
                  </button>
                </motion.li>
              ))}
            </AnimatePresence>
          )}
        </div>
      </div>
    </div>
  );
};

export default Notes;
