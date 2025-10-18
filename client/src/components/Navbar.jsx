import React, { useState, useEffect, useContext } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { AuthContext } from "../context/AuthContext";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { isAuth, logout } = useContext(AuthContext);

  // Disable scroll when mobile menu is open
  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "auto";
    return () => (document.body.style.overflow = "auto");
  }, [isOpen]);

  // Detect scroll
  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleLogout = () => {
    logout();
    navigate("/login");
    setIsOpen(false);
  };

  const closeMenu = () => setIsOpen(false);

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "Reading", path: "/reading" },
    { name: "Premium", path: "/premium" },
    { name: "Resume", path: "/resume" },
    { name: "Leaderboard", path: "/leaderboard" },
    { name: "Game", path: "/game" },
  ];

  const protectedPaths = ["/reading", "/resume", "/game" ];

  const handleNavClick = (path) => {
    if (protectedPaths.includes(path) && !isAuth) {
      navigate("/login");
    } else {
      navigate(path);
    }
    closeMenu();
  };

  return (
    <>
      <header
        className={`fixed top-0 z-50 w-full transition-all duration-500 ${
          isScrolled ? "bg-white/90 shadow-md backdrop-blur-md" : "bg-transparent"
        }`}
      >
        <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 py-3 flex items-center justify-between">
          {/* Logo */}
          <Link
            to="/"
            className="text-xl sm:text-2xl font-bold text-indigo-600 z-50"
            onClick={closeMenu}
          >
            Intellexa..,
          </Link>

          {/* Desktop Links */}
          <div className="hidden md:flex items-center space-x-6 font-medium text-gray-700">
            {navLinks.map((link, i) => (
              <button
                key={i}
                onClick={() => handleNavClick(link.path)}
                className={`px-3 py-2 rounded hover:text-indigo-600 transition ${
                  location.pathname === link.path ? "text-indigo-600 font-semibold" : ""
                }`}
              >
                {link.name}
              </button>
            ))}

            {isAuth ? (
              <button
                onClick={handleLogout}
                className="px-3 py-2 text-red-600 rounded hover:bg-red-50 transition"
              >
                Logout
              </button>
            ) : (
              <button
                onClick={() => handleNavClick("/login")}
                className="px-3 py-2 text-indigo-600 rounded hover:bg-indigo-50 transition"
              >
                Login
              </button>
            )}
          </div>

          {/* Mobile Hamburger */}
          <button
            className="md:hidden text-gray-700 text-2xl focus:outline-none z-50 relative"
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle menu"
          >
            {isOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </nav>
      </header>

      {/* Mobile Menu Overlay */}
      {isOpen && <div className="fixed inset-0 bg-black/40 backdrop-blur-sm z-40" onClick={closeMenu} />}

      {/* Mobile Menu */}
      <div
        className={`fixed top-0 left-0 h-full w-64 bg-white shadow-lg transform transition-transform duration-300 ease-in-out z-50 ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex items-center justify-between px-4 py-3 border-b">
          <h2 className="text-lg font-semibold text-indigo-600">Menu</h2>
          <button
            className="text-gray-600 text-2xl hover:text-gray-800 transition"
            onClick={closeMenu}
            aria-label="Close menu"
          >
            <X size={24} />
          </button>
        </div>

        <div className="flex flex-col mt-4 space-y-2 px-4 font-medium text-gray-700">
          {navLinks.map((link, i) => (
            <button
              key={i}
              onClick={() => handleNavClick(link.path)}
              className={`px-3 py-2 rounded hover:bg-gray-100 transition ${
                location.pathname === link.path ? "text-indigo-600 font-semibold bg-gray-100" : ""
              }`}
            >
              {link.name}
            </button>
          ))}

          {isAuth ? (
            <button
              onClick={handleLogout}
              className="px-3 py-2 text-left text-red-600 rounded hover:bg-red-50 transition mt-2"
            >
              Logout
            </button>
          ) : (
            <button
              onClick={() => handleNavClick("/login")}
              className="px-3 py-2 text-indigo-600 rounded hover:bg-indigo-50 transition mt-2"
            >
              Login
            </button>
          )}
        </div>
      </div>
    </>
  );
};

export default Navbar;
