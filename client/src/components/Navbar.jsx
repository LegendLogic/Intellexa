import React, { useState, useEffect, useContext } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { AuthContext } from "../context/AuthContext";
import axios from "axios";
import * as Images from "../assets";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [userInfo, setUserInfo] = useState(null);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const location = useLocation();
  const navigate = useNavigate();
  const { isAuth, token, logout } = useContext(AuthContext); // Use token from context

  // Disable scroll when mobile menu is open
  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "auto";
    return () => (document.body.style.overflow = "auto");
  }, [isOpen]);

  // Detect scroll for sticky navbar
  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Fetch user profile info
  useEffect(() => {
    const fetchProfile = async () => {
      if (!token) return;

      try {
        const res = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/user/profile`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setUserInfo(res.data);
      } catch (err) {
        console.error("Error fetching profile:", err);

        if (err.response?.status === 401) {
          // Token invalid or expired
          logout();
          alert("Session expired. Please login again.");
          navigate("/login");
        }
      }
    };

    if (isAuth) fetchProfile();
  }, [isAuth, token, logout, navigate]);

  // Logout
  const handleLogout = () => {
    logout();
    navigate("/login");
    setIsOpen(false);
    setDropdownOpen(false);
  };

  // Navigate to dashboard
  const goToDashboard = () => {
    navigate("/dashboard");
    setDropdownOpen(false);
    setIsOpen(false);
  };

  const closeMenu = () => setIsOpen(false);

  const navLinks = [
    { name: "HOME", path: "/" },
    { name: "READING", path: "/reading" },
    { name: "AI", path: "/ai" },
    { name: "RESUME", path: "/resume" },
    { name: "LEADERBOARD", path: "/leaderboard" },
    { name: "GAME", path: "/game" },
    { name: "PREMIUM", path: "/premium" },
    
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
      {/* Header */}
      <header
        className={`fixed z-50 w-full transition-all duration-500 ${
          isScrolled
            ? "bg-transparent shadow-md backdrop-blur-md"
            : "bg-transparent"
        }`}
      >
        <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 py-3 flex items-center justify-between">
          {/* Logo */}
          <Link
            to="/"
            className="flex items-center gap-2 text-xl sm:text-2xl font-bold text-orange-600 z-50"
            onClick={() => {
              if (location.pathname !== "/") navigate("/");
              else window.scrollTo({ top: 0, behavior: "smooth" });
              setIsOpen(false);
            }}
          >
            <img
              src={Images.backImage}
              alt="Intellexa Logo"
              className="h-10 w-auto object-cover transition-transform duration-300 hover:scale-110"
            />
            INTELLEXAA
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-6 font-medium text-amber-700 relative">
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

            {/* User Dropdown */}
            {isAuth && userInfo && (
              <div
                className="relative"
                onMouseEnter={() => setDropdownOpen(true)}
                onMouseLeave={() => setDropdownOpen(false)}
              >
                <div className="flex items-center gap-3 px-4 py-2 bg-orange-500/20 rounded-full border border-orange-400/30 cursor-pointer hover:bg-orange-500/30 transition">
                  <span className="text-sm font-semibold text-red-400">
                    {userInfo.name}
                  </span>
                  <span className="text-sm bg-orange-500 text-white border-2 px-3 py-1 rounded-full">
                    🏆 {userInfo.creditBalance || 0} pts
                  </span>
                </div>

                {dropdownOpen && (
                  <div className="absolute top-12 right-0 bg-white text-gray-800 rounded-lg shadow-xl border border-gray-200 w-40 py-2 transition-all duration-300 z-50">
                    <button
                      onClick={goToDashboard}
                      className="block w-full text-left px-4 py-2 hover:bg-orange-100 text-sm font-medium"
                    >
                      Dashboard
                    </button>
                    <button
                      onClick={handleLogout}
                      className="block w-full text-left px-4 py-2 hover:bg-red-100 text-sm text-red-600 font-medium"
                    >
                      Logout
                    </button>
                  </div>
                )}
              </div>
            )}

            {!isAuth && (
              <button
                onClick={() => handleNavClick("/login")}
                className="px-3 py-2 text-orange-300 rounded-md hover:bg-indigo-500/10 transition"
              >
                LOGIN
              </button>
            )}
          </div>
          {/* Mobile Hamburger */}
          <button
            className="md:hidden text-amber-600 text-2xl focus:outline-none z-50 relative"
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle menu"
          >
            {isOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </nav>
      </header>

      {/* Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40"
          onClick={closeMenu}
        />
      )}

      {/* Mobile Menu */}
      <div
        className={`fixed  top-0 left-0 h-full w-72 bg-gradient-to-b from-amber-950 via-neutral-900 to-black text-white shadow-xl transform transition-transform duration-300 ease-in-out z-50 ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex  items-center justify-between px-5 py-4 border-b border-white/40">
          <h2 className="text-lg font-semibold text-orange-400">MENU</h2>
          
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
              <p className="text-sm text-amber-300 mt-1">
                🏆 {userInfo.creditBalance || 0} pts
              </p>
              <div className="mt-3 flex flex-col gap-2">
                <button
                  onClick={goToDashboard}
                  className="px-3 py-2 text-left text-sm bg-orange-500/20 rounded-md hover:bg-orange-500/30"
                >
                  Dashboard
                </button>
                <button
                  onClick={handleLogout}
                  className="px-3 py-2 text-left text-sm bg-red-500/20 text-red-400 rounded-md hover:bg-red-500/30"
                >
                  Logout
                </button>
              </div>
            </div>
          )}

          {!isAuth && (
            <button
              onClick={() => handleNavClick("/login")}
              className="px-4 py-2 text-left text-orange-300 rounded-md hover:bg-indigo-500/10 transition mt-3"
            >
              LOGIN
            </button>
          )}
        </div>
      </div>
    </>
  );
};

export default Navbar;
