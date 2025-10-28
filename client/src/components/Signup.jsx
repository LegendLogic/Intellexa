import { useNavigate } from "react-router-dom";
import { useState, useEffect, useContext } from "react";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { AuthContext } from "../context/AuthContext";

const Signup = () => {
  const navigate = useNavigate();
  const { isAuth } = useContext(AuthContext);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    profileImage: null,
  });

  const [message, setMessage] = useState("Create your account below!");
  const [attempts, setAttempts] = useState(0);
  const [loading, setLoading] = useState(false);

  // ✅ Fallback to localhost if no .env var
  const backendUrl = import.meta.env.VITE_BACKEND_URL || "http://localhost:4000";

  // ✅ Redirect if already authenticated
  useEffect(() => {
    if (isAuth) navigate("/");
  }, [isAuth, navigate]);

  // ✅ Handle input changes
  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: files ? files[0] : value,
    }));
  };

  // ✅ Handle Signup
  const handleSignup = async (e) => {
    e.preventDefault(); // Prevent reload
    if (loading) return;

    setLoading(true);
    setAttempts((prev) => prev + 1);

    const { name, email, password, profileImage } = formData;

    // ⚙️ Validation
    if (!name.trim() || name.length < 2) {
      toast.warning("⚠️ Please enter your full name.");
      return setLoading(false);
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email.trim())) {
      toast.warning("⚠️ Please enter a valid email address.");
      return setLoading(false);
    }

    if (!password.trim() || password.length < 6) {
      toast.warning("⚠️ Password must be at least 6 characters long.");
      return setLoading(false);
    }

    // ✅ Prepare FormData for file + text
    const data = new FormData();
    data.append("name", name.trim());
    data.append("email", email.trim());
    data.append("password", password.trim());
    if (profileImage) data.append("profileImage", profileImage);

    try {
      const res = await axios.post(`${backendUrl}/api/user/register`, data, {
        headers: { "Content-Type": "multipart/form-data" },
        timeout: 10000,
      });

      if (res.data?.success) {
        toast.success("✅ Account created successfully!");
        setMessage("🎉 Signup successful! Redirecting...");
        setTimeout(() => navigate("/login"), 1500);
      } else {
        const msg = res.data?.message || "Signup failed!";
        toast.error(`❌ ${msg}`);
        setMessage(`❌ ${msg}`);
      }
    } catch (err) {
      console.error("Signup Error:", err);

      if (err.code === "ERR_NETWORK") {
        toast.error("🚫 Cannot connect to the server. Please try again later.");
        setMessage("Server connection failed!");
      } else {
        const msg =
          err.response?.data?.message ||
          "Signup failed due to an unknown error.";
        toast.error(`❌ ${msg}`);
        setMessage(`❌ ${msg}`);
      }
    } finally {
      setLoading(false);
    }
  };

  // ✅ Reset Form
  const handleReset = () => {
    setFormData({ name: "", email: "", password: "", profileImage: null });
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
      {/* ✅ Toastify Container */}
      <ToastContainer position="top-right" autoClose={2000} theme="colored" />

      <div className="bg-white/20 backdrop-blur-xl p-8 rounded-3xl shadow-2xl border border-white/30 w-full max-w-md text-center relative z-10">
        <h2 className="text-4xl font-extrabold text-orange-300 mb-6">Sign Up</h2>
        <p className="text-orange-300 mb-4 transition-all duration-300">{message}</p>

        <form onSubmit={handleSignup}>
          {/* Name */}
          <input
            type="text"
            name="name"
            placeholder="Full Name"
            value={formData.name}
            onChange={handleChange}
            className="w-full p-3 mb-4 rounded-xl text-gray-800 bg-white/20 focus:outline-none focus:ring-2 focus:ring-pink-400"
          />

          {/* Email */}
          <input
            type="email"
            name="email"
            placeholder="Email Address"
            value={formData.email}
            onChange={handleChange}
            className="w-full p-3 mb-4 rounded-xl text-gray-800 bg-white/20 focus:outline-none focus:ring-2 focus:ring-pink-400"
          />

          {/* Password */}
          <input
            type="password"
            name="password"
            placeholder="Password (min 6 chars)"
            value={formData.password}
            onChange={handleChange}
            className="w-full p-3 mb-4 rounded-xl text-gray-800 bg-white/20 focus:outline-none focus:ring-2 focus:ring-pink-400"
          />

          {/* Image Upload */}
          <input
            type="file"
            name="profileImage"
            accept="image/*"
            onChange={handleChange}
            className="w-full p-3 mb-6 rounded-xl text-gray-800 bg-white/20 focus:outline-none focus:ring-2 focus:ring-pink-400"
          />

          {/* Buttons */}
          <div className="flex justify-between gap-4">
            <button
              type="submit"
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
              type="button"
              onClick={handleReset}
              className="flex-1 py-3 rounded-xl font-semibold text-gray-800 bg-white/20 hover:bg-gray-400"
            >
              Reset
            </button>
          </div>
        </form>

        <p className="text-white mt-5">
          Already have an account?{" "}
          <span
            onClick={() => navigate("/login")}
            className="text-yellow-300 font-semibold cursor-pointer hover:underline"
          >
            LOGIN
          </span>
        </p>

        <p className="text-gray-200 mt-2">Attempts: {attempts}</p>
      </div>
    </div>
  );
};

export default Signup;
