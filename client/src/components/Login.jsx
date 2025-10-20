import { useNavigate } from "react-router-dom";
import { useState, useEffect, useContext } from "react";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { AuthContext } from "../context/AuthContext";
import { motion } from "framer-motion";

const Login = () => {
  const navigate = useNavigate();
  const { isAuth, login, token } = useContext(AuthContext);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("Enter your email and password to login!");
  const [attempts, setAttempts] = useState(0);
  const [loading, setLoading] = useState(false);

  const backendUrl = import.meta.env.VITE_BACKEND_URL;

  // Redirect if already authenticated
  useEffect(() => {
    if (isAuth) navigate("/");
  }, [isAuth, navigate]);

  // Setup Axios default headers if token exists
  useEffect(() => {
    if (token) {
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    }
  }, [token]);

  const handleLogin = async () => {
    if (loading) return;
    setLoading(true);
    setAttempts((prev) => prev + 1);

    if (!backendUrl) {
      toast.error("⚠️ Backend URL not configured!");
      setMessage("❌ Backend URL not configured!");
      setLoading(false);
      return;
    }

    const trimmedEmail = email.trim();
    const trimmedPassword = password.trim();

    // Email format validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(trimmedEmail)) {
      toast.warning("⚠️ Please enter a valid email address.");
      setMessage("❌ Please enter a valid email address.");
      setLoading(false);
      return;
    }

    if (!trimmedPassword) {
      toast.warning("⚠️ Password cannot be empty!");
      setMessage("❌ Please enter your password.");
      setLoading(false);
      return;
    }

    try {
      const res = await axios.post(`${backendUrl}/api/user/login`, {
        email: trimmedEmail,
        password: trimmedPassword,
      });

      if (res.data.success && res.data.token) {
        const receivedToken = res.data.token;

        // Basic token structure check
        if (receivedToken.split(".").length !== 3) {
          throw new Error("Malformed token received from server");
        }

        // Save token in context
        login(receivedToken);

        toast.success("✅ Login Successful!");
        setMessage(`🎉 Login successful after ${attempts + 1} attempt(s)! Redirecting...`);

        setTimeout(() => navigate("/"), 1200);
      } else {
        const msg = res.data.message || "Login failed!";
        toast.error(`❌ ${msg}`);
        setMessage(`❌ ${msg}`);
      }
    } catch (err) {
      console.error("Login Error:", err);
      const msg = err.response?.data?.message || err.message || "Server error during login.";
      toast.error(`❌ ${msg}`);
      setMessage(`❌ ${msg}`);
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setEmail("");
    setPassword("");
    setMessage("Enter your email and password to login!");
    setAttempts(0);
    toast.info("🔄 Form reset!");
  };

  return (
    <div
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
      style={{
        background:
          "radial-gradient(circle 600px at 60% 20%, rgba(249,115,22,0.25), transparent 70%), radial-gradient(circle 800px at 10% 80%, rgba(255,56,0,0.15), transparent 70%), #0e0b11",
      }}
    >
      <ToastContainer
        position="top-right"
        autoClose={2000}
        hideProgressBar={false}
        closeOnClick
        pauseOnHover
        theme="colored"
      />

      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="relative z-10 w-full max-w-md bg-white/20 backdrop-blur-xl p-10 rounded-3xl shadow-2xl border border-white/30"
      >
        <h2 className="text-4xl font-extrabold text-orange-400 mb-6 text-center">Login</h2>

        <motion.p
          animate={{ opacity: [0, 1] }}
          transition={{ duration: 0.5 }}
          className="text-white mb-6 text-center transition-colors duration-300"
        >
          {message}
        </motion.p>

        <div className="flex flex-col gap-4 mb-6">
          <div className="relative">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="peer w-full p-4 rounded-xl bg-white/20 text-gray-800 focus:outline-none focus:ring-2 focus:ring-pink-400 placeholder-transparent transition-all duration-300"
              placeholder="Email"
            />
            <label className="absolute left-4 top-4 text-gray-900 text-sm transition-all duration-300 peer-placeholder-shown:top-4 peer-placeholder-shown:text-gray-400 peer-placeholder-shown:text-base peer-focus:top-1 peer-focus:text-white peer-focus:text-sm">
              Email
            </label>
          </div>

          <div className="relative">
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="peer w-full p-4 rounded-xl bg-white/20 text-gray-800 focus:outline-none focus:ring-2 focus:ring-pink-400 placeholder-transparent transition-all duration-300"
              placeholder="Password"
            />
            <label className="absolute left-4 top-4 text-gray-500 text-sm transition-all duration-300 peer-placeholder-shown:top-4 peer-placeholder-shown:text-gray-400 peer-placeholder-shown:text-base peer-focus:top-1 peer-focus:text-white peer-focus:text-sm">
              Password
            </label>
          </div>
        </div>

        <div className="flex justify-between gap-4 mb-4">
          <motion.button
            whileHover={{ scale: 1.05 }}
            onClick={handleLogin}
            disabled={loading}
            className={`flex-1 py-3 rounded-xl font-semibold text-white shadow-lg ${
              loading
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-amber-600 hover:opacity-90"
            }`}
          >
            {loading ? "Logging in..." : "Login"}
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.03 }}
            onClick={handleReset}
            className="flex-1 py-3 rounded-xl font-semibold text-gray-800 bg-white/20 hover:bg-gray-400"
          >
            Reset
          </motion.button>
        </div>

        <p className="text-white mt-4 text-center">
          Don’t have an account?{" "}
          <span
            onClick={() => navigate("/signup")}
            className="text-orange-300 font-semibold cursor-pointer hover:underline"
          >
            Sign Up
          </span>
        </p>

        <p className="text-gray-200 mt-2 text-center">Attempts: {attempts}</p>
      </motion.div>
    </div>
  );
};

export default Login;
