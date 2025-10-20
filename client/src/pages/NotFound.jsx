import React from "react";
import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div 
      className="min-h-screen flex flex-col items-center justify-center px-4 relative overflow-hidden"
      style={{
        background:
          "radial-gradient(circle 600px at 60% 20%, rgba(249,115,22,0.25), transparent 70%), radial-gradient(circle 800px at 10% 80%, rgba(255,56,0,0.15), transparent 70%), #0e0b11",
      }}
    >
      {/* Floating orbs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div 
          className="absolute w-96 h-96 rounded-full opacity-20 blur-3xl"
          style={{
            background: "linear-gradient(45deg, #f97316, #ff3800)",
            top: "10%",
            right: "10%",
            animation: "float 8s ease-in-out infinite",
          }}
        />
        <div 
          className="absolute w-80 h-80 rounded-full opacity-10 blur-3xl"
          style={{
            background: "linear-gradient(135deg, #ff3800, #f97316)",
            bottom: "15%",
            left: "15%",
            animation: "float 10s ease-in-out infinite reverse",
          }}
        />
      </div>

      {/* Content */}
      <div className="relative z-10 text-center">
        {/* Glitch effect 404 */}
        <div className="relative inline-block mb-8">
          <h1 
            className="text-9xl font-black text-transparent bg-clip-text relative"
            style={{
              backgroundImage: "linear-gradient(135deg, #f97316 0%, #ff3800 100%)",
              animation: "glitch 3s infinite",
            }}
          >
            404
          </h1>
          <h1 
            className="text-9xl font-black absolute top-0 left-0 opacity-70"
            style={{
              color: "#f97316",
              animation: "glitch-1 2.5s infinite",
              clipPath: "polygon(0 0, 100% 0, 100% 45%, 0 45%)",
            }}
          >
            404
          </h1>
          <h1 
            className="text-9xl font-black absolute top-0 left-0 opacity-70"
            style={{
              color: "#ff3800",
              animation: "glitch-2 3s infinite",
              clipPath: "polygon(0 55%, 100% 55%, 100% 100%, 0 100%)",
            }}
          >
            404
          </h1>
        </div>

        {/* Subheading */}
        <p 
          className="text-2xl text-gray-300 mb-3 font-medium"
          style={{
            animation: "fadeInUp 1s ease-out 0.3s both",
          }}
        >
          Oops! Page Lost in the Void
        </p>
        <p 
          className="text-base text-orange-500 mb-10 max-w-md mx-auto"
          style={{
            animation: "fadeInUp 1s ease-out 0.5s both",
          }}
        >
          The page you're looking for seems to have wandered off into the digital abyss.
        </p>

        {/* CTA Button */}
        <Link
          to="/"
          className="inline-flex items-center gap-2 px-8 py-4 rounded-xl font-semibold text-white relative overflow-hidden group transition-all duration-300 hover:scale-105 hover:shadow-2xl"
          style={{
            background: "linear-gradient(135deg, #f97316 0%, #ff3800 100%)",
            animation: "fadeInUp 1s ease-out 0.7s both",
            boxShadow: "0 10px 40px rgba(249,115,22,0.3)",
          }}
        >
          <span className="relative z-10">Take Me Home</span>
          <svg 
            className="w-5 h-5 relative z-10 transition-transform group-hover:translate-x-1" 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
          </svg>
          <div 
            className="absolute inset-0 bg-white opacity-0 group-hover:opacity-20 transition-opacity duration-300"
          />
        </Link>
      </div>

      {/* CSS Animations */}
      <style>{`
        @keyframes float {
          0%, 100% { transform: translate(0, 0) scale(1); }
          50% { transform: translate(30px, -30px) scale(1.1); }
        }

        @keyframes glitch {
          0%, 100% { transform: translate(0); }
          20% { transform: translate(-2px, 2px); }
          40% { transform: translate(-2px, -2px); }
          60% { transform: translate(2px, 2px); }
          80% { transform: translate(2px, -2px); }
        }

        @keyframes glitch-1 {
          0%, 100% { transform: translate(0); }
          33% { transform: translate(-4px, 0); }
          66% { transform: translate(4px, 0); }
        }

        @keyframes glitch-2 {
          0%, 100% { transform: translate(0); }
          33% { transform: translate(3px, 0); }
          66% { transform: translate(-3px, 0); }
        }

        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  );
};

export default NotFound;