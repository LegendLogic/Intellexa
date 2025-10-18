import React, { useState } from 'react';

// Sample AI/ML roadmap steps
const roadmap = [
  { id: 1, step: "Learn Python and basic programming concepts" },
  { id: 2, step: "Mathematics: Linear Algebra, Probability, Statistics" },
  { id: 3, step: "Data Analysis and Visualization (Pandas, NumPy, Matplotlib)" },
  { id: 4, step: "Machine Learning basics (Supervised & Unsupervised learning)" },
  { id: 5, step: "Deep Learning (Neural Networks, CNN, RNN)" },
  { id: 6, step: "NLP (Natural Language Processing) and Computer Vision" },
  { id: 7, step: "Projects and Kaggle Competitions" },
  { id: 8, step: "Deploy AI/ML models using Flask/Django or cloud platforms" },
];

// Sample videos for AI/ML learning
const videos = [
  {
    id: 1,
    title: "Python for Data Science",
    url: "https://www.youtube.com/embed/rfscVS0vtbw",
    duration: "4h 30m",
    level: "Beginner",
    instructor: "freeCodeCamp",
  },
  {
    id: 2,
    title: "Machine Learning Full Course",
    url: "https://www.youtube.com/embed/GwIo3gDZCVQ",
    duration: "6h",
    level: "Intermediate",
    instructor: "freeCodeCamp",
  },
  {
    id: 3,
    title: "Deep Learning Specialization",
    url: "https://www.youtube.com/embed/aircAruvnKk",
    duration: "5h 30m",
    level: "Intermediate",
    instructor: "Andrew Ng",
  },
];

// Sample articles
const articles = [
  {
    id: 1,
    title: "Introduction to Machine Learning",
    author: "Sangram Das",
    url: "https://www.example.com/articles/ml-intro",
  },
  {
    id: 2,
    title: "Deep Learning vs Machine Learning",
    author: "Jane Doe",
    url: "https://www.example.com/articles/deep-vs-ml",
  },
  {
    id: 3,
    title: "Top AI Tools for Beginners",
    author: "John Smith",
    url: "https://www.example.com/articles/ai-tools",
  },
];

const AIML = () => {
  const [selectedVideo, setSelectedVideo] = useState(videos[0]);

  return (
    <div className="min-h-screen mt-20 bg-gray-50 py-10 px-4">
      <div className="max-w-6xl mx-auto space-y-10">

        {/* Header */}
        <h1 className="text-4xl font-bold text-gray-800 text-center">
          🤖 AI/ML Learning Hub
        </h1>

        {/* Roadmap Section */}
        <section className="bg-white rounded-2xl shadow-lg p-6">
          <h2 className="text-2xl font-bold mb-4">🚀 Suggested Roadmap</h2>
          <ol className="list-decimal list-inside space-y-2 text-gray-700">
            {roadmap.map(step => (
              <li key={step.id}>{step.step}</li>
            ))}
          </ol>
        </section>

        {/* Video Section */}
        <section className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
            <div className="relative w-full aspect-video bg-black">
              <iframe
                src={selectedVideo.url}
                title={selectedVideo.title}
                className="w-full h-full"
                allowFullScreen
              />
            </div>
            <div className="p-6">
              <h3 className="text-xl font-bold mb-2">{selectedVideo.title}</h3>
              <p className="text-gray-600 mb-1">Instructor: {selectedVideo.instructor}</p>
              <p className="text-gray-600 mb-1">Level: {selectedVideo.level}</p>
              <p className="text-gray-600 mb-1">Duration: {selectedVideo.duration}</p>
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-lg p-6 space-y-3">
            <h3 className="text-xl font-bold mb-4">🎬 Recommended Videos</h3>
            {videos.map(video => (
              <button
                key={video.id}
                onClick={() => setSelectedVideo(video)}
                className={`block w-full text-left p-3 rounded-lg transition-all hover:bg-gray-100 ${
                  selectedVideo.id === video.id ? "bg-blue-50 border border-blue-500" : ""
                }`}
              >
                {video.title} - {video.instructor}
              </button>
            ))}
          </div>
        </section>

        {/* Articles Section */}
        <section className="bg-white rounded-2xl shadow-lg p-6">
          <h2 className="text-2xl font-bold mb-4">📝 Recommended Articles</h2>
          <ul className="space-y-3">
            {articles.map(article => (
              <li key={article.id} className="flex justify-between items-center">
                <a
                  href={article.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:underline"
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

export default AIML;
