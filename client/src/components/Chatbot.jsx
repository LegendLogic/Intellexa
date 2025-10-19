import React, { useState, useRef, useEffect } from "react";
import { MessageCircle, X, Send } from "lucide-react";

const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedMentor, setSelectedMentor] = useState("");
  const [isMentorSelected, setIsMentorSelected] = useState(false);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const chatEndRef = useRef(null);

  const backendUrl = import.meta.env.VITE_BACKEND_URL;

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isTyping]);

  const handleMentorSelect = () => {
    if (!selectedMentor) return alert("Please select a mentor type before starting!");
    setIsMentorSelected(true);
    setMessages([
      {
        sender: "bot",
        text: `👋 Hi! I'm your **${selectedMentor} Mentor**. How can I help you today?`,
        time: new Date(),
      },
    ]);
  };

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMsg = { sender: "user", text: input, time: new Date() };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setIsTyping(true);

    try {
      const res = await fetch(`${backendUrl}/api/chat`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: input, mentorType: selectedMentor }),
      });

      const data = await res.json();

      const botReply = {
        sender: "bot",
        text: data.reply || "🤖 No response from the AI server.",
        time: new Date(),
      };

      setMessages((prev) => [...prev, botReply]);
    } catch (error) {
      console.error("Chatbot Error:", error);
      setMessages((prev) => [
        ...prev,
        { sender: "bot", text: "⚠️ Couldn’t reach the AI server. Try again later.", time: new Date() },
      ]);
    } finally {
      setIsTyping(false);
    }
  };

  const handleKeyDown = (e) => e.key === "Enter" && handleSend();

  return (
    <div>
      {/* Floating Chat Button */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="fixed bottom-6 right-6 bg-gradient-to-r from-indigo-500 to-purple-600 text-white p-4 rounded-full shadow-xl hover:scale-110 transition-transform duration-300"
        >
          <MessageCircle className="w-6 h-6" />
        </button>
      )}

      {/* Chat Window */}
      {isOpen && (
        <div className="fixed bottom-6 right-6 w-80 md:w-96 bg-white/90 backdrop-blur-lg border border-gray-200 rounded-2xl shadow-2xl flex flex-col overflow-hidden animate-fadeIn">
          {/* Header */}
          <div className="flex items-center justify-between px-4 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white">
            <h2 className="font-semibold text-lg">
              {isMentorSelected ? `${selectedMentor} Mentor` : "Choose Mentor"}
            </h2>
            <button onClick={() => setIsOpen(false)}>
              <X className="w-5 h-5 hover:text-gray-200 transition" />
            </button>
          </div>

          {/* Mentor Selection */}
          {!isMentorSelected ? (
            <div className="flex flex-col items-center justify-center flex-1 p-6 space-y-4">
              <select
                value={selectedMentor}
                onChange={(e) => setSelectedMentor(e.target.value)}
                className="w-full border border-gray-300 rounded-xl p-2 text-gray-700 focus:ring-2 focus:ring-indigo-500"
              >
                <option value="">-- Select a Mentor --</option>
                <option value="AI Research">AI Research Mentor</option>
                <option value="Python Programming">Python Programming Mentor</option>
                <option value="Cybersecurity">Cybersecurity Mentor</option>
                <option value="Web Development">Web Development Mentor</option>
                <option value="Machine Learning">Machine Learning Mentor</option>
              </select>
              <button
                onClick={handleMentorSelect}
                className="bg-gradient-to-r from-indigo-500 to-purple-600 text-white px-6 py-2 rounded-xl shadow hover:scale-105 transition-transform"
              >
                Start Chat
              </button>
            </div>
          ) : (
            <>
              {/* Chat Body */}
              <div className="flex-1 overflow-y-auto p-4 space-y-4 scroll-smooth">
                {messages.map((msg, i) => (
                  <div
                    key={i}
                    className={`flex ${msg.sender === "user" ? "justify-end" : "justify-start"} animate-fadeIn`}
                  >
                    <div
                      className={`max-w-[75%] px-4 py-3 rounded-2xl shadow-md transition-all duration-300 ${
                        msg.sender === "user"
                          ? "bg-gradient-to-r from-indigo-500 to-purple-600 text-white rounded-br-none"
                          : "bg-gray-100 text-gray-800 rounded-bl-none"
                      }`}
                    >
                      <p className="text-sm whitespace-pre-wrap leading-relaxed">{msg.text}</p>
                      <span className="block text-xs opacity-60 mt-1 text-right">
                        {msg.time.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                      </span>
                    </div>
                  </div>
                ))}

                {/* Typing Indicator */}
                {isTyping && (
                  <div className="flex items-center text-gray-500 animate-fadeIn">
                    <div className="dot-typing"></div>
                    <p className="ml-2 text-sm">AI is typing...</p>
                  </div>
                )}

                <div ref={chatEndRef} />
              </div>

              {/* Input Area */}
              <div className="flex items-center border-t bg-white/70 px-3 py-2 shadow-inner">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder={`Ask your ${selectedMentor} question...`}
                  className="flex-1 px-4 py-2 text-gray-800 bg-white border border-gray-300 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all duration-200"
                />
                <button
                  onClick={handleSend}
                  className="ml-2 bg-gradient-to-r from-indigo-500 to-purple-600 text-white p-2 rounded-xl shadow hover:scale-105 transition-transform duration-200"
                >
                  <Send className="w-5 h-5" />
                </button>
              </div>
            </>
          )}
        </div>
      )}

      {/* Animations */}
      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fadeIn { animation: fadeIn 0.3s ease-in-out; }

        .dot-typing {
          position: relative;
          left: 4px;
          width: 6px;
          height: 6px;
          border-radius: 50%;
          background-color: #6b7280;
          box-shadow: 8px 0 0 0 #6b7280, 16px 0 0 0 #6b7280;
          animation: dotTyping 1s infinite linear;
        }

        @keyframes dotTyping {
          0%, 60%, 100% { box-shadow: 8px 0 0 0 #6b7280, 16px 0 0 0 #6b7280; }
          30% { box-shadow: 8px 0 0 0 #d1d5db, 16px 0 0 0 #6b7280; }
        }
      `}</style>
    </div>
  );
};

export default Chatbot;
