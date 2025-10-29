import React from "react";
import { Link } from "react-router-dom";
import { Code2, Bug, Brain, Cpu, Globe } from "lucide-react";
import Notes from "../components/Notes";
import Reward from "../components/Reward";
import TakeNote from "../components/TakeNote";

const games = [
  {
    title: "Code Quiz",
    path: "/game/code-quiz",
    icon: <Brain className="w-8 h-8" />,
    desc: "Test your coding basics with short quizzes!",
    gradient: "from-blue-500 to-cyan-400",
    shadow: "shadow-blue-500/50",
  },
  {
    title: "Debug the Code",
    path: "/game/debug",
    icon: <Bug className="w-8 h-8" />,
    desc: "Find and fix the errors in given code snippets.",
    gradient: "from-rose-500 to-pink-500",
    shadow: "shadow-rose-500/50",
  },
  {
    title: "Guess the Output",
    path: "/game/guess-output",
    icon: <Code2 className="w-8 h-8" />,
    desc: "Predict the result of tricky JavaScript code.",
    gradient: "from-emerald-500 to-teal-400",
    shadow: "shadow-emerald-500/50",
  },
  {
    title: "Algorithm Challenge",
    path: "/game/algo-challenge",
    icon: <Cpu className="w-8 h-8" />,
    desc: "Solve small algorithmic puzzles & earn points.",
    gradient: "from-purple-500 to-indigo-500",
    shadow: "shadow-purple-500/50",
  },
  {
    title: "Tech Trivia Wheel",
    path: "/game/tech-wheel",
    icon: <Globe className="w-8 h-8" />,
    desc: "Spin the wheel to answer random tech trivia!",
    gradient: "from-amber-500 to-orange-400",
    shadow: "shadow-amber-500/50",
  },
];

const Game = () => {
  return (
    <div className="min-h-screen flex flex-col items-center py-12 px-6"
    style={{
    background:
      "radial-gradient(circle 600px at 60% 20%, rgba(249,115,22,0.25), transparent 70%), radial-gradient(circle 800px at 10% 80%, rgba(255,56,0,0.15), transparent 70%), #0e0b11",
  }}
    >
      <Notes/>
      <div className="text-center mt-10 mb-12">
        
        <h1 className="text-5xl font-bold mb-4 bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
          💻 Tech Skill Games
        </h1>
        <p className="text-gray-300 text-lg">Choose your challenge and level up your skills!</p>
      </div>
      
      <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3 max-w-6xl">
        {games.map((g) => (
          <Link
            key={g.title}
            to={g.path}
            className="group relative bg-white/10 backdrop-blur-lg border border-white/20 rounded-2xl p-6 hover:scale-105 hover:shadow-2xl transition-all duration-300 flex flex-col items-center overflow-hidden"
          >
            <div className={`absolute inset-0 bg-gradient-to-br ${g.gradient} opacity-0 group-hover:opacity-20 transition-opacity duration-300`}></div>
            
            <div className={`relative p-4 rounded-full bg-gradient-to-br ${g.gradient} shadow-lg ${g.shadow} mb-4 group-hover:scale-110 transition-transform duration-300`}>
              <div className="text-white">{g.icon}</div>
            </div>
            
            <h2 className="relative mt-2 text-2xl font-bold text-white group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:bg-clip-text group-hover:from-cyan-300 group-hover:to-pink-300 transition-all duration-300">
              {g.title}
            </h2>
            
            <p className="relative text-gray-300 text-sm mt-3 text-center leading-relaxed">
              {g.desc}
            </p>
            
            <div className={`absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r ${g.gradient} transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300`}></div>
          </Link>
        ))}
      </div>
      <Reward/>
      <TakeNote/>
      
    </div>
  );
};

export default Game;