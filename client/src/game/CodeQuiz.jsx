import React, { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { AuthContext } from "../context/AuthContext";

const CodeQuiz = () => {
  const [questions, setQuestions] = useState([]);
  const [index, setIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [finished, setFinished] = useState(false);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [selectedOption, setSelectedOption] = useState(null);
  const [feedback, setFeedback] = useState(null);
  const [message, setMessage] = useState("");

  const navigate = useNavigate();
  const { user, setUser, token } = useContext(AuthContext);
  const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

  // Fetch all quiz questions
  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const res = await axios.get(`${BACKEND_URL}/api/quiz/all`);
        setQuestions(Array.isArray(res.data) ? res.data : res.data.questions || []);
      } catch (err) {
        console.error("Error fetching quiz questions:", err);
        setMessage("Failed to load quiz questions.");
      } finally {
        setLoading(false);
      }
    };
    fetchQuestions();
  }, [BACKEND_URL]);

  // Submit answer
  const handleAnswer = async (option) => {
    if (!questions[index] || submitting) return;

    setSubmitting(true);
    setSelectedOption(option);

    const questionId = questions[index]._id;

    if (!token) {
      setMessage("⚠️ You must be logged in to earn points.");
      setFeedback("wrong");
      setTimeout(() => moveToNextQuestion(), 1500);
      return;
    }

    try {
      const res = await axios.post(
        `${BACKEND_URL}/api/quiz/submit-answer`,
        { questionId, selectedOption: option },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = res.data;

      // Feedback
      setFeedback(data.correct ? "correct" : "wrong");
      setMessage(data.message || (data.correct ? "Correct!" : "Incorrect!"));

      if (data.correct) {
        setScore((prev) => prev + 1);

        // Update user points from backend response
        if (data.updatedUser) {
          setUser(data.updatedUser);
          localStorage.setItem("user", JSON.stringify(data.updatedUser));
        }
      }
    } catch (err) {
      console.error("Error submitting answer:", err);
      setFeedback("wrong");
      setMessage("Server error. Answer not recorded.");
    }

    setTimeout(() => moveToNextQuestion(), 1500);
  };

  const moveToNextQuestion = () => {
    const nextIndex = index + 1;
    if (nextIndex < questions.length) {
      setIndex(nextIndex);
      setSelectedOption(null);
      setFeedback(null);
      setMessage("");
    } else {
      setFinished(true);
      setTimeout(() => navigate("/game"), 2500);
    }
    setSubmitting(false);
  };

  if (loading) return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  if (!questions.length)
    return (
      <div className="min-h-screen flex items-center justify-center text-center">
        <p className="text-lg">No quiz questions found.</p>
        <button onClick={() => navigate("/game")} className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
          Go to Game
        </button>
      </div>
    );
  if (finished)
    return (
      <div className="min-h-screen flex flex-col items-center justify-center text-center"
      
      >
        <h2 className="text-3xl font-bold mb-4">Quiz Complete!</h2>
        <p className="text-xl mb-2">🎉 You scored {score}/{questions.length}!</p>
        {user ? <p className="text-green-600 mb-2">✅ Total Points: {user.points}</p> : <p>⚠️ Login next time to earn points.</p>}
        <p className="text-gray-400 text-sm">Redirecting to game page...</p>
      </div>
    );

  const current = questions[index];

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 "
    style={{
    background:
      "radial-gradient(circle 600px at 60% 20%, rgba(249,115,22,0.25), transparent 70%), radial-gradient(circle 800px at 10% 80%, rgba(255,56,0,0.15), transparent 70%), #0e0b11",
  }}>
      <div className=" shadow-lg rounded-xl p-6 w-full max-w-md"
      
      >
        {user && (
          <div className="mb-4 p-3 bg-indigo-100 rounded-lg text-center">
            <p >Logged in as: <strong className="text-amber-600">{user.name}</strong></p>
            <p>Total Points: <strong className="text-amber-400">{user.points || 0}</strong></p>
          </div>
        )}

        <div className="mb-4 text-center">Current Score: <strong className="text-amber-600">{score}</strong></div>
        <h2 className="text-2xl font-semibold mb-6 text-white text-center">{current.question}</h2>

        <div className="flex flex-col gap-4">
          {current.options.map((option) => {
            let bgColor = "bg-white/20 hover:bg-white/20";
            if (selectedOption) {
              if (option === selectedOption && feedback === "correct") bgColor = "bg-green-500";
              else if (option === selectedOption && feedback === "wrong") bgColor = "bg-red-500";
              else if (option === current.correctAnswer) bgColor = "bg-green-400"; // show correct if wrong
              else bgColor = "bg-gray-300 cursor-not-allowed";
            }

            return (
              <button
                key={option}
                onClick={() => handleAnswer(option)}
                disabled={submitting || selectedOption !== null}
                className={`px-6 py-3 rounded text-orange-300 font-medium transition-colors ${bgColor} disabled:cursor-not-allowed`}
              >
                {option}
              </button>
            );
          })}
        </div>

        {message && (
          <p className={`mt-4 text-center text-sm ${feedback === "correct" ? "text-green-600" : feedback === "wrong" ? "text-red-500" : "text-gray-500"}`}>
            {message}
          </p>
        )}

        <p className="mt-4 text-gray-500 text-sm text-center">
          Question {index + 1} of {questions.length}
        </p>
      </div>
    </div>
  );
};

export default CodeQuiz;
