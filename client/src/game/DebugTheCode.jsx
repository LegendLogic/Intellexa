import React, { useState } from "react";
import axios from "axios";

const snippets = [
  {
    code: `let x = 10
console.log(x + y);`,
    question: "What’s the bug?",
    answer: "y is not defined",
  },
  {
    code: `const arr = [1,2,3];
arr.push(4);
console.log(arr.length = 2);`,
    question: "What happens here?",
    answer: "Assigns 2 to length, truncates array",
  },
  {
    code: `const arr = [1,2,3];
arr.push(4);
console.log(arr.length = 2);`,
    question: "What happens here?",
    answer: "Assigns 2 to length, truncates array",
  },
];

const DebugTheCode = () => {
  const [index, setIndex] = useState(0);
  const [correct, setCorrect] = useState(0);
  const [finished, setFinished] = useState(false);

  const handleAnswer = async (answer) => {
    if (answer.toLowerCase().includes(snippets[index].answer.toLowerCase())) {
      setCorrect(correct + 1);
    }

    const next = index + 1;
    if (next < snippets.length) setIndex(next);
    else {
      setFinished(true);
      await axios.put("/api/users/addpoint", { points: correct * 70 }, { withCredentials: true });
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-6">
      {finished ? (
        <h2 className="text-xl font-semibold">
          ✅ You fixed {correct}/{snippets.length} bugs! (+{correct * 70} pts)
        </h2>
      ) : (
        <>
          <pre className="bg-gray-900 text-white p-4 rounded-lg mb-4">
            {snippets[index].code}
          </pre>
          <p className="mb-4">{snippets[index].question}</p>
          <input
            type="text"
            placeholder="Describe the bug..."
            onKeyDown={(e) => e.key === "Enter" && handleAnswer(e.target.value)}
            className="border p-2 rounded w-80"
          />
        </>
      )}
    </div>
  );
};

export default DebugTheCode;
