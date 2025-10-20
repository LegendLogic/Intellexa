import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import {
  Brain,
  Zap,
  Code,
  Puzzle,
  Layers,
  Target,
  Cpu,
  Database,
  Compass,
  Shuffle,
} from "lucide-react";

const games = [
  {
    id: 1,
    title: "Sorting Visualizer",
    description: "Visualize algorithms like Bubble, Merge, and Quick Sort in action.",
    icon: <Layers className="w-8 h-8 text-purple-500" />,
    path: "/games/sorting-visualizer",
  },
  {
    id: 2,
    title: "Pathfinder Game",
    description: "Find the shortest path using Dijkstra or A* algorithm.",
    icon: <Compass className="w-8 h-8 text-green-500" />,
    path: "/games/pathfinder",
  },
  {
    id: 3,
    title: "Binary Search Challenge",
    description: "Guess the number with minimum attempts using Binary Search logic.",
    icon: <Target className="w-8 h-8 text-blue-500" />,
    path: "/games/binary-search",
  },
  {
    id: 4,
    title: "Recursion Maze",
    description: "Solve puzzles using recursion — step by step exploration.",
    icon: <Brain className="w-8 h-8 text-pink-500" />,
    path: "/games/recursion-maze",
  },
  {
    id: 5,
    title: "Dynamic Programming Grid",
    description: "Collect maximum coins in a grid using DP techniques.",
    icon: <Database className="w-8 h-8 text-orange-500" />,
    path: "/games/dp-grid",
  },
  {
    id: 6,
    title: "Graph Explorer",
    description: "Traverse nodes using BFS and DFS visualizations.",
    icon: <Cpu className="w-8 h-8 text-red-500" />,
    path: "/games/graph-explorer",
  },
  {
    id: 7,
    title: "String Matcher",
    description: "Find patterns using KMP and Rabin-Karp algorithms.",
    icon: <Code className="w-8 h-8 text-yellow-500" />,
    path: "/games/string-matcher",
  },
  {
    id: 8,
    title: "Number Theory Quest",
    description: "Play with primes, GCD, and modular arithmetic.",
    icon: <Zap className="w-8 h-8 text-indigo-500" />,
    path: "/games/number-theory",
  },
  {
    id: 9,
    title: "Puzzle Sorter",
    description: "Arrange puzzle pieces using sorting algorithms.",
    icon: <Puzzle className="w-8 h-8 text-teal-500" />,
    path: "/games/puzzle-sorter",
  },
  {
    id: 10,
    title: "Shuffle and Search",
    description: "Find hidden patterns in randomized data arrays.",
    icon: <Shuffle className="w-8 h-8 text-rose-500" />,
    path: "/games/shuffle-search",
  },
];

const AlgorithmChallenge = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-pink-50 py-12 px-6">
      <div className="max-w-6xl mt-10 mx-auto text-center">
        <h1 className="text-4xl font-bold text-gray-800 mb-10">
          🧠 Algorithm Challenge Hub
        </h1>
        <p className="text-lg text-gray-600 mb-12">
          Master your problem-solving skills through interactive algorithm games and visual challenges.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {games.map((game, index) => (
            <motion.div
              key={game.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white shadow-lg rounded-2xl p-6 hover:shadow-2xl transition-all duration-300"
            >
              <div className="flex justify-center mb-4">{game.icon}</div>
              <h2 className="text-xl font-semibold text-gray-800 mb-2">{game.title}</h2>
              <p className="text-gray-600 mb-4">{game.description}</p>
              <Link
                to={game.path}
                className="inline-block px-5 py-2 bg-purple-600 text-white rounded-xl font-medium hover:bg-purple-700 transition"
              >
                Play Now
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AlgorithmChallenge;
