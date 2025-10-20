import { useNavigate } from "react-router-dom";
import { useState, useEffect, useContext } from "react";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { AuthContext } from "../context/AuthContext";

const Signup = () => {
  const navigate = useNavigate();
  const { isAuth } = useContext(AuthContext);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("Create your account below!");
  const [attempts, setAttempts] = useState(0);
  const [loading, setLoading] = useState(false);

  const backendUrl = import.meta.env.VITE_BACKEND_URL;

  // Redirect if already authenticated
  useEffect(() => {
    if (isAuth) navigate("/");
  }, [isAuth, navigate]);

  const handleSignup = async () => {
    if (loading) return;
    setLoading(true);
    setAttempts((prev) => prev + 1);

    if (!backendUrl) {
      setMessage("❌ Backend URL not configured!");
      toast.error("⚠️ Backend URL not configured!");
      setLoading(false);
      return;
    }

    const trimmedName = name.trim();
    const trimmedEmail = email.trim();
    const trimmedPassword = password.trim();

    // Name validation
    if (trimmedName.length < 2) {
      setMessage("❌ Please enter your full name.");
      toast.warning("⚠️ Please enter your full name.");
      setLoading(false);
      return;
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(trimmedEmail)) {
      setMessage("❌ Please enter a valid email address.");
      toast.warning("⚠️ Please enter a valid email address.");
      setLoading(false);
      return;
    }

    // Password validation
    if (trimmedPassword.length < 6) {
      setMessage("❌ Password must be at least 6 characters long.");
      toast.warning("⚠️ Password must be at least 6 characters long.");
      setLoading(false);
      return;
    }

    try {
      const res = await axios.post(`${backendUrl}/api/user/register`, {
        name: trimmedName,
        email: trimmedEmail,
        password: trimmedPassword,
      });

      if (res.data.success) {
        setMessage("🎉 Signup successful! Redirecting to login...");
        toast.success("✅ Account created successfully!");
        setTimeout(() => navigate("/login"), 1500);
      } else {
        const msg = res.data.message || "Signup failed!";
        setMessage(`❌ ${msg}`);
        toast.error(`❌ ${msg}`);
      }
    } catch (err) {
      console.error("Signup Error:", err);
      const msg = err.response?.data?.message || "Error signing up.";
      setMessage(`❌ ${msg}`);
      toast.error(`❌ ${msg}`);
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setName("");
    setEmail("");
    setPassword("");
    setMessage("Create your account below!");
    setAttempts(0);
    toast.info("🔄 Form reset!");
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center p-4 relative overflow-hidden"
      style={{
        background:
          "radial-gradient(circle 600px at 60% 20%, rgba(249,115,22,0.25), transparent 70%), radial-gradient(circle 800px at 10% 80%, rgba(255,56,0,0.15), transparent 70%), #0e0b11",
      }}
    >
      {/* Toastify */}
      <ToastContainer
        position="top-right"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        pauseOnHover
        theme="colored"
      />

      {/* Signup Card */}
      <div className="bg-white/20 backdrop-blur-xl p-8 rounded-3xl shadow-2xl border border-white/30 w-full max-w-md text-center relative z-10">
        <h2 className="text-4xl font-extrabold text-orange-300 mb-6">Sign Up</h2>
        <p className="text-orange-300 mb-4 transition-all duration-300">{message}</p>

        {/* Input Fields */}
        <input
          type="text"
          placeholder="Full Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full p-3 mb-4 rounded-xl text-gray-800 bg-white/20 focus:outline-none focus:ring-2 focus:ring-pink-400"
        />
        <input
          type="email"
          placeholder="Email Address"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full p-3 mb-4 rounded-xl text-gray-800 bg-white/20  focus:outline-none focus:ring-2 focus:ring-pink-400"
        />
        <input
          type="password"
          placeholder="Password (min 6 chars)"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full p-3 mb-6 rounded-xl text-gray-800 bg-white/20 focus:outline-none focus:ring-2 focus:ring-pink-400"
        />

        {/* Buttons */}
        <div className="flex justify-between gap-4">
          <button
            onClick={handleSignup}
            disabled={loading}
            className={`flex-1 py-3 rounded-xl font-semibold text-white shadow-lg ${
              loading
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-amber-500 hover:opacity-90"
            }`}
          >
            {loading ? "Signing up..." : "Sign Up"}
          </button>

          <button
            onClick={handleReset}
            className="flex-1 py-3 rounded-xl font-semibold text-gray-800 bg-white/20 hover:bg-gray-400"
          >
            Reset
          </button>
        </div>

        <p className="text-white  mt-5">
          Already have an account?{" "}
          <span
            onClick={() => navigate("/login")}
            className="text-yellow-300 font-semibold cursor-pointer hover:underline"
          >
            Login
          </span>
        </p>

        <p className="text-gray-200 mt-2">Attempts: {attempts}</p>
      </div>
    </div>
  );
};

export default Signup;
