import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaArrowRight, FaSearch } from "react-icons/fa";
import { motion } from "framer-motion";
import Chatbot from '../components/Chatbot';

const resources = [
  { title: "Web Development", description: "Learn HTML, CSS, JavaScript and build modern websites", color: "bg-gradient-to-br from-orange-400 to-orange-600", icon: "💻", link: "/webdev" },
  { title: "AI / ML", description: "Explore Artificial Intelligence & Machine Learning concepts", color: "bg-gradient-to-br from-blue-400 to-blue-600", icon: "🤖", link: "/ai-ml" },
  { title: "Machine Learning Projects", description: "Hands-on ML projects to apply your knowledge", color: "bg-gradient-to-br from-teal-400 to-teal-600", icon: "📊", link: "/ml-projects" },
  { title: "Data Science", description: "Analyze data and gain insights using Python & tools", color: "bg-gradient-to-br from-purple-400 to-purple-600", icon: "📈", link: "/data-science" },
  { title: "Interview Prep", description: "Prepare for coding & technical interviews", color: "bg-gradient-to-br from-yellow-400 to-yellow-600", icon: "🗣️", link: "/interview-prep" },
  { title: "Projects & Practice", description: "Work on real-world projects to strengthen your skills", color: "bg-gradient-to-br from-red-400 to-red-600", icon: "⚙️", link: "/projects-practices" },
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
  const navigate = useNavigate();

  // 🔍 Handle search & redirect logic
  const handleSearch = (e) => {
    e.preventDefault();
    const term = searchTerm.trim().toLowerCase();

    if (!term) return;

    // Find a matching resource by title or keyword
    const found = resources.find((res) =>
      res.title.toLowerCase().includes(term) ||
      term.includes(res.title.toLowerCase().split(" ")[0])
    );

    if (found) {
      navigate(found.link);
    } else {
      alert("No matching course found 😢");
    }

    setSearchTerm("");
  };

  return (
    <section className="relative bg-gradient-to-br from-[#0b0b1d] via-[#141428] to-[#1a1a35] text-white overflow-hidden">

      {/* Hero Section */}
      <motion.div
        initial={{ opacity: 0, y: -40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="max-w-7xl mx-auto px-6 lg:px-12 py-24 flex flex-col items-center text-center"
      >
        <p className="text-sm text-pink-400 font-semibold mb-2 tracking-widest"># Online Courses 2025</p>

        <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold leading-tight bg-gradient-to-r from-pink-500 to-indigo-500 bg-clip-text text-transparent">
          Your Gateway to <span className="underline decoration-wavy">2500+</span><br className="hidden sm:block" /> Online Courses
        </h1>

        <p className="text-gray-300 max-w-2xl mt-4 text-lg md:text-xl">
          Discover 2500+ premium online courses at <span className="font-semibold text-white">EduZen</span>, empowering you to excel professionally.
        </p>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.6 }}
          className="flex flex-col sm:flex-row items-center space-y-4 sm:space-y-0 sm:space-x-4 mt-10"
        >
          <Link to="/roadmap">
            <motion.button
              whileHover={{ scale: 1.05 }}
              className="bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-purple-600 hover:to-indigo-500 text-white px-8 py-4 rounded-full font-semibold flex items-center space-x-3 shadow-2xl transition-all duration-300"
            >
              <span>Browse Courses</span>
              <FaArrowRight />
            </motion.button>
          </Link>

          <div className="flex items-center space-x-2 text-gray-300">
            <div className="flex -space-x-3">
              <img src="https://randomuser.me/api/portraits/men/32.jpg" alt="student" className="w-10 h-10 rounded-full border-2 border-white shadow-md" />
              <img src="https://randomuser.me/api/portraits/women/44.jpg" alt="student" className="w-10 h-10 rounded-full border-2 border-white shadow-md" />
              <img src="https://randomuser.me/api/portraits/men/55.jpg" alt="student" className="w-10 h-10 rounded-full border-2 border-white shadow-md" />
            </div>
            <span className="font-semibold text-white">1.5M+</span>
            <span>Worldwide Students</span>
          </div>
        </motion.div>

        {/* 🔍 Search Bar */}
        <motion.form
  onSubmit={handleSearch}
  initial={{ opacity: 0, y: 30 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ delay: 0.6, duration: 0.6 }}
  className="w-full mt-10 max-w-3xl mx-auto flex flex-col sm:flex-row items-center p-3 sm:p-4 rounded-full bg-gradient-to-r from-white/30 to-white/10 backdrop-blur-lg shadow-xl focus-within:shadow-2xl focus-within:scale-105 transition-all duration-300"
>
  {/* Explore label */}
  <div className="flex items-center space-x-2 bg-gray-100/50 backdrop-blur-sm px-4 py-2 rounded-full text-gray-700 font-medium select-none cursor-default shadow-inner mb-3 sm:mb-0">
    <span>🔍 Explore</span>
  </div>

  {/* Search input */}
  <input
    type="text"
    value={searchTerm}
    onChange={(e) => setSearchTerm(e.target.value)}
    placeholder="Find & choose your perfect course"
    className="flex-grow px-4 py-2 sm:ml-3 rounded-full bg-white/70 text-gray-800 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:ring-offset-1 transition-all duration-300 w-full sm:w-auto"
  />

  {/* Submit button */}
  <button
    type="submit"
    className="mt-3 sm:mt-0 sm:ml-3 bg-indigo-600 hover:bg-indigo-700 active:bg-indigo-800 text-white p-3 rounded-full shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:scale-105 flex items-center justify-center"
    aria-label="Search Courses"
  >
    <FaSearch size={18} />
  </button>
</motion.form>


        {/* Stats */}
        <motion.div variants={container} initial="hidden" animate="visible" className="flex flex-wrap justify-center gap-8 text-gray-300 mt-12">
          {["📘 More than 5k Courses", "🎓 1.5k Free Courses", "👨‍🏫 450+ Instructors"].map((stat, i) => (
            <motion.div key={i} variants={item} className="text-center">
              <span className="text-white font-bold text-xl md:text-2xl">{stat.split(' ')[1]}</span> {stat.split(' ').slice(2).join(' ')}
            </motion.div>
          ))}
        </motion.div>
      </motion.div>

      {/* Floating Shapes */}
      <motion.div animate={{ y: [0, 12, 0], rotate: [0, 15, 0] }} transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }} className="absolute top-12 left-10 w-12 h-12 bg-pink-500 opacity-25 rounded-lg rotate-45"></motion.div>
      <motion.div animate={{ y: [0, -12, 0], rotate: [0, -15, 0] }} transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }} className="absolute bottom-16 right-16 w-10 h-10 bg-indigo-400 opacity-30 rounded-full"></motion.div>

      {/* Resources Section */}
      <motion.div variants={container} initial="hidden" whileInView="visible" viewport={{ once: true }} className="min-h-screen px-4 sm:px-6 lg:px-12 py-16">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-bold text-white text-center mb-12 bg-gradient-to-r from-pink-500 to-indigo-500 bg-clip-text">
            Resources to Learn
          </h2>

          <div className="grid gap-8 sm:grid-cols-2 md:grid-cols-3">
            {resources.map((resource, index) => (
              <motion.div key={index} variants={item} whileHover="hover">
                <div className="rounded-3xl shadow-2xl hover:shadow-3xl transition duration-300 overflow-hidden border border-gray-700 bg-white/10 backdrop-blur-lg hover:scale-105">
                  <div className={`${resource.color} h-40 flex items-center justify-center text-6xl transition-all duration-300`}>
                    {resource.icon}
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-semibold text-white mb-2">{resource.title}</h3>
                    <p className="text-gray-300 text-sm">{resource.description}</p>
                    <div className="mt-4 flex items-center space-x-2">
                      <Link to={resource.link} className="text-indigo-400 font-semibold flex items-center space-x-2 hover:underline">
                        <span>Explore</span>
                        <FaArrowRight />
                      </Link>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>

      <Chatbot />
    </section>
  );
};

export default Home;
