import React, { useState } from "react";
import axios from "axios";

const questions = [
  { code: `console.log(typeof NaN);`, answer: "number" },
  { code: `[1,2,3] + [4,5,6];`, answer: "1,2,34,5,6" },
  { code: `console.log(0.1 + 0.2 === 0.3);`, answer: "false" },
];

const GuessOutput = () => {
  const [index, setIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [finished, setFinished] = useState(false);

  const checkAnswer = async (ans) => {
    if (ans.trim().toLowerCase() === questions[index].answer.toLowerCase()) {
      setScore(score + 1);
    }

    const next = index + 1;
    if (next < questions.length) setIndex(next);
    else {
      setFinished(true);
      await axios.put("/api/users/addpoint", { points: score * 60 }, { withCredentials: true });
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center">
      {finished ? (
        <h2 className="text-xl font-bold">
          🎉 You got {score}/{questions.length} correct! (+{score * 60} pts)
        </h2>
      ) : (
        <>
          <pre className="bg-gray-900 text-white p-4 rounded-lg mb-4">
            {questions[index].code}
          </pre>
          <input
            type="text"
            placeholder="Enter the output..."
            onKeyDown={(e) => e.key === "Enter" && checkAnswer(e.target.value)}
            className="border p-2 rounded w-80"
          />
        </>
      )}
    </div>
  );
};

export default GuessOutput;
