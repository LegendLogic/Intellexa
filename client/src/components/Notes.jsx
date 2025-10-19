import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Notes = () => {
  const BASE_URL = import.meta.env.VITE_BACKEND_URL;

  // Multiple categories with questions
  const quizCategories = {
    React: [
      { id: 1, question: "Which hook is used for side effects in React?", options: ["useState", "useEffect", "useRef", "useMemo"], correct: "useEffect" },
      { id: 2, question: "What does React use to manage component data?", options: ["Props", "State", "Functions", "Variables"], correct: "State" },
    ],
    JavaScript: [
      { id: 1, question: "Which keyword declares a block-scoped variable?", options: ["var", "let", "const", "function"], correct: "let" },
      { id: 2, question: "What is a closure in JavaScript?", options: ["A function inside a function", "A variable scope", "An object method", "None"], correct: "A function inside a function" },
    ],
    Python: [
      { id: 1, question: "Which data type is immutable in Python?", options: ["List", "Dictionary", "Tuple", "Set"], correct: "Tuple" },
      { id: 2, question: "What is the output of `len('Python')`?", options: ["5", "6", "7", "Error"], correct: "6" },
    ],
    DataScience: [
      { id: 1, question: "Which library is commonly used for data manipulation in Python?", options: ["NumPy", "Pandas", "Matplotlib", "Seaborn"], correct: "Pandas" },
      { id: 2, question: "What is supervised learning?", options: ["Learning without labels", "Learning with labels", "Learning with clustering", "None"], correct: "Learning with labels" },
    ],
    AI_ML: [
      { id: 1, question: "What does NLP stand for?", options: ["Natural Language Processing", "Neural Learning Process", "Network Learning Protocol", "None"], correct: "Natural Language Processing" },
      { id: 2, question: "Which algorithm is used for classification?", options: ["Linear Regression", "Decision Tree", "K-Means", "PCA"], correct: "Decision Tree" },
    ],
    WebDev: [
      { id: 1, question: "Which of these is NOT a CSS framework?", options: ["Bootstrap", "Tailwind", "React", "Foundation"], correct: "React" },
      { id: 2, question: "HTML stands for?", options: ["Hyper Text Markup Language", "High Text Machine Language", "Hyper Tool Markup Language", "None"], correct: "Hyper Text Markup Language" },
    ],
    DevOps: [
      { id: 1, question: "Which tool is commonly used for CI/CD?", options: ["Jenkins", "Git", "Docker", "Kubernetes"], correct: "Jenkins" },
      { id: 2, question: "What does Docker use to isolate applications?", options: ["Virtual Machines", "Containers", "Cloud Services", "None"], correct: "Containers" },
    ],
  };

  const categories = Object.keys(quizCategories);

  const [currentCategory, setCurrentCategory] = useState(categories[0]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [selected, setSelected] = useState(null);
  const [completed, setCompleted] = useState(false);
  const [userCredit, setUserCredit] = useState(0);

  const questions = quizCategories[currentCategory];

  useEffect(() => {
    const fetchUserPoints = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await fetch(`${BASE_URL}/api/user/profile`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        const data = await res.json();
        if (res.ok) setUserCredit(data.user.creditBalance);
      } catch (err) {
        console.error("Failed to fetch points:", err);
      }
    };
    fetchUserPoints();
  }, [BASE_URL]);

  const addPointsToUser = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await fetch(`${BASE_URL}/api/user/addpoint`, {
        method: "PUT",
        headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
      });
      const data = await res.json();
      if (res.ok) setUserCredit(data.creditBalance);
      else toast.error("⚠️ " + data.message);
    // eslint-disable-next-line no-unused-vars
    } catch (err) {
      toast.error("⚠️ Could not update points on server");
    }
  };

  const handleAnswer = (option, e) => {
    e.preventDefault();
    if (selected) return;

    setSelected(option);
    const currentQ = questions[currentIndex];

    if (option === currentQ.correct) {
      setScore((prev) => prev + 20);
      toast.success("✅ Correct! +20 points");
      addPointsToUser();
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

  const changeCategory = (category) => {
    setCurrentCategory(category);
    resetQuiz();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 flex flex-col items-center justify-start px-4 py-10">
      <div className="max-w-xl w-full bg-white shadow-2xl rounded-3xl p-8 text-center">
        <h1 className="text-4xl font-bold text-gray-800 mb-6">🎯 Tech Quiz Platform</h1>

        <div className="mb-4 text-lg font-medium text-purple-600">
          Your Credits: <span className="font-bold">{userCredit}</span>
        </div>

        {/* Category Selection */}
        <div className="flex flex-wrap justify-center gap-2 mb-6">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => changeCategory(cat)}
              className={`px-4 py-2 rounded-full font-semibold transition-all ${
                currentCategory === cat ? "bg-purple-600 text-white shadow-lg" : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              {cat}
            </button>
          ))}
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
                {questions[currentIndex].options.map((option) => {
                  const isCorrect = option === questions[currentIndex].correct;
                  const isSelected = selected === option;

                  return (
                    <button
                      key={option}
                      onClick={(e) => handleAnswer(option, e)}
                      disabled={selected !== null}
                      className={`px-4 py-3 rounded-xl border font-medium transition-all duration-300
                        ${isSelected ? (isCorrect ? "bg-green-500 text-white" : "bg-red-500 text-white") : "bg-white hover:bg-purple-50 border-gray-300"}
                      `}
                    >
                      {option}
                    </button>
                  );
                })}
              </div>

              <div className="mt-6 text-gray-600 font-medium">
                Score: <span className="text-purple-600 font-bold">{score}</span> / {questions.length * 20}
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
              Your final score is <span className="text-purple-600 font-bold">{score}</span> / {questions.length * 20}
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
