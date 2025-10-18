import React from 'react';

const Profile = () => {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center px-6 py-12">
      <div className="max-w-3xl w-full bg-white shadow-lg rounded-2xl p-8 text-center">
        {/* Profile Image */}
        <img
          src="https://avatars.githubusercontent.com/u/00000000?v=4" // replace with your image URL
          alt="Profile"
          className="w-32 h-32 rounded-full mx-auto mb-4 border-4 border-indigo-600 shadow-md"
        />

        {/* Name and Role */}
        <h1 className="text-3xl font-bold text-gray-800 mb-1">Sangram Das</h1>
        <p className="text-indigo-600 font-medium mb-6">Full Stack Developer | AI Enthusiast</p>

        {/* Bio */}
        <p className="text-gray-600 leading-relaxed mb-6">
          Passionate about crafting intelligent and scalable web applications.  
          Currently exploring the intersection of AI and full-stack development —  
          building projects that solve real-world problems through technology and automation.
        </p>

        {/* Skills Section */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-8">
          {['React', 'Node.js', 'MongoDB', 'Tailwind CSS', 'Python (AI/ML)', 'Google Cloud'].map((skill, index) => (
            <span
              key={index}
              className="px-4 py-2 bg-indigo-50 text-indigo-700 font-medium rounded-full shadow-sm"
            >
              {skill}
            </span>
          ))}
        </div>

        {/* Social Links */}
        <div className="flex justify-center space-x-6 text-gray-600 text-2xl">
          <a
            href="https://github.com/sangramdas00"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-indigo-600 transition duration-200"
          >
            <i className="fab fa-github"></i>
          </a>
          <a
            href="https://linkedin.com/in/sangramdas00"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-indigo-600 transition duration-200"
          >
            <i className="fab fa-linkedin"></i>
          </a>
          <a
            href="mailto:sangramdas@example.com"
            className="hover:text-indigo-600 transition duration-200"
          >
            <i className="fas fa-envelope"></i>
          </a>
        </div>

        {/* Footer */}
        <footer className="mt-10 text-sm text-gray-500">
          © {new Date().getFullYear()} Sangram Das — All Rights Reserved.
        </footer>
      </div>
    </div>
  );
};

export default Profile;
