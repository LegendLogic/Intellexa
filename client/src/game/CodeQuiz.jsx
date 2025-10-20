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
  const { user, setUser } = useContext(AuthContext);
  const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

  // ✅ Fetch quiz questions
  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const res = await axios.get(`${BACKEND_URL}/api/quiz/all`);
        if (Array.isArray(res.data)) setQuestions(res.data);
      } catch (err) {
        console.error("Error fetching quiz questions:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchQuestions();
  }, [BACKEND_URL]);

  // ✅ Handle answer click
  const handleAnswer = async (option) => {
    if (!questions[index] || submitting) return;

    setSubmitting(true);
    setSelectedOption(option);

    try {
      const { _id: questionId } = questions[index];

      // 🔹 Get token either from context or localStorage
      const token = user?.token || localStorage.getItem("token");

      if (!token) {
        setMessage("⚠️ You must be logged in to earn points.");
        setFeedback("wrong");
        setSubmitting(false);
        return;
      }

      const res = await axios.put(
        `${BACKEND_URL}/api/quiz/add-point`,
        { questionId, selectedOption: option },
        {
          withCredentials: true,
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (res.data?.success) {
        setMessage(res.data.message || "");

        if (res.data.correct) {
          setScore((prev) => prev + 1);
          setFeedback("correct");

          if (res.data.updatedUser) {
            // ✅ Update context & localStorage with updated points
            setUser(res.data.updatedUser);
            localStorage.setItem("user", JSON.stringify(res.data.updatedUser));
          }
        } else {
          setFeedback("wrong");
        }
      } else {
        setFeedback("wrong");
        setMessage(res.data?.message || "Incorrect answer.");
      }
    } catch (error) {
      console.error("Error submitting answer:", error);
      setFeedback("wrong");
      setMessage(error.response?.data?.message || "Something went wrong.");
    }

    // ⏳ Move to next question after delay
    setTimeout(() => {
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
    }, 1500);
  };

  // ✅ Loading / no questions / finished states
  if (loading)
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-lg text-gray-500">Loading quiz questions...</p>
      </div>
    );

  if (!questions.length)
    return (
      <div className="min-h-screen flex items-center justify-center text-gray-500">
        No quiz questions found.
      </div>
    );

  if (finished)
    return (
      <div className="min-h-screen flex flex-col items-center justify-center text-center px-4">
        <h2 className="text-3xl font-bold mb-4">Quiz Complete!</h2>
        <p className="text-xl mb-2">
          🎉 You scored {score}/{questions.length}!
        </p>
        {user ? (
          <p className="text-green-600 mb-2">
            ✅ Points have been added automatically!
          </p>
        ) : (
          <p className="text-yellow-500 mb-2">
            ⚠️ Login next time to earn points.
          </p>
        )}
        <p className="text-gray-400 text-sm">Redirecting to game page...</p>
      </div>
    );

  const current = questions[index];

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 bg-gradient-to-b from-indigo-50 to-white">
      <div className="bg-white shadow-lg rounded-xl p-6 w-full max-w-md">
        {/* ✅ User Info */}
        {user && (
          <div className="mb-4 p-3 bg-indigo-100 rounded-lg text-center">
            <p className="text-gray-700 font-medium">
              Logged in as: <span className="font-bold">{user.name}</span>
            </p>
            <p className="text-gray-600 text-sm">
              Total Points: <span className="font-semibold">{user.points}</span>
            </p>
          </div>
        )}

        {/* ✅ Question */}
        <h2 className="text-2xl font-semibold mb-6 text-center">{current.question}</h2>

        {/* ✅ Options */}
        <div className="flex flex-col gap-4">
          {current.options.map((option) => {
            let bgColor = "bg-blue-500 hover:bg-blue-600";
            if (selectedOption) {
              if (option === selectedOption && feedback === "wrong") bgColor = "bg-red-500";
              else if (option === selectedOption && feedback === "correct") bgColor = "bg-green-500";
              else bgColor = "bg-gray-300 cursor-not-allowed";
            }

            return (
              <button
                key={option}
                onClick={() => handleAnswer(option)}
                disabled={submitting || selectedOption !== null}
                className={`px-6 py-2 rounded text-white font-medium transition-colors ${bgColor}`}
              >
                {option}
              </button>
            );
          })}
        </div>

        {/* ✅ Feedback message */}
        {message && (
          <p
            className={`mt-4 text-center text-sm font-medium ${
              feedback === "correct"
                ? "text-green-600"
                : feedback === "wrong"
                ? "text-red-500"
                : "text-gray-500"
            }`}
          >
            {message}
          </p>
        )}

        {/* ✅ Progress */}
        <p className="mt-4 text-gray-500 text-sm text-center">
          Question {index + 1} of {questions.length}
        </p>
      </div>
    </div>
  );
};

export default CodeQuiz;
