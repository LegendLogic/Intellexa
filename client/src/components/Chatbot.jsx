import React, { useState, useRef, useEffect } from "react";
import { MessageCircle, X, Send, Loader2 } from "lucide-react";

const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      sender: "bot",
      text: "👋 Hi there! I'm your AI Intellexa. Ask me for the best YouTube courses or guidance on any topic!",
      time: new Date(),
    },
  ]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const chatEndRef = useRef(null);

  // ✅ Config
  const API_CONFIG = {
    backendUrl: import.meta.env.VITE_BACKEND_URL || "http://localhost:4000",
  };

  // ✅ Auto-scroll to bottom
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isTyping]);

  // ✅ Handle message send
  const handleSend = async () => {
    if (!input.trim()) return;

    const userMsg = { sender: "user", text: input.trim(), time: new Date() };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setIsTyping(true);

    try {
      const response = await fetch(`${API_CONFIG.backendUrl}/api/chat`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ prompt: userMsg.text }),
      });

      if (!response.ok) throw new Error(`HTTP ${response.status}`);

      const data = await response.json();
      const botReply = {
        sender: "bot",
        text: data.response || data.reply || "🤖 No response from the INTELLEXA AI server.",
        time: new Date(),
      };

      setMessages((prev) => [...prev, botReply]);
    } catch (error) {
      console.error("Chatbot Error:", error);
      setMessages((prev) => [
        ...prev,
        {
          sender: "bot",
          text: "⚠️ Couldn't reach the AI server. Please check your backend connection and try again.",
          time: new Date(),
        },
      ]);
    } finally {
      setIsTyping(false);
    }
  };

  // ✅ Handle Enter key
  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  // ✅ Clear Chat
  const handleClearChat = () => {
    setMessages([
      {
        sender: "bot",
        text: "👋 Hi there! I'm your INTELLEXA. Ask me for doubts.",
        time: new Date(),
      },
    ]);
  };

  return (
    <div className="font-sans">
      {/* Floating Chat Button */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 bg-gradient-to-r from-orange-400 to-amber-500 text-white p-3 sm:p-4 rounded-full shadow-2xl hover:shadow-orange-300 hover:scale-110 transition-all duration-300 z-50"
          aria-label="Open chat"
        >
          <MessageCircle className="w-5 h-5 sm:w-6 sm:h-6" />
        </button>
      )}

      {/* Chat Window */}
      {isOpen && (
        <div className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 w-[calc(100vw-2rem)] sm:w-80 md:w-96 max-w-md h-[500px] sm:h-[600px] bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 backdrop-blur-xl border border-gray-700 rounded-2xl shadow-2xl flex flex-col overflow-hidden z-50 animate-slideUp">
          {/* Header */}
          <div className="flex items-center justify-between px-4 py-3 bg-gradient-to-r from-orange-500 to-amber-500 text-white shadow-lg">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
              <h2 className="font-bold text-base sm:text-lg">INTELLEXAA</h2>
            </div>
            <div className="flex items-center gap-2">
              {/* Clear Chat Button */}
              <button
                onClick={handleClearChat}
                className="hover:bg-white/20 p-1 text-black rounded-lg transition-colors duration-200 text-xs sm:text-sm"
                aria-label="Clear chat"
                title="Clear chat"
              >
                Clear
              </button>

              {/* Close Chat Button */}
              <button
                onClick={() => setIsOpen(false)}
                className="hover:bg-white/20 p-1 rounded-lg transition-colors duration-200"
                aria-label="Close chat"
              >
                <X className="w-5 h-5 text-red-900" />
              </button>
            </div>
          </div>

          {/* Chat Body */}
          <div className="flex-1 overflow-y-auto p-3 sm:p-4 space-y-3 ">
            {messages.map((msg, i) => (
              <div
                key={i}
                className={`flex ${
                  msg.sender === "user" ? "justify-end" : "justify-start"
                } animate-fadeIn`}
              >
                <div
                  className={`max-w-[85%] sm:max-w-[75%] px-3 sm:px-4 py-2 sm:py-3 rounded-2xl shadow-lg transition-all duration-300 ${
                    msg.sender === "user"
                      ? "bg-orange-400 text-white rounded-br-none"
                      : "bg-transparent backdrop-blur text-gray-100 rounded-bl-none border border-gray-600"
                  }`}
                >
                  <p className="text-xs sm:text-sm whitespace-pre-wrap leading-relaxed break-words">
                    {msg.text}
                  </p>
                  <span className="block text-[10px] sm:text-xs opacity-70 mt-1 text-right">
                    {msg.time.toLocaleTimeString([], {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </span>
                </div>
              </div>
            ))}

            {/* Typing Indicator */}
            {isTyping && (
              <div className="flex items-center gap-2 text-gray-400 animate-fadeIn">
                <Loader2 className="w-4 h-4 animate-spin" />
                <p className="text-xs sm:text-sm">INTELLEXAA is thinking...</p>
              </div>
            )}
            <div ref={chatEndRef} />
          </div>

          {/* Input Area */}
          <div className="flex items-center gap-2 border-t border-gray-700  px-3 py-2 sm:py-3">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Ask me your doubts...,"
              className="flex-1 px-3 py-2 text-xs sm:text-sm text-orange-300 bg-gray-700/50 border border-gray-600 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-orange-500 placeholder-gray-400 disabled:opacity-50"
              disabled={isTyping}
            />
            <button
              onClick={handleSend}
              disabled={isTyping || !input.trim()}
              className="bg-orange-400 text-white p-2 rounded-xl shadow-lg hover:shadow-orange-300 hover:scale-105 disabled:opacity-50 transition-all duration-200"
              aria-label="Send message"
            >
              <Send className="w-4 h-4 sm:w-5 sm:h-5" />
            </button>
          </div>
        </div>
      )}

      {/* Animations */}
      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes slideUp {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fadeIn { animation: fadeIn 0.3s ease-in-out; }
        .animate-slideUp { animation: slideUp 0.4s ease-out; }

        /* Scrollbar */
        .overflow-y-auto::-webkit-scrollbar { width: 6px; }
        .overflow-y-auto::-webkit-scrollbar-track { background: rgba(31,41,55,0.5); border-radius: 10px; }
        .overflow-y-auto::-webkit-scrollbar-thumb { background: rgba(251,146,60,0.5); border-radius: 10px; }
        .overflow-y-auto::-webkit-scrollbar-thumb:hover { background: rgba(251,146,60,0.7); }
      `}</style>
    </div>
  );
};

export default Chatbot;
