import React, { useState, useEffect, useContext } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { AuthContext } from "../context/AuthContext";
import axios from "axios";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [userInfo, setUserInfo] = useState(null);
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

  // Fetch user info
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) return;

        const res = await axios.get("http://localhost:4000/api/user/profile", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setUserInfo(res.data);
      } catch (err) {
        console.error("Error fetching profile:", err);
      }
    };

    if (isAuth) fetchProfile();
  }, [isAuth]);

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

  const protectedPaths = ["/reading", "/resume", "/game"];

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
          isScrolled
            ? "bg-amber-950/95 shadow-md backdrop-blur-md"
            : "bg-transparent"
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
          <div className="hidden md:flex items-center space-x-6 font-medium text-gray-200">
            {navLinks.map((link, i) => (
              <button
                key={i}
                onClick={() => handleNavClick(link.path)}
                className={`px-3 py-2 rounded-md transition ${
                  location.pathname === link.path
                    ? "text-orange-400 font-semibold"
                    : "hover:text-orange-400"
                }`}
              >
                {link.name}
              </button>
            ))}

            {/* User Info */}
            {isAuth && userInfo && (
              <div className="flex items-center gap-3 px-4 py-2 bg-orange-500/20 rounded-full border border-orange-400/30">
                <span className="text-sm font-semibold text-white">
                  {userInfo.name}
                </span>
                <span className="text-sm bg-orange-500 text-white px-3 py-1 rounded-full">
                  🏆 {userInfo.creditBalance || 0} pts
                </span>
              </div>
            )}

            {/* Auth Buttons */}
            {isAuth ? (
              <button
                onClick={handleLogout}
                className="px-3 py-2 text-red-400 rounded-md hover:bg-red-500/10 transition"
              >
                Logout
              </button>
            ) : (
              <button
                onClick={() => handleNavClick("/login")}
                className="px-3 py-2 text-indigo-400 rounded-md hover:bg-indigo-500/10 transition"
              >
                Login
              </button>
            )}
          </div>

          {/* Mobile Hamburger */}
          <button
            className="md:hidden text-gray-200 text-2xl focus:outline-none z-50 relative"
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle menu"
          >
            {isOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </nav>
      </header>

      {/* Overlay when open */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40"
          onClick={closeMenu}
        />
      )}

      {/* Mobile Menu */}
      <div
        className={`fixed top-0 left-0 h-full w-72 bg-gradient-to-b from-amber-950 via-neutral-900 to-black text-white shadow-xl transform transition-transform duration-300 ease-in-out z-50 ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex items-center justify-between px-5 py-4 border-b border-white/10">
          <h2 className="text-lg font-semibold text-orange-400">Menu</h2>
          <button
            className="text-gray-300 hover:text-white transition"
            onClick={closeMenu}
            aria-label="Close menu"
          >
            <X size={24} />
          </button>
        </div>

        <div className="flex flex-col mt-4 space-y-2 px-4 font-medium">
          {navLinks.map((link, i) => (
            <button
              key={i}
              onClick={() => handleNavClick(link.path)}
              className={`px-4 py-2 rounded-md text-left transition ${
                location.pathname === link.path
                  ? "bg-orange-500/30 text-orange-400"
                  : "hover:bg-orange-500/10 hover:text-orange-300"
              }`}
            >
              {link.name}
            </button>
          ))}

          {isAuth && userInfo && (
            <div className="mt-4 border-t border-white/10 pt-3">
              <p className="font-semibold text-orange-400">{userInfo.name}</p>
              <p className="text-sm text-gray-300 mt-1">
                🏆 {userInfo.creditBalance || 0} pts
              </p>
            </div>
          )}

          {isAuth ? (
            <button
              onClick={handleLogout}
              className="px-4 py-2 text-left text-red-400 rounded-md hover:bg-red-500/10 transition mt-3"
            >
              Logout
            </button>
          ) : (
            <button
              onClick={() => handleNavClick("/login")}
              className="px-4 py-2 text-left text-indigo-400 rounded-md hover:bg-indigo-500/10 transition mt-3"
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
