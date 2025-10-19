import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // ✅ import navigation hook
import axios from "axios";

const questions = [
  {
    q: "Which language is used to style web pages?",
    options: ["HTML", "CSS", "Java", "Python"],
    answer: "CSS",
  },
  {
    q: "Which of the following is not a JavaScript data type?",
    options: ["Undefined", "Boolean", "Float", "Symbol"],
    answer: "Float",
  },
  {
    q: "What does React use to manage UI updates efficiently?",
    options: ["Virtual DOM", "Real DOM", "Shadow DOM", "Document API"],
    answer: "Virtual DOM",
  },
  {
    q: "Which tag is used to create a hyperlink in HTML?",
    options: ["<a>", "<link>", "<href>", "<hyper>"],
    answer: "<a>",
  },
];

const CodeQuiz = () => {
  const [index, setIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [finished, setFinished] = useState(false);
  const navigate = useNavigate(); // ✅ initialize navigation
  const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

  const handleAnswer = async (option) => {
    const correct = option === questions[index].answer;

    if (correct) {
      setScore((prev) => prev + 1);

      // ✅ Add 20 points to authenticated user immediately
      try {
        await axios.put(
          `${BACKEND_URL}/api/user/addpoint`,
          { points: 20 },
          { withCredentials: true }
        );
      } catch (error) {
        console.error("Error adding points:", error);
      }
    }

    // Move to next question or finish
    const next = index + 1;
    if (next < questions.length) {
      setIndex(next);
    } else {
      setFinished(true);

      // ✅ Redirect after short delay
      setTimeout(() => {
        navigate("/game"); // go to home page
      }, 2000); // wait 2 seconds before redirect
    }
  };

  if (finished)
    return (
      <div className="min-h-screen flex flex-col items-center justify-center text-center"
      
      >
        <h2 className="text-2xl font-bold mb-4">Quiz Complete!</h2>
        <p className="text-lg">
          🎉 You scored {score}/{questions.length}!
        </p>
        <p className="text-green-600 mt-2">+{score * 20} Points Added!</p>
        <p className="text-gray-400 mt-3 text-sm">
          Redirecting to home page...
        </p>
      </div>
    );

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4">
      <h2 className="text-2xl font-bold mb-6 text-center">
        {questions[index].q}
      </h2>
      <div className="flex flex-col gap-3 w-full max-w-xs">
        {questions[index].options.map((opt) => (
          <button
            key={opt}
            onClick={() => handleAnswer(opt)}
            className="bg-blue-500 text-white px-6 py-2 rounded hover:bg-blue-600 transition-colors"
          >
            {opt}
          </button>
        ))}
      </div>
    </div>
  );
};

export default CodeQuiz;
