import React, { useState } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Navbar from "./components/Navbar";

// Pages
import Home from "./pages/Home";
import NotFound from "./pages/NotFound";
import About from "./components/About";
import Contact from "./components/Contact";
import Reading from "./pages/Reading";
import Premium from "./pages/Premium";
import Resume from "./pages/Resume";
import Notes from "./components/Notes";
import Login from "./components/Login";
import Signup from "./components/Signup";
import Leaderboard from "./pages/Leaderboard";
import Webdev from "./docs/Webdev";
import AIML from "./docs/AIML";
import MachineLearning from "./docs/MachineLearning";
import Datascience from "./docs/Datascience";
import Interview from "./docs/Interview";
import Project from "./docs/Project";
import RoadMap from "./collection/RoadMap";
import Basic from "./collection/Basic";
import GameHub from "./game/GameHub";
import CodeQuiz from "./game/CodeQuiz";
import DebugTheCode from "./game/DebugTheCode";
import GuessOutput from "./game/GuessOutput";
import AlgorithmChallenge from "./game/AlgorithmChallenge";
import TechTrivia from "./game/TechTrivia";
import AI from "./pages/AI";
import UserDashboard from "./pages/UserDashboard";
import Footer from "./components/Footer";
import UserProfile from "./pages/UserProfile";
// import AlgorithmChallenge from "./game/AlgorithmChallenge";
// import SortingVisualizer from "./game/";
// import Pathfinder from "./pages/Games/Pathfinder";

const App = () => {
  // ✅ Manage login state globally
  const [, setAuth] = useState(!!localStorage.getItem("token"));

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <Navbar />

      <main className="flex-grow">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/reading" element={<Reading />} />
          <Route path="/premium" element={<Premium />} />
          <Route path="/resume" element={<Resume />} />
          <Route path="/notes" element={<Notes />} />
          <Route path="/leaderboard" element={<Leaderboard />} />
          <Route path="/webdev" element={<Webdev />} />
          <Route path="/ai-ml" element={<AIML />} />
          <Route path="/ml-projects" element={<MachineLearning />} />
          <Route path="/data-science" element={<Datascience />} />
          <Route path="/interview-prep" element={<Interview />} />
          <Route path="/projects-practices" element={<Project />} />
          <Route path="/roadmap" element={<RoadMap />} />
          <Route path="/basic" element={<Basic />} />
          <Route path="/game" element={<GameHub />} />
          <Route path="/game/code-quiz" element={<CodeQuiz />} />
          <Route path="/game/debug" element={<DebugTheCode />} />
          <Route path="/game/guess-output" element={<GuessOutput />} />
          <Route path="/game/algo-challenge" element={<AlgorithmChallenge />} />
          <Route path="/game/tech-wheel" element={<TechTrivia />} />
          <Route path="*" element={<NotFound />} />
          <Route path="/algo" element={<AlgorithmChallenge />} />
          <Route path="/ai" element={<AI/>} />
          <Route path="/dashboard" element={<UserDashboard/>} />
          <Route path="/userprofile" element={<UserProfile/>} />

          {/* <Route path="/algo/sorting-visualizer" element={<SortingVisualizer />} />
          <Route path="/algo/pathfinder" element={<Pathfinder />} /> */}

          {/* ✅ Pass setAuth here */}
          <Route path="/login" element={<Login setAuth={setAuth} />} />
          <Route path="/signup" element={<Signup />} />

          {/* Redirect unknown routes */}
          <Route path="*" element={<Navigate to="/" replace />} />

        </Routes>
      </main>

      <ToastContainer
        position="top-right"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={true}
        closeOnClick
        pauseOnHover
      />

      
      <Footer/>
      
    </div>
  );
};

export default App;
