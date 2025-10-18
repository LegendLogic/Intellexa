import React from "react";

const Article = () => {
  return (
    <div className="max-w-4xl mx-auto px-6 py-10 bg-white shadow-md rounded-2xl mt-10">
      {/* Article Header */}
      <header className="mb-6">
        <h1 className="text-4xl font-bold text-gray-900 mb-2">
          The Future of AI: How Artificial Intelligence is Shaping the World
        </h1>
        <div className="flex items-center text-gray-500 text-sm space-x-4">
          <span>By <span className="font-semibold text-indigo-600">Sangram Das</span></span>
          <span>•</span>
          <span>{new Date().toLocaleDateString()}</span>
          <span>•</span>
          <span>8 min read</span>
        </div>
      </header>

      {/* Article Image */}
      <img
        src="https://images.unsplash.com/photo-1504384308090-c894fdcc538d"
        alt="AI Future"
        className="rounded-xl mb-8 w-full h-80 object-cover shadow"
      />

      {/* Article Body */}
      <article className="prose prose-lg text-gray-700 leading-relaxed">
        <p>
          Artificial Intelligence (AI) is transforming every industry — from healthcare and
          education to finance and entertainment. Machines that once followed instructions
          are now capable of learning, predicting, and even creating.
        </p>

        <h2>The Rise of Machine Learning</h2>
        <p>
          Machine Learning, a subset of AI, enables computers to learn from data without
          being explicitly programmed. Today, ML algorithms are used in everything from
          spam filtering to medical diagnosis.
        </p>

        <blockquote className="border-l-4 border-indigo-500 pl-4 italic text-gray-600">
          “AI is not just a tool; it’s a partner in human progress.”
        </blockquote>

        <h2>Impact on Jobs and Society</h2>
        <p>
          While AI promises efficiency, it also raises concerns about job automation and
          ethics. The challenge lies in balancing innovation with human values.
        </p>

        <h2>Looking Ahead</h2>
        <p>
          The next decade will see AI becoming more transparent, explainable, and
          human-centric. As AI continues to evolve, collaboration between technology and
          humanity will define our shared future.
        </p>

        <p>
          Whether you’re a developer, student, or entrepreneur, understanding AI is no
          longer optional — it’s essential.
        </p>
      </article>

      {/* Tags / Footer Section */}
      <footer className="mt-10 border-t pt-6 flex flex-wrap items-center justify-between text-sm text-gray-500">
        <div>
          <span className="font-medium text-gray-700">Tags:</span>{" "}
          <span className="bg-gray-100 px-2 py-1 rounded-lg mr-2">AI</span>
          <span className="bg-gray-100 px-2 py-1 rounded-lg mr-2">Technology</span>
          <span className="bg-gray-100 px-2 py-1 rounded-lg mr-2">Future</span>
        </div>

        <div>
          <span>© {new Date().getFullYear()} Sangram’s Blog</span>
        </div>
      </footer>
    </div>
  );
};

export default Article;
