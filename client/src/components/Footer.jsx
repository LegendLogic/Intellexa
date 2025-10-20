import React from "react";
import { Github, Linkedin, Mail, BookOpen, Trophy, Sparkles } from "lucide-react";
import Chatbot from "./Chatbot";

const Footer = () => {
  return (
    <footer className="relative w-full  text-gray-300 pt-16 pb-8 overflow-hidden"
    style={{
        background:
          "radial-gradient(circle 600px at 60% 20%, rgba(249,115,22,0.25), transparent 70%), radial-gradient(circle 800px at 10% 80%, rgba(255,56,0,0.15), transparent 70%), #0e0b11",
      }}
    >
      {/* Animated background elements */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-10 left-10 w-64 h-64 bg-purple-600 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-10 right-10 w-96 h-96 bg-orange-600 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-6">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          {/* Branding Section */}
          <div className="md:col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <Sparkles className="text-orange-300" size={32} />
              <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-400 to-orange-500 bg-clip-text text-transparent">
                Intellexa
              </h1>
            </div>
            <p className="text-gray-400 text-base mb-6 max-w-md">
              Empowering learners worldwide with AI-driven education, interactive experiences, and personalized growth paths. Your journey to excellence starts here.
            </p>
            <div className="flex gap-4 bg">
              <a 
                href="https://github.com/sangramdas00" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="w-10 h-10 flex items-center justify-center rounded-full  hover:bg-orange-600 transition-all duration-300 hover:scale-110"
                aria-label="GitHub"
              >
                <Github className="text-amber-300" size={20} />
              </a>
              <a 
                href="https://linkedin.com/in/sangramdas00" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="w-10 h-10 flex items-center justify-center rounded-full text-orange-300 hover:bg-orange-600 transition-all duration-300 hover:scale-110"
                aria-label="LinkedIn"
              >
                <Linkedin size={20} />
              </a>
              <a 
                href="mailto:sangramdas@example.com" 
                className="w-10 h-10 flex items-center justify-center rounded-full text-orange-300 hover:bg-orange-600 transition-all duration-300 hover:scale-110"
                aria-label="Email"
              >
                <Mail size={20} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white font-semibold text-lg mb-4 flex items-center gap-2">
              <BookOpen size={20} className="text-orange-400" />
              Explore
            </h3>
            <ul className="space-y-3">
              <li>
                <a href="/" className="text-white hover:text-orange-400 transition-colors duration-200 hover:translate-x-1 inline-block">
                  Home
                </a>
              </li>
              <li>
                <a href="/reading" className="text-white hover:text-orange-400 transition-colors duration-200 hover:translate-x-1 inline-block">
                  Reading Hub
                </a>
              </li>
              <li>
                <a href="/game" className="text-white hover:text-orange-400 transition-colors duration-200 hover:translate-x-1 inline-block">
                  Learning Games
                </a>
              </li>
              <li>
                <a href="/ai" className="text-white hover:text-orange-300 transition-colors duration-200 hover:translate-x-1 inline-block">
                  AI Assistant
                </a>
              </li>
            </ul>
          </div>

          {/* Features */}
          <div>
            <h3 className="text-white font-semibold text-lg mb-4 flex items-center gap-2">
              <Trophy size={20} className="text-orange-500" />
              Features
            </h3>
            <ul className="space-y-3">
              <li>
                <a href="/premium" className="text-gray-400 hover:text-orange-400 transition-colors duration-200 hover:translate-x-1 inline-block">
                  Premium Plans
                </a>
              </li>
              <li>
                <a href="/resume" className="text-gray-400 hover:text-orange-400 transition-colors duration-200 hover:translate-x-1 inline-block">
                  Resume Builder
                </a>
              </li>
              <li>
                <a href="/leaderboard" className="text-gray-400 hover:text-orange-400 transition-colors duration-200 hover:translate-x-1 inline-block">
                  Leaderboard
                </a>
              </li>
              <li>
                <a href="/login" className="text-gray-400 hover:text-orange-400 transition-colors duration-200 hover:translate-x-1 inline-block">
                  Login / Sign Up
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-gray-800 mb-8"></div>

        {/* Bottom Bar */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-gray-500 text-sm">
          <p>© {new Date().getFullYear()} Intellexa. All rights reserved.</p>
          <div className="flex gap-6">
            <a href="/privacy" className="hover:text-purple-400 transition-colors duration-200">
              Privacy Policy
            </a>
            <a href="/terms" className="hover:text-purple-400 transition-colors duration-200">
              Terms of Service
            </a>
            <a href="/contact" className="hover:text-purple-400 transition-colors duration-200">
              Contact
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

// Example Hero Section with Corrected Background


// Demo Component
export default function App() {
  return (
    <div >
      <Footer />
      <Chatbot/>
    </div>
  );
}