import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Award, Brain, Code, Database, Sparkles, Trophy, User, Zap, AlertCircle } from "lucide-react";
import axios from "axios";

const Notes = () => {
  const BASE_URL = import.meta.env.VITE_BACKEND_URL || "http://localhost:5000";
  
  // Expanded quiz categories with more questions
  const quizCategories = {
    React: [
      { id: 1, question: "Which hook is used for side effects in React?", options: ["useState", "useEffect", "useRef", "useMemo"], correct: "useEffect" },
      { id: 2, question: "What does React use to manage component data?", options: ["Props", "State", "Functions", "Variables"], correct: "State" },
      { id: 3, question: "What is JSX in React?", options: ["JavaScript XML", "Java Syntax Extension", "JavaScript Extension", "JSON XML"], correct: "JavaScript XML" },
      { id: 4, question: "Which method is used to update state in class components?", options: ["updateState()", "setState()", "changeState()", "modifyState()"], correct: "setState()" },
      { id: 5, question: "What is the Virtual DOM?", options: ["A copy of the real DOM", "A database", "A framework", "A library"], correct: "A copy of the real DOM" },
      { id: 6, question: "Which hook replaces componentDidMount?", options: ["useState", "useEffect", "useContext", "useReducer"], correct: "useEffect" },
      { id: 7, question: "What are React fragments used for?", options: ["Grouping elements without extra nodes", "Styling", "Routing", "State management"], correct: "Grouping elements without extra nodes" },
      { id: 8, question: "What is prop drilling?", options: ["Passing props through multiple levels", "Drilling holes in components", "A design pattern", "A build tool"], correct: "Passing props through multiple levels" },
    ],
    JavaScript: [
      { id: 1, question: "Which keyword declares a block-scoped variable?", options: ["var", "let", "const", "function"], correct: "let" },
      { id: 2, question: "What is a closure in JavaScript?", options: ["A function inside a function", "A variable scope", "An object method", "None"], correct: "A function inside a function" },
      { id: 3, question: "What does '===' check in JavaScript?", options: ["Value only", "Type only", "Value and type", "Reference"], correct: "Value and type" },
      { id: 4, question: "Which method adds an element to the end of an array?", options: ["push()", "pop()", "shift()", "unshift()"], correct: "push()" },
      { id: 5, question: "What is the output of 'typeof null'?", options: ["null", "undefined", "object", "error"], correct: "object" },
      { id: 6, question: "What is a Promise in JavaScript?", options: ["An async operation result", "A variable type", "A function", "A loop"], correct: "An async operation result" },
      { id: 7, question: "Which keyword creates a constant?", options: ["const", "let", "var", "final"], correct: "const" },
      { id: 8, question: "What is the spread operator?", options: ["...", "---", "***", "+++"], correct: "..." },
    ],
    Python: [
      { id: 1, question: "Which data type is immutable in Python?", options: ["List", "Dictionary", "Tuple", "Set"], correct: "Tuple" },
      { id: 2, question: "What is the output of `len('Python')`?", options: ["5", "6", "7", "Error"], correct: "6" },
      { id: 3, question: "Which keyword is used to define a function?", options: ["func", "def", "function", "define"], correct: "def" },
      { id: 4, question: "What is a list comprehension?", options: ["A concise way to create lists", "A loop", "A function", "A class"], correct: "A concise way to create lists" },
      { id: 5, question: "Which operator is used for floor division?", options: ["//", "/", "%", "**"], correct: "//" },
      { id: 6, question: "What does 'self' represent in a class?", options: ["The instance of the class", "A keyword", "A variable", "A function"], correct: "The instance of the class" },
      { id: 7, question: "Which method converts a string to lowercase?", options: ["lower()", "lowercase()", "toLower()", "downcase()"], correct: "lower()" },
      { id: 8, question: "What is a decorator in Python?", options: ["A function modifier", "A variable", "A class", "A module"], correct: "A function modifier" },
    ],
    DataScience: [
      { id: 1, question: "Which library is commonly used for data manipulation in Python?", options: ["NumPy", "Pandas", "Matplotlib", "Seaborn"], correct: "Pandas" },
      { id: 2, question: "What is supervised learning?", options: ["Learning without labels", "Learning with labels", "Learning with clustering", "None"], correct: "Learning with labels" },
      { id: 3, question: "What does 'overfitting' mean?", options: ["Model performs too well on training data", "Model is too simple", "Model is balanced", "None"], correct: "Model performs too well on training data" },
      { id: 4, question: "Which algorithm is used for classification?", options: ["Linear Regression", "Logistic Regression", "K-means", "PCA"], correct: "Logistic Regression" },
      { id: 5, question: "What is a confusion matrix?", options: ["Performance measurement for classification", "A type of plot", "A data structure", "An algorithm"], correct: "Performance measurement for classification" },
      { id: 6, question: "What does 'NaN' stand for?", options: ["Not a Number", "Null and Nil", "New Array Node", "None"], correct: "Not a Number" },
      { id: 7, question: "Which metric is used for regression models?", options: ["Accuracy", "Precision", "RMSE", "F1-score"], correct: "RMSE" },
      { id: 8, question: "What is feature scaling?", options: ["Normalizing data ranges", "Adding features", "Removing features", "Splitting data"], correct: "Normalizing data ranges" },
    ],
  };

  const categoryIcons = {
    React: <Code className="w-5 h-5" />,
    JavaScript: <Zap className="w-5 h-5" />,
    Python: <Brain className="w-5 h-5" />,
    DataScience: <Database className="w-5 h-5" />,
  };

  const categories = Object.keys(quizCategories);

  const [userName, setUserName] = useState("Guest");
  const [userCredit, setUserCredit] = useState(0);
  const [currentCategory, setCurrentCategory] = useState(categories[0]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [selected, setSelected] = useState(null);
  const [completed, setCompleted] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);
  const [streak, setStreak] = useState(0);
  const [showConfetti, setShowConfetti] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [notification, setNotification] = useState({ show: false, message: "", type: "" });

  const questions = quizCategories[currentCategory];

  // Show notification helper
  const showNotification = (message, type = "success") => {
    setNotification({ show: true, message, type });
    setTimeout(() => {
      setNotification({ show: false, message: "", type: "" });
    }, 3000);
  };

  // Fetch user profile from backend
  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        setLoading(true);
        setError(null);
        
        const token = localStorage.getItem("token");
        if (!token) {
          showNotification("⚠️ Please login to continue", "warning");
          setUserName("Guest");
          setUserCredit(0);
          setLoading(false);
          return;
        }

        const res = await axios.get(`${BASE_URL}/api/user/profile`, {
          headers: { 
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json"
          },
        });

        const user = res.data?.user || res.data;
        setUserName(user?.name || "User");
        setUserCredit(user?.creditBalance ?? 0);
        showNotification(`Welcome back, ${user?.name || "User"}! 👋`, "success");
      } catch (err) {
        console.error("Error fetching profile:", err);
        const errorMessage = err.response?.data?.message || "Failed to fetch user profile";
        setError(errorMessage);
        showNotification(`❌ ${errorMessage}`, "error");
        
        // If unauthorized, clear token
        if (err.response?.status === 401) {
          localStorage.removeItem("token");
          setUserName("Guest");
          setUserCredit(0);
        }
      } finally {
        setLoading(false);
      }
    };

    fetchUserProfile();
  }, [BASE_URL]);

  // Add points to user account via backend
  const addPointsToUser = async () => {
    if (isUpdating) return;
    
    try {
      setIsUpdating(true);
      const token = localStorage.getItem("token");
      
      if (!token) {
        showNotification("⚠️ Please login to save points", "warning");
        return;
      }

      const res = await axios.put(
        `${BASE_URL}/api/user/addpoint`, 
        {}, 
        {
          headers: { 
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json"
          },
        }
      );

      const updatedCredit = res.data?.creditBalance ?? res.data?.user?.creditBalance;
      
      if (updatedCredit !== undefined) {
        setUserCredit(updatedCredit);
      } else {
        setUserCredit((prev) => prev + 40);
      }

      showNotification("🎉 +40 points added!", "success");
    } catch (err) {
      console.error("Error adding points:", err);
      const errorMessage = err.response?.data?.message || "Failed to add points";
      showNotification(`⚠️ ${errorMessage}`, "error");
      
      // If unauthorized, prompt login
      if (err.response?.status === 401) {
        localStorage.removeItem("token");
        showNotification("🔒 Session expired. Please login again.", "warning");
      }
    } finally {
      setIsUpdating(false);
    }
  };

  const handleAnswer = async (option) => {
    if (selected) return;

    setSelected(option);
    const currentQ = questions[currentIndex];

    if (option === currentQ.correct) {
      setScore((prev) => prev + 20);
      setStreak((prev) => prev + 1);
      await addPointsToUser();
      
      if (streak >= 2) {
        setShowConfetti(true);
        setTimeout(() => setShowConfetti(false), 2000);
      }
    } else {
      setStreak(0);
    }

    setTimeout(() => {
      if (currentIndex + 1 < questions.length) {
        setCurrentIndex((prev) => prev + 1);
        setSelected(null);
      } else {
        setCompleted(true);
      }
    }, 1000);
  };

  const resetQuiz = () => {
    setCurrentIndex(0);
    setScore(0);
    setSelected(null);
    setCompleted(false);
    setStreak(0);
  };

  const changeCategory = (cat) => {
    setCurrentCategory(cat);
    resetQuiz();
  };

  const progress = ((currentIndex + 1) / questions.length) * 100;

  return (
    <div className="min-h-screen mt-10 flex flex-col items-center justify-center px-4 py-8 relative overflow-hidden">
      {/* Notification Toast */}
      <AnimatePresence>
        {notification.show && (
          <motion.div
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -50 }}
            className={`fixed top-4 right-4 z-50 px-6 py-3 rounded-lg shadow-lg flex items-center gap-2 ${
              notification.type === "success" ? "bg-green-500 text-white" :
              notification.type === "error" ? "bg-red-500 text-white" :
              "bg-transparent text-white"
            }`}
          >
            <AlertCircle className="w-5 h-5" />
            <span className="font-medium">{notification.message}</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Loading State */}
      {loading && (
        <div className="fixed inset-0 bg-transparent backdrop-blur-sm z-40 flex items-center justify-center">
          <div className="bg-white rounded-2xl p-8 flex flex-col items-center gap-4">
            <div className="w-16 h-16 border-4 border-purple-600  rounded-full animate-spin"></div>
            <p className="text-gray-700 font-medium">Loading your profile...</p>
          </div>
        </div>
      )}
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-72 h-72 bg-white/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-purple-300/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
      </div>

      {/* Confetti effect */}
      {showConfetti && (
        <div className="fixed inset-0 pointer-events-none z-50 flex items-center justify-center">
          {[...Array(30)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-3 h-3 rounded-full"
              style={{
                background: ['#f59e0b', '#ef4444', '#10b981', '#3b82f6', '#8b5cf6'][i % 5],
                left: '50%',
                top: '50%',
              }}
              initial={{ scale: 0, x: 0, y: 0 }}
              animate={{
                scale: [0, 1, 0],
                x: (Math.random() - 0.5) * 400,
                y: (Math.random() - 0.5) * 400,
              }}
              transition={{ duration: 1.5, ease: "easeOut" }}
            />
          ))}
        </div>
      )}

      <div className="max-w-4xl w-full bg-transparent overflow-hidden relative z-10"
      
      >
        {/* Header Section */}
        <div className=" p-6 text-white"
      
        >
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <div className="p-3 rounded-full">
                <User className="w-6 h-6" />
              </div>
              <div>
                <h1 className="text-2xl text-amber-300 font-bold">Welcome, <span className="text-red-600">{userName}!</span></h1>
                <p className="text-purple-100 text-sm">Keep learning, keep growing 🚀</p>
              </div>
            </div>
            <div className="text-right">
              <div className="flex items-center gap-2 ml-20 bg-white/20 px-4 py-2 rounded-full">
                <Sparkles className="w-5 h-5 text-yellow-300" />
                <span className="text-2xl text-red-700 font-bold">{userCredit}</span>
                {isUpdating && (
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                    className="w-4 h-4 border-2 border-white border-t-transparent rounded-full"
                  />
                )}
              </div>
              <p className="text-bold text-purple-100 mt-1">Total Credits</p>
            </div>
          </div>

          {/* Streak indicator */}
          {streak > 0 && (
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              className="flex items-center gap-2 bg-orange-500/30 px-3 py-1 rounded-full w-fit"
            >
              <Zap className="w-4 h-4" />
              <span className="text-sm font-semibold">{streak} Streak! 🔥</span>
            </motion.div>
          )}
        </div>

        <div className="p-8">
          {/* Category Selection */}
          <div className="mb-8">
            <h2 className="text-lg font-semibold text-gray-700 mb-4 flex items-center gap-2">
              <Trophy className="w-5 h-5 text-purple-600" />
              <span className="text-white">Choose Your Challenge</span>
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => changeCategory(cat)}
                  className={`p-4 rounded-xl font-semibold transition-all transform hover:scale-105 flex flex-col items-center gap-2 ${
                    currentCategory === cat
                      ? "bg-gradient-to-br bg-transparent border text-white hover:bg-amber-600"
                      : "bg-transparent border text-white hover:bg-a"
                  }`}
                >
                  {categoryIcons[cat]}
                  <span className="text-sm">{cat}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Progress Bar */}
          {!completed && (
            <div className="mb-6">
              <div className="flex justify-between text-sm text-gray-600 mb-2">
                <span>Question {currentIndex + 1} of {questions.length}</span>
                <span className="font-semibold text-purple-600">{Math.round(progress)}%</span>
              </div>
              <div className="h-3 bg-amber-400 rounded-full overflow-hidden">
                <motion.div
                  className="h-full "
                  style={{
        background:
          "radial-gradient(circle 600px at 60% 20%, rgba(249,115,22,0.25), transparent 70%), radial-gradient(circle 800px at 10% 80%, rgba(255,56,0,0.15), transparent 70%), #0e0b11",
      }}
                  initial={{ width: 0 }}
                  animate={{ width: `${progress}%` }}
                  transition={{ duration: 0.5 }}
                />
              </div>
            </div>
          )}

          {/* Quiz Section */}
          {!completed ? (
            <AnimatePresence mode="wait">
              <motion.div
                key={currentIndex}
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -50 }}
                transition={{ duration: 0.3 }}
              >
                <div className="bg-amber-600 rounded-2xl mb-6">
                  <h2 className="text-xl font-bold text-white mb-2 ml-2">
                    {questions[currentIndex].question}
                  </h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                  {questions[currentIndex].options.map((option, idx) => {
                    const isCorrect = option === questions[currentIndex].correct;
                    const isSelected = selected === option;
                    const letters = ['A', 'B', 'C', 'D'];

                    return (
                      <motion.button
                        key={option}
                        onClick={() => handleAnswer(option)}
                        disabled={selected !== null}
                        whileHover={selected === null ? { scale: 1.02 } : {}}
                        whileTap={selected === null ? { scale: 0.98 } : {}}
                        className={`p-4 rounded-xl border-2 font-medium transition-all duration-300 text-white flex items-center gap-3 ${
                          isSelected
                            ? isCorrect
                              ? "bg-green-500  text-white border-green-600 shadow-lg"
                              : "bg-red-500 text-white border-red-600 shadow-lg"
                            : " hover:bg-amber-500 border-gray-300 hover:border-purple-400"
                        } ${selected !== null && !isSelected ? "opacity-40" : ""}`}
                      >
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm ${
                          isSelected
                            ? isCorrect
                              ? "bg-green-600"
                              : "bg-red-600"
                            : "bg-purple-100 text-purple-600"
                        }`}>
                          {letters[idx]}
                        </div>
                        <span>{option}</span>
                      </motion.button>
                    );
                  })}
                </div>

                <div className="flex items-center justify-between bg-amber-500  rounded-xl">
                  <div className="flex items-center gap-2">
                    <Award className="w-5 h-5 text-purple-600" />
                    <span className="text-gray-700 font-medium">Current Score:</span>
                  </div>
                  <span className="text-2xl font-bold text-purple-600">
                    {score} <span className="text-sm text-gray-600">/ {questions.length * 20}</span>
                  </span>
                </div>
              </motion.div>
            </AnimatePresence>
          ) : (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ type: "spring", stiffness: 150 }}
              className="text-center"
            >
              <div className="bg-gradient-to-br from-purple-500 to-pink-500 text-white p-12 rounded-3xl mb-6">
                <Trophy className="w-20 h-20 mx-auto mb-4" />
                <h2 className="text-3xl font-bold mb-2">Quiz Completed! 🎉</h2>
                <p className="text-purple-100 mb-6">Great job on finishing the {currentCategory} quiz!</p>
                
                <div className="bg-white/20 backdrop-blur-sm rounded-2xl p-6 mb-4">
                  <p className="text-5xl font-bold mb-2">{score}</p>
                  <p className="text-lg">out of {questions.length * 20} points</p>
                  <div className="mt-4 text-sm">
                    <p>Correct Answers: {score / 20} / {questions.length}</p>
                    <p>Accuracy: {Math.round((score / (questions.length * 20)) * 100)}%</p>
                  </div>
                </div>

                <button
                  onClick={resetQuiz}
                  className="bg-white text-purple-600 px-8 py-3 rounded-xl font-bold hover:bg-purple-50 transition-all duration-300 transform hover:scale-105 shadow-lg"
                >
                  Try Again
                </button>
              </div>

              <p className="text-gray-600">
                Ready for another challenge? Choose a different category above!
              </p>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Notes;