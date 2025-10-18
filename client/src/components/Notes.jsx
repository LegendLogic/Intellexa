import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Notes = () => {
  const BASE_URL = import.meta.env.VITE_BACKEND_URL;

  const questions = [
    { id: 1, question: "Which language is used to style web pages?", options: ["HTML", "JQuery", "CSS", "XML"], correct: "CSS" },
    { id: 2, question: "What does React use to manage component data?", options: ["Props", "State", "Functions", "Variables"], correct: "State" },
    { id: 3, question: "Which hook is used for side effects in React?", options: ["useState", "useEffect", "useRef", "useMemo"], correct: "useEffect" },
    { id: 4, question: "Which company developed React?", options: ["Google", "Microsoft", "Facebook", "Amazon"], correct: "Facebook" },
  ];

  const [currentIndex, setCurrentIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [selected, setSelected] = useState(null);
  const [completed, setCompleted] = useState(false);
  const [userCredit, setUserCredit] = useState(0);

  // Fetch user's points on mount
  useEffect(() => {
    const fetchUserPoints = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await fetch(`${BASE_URL}/api/user/profile`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        const data = await response.json();
        if (response.ok) {
          setUserCredit(data.user.creditBalance);
        }
      } catch (err) {
        console.error("Failed to fetch user profile:", err);
      }
    };
    fetchUserPoints();
  }, [BASE_URL]);

  // Add 20 points to backend and update state
  const addPointsToUser = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(`${BASE_URL}/api/user/addpoint`, {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });
      const data = await response.json();
      if (response.ok) setUserCredit(data.creditBalance);
      else toast.error("⚠️ " + data.message);
    } catch (err) {
      console.error("Failed to add points:", err);
      toast.error("⚠️ Could not update points on server");
    }
  };

  const handleAnswer = (option, e) => {
    e.preventDefault();
    if (selected) return; // Prevent multiple clicks

    setSelected(option);
    const currentQuestion = questions[currentIndex];

    if (option === currentQuestion.correct) {
      setScore((prev) => prev + 20);
      toast.success("✅ Correct! +20 points");
      addPointsToUser(); // Persist points
    } else {
      toast.error("❌ Wrong answer!");
    }

    setTimeout(() => {
      if (currentIndex + 1 < questions.length) {
        setCurrentIndex((prev) => prev + 1);
        setSelected(null);
      } else {
        setCompleted(true);
      }
    }, 800);
  };

  const resetQuiz = () => {
    setCurrentIndex(0);
    setScore(0);
    setSelected(null);
    setCompleted(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 flex flex-col items-center justify-center px-4 py-10">
      <div className="max-w-xl w-full bg-white shadow-2xl rounded-3xl p-8 text-center">
        <h1 className="text-4xl font-bold text-gray-800 mb-6">🎯 React MCQ Quiz</h1>

        <div className="mb-4 text-lg font-medium text-purple-600">
          Your Credits: <span className="font-bold">{userCredit}</span>
        </div>

        {!completed ? (
          <AnimatePresence mode="wait">
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -30 }}
              transition={{ duration: 0.3 }}
            >
              <h2 className="text-xl font-semibold text-gray-700 mb-4">
                {currentIndex + 1}. {questions[currentIndex].question}
              </h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {questions[currentIndex].options.map((option) => (
                  <button
                    key={option}
                    onClick={(e) => handleAnswer(option, e)}
                    disabled={selected !== null}
                    className={`px-4 py-3 rounded-xl border font-medium transition-all duration-300 ${
                      selected === option
                        ? option === questions[currentIndex].correct
                          ? "bg-green-500 text-white"
                          : "bg-red-500 text-white"
                        : "bg-white hover:bg-purple-50 border-gray-300"
                    }`}
                  >
                    {option}
                  </button>
                ))}
              </div>

              <div className="mt-6 text-gray-600 font-medium">
                Score: <span className="text-purple-600 font-bold">{score}</span> /{" "}
                {questions.length * 20}
              </div>
            </motion.div>
          </AnimatePresence>
        ) : (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ type: "spring", stiffness: 120 }}
          >
            <h2 className="text-2xl font-bold text-gray-700 mb-4">🎉 Quiz Completed!</h2>
            <p className="text-lg text-gray-600 mb-6">
              Your final score is{" "}
              <span className="text-purple-600 font-bold">{score}</span> /{" "}
              {questions.length * 20}
            </p>
            <button
              onClick={resetQuiz}
              className="bg-purple-600 text-white px-6 py-3 rounded-xl font-semibold hover:bg-purple-700 transition-all duration-300"
            >
              Restart Quiz
            </button>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default Notes;
