import React, { useState } from 'react';

// Data Science roadmap steps
const roadmap = [
  { id: 1, step: "Learn Python or R programming" },
  { id: 2, step: "Statistics & Probability fundamentals" },
  { id: 3, step: "Data Cleaning, Analysis & Visualization (Pandas, NumPy, Matplotlib, Seaborn)" },
  { id: 4, step: "SQL and Database Management" },
  { id: 5, step: "Machine Learning basics (Regression, Classification, Clustering)" },
  { id: 6, step: "Advanced ML (Random Forest, SVM, Gradient Boosting)" },
  { id: 7, step: "Deep Learning (Neural Networks, TensorFlow/PyTorch)" },
  { id: 8, step: "Data Science Projects & Kaggle Competitions" },
  { id: 9, step: "Deployment & Data Science pipelines" },
];

// Suggested Data Science videos
const videos = [
  {
    id: 1,
    title: "Data Science Full Course",
    url: "https://www.youtube.com/embed/ua-CiDNNj30",
    duration: "7h 30m",
    level: "Beginner",
    instructor: "freeCodeCamp",
  },
  {
    id: 2,
    title: "Python for Data Analysis",
    url: "https://www.youtube.com/embed/r-uOLxNrNk8",
    duration: "4h 30m",
    level: "Beginner to Intermediate",
    instructor: "freeCodeCamp",
  },
  {
    id: 3,
    title: "Machine Learning with Python",
    url: "https://www.youtube.com/embed/GwIo3gDZCVQ",
    duration: "6h",
    level: "Intermediate",
    instructor: "freeCodeCamp",
  },
];

// Suggested Data Science articles
const articles = [
  {
    id: 1,
    title: "Top Data Science Skills in 2025",
    author: "John Doe",
    url: "https://www.kdnuggets.com/2025/01/top-data-science-skills.html",
  },
  {
    id: 2,
    title: "Introduction to Data Science",
    author: "Jane Smith",
    url: "https://www.analyticsvidhya.com/blog/2020/01/introduction-to-data-science/",
  },
  {
    id: 3,
    title: "Data Science Career Roadmap",
    author: "Sangram Das",
    url: "https://towardsdatascience.com/data-science-career-roadmap",
  },
];

const Datascience = () => {
  const [selectedVideo, setSelectedVideo] = useState(videos[0]);

  return (
    <div className="min-h-screen  py-10 px-4"
    style={{
        background:
          "radial-gradient(circle 600px at 60% 20%, rgba(249,115,22,0.25), transparent 70%), radial-gradient(circle 800px at 10% 80%, rgba(255,56,0,0.15), transparent 70%), #0e0b11",
      }}
    >
      <div className="max-w-6xl mx-auto space-y-10">

        {/* Header */}
        <h1 className="text-4xl mt-16 font-bold text-orange-700 text-center">
           Data Science Learning Hub
        </h1>

        {/* Roadmap Section */}
        <section className=" rounded-2xl shadow-lg p-6">
          <h2 className="text-2xl text-orange-400 font-bold mb-4"> Suggested Roadmap</h2>
          <ol className="list-decimal list-inside space-y-2 text-white">
            {roadmap.map(step => (
              <li key={step.id}>{step.step}</li>
            ))}
          </ol>
        </section>

        {/* Video Section */}
        <section className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className=" rounded-2xl shadow-lg overflow-hidden">
            <div className="relative w-full aspect-video bg-black">
              <iframe
                src={selectedVideo.url}
                title={selectedVideo.title}
                className="w-full h-full"
                allowFullScreen
              />
            </div>
            <div className="p-6">
              <h3 className="text-white font-bold mb-2">{selectedVideo.title}</h3>
              <p className="text-white mb-1">Instructor: {selectedVideo.instructor}</p>
              <p className="text-white mb-1">Level: {selectedVideo.level}</p>
              <p className="text-white mb-1">Duration: {selectedVideo.duration}</p>
            </div>
          </div>

          <div className=" rounded-2xl border shadow-lg p-6 space-y-3">
            <h3 className="text-xl text-white font-bold mb-4"> Recommended Videos</h3>
            {videos.map(video => (
              <button
                key={video.id}
                onClick={() => setSelectedVideo(video)}
                className={`block w-full text-left text-white p-3 rounded-lg transition-all hover:bg-orange-400 ${
                  selectedVideo.id === video.id ? "bg-white/30 border border-white" : ""
                }`}
              >
                {video.title} - {video.instructor}
              </button>
            ))}
          </div>
        </section>

        {/* Articles Section */}
        <section className=" rounded-2xl shadow-lg p-6">
          <h2 className="text-2xl text-orange-400 font-bold mb-4"> Recommended Articles</h2>
          <ul className="space-y-3">
            {articles.map(article => (
              <li key={article.id} className="flex justify-between items-center">
                <a
                  href={article.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white hover:underline"
                >
                  {article.title} - {article.author}
                </a>
              </li>
            ))}
          </ul>
        </section>
      </div>
    </div>
  );
};

export default Datascience;
