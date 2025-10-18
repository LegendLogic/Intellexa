import { useNavigate } from "react-router-dom";
import { useState, useEffect, useContext } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { AuthContext } from "../context/AuthContext";

const Signup = () => {
  const navigate = useNavigate();
  const { isAuth, login } = useContext(AuthContext);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("Create your account below!");
  const [attempts, setAttempts] = useState(0);
  const [loading, setLoading] = useState(false);
  const backendUrl = import.meta.env.VITE_BACKEND_URL;

  // ✅ Redirect if already logged in
  useEffect(() => {
    if (isAuth) navigate("/signup");
  }, [isAuth, navigate]);

  const handleSignup = async () => {
    if (loading) return;
    setLoading(true);
    setAttempts(attempts + 1);

    if (!backendUrl) {
      setMessage("❌ Backend URL not configured!");
      setLoading(false);
      return;
    }

    try {
      const res = await axios.post(`${backendUrl}/api/user/register`, {
        name,
        email,
        password,
      });

      if (res.data.success) {
        setMessage("🎉 Signup successful! Redirecting to login...");
        toast.success("✅ Account created successfully!");
        setTimeout(() => navigate("/login"), 1500);
      } else {
        setMessage(`❌ ${res.data.message || "Signup failed!"}`);
      }
    } catch (err) {
      console.error(err);
      setMessage(`❌ ${err.response?.data?.message || "Error signing up."}`);
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
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-500 p-4">
      <div className="bg-white/20 backdrop-blur-xl p-8 rounded-3xl shadow-2xl border border-white/30 w-full max-w-md text-center">
        <h2 className="text-4xl font-extrabold text-white mb-6">Sign Up</h2>
        <p className="text-white mb-4">{message}</p>

        <input
          type="text"
          placeholder="Full Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full p-3 mb-4 rounded-xl text-gray-800 focus:outline-none focus:ring-2 focus:ring-pink-400"
        />
        <input
          type="email"
          placeholder="Email Address"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full p-3 mb-4 rounded-xl text-gray-800 focus:outline-none focus:ring-2 focus:ring-pink-400"
        />
        <input
          type="password"
          placeholder="Password (min 8 chars)"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full p-3 mb-4 rounded-xl text-gray-800 focus:outline-none focus:ring-2 focus:ring-pink-400"
        />

        <div className="flex justify-between gap-4">
          <button
            onClick={handleSignup}
            disabled={loading}
            className={`flex-1 py-3 rounded-xl font-semibold text-white shadow-lg ${
              loading
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-gradient-to-r from-pink-500 to-purple-600 hover:opacity-90"
            }`}
          >
            {loading ? "Signing up..." : "Sign Up"}
          </button>
          <button
            onClick={handleReset}
            className="flex-1 py-3 rounded-xl font-semibold text-gray-800 bg-gray-300 hover:bg-gray-400"
          >
            Reset
          </button>
        </div>

        <p className="text-white mt-5">
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
