import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import {
  CheckCircle,
  Rocket,
  BookOpen,
  Code,
  Briefcase,
  Award,
  Star,
} from "lucide-react";

const sections = [
  {
    id: 1,
    title: "1️⃣ Foundation: Learn the Basics",
    icon: <BookOpen className="w-6 h-6 text-indigo-600" />,
    description:
      "Start with the fundamentals of web development — HTML, CSS, and JavaScript. Build small static websites to understand structure, styling, and basic interactivity.",
    topics: ["HTML5", "CSS3", "JavaScript Basics", "Responsive Design"],
    color: "from-indigo-500 to-blue-500",
    path: "/basic",
    variant: { initial: { opacity: 0, x: -50 }, animate: { opacity: 1, x: 0 } },
  },
  {
    id: 2,
    title: "2️⃣ Frontend Development: React & UI",
    icon: <Code className="w-6 h-6 text-pink-600" />,
    description:
      "Move on to frontend frameworks like React to create dynamic, interactive user interfaces. Learn to manage state, props, and component structure.",
    topics: ["React.js", "Tailwind CSS", "Framer Motion", "Axios / API calls"],
    color: "from-pink-500 to-rose-500",
    path: "/frontend",
    variant: { initial: { opacity: 0, y: 50 }, animate: { opacity: 1, y: 0 } },
  },
  {
    id: 3,
    title: "3️⃣ Backend Development: Build APIs",
    icon: <Rocket className="w-6 h-6 text-green-600" />,
    description:
      "Learn to handle data and server logic. Set up RESTful APIs, connect to databases, and build full-stack applications.",
    topics: ["Node.js", "Express.js", "MongoDB / PostgreSQL", "Authentication (JWT, OAuth)"],
    color: "from-green-500 to-emerald-500",
    path: "/backend",
    variant: { initial: { opacity: 0, x: 50 }, animate: { opacity: 1, x: 0 } },
  },
  // ... add paths for the rest
];

const RoadMap = () => {
  return (
    <div className="min-h-screen  py-16 px-6 flex flex-col items-center"
    style={{
    background:
      "radial-gradient(circle 600px at 60% 20%, rgba(249,115,22,0.25), transparent 70%), radial-gradient(circle 800px at 10% 80%, rgba(255,56,0,0.15), transparent 70%), #0e0b11",
  }}
    >
      <motion.h1
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-4xl font-bold text-indigo-700 mt-9 mb-12 text-center"
      >
         Developer Roadmap 2025
      </motion.h1>

      <div className="relative w-full max-w-5xl">
        {/* Timeline line */}
        <div className="absolute left-4 top-0 bottom-0 w-1 bg-gradient-to-b from-indigo-200 to-purple-200 rounded-lg"></div>

        {/* Sections */}
        <div className="space-y-10 ml-12">
          {sections.map((section, index) => (
            <Link key={section.id} to={section.path}>
              <motion.div
                initial={section.variant.initial}
                whileInView={section.variant.animate}
                transition={{ delay: index * 0.2, duration: 0.6 }}
                viewport={{ once: true }}
                className={`bg-white shadow-xl rounded-2xl p-6 border-l-8 border-transparent hover:shadow-2xl transition transform hover:-translate-y-1 cursor-pointer`}
                style={{
                  borderImage: `linear-gradient(to bottom right, var(--tw-gradient-stops)) 1`,
                  borderImageSource: `linear-gradient(to right, ${section.color
                    .replace("from-", "")
                    .replace("to-", "")
                    .split(" ")
                    .join(", ")})`,
                }}
              >
                <div className="flex items-center gap-3 mb-3">
                  <div
                    className={`flex items-center justify-center w-12 h-12 bg-gradient-to-r ${section.color} rounded-full`}
                  >
                    {section.icon}
                  </div>
                  <h2 className="text-xl font-semibold text-gray-800">
                    {section.title}
                  </h2>
                </div>

                <p className="text-gray-600 mb-3">{section.description}</p>
                <ul className="list-disc list-inside text-gray-700 space-y-1 pl-2">
                  {section.topics.map((topic, i) => (
                    <li key={i}>{topic}</li>
                  ))}
                </ul>
              </motion.div>
            </Link>
          ))}
        </div>
      </div>

      <motion.footer
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.6 }}
        className="mt-16 text-gray-500 text-sm text-center"
      >
        Made with ❤️ for learners — Keep coding, keep growing!
      </motion.footer>
    </div>
  );
};

export default RoadMap;
