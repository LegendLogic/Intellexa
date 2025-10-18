import React, { useState } from "react";
import Reward from "../components/Reward";

const Game = () => {
  const [randomNumber, setRandomNumber] = useState(
    Math.floor(Math.random() * 100) + 1
  );
  const [guess, setGuess] = useState("");
  const [message, setMessage] = useState("Guess a number between 1 and 100!");
  const [attempts, setAttempts] = useState(0);

  const handleGuess = () => {
    const num = parseInt(guess);
    if (isNaN(num)) {
      setMessage("Please enter a valid number!");
      return;
    }
    setAttempts(attempts + 1);

    if (num === randomNumber) {
      setMessage(`🎉 Congratulations! You guessed it in ${attempts + 1} attempts!`);
    } else if (num < randomNumber) {
      setMessage("⬆️ Too low! Try a higher number.");
    } else {
      setMessage("⬇️ Too high! Try a lower number.");
    }

    setGuess("");
  };

  const handleReset = () => {
    setRandomNumber(Math.floor(Math.random() * 100) + 1);
    setGuess("");
    setMessage("Guess a number between 1 and 100!");
    setAttempts(0);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center px-6 py-12">
      <Reward/>
      <div className="bg-white shadow-lg rounded-2xl p-8 max-w-md w-full text-center">
        <h1 className="text-3xl font-bold text-gray-800 mb-4">Guess the Number Game</h1>
        <p className="text-gray-600 mb-6">{message}</p>

        <input
          type="number"
          value={guess}
          onChange={(e) => setGuess(e.target.value)}
          placeholder="Enter your guess"
          className="w-full px-4 py-2 border rounded-lg mb-4 focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />

        <div className="flex justify-between gap-4">
          <button
            onClick={handleGuess}
            className="flex-1 bg-indigo-600 text-white py-2 rounded-lg hover:bg-indigo-700 transition duration-200"
          >
            Guess
          </button>
          <button
            onClick={handleReset}
            className="flex-1 bg-gray-300 text-gray-700 py-2 rounded-lg hover:bg-gray-400 transition duration-200"
          >
            Reset
          </button>
        </div>

        <p className="text-gray-500 mt-4">Attempts: {attempts}</p>
      </div>
      
    </div>
  );
};

export default Game;
