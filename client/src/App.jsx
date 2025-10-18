import React, { useState } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Navbar from "./components/Navbar";

// Pages
import Home from "./pages/Home";
import About from "./components/About";
import Contact from "./components/Contact";
import Profile from "./pages/MyProfile";
import Reading from "./pages/Reading";
import Premium from "./pages/Premium";
import Resume from "./pages/Resume";
import Notes from "./components/Notes";
import Login from "./components/Login";
import Signup from "./components/Signup";
import Leaderboard from "./pages/Leaderboard";
import Game from "./pages/Game";
import Webdev from "./docs/Webdev";
import AIML from "./docs/AIML";
import MachineLearning from "./docs/MachineLearning";
import Datascience from "./docs/Datascience";
import Interview from "./docs/Interview";
import Project from "./docs/Project";
import RoadMap from "./collection/RoadMap";
import Basic from "./collection/Basic";

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
          <Route path="/profile" element={<Profile />} />
          <Route path="/reading" element={<Reading />} />
          <Route path="/premium" element={<Premium />} />
          <Route path="/resume" element={<Resume />} />
          <Route path="/notes" element={<Notes />} />
          <Route path="/leaderboard" element={<Leaderboard />} />
          <Route path="/game" element={<Game />} />
          <Route path="/webdev" element={<Webdev />} />
          <Route path="/ai-ml" element={<AIML />} />
          <Route path="/ml-projects" element={<MachineLearning />} />
          <Route path="/data-science" element={<Datascience />} />
          <Route path="/interview-prep" element={<Interview/>} />
          <Route path="/projects-practices" element={<Project/>} />
          <Route path="/roadmap" element={<RoadMap/>} />
          <Route path="/basic" element={<Basic/>} />

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

      <footer className="bg-gray-900 text-white text-center py-4 mt-8">
        <p className="text-sm">
          © {new Date().getFullYear()}{" "}
          <span className="text-indigo-400 font-medium">Sangram Das</span> — All Rights Reserved.
        </p>
      </footer>
    </div>
  );
};

export default App;
