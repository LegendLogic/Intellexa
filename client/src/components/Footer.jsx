import React from "react";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white mt-10">
      <div className="max-w-7xl mx-auto px-6 py-8 flex flex-col md:flex-row items-center justify-between">
        {/* Branding */}
        <div className="mb-4 md:mb-0 text-center md:text-left">
          <h1 className="text-2xl font-bold text-indigo-400">MyPortfolio</h1>
          <p className="text-gray-400 text-sm">Build. Learn. Grow.</p>
        </div>

        {/* Links */}
        <div className="flex space-x-6 mb-4 md:mb-0">
          <a href="/" className="hover:text-indigo-400 transition duration-200">Home</a>
          <a href="/about" className="hover:text-indigo-400 transition duration-200">About</a>
          <a href="/contact" className="hover:text-indigo-400 transition duration-200">Contact</a>
          <a href="/profile" className="hover:text-indigo-400 transition duration-200">Profile</a>
        </div>

        {/* Social Icons */}
        <div className="flex space-x-4">
          <a href="https://github.com/sangramdas00" target="_blank" rel="noopener noreferrer" className="hover:text-indigo-400 transition duration-200 text-2xl">
            <i className="fab fa-github"></i>
          </a>
          <a href="https://linkedin.com/in/sangramdas00" target="_blank" rel="noopener noreferrer" className="hover:text-indigo-400 transition duration-200 text-2xl">
            <i className="fab fa-linkedin"></i>
          </a>
          <a href="mailto:sangramdas@example.com" className="hover:text-indigo-400 transition duration-200 text-2xl">
            <i className="fas fa-envelope"></i>
          </a>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-700 py-4 text-center text-gray-500 text-sm">
        © {new Date().getFullYear()} Sangram Das. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
