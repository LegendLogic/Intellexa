import React from "react";
import { motion } from "framer-motion";

const container = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { staggerChildren: 0.3, when: "beforeChildren" },
  },
};

const item = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { type: "spring", stiffness: 120, damping: 12 },
  },
};

const floatingShape = {
  animate: {
    y: [0, -10, 0],
    x: [0, 5, 0],
    rotate: [0, 10, 0],
  },
  transition: { duration: 6, repeat: Infinity, repeatType: "mirror" },
};

const About = () => {
  return (
    <div className="relative min-h-screen bg-gradient-to-br from-[#0b0b1d] via-[#141428] to-[#1a1a35] flex flex-col items-center justify-center px-6 py-12 overflow-hidden">
      
      {/* Floating decorative shapes */}
      <motion.div
        className="absolute top-10 left-10 w-24 h-24 bg-indigo-500 opacity-20 rounded-full blur-3xl"
        variants={floatingShape}
        animate="animate"
      />
      <motion.div
        className="absolute bottom-12 right-16 w-32 h-32 bg-pink-500 opacity-20 rounded-full blur-3xl"
        variants={floatingShape}
        animate="animate"
      />

      <motion.div
        className="max-w-3xl bg-white/20 backdrop-blur-lg shadow-xl rounded-3xl p-10 text-center border border-white/30"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={container}
      >
        <motion.h1
          variants={item}
          className="text-4xl sm:text-5xl font-bold mb-4 bg-gradient-to-r from-indigo-400 via-purple-500 to-pink-500 bg-clip-text text-transparent animate-gradient-x"
        >
          About Us
        </motion.h1>

        <motion.p
          variants={item}
          className="text-lg sm:text-xl text-gray-200 leading-relaxed mb-6"
        >
          Welcome to <span className="font-semibold text-indigo-400">Our Platform</span> — 
          where innovation meets simplicity. We are passionate about building 
          intuitive and intelligent web solutions that empower businesses and 
          individuals to reach their goals faster and smarter.
        </motion.p>

        <motion.p
          variants={item}
          className="text-lg sm:text-xl text-gray-200 leading-relaxed mb-6"
        >
          Our mission is to deliver high-quality, impactful products. 
          From automation and analytics to design thinking, we focus on 
          creating solutions that enhance productivity and inspire creativity.
        </motion.p>

        <motion.h2
          variants={item}
          className="text-2xl sm:text-3xl font-semibold text-gray-200 mt-8 mb-3 bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 bg-clip-text text-transparent animate-gradient-x"
        >
          Our Vision
        </motion.h2>

        <motion.p
          variants={item}
          className="text-lg sm:text-xl text-gray-200 leading-relaxed"
        >
          To become a global leader in creating smart, accessible, and impactful digital solutions
          that transform how people connect, learn, and grow online.
        </motion.p>

        <motion.div
          variants={item}
          className="mt-10 p-6 rounded-2xl bg-white/10 backdrop-blur-lg border border-white/20 shadow-lg"
          whileHover={{ scale: 1.05, rotate: 1 }}
          transition={{ type: "spring", stiffness: 120 }}
        >
          <motion.h3
            variants={item}
            className="text-xl sm:text-2xl font-semibold mb-2 bg-gradient-to-r from-indigo-400 via-purple-500 to-pink-500 bg-clip-text text-transparent animate-gradient-x"
          >
            Get in Touch
          </motion.h3>
          <motion.p variants={item} className="text-gray-200">
            Have questions or suggestions? We’d love to hear from you! <br />
            📩 Email us at{" "}
            <a
              href="mailto:contact@ourplatform.com"
              className="text-indigo-400 underline hover:text-pink-400 transition-colors duration-300"
            >
              contact@ourplatform.com
            </a>
          </motion.p>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default About;
