import React, { useState } from "react";
import Reward from "../components/Reward";
import Notes from "../components/Notes";

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
      
      <Notes/>
      
    </div>
  );
};

export default Game;
