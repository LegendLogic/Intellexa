import React, { useState, useContext } from "react";
import { FaArrowRight, FaSearch } from "react-icons/fa";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import Chatbot from "../components/Chatbot";
import axios from "axios";
import { Brain, Code2, BarChart, Lightbulb, Cpu, Rocket } from "lucide-react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const backendUrl = "http://localhost:4000";

const resources = [
  {
    title: "Web Development",
    description: "Learn HTML, CSS, JavaScript and build modern websites",
    color: "bg-gradient-to-br from-orange-200 to-orange-300",
    icon: Code2,
    link: "/webdev",
    keywords: ["web", "html", "css", "javascript", "website", "frontend", "development"],
  },
  {
    title: "AI / ML",
    description: "Explore Artificial Intelligence & Machine Learning concepts",
    color: "bg-gradient-to-br from-blue-400 to-blue-600",
    icon: Cpu,
    link: "/ai-ml",
    keywords: ["ai", "ml", "artificial", "intelligence", "machine", "learning"],
  },
  {
    title: "Machine Learning Projects",
    description: "Hands-on ML projects to apply your knowledge",
    color: "bg-gradient-to-br from-teal-400 to-teal-600",
    icon: Brain,
    link: "/ml-projects",
    keywords: ["machine", "learning", "ml", "projects", "hands-on", "practical"],
  },
  {
    title: "Data Science",
    description: "Analyze data and gain insights using Python & tools",
    color: "bg-gradient-to-br from-purple-400 to-purple-600",
    icon: BarChart,
    link: "/data-science",
    keywords: ["data", "science", "python", "analytics", "analysis", "visualization"],
  },
  {
    title: "Interview Prep",
    description: "Prepare for coding & technical interviews",
    color: "bg-gradient-to-br from-yellow-400 to-yellow-600",
    icon: Lightbulb,
    link: "/interview-prep",
    keywords: ["interview", "prep", "preparation", "coding", "technical", "job"],
  },
  {
    title: "Projects & Practice",
    description: "Work on real-world projects to strengthen your skills",
    color: "bg-gradient-to-br from-red-200 to-red-400",
    icon: Rocket,
    link: "/projects-practices",
    keywords: ["projects", "practice", "real-world", "skills", "hands-on"],
  },
];

const Home = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(false);
  const { isAuth } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSearch = async (e) => {
    e.preventDefault();
    const term = searchTerm.trim();
    if (!term) {
      toast.warn("Please enter a search term!");
      return;
    }

    if (!isAuth) {
      sessionStorage.setItem("pendingSearch", term);
      toast.info("Please log in to continue your search.");
      navigate("/login");
      return;
    }

    // 1️⃣ Check local resources first
    const found = resources.find((res) => {
      const titleMatch = res.title.toLowerCase().includes(term.toLowerCase());
      const keywordMatch = res.keywords.some((keyword) =>
        keyword.toLowerCase().includes(term.toLowerCase())
      );
      const descriptionMatch = res.description.toLowerCase().includes(term.toLowerCase());
      return titleMatch || keywordMatch || descriptionMatch;
    });

    if (found) {
      navigate(found.link);
      setSearchTerm("");
      return;
    }

    // 2️⃣ If not found locally → call backend and show in Search Results
    try {
      setLoading(true);
      const response = await axios.post(`${backendUrl}/api/search/get-learning`, { prompt: term });

      let learningData = response.data?.data || null;

      if (typeof learningData === "string") {
        try {
          learningData = JSON.parse(learningData);
        } catch {
          learningData = null;
        }
      }

      const formattedData = Array.isArray(learningData)
        ? learningData
        : learningData
        ? [learningData]
        : [];

      sessionStorage.setItem("searchResults", JSON.stringify(formattedData));
      sessionStorage.setItem("searchQuery", term);

      navigate(`/search-results?query=${encodeURIComponent(term)}`);
    } catch (error) {
      console.error("Search Error:", error);
      toast.error("Error fetching results. Try again later.");
    } finally {
      setLoading(false);
      setSearchTerm("");
    }
  };

  const handleResourceClick = (link) => {
    if (!isAuth) {
      toast.info("Please log in to explore this section.");
      navigate("/login");
    } else {
      navigate(link);
    }
  };

  return (
    <section
      className="relative min-h-screen text-white overflow-hidden"
      style={{
        background:
          "radial-gradient(circle 600px at 60% 20%, rgba(249,115,22,0.25), transparent 70%), radial-gradient(circle 800px at 10% 80%, rgba(255,56,0,0.15), transparent 70%), #0e0b11",
      }}
    >
      <ToastContainer position="top-right" autoClose={2500} theme="dark" />

      {/* Hero Section */}
      <motion.div
        initial={{ opacity: 0, y: -40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="max-w-7xl mx-auto px-6 lg:px-12 py-24 flex flex-col items-center text-center"
      >
        <p className="text-sm text-orange-300 font-semibold mb-2 tracking-widest">
          # BEST ONLINE AI HELPER 2025
        </p>

        <h1 className="text-5xl md:text-7xl font-extrabold leading-tight bg-clip-text text-transparent"
          style={{ backgroundImage: "linear-gradient(90deg, #ff6b00, #ff3d00, #ff9f00)" }}>
          Smart Learning. <br /> Powered by AI.
        </h1>

        <p className="text-orange-400 max-w-2xl mt-4 text-lg md:text-xl">
          Discover premium online courses at{" "}
          <span className="font-extrabold text-orange-600">INTELLEXA</span>, empowering you to excel professionally.
        </p>

        {/* Search Bar */}
        <motion.form
          onSubmit={handleSearch}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.6 }}
          className="w-full mt-10 max-w-3xl mx-auto flex flex-col sm:flex-row items-center p-3 sm:p-4 rounded-full bg-white/10 backdrop-blur-lg shadow-xl"
        >
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search: Any Roadmap , Web Dev, AI, Data Science..."
            className="flex-grow px-4 py-3 rounded-full bg-white/90 text-black placeholder-gray-500 focus:outline-none"
            disabled={loading}
          />
          <button
            type="submit"
            disabled={loading}
            className="mt-3 sm:mt-0 sm:ml-3 bg-gradient-to-r from-orange-500 to-red-500 text-white p-3 rounded-full shadow-lg hover:scale-105 transition-transform duration-300 flex items-center justify-center"
          >
            {loading ? (
              <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
            ) : (
              <FaSearch size={18} />
            )}
          </button>
        </motion.form>

        {loading && (
          <p className="text-orange-400 mt-4 text-center">Fetching AI learning resources...</p>
        )}
      </motion.div>

      {/* Resources */}
      <div className="px-4 sm:px-6 lg:px-12 py-20 max-w-7xl mx-auto">
        <h2 className="text-4xl font-bold text-orange-300 text-center mb-12">Resources to Learn</h2>
        <div className="grid gap-8 sm:grid-cols-2 md:grid-cols-3">
          {resources.map((resource, index) => {
            const Icon = resource.icon;
            return (
              <motion.div key={index} whileHover={{ scale: 1.05 }}>
                <div
                  onClick={() => handleResourceClick(resource.link)}
                  className="rounded-3xl shadow-2xl backdrop-blur-lg border border-gray-700 overflow-hidden cursor-pointer"
                >
                  <div className={`${resource.color} h-40 flex items-center justify-center`}>
                    <Icon className="w-14 h-14 text-white" />
                  </div>
                  <div className="p-6 bg-gray-900/50">
                    <h3 className="text-xl font-semibold text-orange-500 mb-2">{resource.title}</h3>
                    <p className="text-gray-300 text-sm mb-4">{resource.description}</p>
                    <button className="text-orange-500 font-semibold flex items-center gap-2">
                      <span>{isAuth ? "Explore" : "Sign In to Explore"}</span>
                      <FaArrowRight />
                    </button>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>

      <Chatbot />
    </section>
  );
};

export default Home;
