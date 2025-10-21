import React, { useState, useEffect } from "react";
import { X, StickyNote, Edit2, Save, Plus, NotebookPen, Mail, Trash2, Clock } from "lucide-react";

const TakeNote = () => {
  const [notes, setNotes] = useState([
    { _id: "1", text: "Meeting notes for project review", createdAt: new Date().toISOString() },
    { _id: "2", text: "Buy groceries: milk, eggs, bread", createdAt: new Date().toISOString() },
    { _id: "3", text: "Call dentist for appointment", createdAt: new Date().toISOString() },
  ]);
  const [newNote, setNewNote] = useState("");
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [editingNote, setEditingNote] = useState(null);
  const [addingNote, setAddingNote] = useState(false);
  const [openWindow, setOpenWindow] = useState(false);

    const backendUrl = import.meta.env.VITE_BACKEND_URL || "http://localhost:4000";

  // Fetch user profile on component mount
  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        setLoading(true);
        // Replace with your actual API endpoint
        const response = await fetch('/api/user/profile', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            // Add authorization token if needed
            'Authorization': `Bearer ${localStorage.getItem('token')}`
          },
          credentials: 'include' // Include cookies if using cookie-based auth
        });

        if (!response.ok) {
          throw new Error('Failed to fetch user profile');
        }

        const data = await response.json();
        setCurrentUser(data);
      } catch (error) {
        console.error('Error fetching user profile:', error);
        // Fallback to demo user if API fails
        setCurrentUser({
          _id: "user123",
          name: "John Doe",
          email: "john.doe@example.com"
        });
      } finally {
        setLoading(false);
      }
    };

    fetchUserProfile();
  }, []);

  const handleAddNote = () => {
    if (!newNote.trim()) return;
    
    const note = {
      _id: Date.now().toString(),
      text: newNote,
      createdAt: new Date().toISOString()
    };
    
    setNotes((prev) => [note, ...prev]);
    setNewNote("");
    setAddingNote(false);
  };

  const handleSaveNote = (noteId, updatedText) => {
    if (!updatedText.trim()) return;
    
    setNotes((prev) =>
      prev.map((n) => (n._id === noteId ? { ...n, text: updatedText } : n))
    );
    setEditingNote(null);
  };

  const handleDeleteNote = (noteId) => {
    setNotes((prev) => prev.filter((n) => n._id !== noteId));
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffMs = now - date;
    const diffMins = Math.floor(diffMs / 60000);
    
    if (diffMins < 1) return "Just now";
    if (diffMins < 60) return `${diffMins}m ago`;
    if (diffMins < 1440) return `${Math.floor(diffMins / 60)}h ago`;
    return date.toLocaleDateString();
  };

  return (
    <>
      {/* Floating Notes Button */}
      <button
        onClick={() => setOpenWindow(!openWindow)}
        className="fixed bottom-22 right-6 bg-gradient-to-br from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white rounded-full p-4 shadow-2xl transition-all duration-300 flex items-center justify-center z-50 hover:scale-110 active:scale-95"
        title={openWindow ? "Close Notes" : "Open Notes"}
      >
        {openWindow ? <X size={24} /> : <NotebookPen size={24} />}
      </button>

      {/* Floating Notes Window */}
      <div
        className={`fixed bottom-38 right-8 w-[420px] max-h-[85vh] bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 backdrop-blur-2xl border border-white/10 rounded-3xl shadow-2xl transition-all duration-300 ${
          openWindow
            ? "opacity-100 scale-100 translate-y-0"
            : "opacity-0 scale-95 translate-y-8 pointer-events-none"
        } z-40 overflow-hidden`}
      >
        {/* Header with Gradient */}
        <div className="bg-gradient-to-r from-red-500/20 to-orange-500/20 border-b border-white/10 p-6">
          {loading ? (
            <div className="flex items-center justify-center py-4">
              <div className="animate-spin rounded-full h-8 w-8 border-2 border-red-500 border-t-transparent"></div>
            </div>
          ) : currentUser ? (
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 bg-gradient-to-br from-red-500 to-orange-500 rounded-full flex items-center justify-center text-white text-xl font-bold shadow-lg">
                {currentUser.name?.[0]?.toUpperCase() || "U"}
              </div>
              <div className="flex-1">
                <p className="text-white font-semibold text-lg">
                  {currentUser.name}
                </p>
                <p className="text-gray-400 text-sm flex items-center gap-1.5 mt-0.5">
                  <Mail size={12} /> {currentUser.email}
                </p>
              </div>
            </div>
          ) : (
            <p className="text-gray-400 text-center">Failed to load user profile</p>
          )}
        </div>

        {/* Notes Section */}
        <div className="p-6 overflow-y-auto max-h-[calc(85vh-180px)]">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-red-400 to-orange-400 flex items-center gap-2">
              <StickyNote size={20} className="text-red-400" />
              My Notes
            </h2>
            <span className="text-gray-400 text-sm">{notes.length} {notes.length === 1 ? 'note' : 'notes'}</span>
          </div>

          {notes.length === 0 ? (
            <div className="text-center py-12">
              <StickyNote size={48} className="text-gray-600 mx-auto mb-3" />
              <p className="text-gray-400">No notes yet!</p>
              <p className="text-gray-500 text-sm mt-1">Click below to add your first note</p>
            </div>
          ) : (
            <div className="flex flex-col gap-3">
              {notes.map((note, index) => (
                <div
                  key={note._id || index}
                  className="group bg-gradient-to-br from-white/5 to-white/10 hover:from-white/10 hover:to-white/15 p-4 rounded-2xl border border-white/10 hover:border-red-500/30 transition-all duration-200 shadow-lg hover:shadow-xl"
                >
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 bg-gradient-to-br from-red-500/20 to-orange-500/20 rounded-lg flex items-center justify-center">
                        <StickyNote className="text-red-400 w-4 h-4" />
                      </div>
                      <span className="text-xs text-gray-400 flex items-center gap-1">
                        <Clock size={12} />
                        {formatDate(note.createdAt)}
                      </span>
                    </div>
                    <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button
                        className="p-1.5 rounded-lg text-blue-400 hover:bg-blue-500/20 transition-colors"
                        onClick={() => setEditingNote(note)}
                        title="Edit note"
                      >
                        <Edit2 size={14} />
                      </button>
                      <button
                        className="p-1.5 rounded-lg text-red-400 hover:bg-red-500/20 transition-colors"
                        onClick={() => handleDeleteNote(note._id)}
                        title="Delete note"
                      >
                        <Trash2 size={14} />
                      </button>
                    </div>
                  </div>
                  <p className="text-white text-sm leading-relaxed pl-10">{note.text}</p>
                </div>
              ))}
            </div>
          )}

          {/* Add Note Button */}
          <button
            onClick={() => setAddingNote(true)}
            className="mt-4 w-full bg-gradient-to-r from-red-500 to-orange-500 hover:from-red-600 hover:to-orange-600 text-white rounded-xl py-3 flex items-center justify-center gap-2 font-medium shadow-lg hover:shadow-xl transition-all duration-200 hover:scale-[1.02] active:scale-[0.98]"
          >
            <Plus size={18} /> Add New Note
          </button>
        </div>
      </div>

      {/* Add Note Modal */}
      {addingNote && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 border border-white/20 rounded-3xl p-6 w-full max-w-md relative shadow-2xl">
            <button
              onClick={() => {
                setAddingNote(false);
                setNewNote("");
              }}
              className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors p-1 hover:bg-white/10 rounded-lg"
            >
              <X size={20} />
            </button>

            <div className="flex flex-col">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-gradient-to-br from-red-500 to-orange-500 rounded-xl flex items-center justify-center">
                  <StickyNote className="text-white" size={20} />
                </div>
                <h3 className="text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-red-400 to-orange-400">
                  Add New Note
                </h3>
              </div>
              
              <textarea
                value={newNote}
                onChange={(e) => setNewNote(e.target.value)}
                placeholder="Write your note here..."
                className="w-full p-4 rounded-2xl bg-white/5 text-white border border-white/10 focus:outline-none focus:ring-2 focus:ring-red-500/50 focus:border-red-500/50 mb-4 min-h-[120px] resize-none placeholder:text-gray-500"
                autoFocus
              />
              
              <div className="flex gap-3">
                <button
                  onClick={() => {
                    setAddingNote(false);
                    setNewNote("");
                  }}
                  className="flex-1 px-4 py-3 bg-white/5 hover:bg-white/10 rounded-xl text-gray-300 font-medium transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={handleAddNote}
                  disabled={!newNote.trim()}
                  className="flex-1 px-4 py-3 bg-gradient-to-r from-red-500 to-orange-500 hover:from-red-600 hover:to-orange-600 disabled:from-gray-600 disabled:to-gray-600 disabled:cursor-not-allowed rounded-xl text-white font-medium flex items-center justify-center gap-2 shadow-lg transition-all duration-200"
                >
                  <Save size={16} /> Save Note
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Edit Note Modal */}
      {editingNote && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 border border-white/20 rounded-3xl p-6 w-full max-w-md relative shadow-2xl">
            <button
              onClick={() => setEditingNote(null)}
              className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors p-1 hover:bg-white/10 rounded-lg"
            >
              <X size={20} />
            </button>

            <div className="flex flex-col">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-500 rounded-xl flex items-center justify-center">
                  <Edit2 className="text-white" size={20} />
                </div>
                <h3 className="text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">
                  Edit Note
                </h3>
              </div>
              
              <textarea
                value={editingNote.text}
                onChange={(e) =>
                  setEditingNote({ ...editingNote, text: e.target.value })
                }
                className="w-full p-4 rounded-2xl bg-white/5 text-white border border-white/10 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 mb-4 min-h-[120px] resize-none"
                autoFocus
              />
              
              <div className="flex gap-3">
                <button
                  onClick={() => setEditingNote(null)}
                  className="flex-1 px-4 py-3 bg-white/5 hover:bg-white/10 rounded-xl text-gray-300 font-medium transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={() =>
                    handleSaveNote(editingNote._id, editingNote.text)
                  }
                  disabled={!editingNote.text.trim()}
                  className="flex-1 px-4 py-3 bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 disabled:from-gray-600 disabled:to-gray-600 disabled:cursor-not-allowed rounded-xl text-white font-medium flex items-center justify-center gap-2 shadow-lg transition-all duration-200"
                >
                  <Save size={16} /> Save Changes
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default TakeNote;