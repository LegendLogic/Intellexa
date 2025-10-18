import { useNavigate } from "react-router-dom";
import { useState, useEffect, useContext } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { AuthContext } from "../context/AuthContext";
import { motion } from "framer-motion";

const Login = () => {
  const navigate = useNavigate();
  const { isAuth, login } = useContext(AuthContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("Enter your credentials to login!");
  const [attempts, setAttempts] = useState(0);
  const [loading, setLoading] = useState(false);
  const backendUrl = import.meta.env.VITE_BACKEND_URL;

  useEffect(() => {
    if (isAuth) navigate("/login");
  }, [isAuth, navigate]);

  const handleLogin = async () => {
    if (loading) return;
    setLoading(true);
    setAttempts(attempts + 1);

    if (!backendUrl) {
      setMessage("❌ Backend URL not configured!");
      setLoading(false);
      return;
    }

    try {
      const res = await axios.post(`${backendUrl}/api/user/login`, {
        email,
        password,
      });

      if (res.data.success) {
        login(res.data.token);
        setMessage(`🎉 Login successful after ${attempts + 1} attempt(s)! Redirecting...`);
        toast.success("✅ Login Successful!");
        setTimeout(() => navigate("/"), 1000);
      } else {
        setMessage(`❌ ${res.data.message || "Login failed!"}`);
      }
    } catch (err) {
      console.error(err);
      setMessage(`❌ ${err.response?.data?.message || "Error logging in."}`);
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setEmail("");
    setPassword("");
    setMessage("Enter your credentials to login!");
    setAttempts(0);
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Animated Gradient Background */}
      <motion.div
        animate={{ backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"] }}
        transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
        className="absolute inset-0 bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-500 bg-[length:200%_200%]"
      ></motion.div>

      {/* Floating Decorative Blobs */}
      <motion.div animate={{ y: [0, 20, 0], x: [0, 15, 0] }} transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }} className="absolute top-20 left-10 w-36 h-36 bg-pink-400 opacity-20 rounded-full blur-3xl"></motion.div>
      <motion.div animate={{ y: [0, -15, 0], x: [0, -20, 0] }} transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }} className="absolute bottom-16 right-16 w-48 h-48 bg-purple-500 opacity-25 rounded-full blur-3xl"></motion.div>

      {/* Glassmorphism Login Card */}
      <motion.div 
        initial={{ opacity: 0, y: 40 }} 
        animate={{ opacity: 1, y: 0 }} 
        transition={{ duration: 0.8 }} 
        className="relative z-10 w-full max-w-md bg-white/20 backdrop-blur-xl p-10 rounded-3xl shadow-2xl border border-white/30"
      >
        <h2 className="text-4xl font-extrabold text-white mb-6 text-center">Login</h2>

        <motion.p 
          animate={{ opacity: [0, 1] }} 
          transition={{ duration: 0.5 }} 
          className="text-white mb-6 text-center transition-colors duration-300"
        >
          {message}
        </motion.p>

        {/* Input Fields with Floating Label Style */}
        <div className="flex flex-col gap-4 mb-6">
          <div className="relative">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="peer w-full p-4 rounded-xl bg-white/70 text-gray-800 focus:outline-none focus:ring-2 focus:ring-pink-400 placeholder-transparent transition-all duration-300"
              placeholder="Email"
            />
            <label className="absolute left-4 top-4 text-gray-500 text-sm transition-all duration-300 peer-placeholder-shown:top-4 peer-placeholder-shown:text-gray-400 peer-placeholder-shown:text-base peer-focus:top-1 peer-focus:text-white peer-focus:text-sm">Email</label>
          </div>

          <div className="relative">
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="peer w-full p-4 rounded-xl bg-white/70 text-gray-800 focus:outline-none focus:ring-2 focus:ring-pink-400 placeholder-transparent transition-all duration-300"
              placeholder="Password"
            />
            <label className="absolute left-4 top-4 text-gray-500 text-sm transition-all duration-300 peer-placeholder-shown:top-4 peer-placeholder-shown:text-gray-400 peer-placeholder-shown:text-base peer-focus:top-1 peer-focus:text-white peer-focus:text-sm">Password</label>
          </div>
        </div>

        {/* Buttons */}
        <div className="flex justify-between gap-4 mb-4">
          <motion.button 
            whileHover={{ scale: 1.05, boxShadow: "0 10px 25px rgba(0,0,0,0.3)" }} 
            onClick={handleLogin} 
            disabled={loading} 
            className={`flex-1 py-3 rounded-xl font-semibold text-white shadow-lg ${
              loading ? "bg-gray-400 cursor-not-allowed" : "bg-gradient-to-r from-pink-500 to-purple-600 hover:opacity-90"
            }`}
          >
            {loading ? "Logging in..." : "Login"}
          </motion.button>

          <motion.button 
            whileHover={{ scale: 1.03 }}
            onClick={handleReset} 
            className="flex-1 py-3 rounded-xl font-semibold text-gray-800 bg-gray-300 hover:bg-gray-400"
          >
            Reset
          </motion.button>
        </div>

        <p className="text-white mt-4 text-center">
          Don’t have an account?{" "}
          <span
            onClick={() => navigate("/signup")}
            className="text-yellow-300 font-semibold cursor-pointer hover:underline"
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
