import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  X,
  StickyNote,
  Edit2,
  Save,
  Plus,
  NotebookPen,
  Mail,
  Trash2,
  Clock,
  AlertTriangle,
} from "lucide-react";

const TakeNote = () => {
  const [notes, setNotes] = useState([]);
  const [newNote, setNewNote] = useState("");
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [editingNote, setEditingNote] = useState(null);
  const [addingNote, setAddingNote] = useState(false);
  const [openWindow, setOpenWindow] = useState(false);
  const [confirmDelete, setConfirmDelete] = useState(null);

  const backendUrl =
    import.meta.env.VITE_BACKEND_URL?.replace(/\/$/, "") ||
    "http://localhost:4000";

  // ✅ Axios instance
  const axiosInstance = axios.create({
    baseURL: `${backendUrl}/api`,
    withCredentials: true,
  });

  axiosInstance.interceptors.request.use((config) => {
    const token = localStorage.getItem("token");
    if (token) config.headers.Authorization = `Bearer ${token}`;
    return config;
  });

  // ✅ Fetch user profile
  useEffect(() => {
    const fetchUser = async () => {
      try {
        setLoading(true);
        const res = await axiosInstance.get("/user/profile");
        setCurrentUser(res.data?.user || res.data);
      } catch (error) {
        console.error("Error fetching user:", error);
        setCurrentUser({
          name: "Demo User",
          email: "demo@example.com",
        });
      } finally {
        setLoading(false);
      }
    };
    fetchUser();
  }, []);

  // ✅ Fetch notes
  const fetchNotes = async () => {
    try {
      const res = await axiosInstance.get("/notes/get");
      setNotes(res.data?.notes || []);
    } catch (error) {
      console.error("Error fetching notes:", error);
    }
  };

  useEffect(() => {
    fetchNotes();
  }, []);

  // ✅ Add note
  const handleAddNote = async () => {
    if (!newNote.trim()) return;
    try {
      const res = await axiosInstance.post("/notes/add", {
        title: newNote.split(" ").slice(0, 3).join(" "),
        content: newNote,
      });
      setNotes((prev) => [res.data.note || res.data, ...prev]);
      setNewNote("");
      setAddingNote(false);
    } catch (error) {
      console.error("Error adding note:", error);
    }
  };

  // ✅ Update note
  const handleSaveNote = async (id, updatedText) => {
    if (!updatedText.trim()) return;
    try {
      const res = await axiosInstance.put(`/notes/${id}`, {
        content: updatedText,
      });
      setNotes((prev) =>
        prev.map((note) => (note._id === id ? res.data.note || res.data : note))
      );
      setEditingNote(null);
    } catch (error) {
      console.error("Error updating note:", error);
    }
  };

  // ✅ Delete note
  const handleDeleteNote = async () => {
    try {
      await axiosInstance.delete(`/notes/${confirmDelete}`);
      setNotes((prev) => prev.filter((n) => n._id !== confirmDelete));
      setConfirmDelete(null);
    } catch (error) {
      console.error("Error deleting note:", error);
    }
  };

  // ✅ Helpers
  const confirmDeleteNote = (id) => setConfirmDelete(id);
  const closeModals = () => {
    setAddingNote(false);
    setEditingNote(null);
    setNewNote("");
  };

  const formatDate = (dateString) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    const diff = Math.floor((Date.now() - date) / 60000);
    if (diff < 1) return "Just now";
    if (diff < 60) return `${diff}m ago`;
    if (diff < 1440) return `${Math.floor(diff / 60)}h ago`;
    return date.toLocaleDateString();
  };

  return (
    <>
      {/* Floating Button */}
      <button
        onClick={() => setOpenWindow(!openWindow)}
        className="fixed bottom-23 right-3 sm:right-8 bg-gradient-to-br from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white rounded-full p-4 shadow-2xl transition-all duration-300 flex items-center justify-center z-50 hover:scale-110 active:scale-95"
        title={openWindow ? "Close Notes" : "Open Notes"}
      >
        {openWindow ? <X size={24} /> : <NotebookPen size={24} />}
      </button>

      {/* Notes Window */}
      <div
        className={`fixed bottom-37  sm:bottom-38 right-3 sm:right-8 w-[92vw] sm:w-[420px] max-h-[80vh] bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 border border-white/10 rounded-3xl shadow-2xl transition-all duration-300 ${
          openWindow
            ? "opacity-100 scale-100 translate-y-0"
            : "opacity-0 scale-95 translate-y-8 pointer-events-none"
        } z-40 overflow-hidden`}
      >
        {/* Header */}
        <div className="bg-gradient-to-r from-red-500/20 to-orange-500/20 border-b border-white/10 p-4 sm:p-6">
          {loading ? (
            <div className="flex justify-center py-4">
              <div className="animate-spin h-6 w-6 border-2 border-red-500 border-t-transparent rounded-full"></div>
            </div>
          ) : currentUser ? (
            <div className="flex items-center gap-3 sm:gap-4">
              <div className="w-12 h-12 sm:w-14 sm:h-14 bg-gradient-to-br from-red-500 to-orange-500 rounded-full flex items-center justify-center text-white text-lg sm:text-xl font-bold">
                {currentUser.name?.[0]?.toUpperCase() || "U"}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-white font-semibold truncate">
                  {currentUser.name}
                </p>
                <p className="text-gray-400 text-xs sm:text-sm truncate flex items-center gap-1.5 mt-0.5">
                  <Mail size={12} /> {currentUser.email}
                </p>
              </div>
            </div>
          ) : (
            <p className="text-gray-400 text-center">Failed to load profile</p>
          )}
        </div>

        {/* Notes Section */}
        <div className="p-4 sm:p-6 overflow-y-auto max-h-[calc(80vh-160px)]">
          <div className="flex items-center justify-between mb-3 sm:mb-4">
            <h2 className="text-lg sm:text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-red-400 to-orange-400 flex items-center gap-2">
              <StickyNote size={20} className="text-red-400" />
              My Notes
            </h2>
            <span className="text-gray-400 text-xs sm:text-sm">
              {notes.length} {notes.length === 1 ? "note" : "notes"}
            </span>
          </div>

          {notes.length === 0 ? (
            <div className="text-center py-10 sm:py-12">
              <StickyNote size={40} className="text-gray-600 mx-auto mb-3" />
              <p className="text-gray-400 text-sm sm:text-base">No notes yet!</p>
            </div>
          ) : (
            <div className="flex flex-col gap-3">
              {notes.map((note) => (
                <div
                  key={note._id}
                  className="group bg-gradient-to-br from-white/5 to-white/10 hover:from-white/10 hover:to-white/15 p-3 sm:p-4 rounded-2xl border border-white/10 hover:border-red-500/30 transition-all duration-200 shadow-lg hover:shadow-xl"
                >
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <div className="w-7 h-7 sm:w-8 sm:h-8 bg-gradient-to-br from-red-500/20 to-orange-500/20 rounded-lg flex items-center justify-center">
                        <StickyNote className="text-red-400 w-4 h-4" />
                      </div>
                      <span className="text-xs text-gray-400 flex items-center gap-1">
                        <Clock size={12} /> {formatDate(note.createdAt)}
                      </span>
                    </div>
                    <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button
                        className="p-1.5 rounded-lg text-blue-400 hover:bg-blue-500/20"
                        onClick={() => setEditingNote(note)}
                      >
                        <Edit2 size={14} />
                      </button>
                      <button
                        className="p-1.5 rounded-lg text-red-400 hover:bg-red-500/20"
                        onClick={() => confirmDeleteNote(note._id)}
                      >
                        <Trash2 size={14} />
                      </button>
                    </div>
                  </div>
                  <p className="text-white text-sm sm:text-base leading-relaxed pl-8">
                    {note.content}
                  </p>
                </div>
              ))}
            </div>
          )}

          <button
            onClick={() => setAddingNote(true)}
            className="mt-4 w-full bg-gradient-to-r from-red-500 to-orange-500 hover:from-red-600 hover:to-orange-600 text-white rounded-xl py-3 flex items-center justify-center gap-2 font-medium shadow-lg hover:scale-[1.02] active:scale-[0.98]"
          >
            <Plus size={18} /> Add New Note
          </button>
        </div>
      </div>

      {/* Modals */}
      {addingNote && (
        <Modal
          title="Add New Note"
          icon={<StickyNote className="text-white" size={20} />}
          color="red"
          content={newNote}
          setContent={setNewNote}
          onCancel={closeModals}
          onSave={handleAddNote}
          saveText="Save Note"
        />
      )}

      {editingNote && (
        <Modal
          title="Edit Note"
          icon={<Edit2 className="text-white" size={20} />}
          color="blue"
          content={editingNote.content}
          setContent={(val) =>
            setEditingNote({ ...editingNote, content: val })
          }
          onCancel={closeModals}
          onSave={() => handleSaveNote(editingNote._id, editingNote.content)}
          saveText="Save Changes"
        />
      )}

      {confirmDelete && (
        <ConfirmModal
          onCancel={() => setConfirmDelete(null)}
          onConfirm={handleDeleteNote}
        />
      )}
    </>
  );
};

// ✅ Reusable Modal Component
const Modal = ({
  title,
  icon,
  color,
  content,
  setContent,
  onCancel,
  onSave,
  saveText,
}) => (
  <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 p-4">
    <div className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 border border-white/20 rounded-3xl p-5 sm:p-6 w-full max-w-sm sm:max-w-md shadow-2xl relative">
      <button
        onClick={onCancel}
        className="absolute top-3 right-3 text-gray-400 hover:text-white p-1 hover:bg-white/10 rounded-lg"
      >
        <X size={20} />
      </button>

      <div className="flex items-center gap-3 mb-4">
        <div
          className={`w-10 h-10 bg-gradient-to-br from-${color}-500 to-${color}-600 rounded-xl flex items-center justify-center`}
        >
          {icon}
        </div>
        <h3
          className={`text-lg sm:text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-${color}-400 to-${color}-400`}
        >
          {title}
        </h3>
      </div>

      <textarea
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder="Write your note..."
        className="w-full p-3 sm:p-4 rounded-2xl bg-white/5 text-white border border-white/10 focus:ring-2 focus:ring-red-500/50 mb-4 min-h-[120px] resize-none text-sm sm:text-base"
        autoFocus
      />

      <div className="flex gap-3">
        <button
          onClick={onCancel}
          className="flex-1 py-3 bg-white/5 hover:bg-white/10 text-gray-300 rounded-xl text-sm sm:text-base"
        >
          Cancel
        </button>
        <button
          onClick={onSave}
          disabled={!content.trim()}
          className={`flex-1 py-3 bg-gradient-to-r from-${color}-500 to-${color}-600 hover:from-${color}-600 hover:to-${color}-700 disabled:from-gray-600 disabled:cursor-not-allowed text-white rounded-xl font-medium flex items-center justify-center gap-2 text-sm sm:text-base`}
        >
          <Save size={16} /> {saveText}
        </button>
      </div>
    </div>
  </div>
);

// ✅ Confirm Delete Modal
const ConfirmModal = ({ onCancel, onConfirm }) => (
  <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 p-4">
    <div className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 border border-white/20 rounded-3xl p-5 sm:p-6 w-full max-w-xs sm:max-w-sm text-center shadow-2xl">
      <AlertTriangle size={36} className="text-red-500 mx-auto mb-4" />
      <h3 className="text-lg sm:text-xl font-bold text-white mb-2">
        Delete this note?
      </h3>
      <p className="text-gray-400 text-sm sm:text-base mb-6">
        This action cannot be undone.
      </p>
      <div className="flex gap-3">
        <button
          onClick={onCancel}
          className="flex-1 py-2 bg-white/5 hover:bg-white/10 text-gray-300 rounded-xl"
        >
          Cancel
        </button>
        <button
          onClick={onConfirm}
          className="flex-1 py-2 bg-gradient-to-r from-red-500 to-orange-500 hover:from-red-600 hover:to-orange-600 text-white rounded-xl"
        >
          Delete
        </button>
      </div>
    </div>
  </div>
);

export default TakeNote;
