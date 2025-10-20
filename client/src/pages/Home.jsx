import React, { useState, useContext } from 'react';
import { FaArrowRight, FaSearch } from "react-icons/fa";
import { motion } from "framer-motion";
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import Chatbot from '../components/Chatbot';
import {
  Brain,
  Code2,
  BarChart,
  Lightbulb,
  Cpu,
  Rocket,
} from "lucide-react";

const resources = [
  {
    title: "Web Development",
    description: "Learn HTML, CSS, JavaScript and build modern websites",
    color: "bg-gradient-to-br from-orange-200 to-orange-300",
    icon: Code2,
    link: "/webdev",
    keywords: ["web", "html", "css", "javascript", "website", "frontend", "development"]
  },
  {
    title: "AI / ML",
    description: "Explore Artificial Intelligence & Machine Learning concepts",
    color: "bg-gradient-to-br from-blue-400 to-blue-600",
    icon: Cpu,
    link: "/ai-ml",
    keywords: ["ai", "ml", "artificial", "intelligence", "machine", "learning"]
  },
  {
    title: "Machine Learning Projects",
    description: "Hands-on ML projects to apply your knowledge",
    color: "bg-gradient-to-br from-teal-400 to-teal-600",
    icon: Brain,
    link: "/ml-projects",
    keywords: ["machine", "learning", "ml", "projects", "hands-on", "practical"]
  },
  {
    title: "Data Science",
    description: "Analyze data and gain insights using Python & tools",
    color: "bg-gradient-to-br from-purple-400 to-purple-600",
    icon: BarChart,
    link: "/data-science",
    keywords: ["data", "science", "python", "analytics", "analysis", "visualization"]
  },
  {
    title: "Interview Prep",
    description: "Prepare for coding & technical interviews",
    color: "bg-gradient-to-br from-yellow-400 to-yellow-600",
    icon: Lightbulb,
    link: "/interview-prep",
    keywords: ["interview", "prep", "preparation", "coding", "technical", "job"]
  },
  {
    title: "Projects & Practice",
    description: "Work on real-world projects to strengthen your skills",
    color: "bg-gradient-to-br from-red-200 to-red-400",
    icon: Rocket,
    link: "/projects-practices",
    keywords: ["projects", "practice", "real-world", "skills", "hands-on"]
  },
];

const container = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.15 } },
};

const item = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 120 } },
  hover: { scale: 1.05, boxShadow: "0 20px 40px rgba(0,0,0,0.4)" }
};

const Home = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const { isAuth } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    const term = searchTerm.trim().toLowerCase();
    if (!term) return;

    if (!isAuth) {
      sessionStorage.setItem('pendingSearch', term);
      navigate("/login");
      return;
    }

    const found = resources.find((res) => {
      const titleMatch = res.title.toLowerCase().includes(term);
      const keywordMatch = res.keywords.some(keyword => keyword.includes(term) || term.includes(keyword));
      const descriptionMatch = res.description.toLowerCase().includes(term);
      return titleMatch || keywordMatch || descriptionMatch;
    });

    if (found) navigate(found.link);
    else alert(`No matching course found for "${searchTerm}"`);
    setSearchTerm("");
  };

  const handleResourceClick = (link) => {
    if (!isAuth) navigate("/login");
    else navigate(link);
  };

  return (
    <section
      className="relative min-h-screen text-white overflow-hidden"
      style={{
        background:
          "radial-gradient(circle 600px at 60% 20%, rgba(249,115,22,0.25), transparent 70%), radial-gradient(circle 800px at 10% 80%, rgba(255,56,0,0.15), transparent 70%), #0e0b11",
      }}
    >
      {/* Hero Section */}
      <motion.div
        initial={{ opacity: 0, y: -40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="max-w-7xl mx-auto px-6 lg:px-12 py-24 flex flex-col items-center text-center"
      >
        <p className="text-sm text-orange-300 font-semibold mb-2 tracking-widest"># Online Courses 2025</p>

        <h1
          className="text-5xl md:text-7xl font-extrabold leading-tight bg-clip-text text-transparent"
          style={{
            backgroundImage:
              "linear-gradient(90deg, #ff6b00, #ff3d00, #ff9f00)",
          }}
        >
          Your Gateway to <span className="underline decoration-wavy">2500+</span> <br /> Online Courses
        </h1>

        <p className="text-orange-400 max-w-2xl mt-4 text-lg md:text-xl">
          Discover 2500+ premium online courses at <span className="font-bold text-orange-600">Intellexa</span>, empowering you to excel professionally.
        </p>

        {/* Search Bar */}
        <motion.form
          onSubmit={handleSearch}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.6 }}
          className="w-full mt-10 max-w-3xl mx-auto flex flex-col sm:flex-row items-center p-3 sm:p-4 rounded-full bg-white/10 backdrop-blur-lg shadow-xl focus-within:shadow-2xl transition-all duration-300"
        >
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search: Web Dev, AI, Data Science..."
            className="flex-grow px-2 py-2 rounded-full bg-amber-900  text-black placeholder-white focus:outline-none w-full"
          />

          <button
            type="submit"
            className="mt-3 sm:mt-0 sm:ml-3 bg-gradient-to-r from-orange-500 to-red-500 text-white p-3 rounded-full shadow-lg hover:scale-105 transition-transform duration-300 flex items-center justify-center"
            aria-label="Search Courses"
          >
            <FaSearch size={18} />
          </button>
        </motion.form>
      </motion.div>

      {/* Resources Grid */}
      <motion.div
        variants={container}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="px-4 sm:px-6 lg:px-12 py-20"
      >
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-bold text-orange-300 text-center mb-12">
            Resources to Learn
          </h2>

          <div className="grid gap-8 sm:grid-cols-2 md:grid-cols-3">
            {resources.map((resource, index) => {
              const Icon = resource.icon;
              return (
                <motion.div key={index} variants={item} whileHover="hover">
                  <div
                    onClick={() => handleResourceClick(resource.link)}
                    className="rounded-3xl shadow-2xl  backdrop-blur-lg border border-gray-700 overflow-hidden cursor-pointer hover:scale-105 transition-all"
                  >
                    <div className={`${resource.color} h-40 flex items-center justify-center`}>
                      <Icon className="w-14 h-14 text-orange-500" />
                    </div>
                    <div className="p-6">
                      <h3 className="text-xl font-semibold text-orange-500 mb-2">{resource.title}</h3>
                      <p className="text-gray-300 text-sm mb-4">{resource.description}</p>
                      <button className="text-indigo-400 font-semibold flex items-center space-x-2 hover:underline hover:text-orange-300">
                        <span className='text-orange-500'>{isAuth ? 'Explore' : 'Sign In to Explore'}</span>
                        <FaArrowRight className='text-orange-500' />
                      </button>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </motion.div>

      <Chatbot />
    </section>
  );
};

export default Home;
