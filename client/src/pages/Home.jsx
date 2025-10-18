import React from 'react';
import { Link } from 'react-router-dom';
import { FaArrowRight, FaSearch } from "react-icons/fa";
import { motion } from "framer-motion";

const resources = [
  { title: "Web Development", description: "Learn HTML, CSS, JavaScript and build modern websites", color: "bg-gradient-to-br from-orange-400 to-orange-600", icon: "💻", link: "/webdev" },
  { title: "AI / ML", description: "Explore Artificial Intelligence & Machine Learning concepts", color: "bg-gradient-to-br from-blue-400 to-blue-600", icon: "🤖", link: "/ai-ml" },
  { title: "Machine Learning Projects", description: "Hands-on ML projects to apply your knowledge", color: "bg-gradient-to-br from-teal-400 to-teal-600", icon: "📊", link: "/ml-projects" },
  { title: "Data Science", description: "Analyze data and gain insights using Python & tools", color: "bg-gradient-to-br from-purple-400 to-purple-600", icon: "📈", link: "/data-science" },
  { title: "Interview Prep", description: "Prepare for coding & technical interviews", color: "bg-gradient-to-br from-yellow-400 to-yellow-600", icon: "🗣️", link: "/interview-prep" },
  { title: "Projects & Practice", description: "Work on real-world projects to strengthen your skills", color: "bg-gradient-to-br from-red-400 to-red-600", icon: "⚙️", link: "/projects-practice" },
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
  return (
    <section className="relative bg-gradient-to-br from-[#0b0b1d] via-[#141428] to-[#1a1a35] text-white overflow-hidden">

      {/* Hero Section */}
      <motion.div initial={{ opacity: 0, y: -40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} className="max-w-7xl mx-auto px-6 lg:px-12 py-24 flex flex-col items-center text-center">
        <p className="text-sm text-pink-400 font-semibold mb-2 tracking-widest"># Online Courses 2025</p>

        <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold leading-tight bg-gradient-to-r from-pink-500 to-indigo-500 bg-clip-text text-transparent">
          Your Gateway to <span className="underline decoration-wavy">2500+</span><br className="hidden sm:block" /> Online Courses
        </h1>

        <p className="text-gray-300 max-w-2xl mt-4 text-lg md:text-xl">
          Discover 2500+ premium online courses at <span className="font-semibold text-white">EduZen</span>, empowering you to excel professionally.
        </p>

        {/* CTA Buttons */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4, duration: 0.6 }} className="flex flex-col sm:flex-row items-center space-y-4 sm:space-y-0 sm:space-x-4 mt-10">
          <motion.button whileHover={{ scale: 1.05 }} className="bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-purple-600 hover:to-indigo-500 text-white px-8 py-4 rounded-full font-semibold flex items-center space-x-3 shadow-2xl transition-all duration-300">
            <span>Browse Courses</span> <FaArrowRight />
          </motion.button>

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

        {/* Search Bar */}
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6, duration: 0.6 }} className="bg-white/20 backdrop-blur-lg rounded-full flex items-center mt-12 w-full max-w-2xl p-3 shadow-lg focus-within:scale-105 focus-within:shadow-2xl transition transform duration-300">
          <div className="bg-gray-100/80 text-gray-600 px-4 py-2 rounded-full font-medium flex items-center space-x-2">
            <span>🔍 Explore</span>
          </div>
          <input type="text" placeholder="Find & choose your perfect course" className="flex-grow px-4 py-2 text-gray-800 rounded-full focus:outline-none bg-white/70" />
          <button className="bg-indigo-600 hover:bg-indigo-700 text-white p-3 rounded-full shadow-md transition-all duration-300"><FaSearch /></button>
        </motion.div>

        {/* Stats */}
        <motion.div variants={container} initial="hidden" animate="visible" className="flex flex-wrap justify-center gap-8 text-gray-300 mt-12">
          {["📘 More than 5k Courses", "🎓 1.5k Free Courses", "👨‍🏫 450+ Instructors"].map((stat, i) => (
            <motion.div key={i} variants={item} className="text-center">
              <span className="text-white font-bold text-xl md:text-2xl">{stat.split(' ')[1]}</span> {stat.split(' ').slice(2).join(' ')}
            </motion.div>
          ))}
        </motion.div>
      </motion.div>

      {/* Floating Decorative Shapes */}
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
                <Link to={resource.link}>
                  <div className="rounded-3xl shadow-2xl hover:shadow-3xl transition duration-300 overflow-hidden border border-gray-700 bg-white/10 backdrop-blur-lg hover:scale-105">
                    <div className={`${resource.color} h-40 flex items-center justify-center text-6xl transition-all duration-300`}>
                      {resource.icon}
                    </div>
                    <div className="p-6">
                      <h3 className="text-xl font-semibold text-white mb-2">{resource.title}</h3>
                      <p className="text-gray-300 text-sm">{resource.description}</p>
                      <div className="mt-4 flex items-center text-indigo-400 font-semibold space-x-2">
                        <span>Explore</span>
                        <FaArrowRight />
                      </div>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>

    </section>
  );
};

export default Home;
