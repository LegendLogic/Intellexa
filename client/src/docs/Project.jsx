import React, { useState } from 'react';
import { PlayCircle, BookOpen, ExternalLink } from 'lucide-react';

const Project = () => {
  const [selectedCategory, setSelectedCategory] = useState('All');

  const projects = [
    // Frontend Projects
    {
      id: 1,
      title: "Personal Portfolio Website",
      category: "Frontend",
      level: "Beginner",
      description: "Build a responsive portfolio to showcase your work using HTML, CSS, and JavaScript.",
      url: "https://www.freecodecamp.org/news/how-to-build-a-personal-portfolio-website/"
    },
    {
      id: 2,
      title: "Todo App with React",
      category: "Frontend",
      level: "Beginner to Intermediate",
      description: "Create a Todo list app using React, state management, and local storage.",
      url: "https://reactjs.org/docs/getting-started.html"
    },
    {
      id: 3,
      title: "E-commerce Website",
      category: "Frontend",
      level: "Advanced",
      description: "Build a full-featured e-commerce site with React, Tailwind CSS, and Stripe payment integration.",
      url: "https://www.udemy.com/course/react-redux/"
    },

    // Backend Projects
    {
      id: 4,
      title: "REST API with Node.js & Express",
      category: "Backend",
      level: "Beginner",
      description: "Create a simple CRUD API with Node.js, Express, and MongoDB.",
      url: "https://www.mongodb.com/languages/mern-stack-tutorial"
    },
    {
      id: 5,
      title: "Authentication System",
      category: "Backend",
      level: "Intermediate",
      description: "Implement user login, signup, and JWT-based authentication in Node.js.",
      url: "https://www.freecodecamp.org/news/nodejs-jwt-authentication-tutorial/"
    },
    {
      id: 6,
      title: "Real-time Chat App",
      category: "Backend",
      level: "Advanced",
      description: "Build a real-time chat application using Node.js, Express, and Socket.io.",
      url: "https://socket.io/get-started/chat/"
    },

    // Full Stack Projects
    {
      id: 7,
      title: "Blog Platform",
      category: "Full Stack",
      level: "Intermediate",
      description: "Create a full-stack blog platform using MERN stack (MongoDB, Express, React, Node.js).",
      url: "https://www.mongodb.com/languages/mern-stack-tutorial"
    },
    {
      id: 8,
      title: "Social Media App",
      category: "Full Stack",
      level: "Advanced",
      description: "Build a social media platform with posts, comments, likes, and authentication using MERN.",
      url: "https://www.udemy.com/course/mern-stack-front-to-back/"
    },

    // Data Science / AI Projects
    {
      id: 9,
      title: "Stock Price Predictor",
      category: "Data Science",
      level: "Intermediate",
      description: "Predict stock prices using Python, pandas, scikit-learn, and machine learning models.",
      url: "https://www.kaggle.com/competitions"
    },
    {
      id: 10,
      title: "AI Chatbot",
      category: "AI/ML",
      level: "Advanced",
      description: "Build a chatbot using Python, NLP libraries, and integrate with a web interface.",
      url: "https://www.tensorflow.org/tutorials/text/text_generation"
    },
  ];

  const categories = ["All", ...new Set(projects.map(p => p.category))];

  const filteredProjects = selectedCategory === "All"
    ? projects
    : projects.filter(p => p.category === selectedCategory);

  return (
    <div className="min-h-screen  p-6"
     style={{
    background:
      "radial-gradient(circle 600px at 60% 20%, rgba(249,115,22,0.25), transparent 70%), radial-gradient(circle 800px at 10% 80%, rgba(255,56,0,0.15), transparent 70%), #0e0b11",
  }}
    >
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl mt-10 font-bold text-white mb-6 flex items-center gap-3">
          <BookOpen className="text-orange-600" size={40} /> Project Roadmap
        </h1>

        {/* Category Filter */}
        <div className="flex flex-wrap gap-3 mb-6">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 rounded-full font-medium text-sm transition-all ${
                selectedCategory === cat
                  ? "bg-orange-600 text-white shadow-md"
                  : "border text-white hover:bg-orange-400"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Projects List */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProjects.map(project => (
            <a
              key={project.id}
              href={project.url}
              target="_blank"
              rel="noopener noreferrer"
              className="border-2 rounded-2xl shadow-lg p-5 hover:shadow-2xl transition-all flex flex-col justify-between"
            >
              <div>
                <h3 className="text-lg font-bold text-orange-500 mb-2">{project.title}</h3>
                <p className="text-sm text-white mb-3">{project.description}</p>
              </div>
              <div className="flex justify-between items-center mt-4 text-sm text-black">
                <span className="px-2 py-1 bg-white/40 rounded-full">{project.level}</span>
                <PlayCircle size={20} className="text-orange-600" />
              </div>
            </a>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Project;
