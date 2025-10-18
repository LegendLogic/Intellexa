import React, { useState } from "react";
import { NavLink } from "react-router-dom";

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "About", path: "/about" },
    { name: "Contact", path: "/contact" },
    { name: "Profile", path: "/profile" },
    { name: "Reading", path: "/reading" },
    { name: "Premium", path: "/premium" },
    { name: "Resume", path: "/resume" },
    { name: "Game", path: "/game" },
    { name: "Article", path: "/article" },
  ];

  return (
    <header className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        {/* Branding */}
        <NavLink to="/" className="text-2xl font-bold text-indigo-600">
          MyPortfolio
        </NavLink>

        {/* Hamburger for Mobile */}
        <button
          className="md:hidden text-gray-700 text-2xl"
          onClick={() => setIsOpen(!isOpen)}
        >
          <i className="fas fa-bars"></i>
        </button>

        {/* Navigation Links */}
        <nav
          className={`${
            isOpen ? "block" : "hidden"
          } md:flex space-y-3 md:space-y-0 md:space-x-6 mt-3 md:mt-0 text-gray-700 font-medium`}
        >
          {navLinks.map((link, index) => (
            <NavLink
              key={index}
              to={link.path}
              className={({ isActive }) =>
                `block md:inline hover:text-indigo-600 ${
                  isActive ? "text-indigo-600 font-semibold" : ""
                }`
              }
              onClick={() => setIsOpen(false)}
            >
              {link.name}
            </NavLink>
          ))}
        </nav>
      </div>
    </header>
  );
};

export default Header;
