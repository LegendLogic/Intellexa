import React from "react";
import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 px-4">
      <h1 className="text-6xl font-bold text-gray-800 mb-4">404</h1>
      <p className="text-xl text-gray-600 mb-6">Oops! Page not found.</p>
      <Link
        to="/"
        className="bg-indigo-600 text-white px-6 py-3 rounded hover:bg-indigo-700 transition"
      >
        Go to Home
      </Link>
    </div>
  );
};

export default NotFound;
