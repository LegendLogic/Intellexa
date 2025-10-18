import React, { useState, useRef } from "react";
import { jsPDF } from "jspdf";

const Resume = () => {
  const [personal, setPersonal] = useState({
    name: "",
    title: "",
    location: "",
    email: "",
    phone: "",
    linkedin: "",
    github: "",
  });

  const [education, setEducation] = useState([]);
  const [currentEducation, setCurrentEducation] = useState({
    degree: "",
    college: "",
    year: "",
    cgpa: "",
  });

  const [skills, setSkills] = useState([]);
  const [projects, setProjects] = useState([]);
  const [currentProject, setCurrentProject] = useState({
    title: "",
    tech: "",
    description: "",
    link: "",
  });

  const resumeRef = useRef();

  const handleAddEducation = () => {
    if (currentEducation.degree && currentEducation.college) {
      setEducation([...education, currentEducation]);
      setCurrentEducation({ degree: "", college: "", year: "", cgpa: "" });
    }
  };

  const handleAddProject = () => {
    if (currentProject.title && currentProject.tech) {
      setProjects([...projects, currentProject]);
      setCurrentProject({ title: "", tech: "", description: "", link: "" });
    }
  };

  const handleDownloadPDF = () => {
    const doc = new jsPDF("p", "pt", "a4");
    doc.html(resumeRef.current, {
      callback: function (doc) {
        doc.save("resume.pdf");
      },
      x: 10,
      y: 10,
      width: 580,
      windowWidth: 800,
    });
  };

  return (
    <div className="min-h-screen bg-gray-50 px-6 py-12 flex flex-col items-center space-y-12">
      {/* Input Form */}
      <div className="max-w-3xl w-full bg-white shadow-lg rounded-2xl p-6 space-y-6">
        <h2 className="text-2xl font-bold text-gray-800 text-center">Resume Builder</h2>

        {/* Personal Info */}
        <div className="space-y-3">
          <h3 className="font-semibold text-gray-700">Personal Info</h3>
          {["name", "title", "location", "email", "phone", "linkedin", "github"].map((field) => (
            <input
              key={field}
              type={field === "email" ? "email" : "text"}
              placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
              value={personal[field]}
              onChange={(e) => setPersonal({ ...personal, [field]: e.target.value })}
              className="w-full border px-3 py-2 rounded-lg"
            />
          ))}
        </div>

        {/* Education Section */}
        <div className="space-y-3">
          <h3 className="font-semibold text-gray-700">Education</h3>
          {["degree", "college", "year", "cgpa"].map((field) => (
            <input
              key={field}
              type="text"
              placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
              value={currentEducation[field]}
              onChange={(e) =>
                setCurrentEducation({ ...currentEducation, [field]: e.target.value })
              }
              className="w-full border px-3 py-2 rounded-lg"
            />
          ))}
          <button
            onClick={handleAddEducation}
            className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition"
          >
            Add Education
          </button>
        </div>

        {/* Skills Section */}
        <div className="space-y-3">
          <h3 className="font-semibold text-gray-700">Skills</h3>
          <input
            type="text"
            placeholder="Add skill and press Enter"
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                e.preventDefault();
                if (e.target.value.trim() !== "") {
                  setSkills([...skills, e.target.value.trim()]);
                  e.target.value = "";
                }
              }
            }}
            className="w-full border px-3 py-2 rounded-lg"
          />
          <div className="flex flex-wrap gap-2">
            {skills.map((skill, i) => (
              <span key={i} className="px-3 py-1 bg-indigo-50 text-indigo-700 rounded-full text-sm">
                {skill}
              </span>
            ))}
          </div>
        </div>

        {/* Projects Section */}
        <div className="space-y-3">
          <h3 className="font-semibold text-gray-700">Projects</h3>
          {["title", "tech", "description", "link"].map((field) => (
            field === "description" ? (
              <textarea
                key={field}
                placeholder="Project Description"
                value={currentProject.description}
                onChange={(e) =>
                  setCurrentProject({ ...currentProject, description: e.target.value })
                }
                className="w-full border px-3 py-2 rounded-lg"
              />
            ) : (
              <input
                key={field}
                type="text"
                placeholder={field === "link" ? "Project Link (optional)" : field.charAt(0).toUpperCase() + field.slice(1)}
                value={currentProject[field]}
                onChange={(e) =>
                  setCurrentProject({ ...currentProject, [field]: e.target.value })
                }
                className="w-full border px-3 py-2 rounded-lg"
              />
            )
          ))}
          <button
            onClick={handleAddProject}
            className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition"
          >
            Add Project
          </button>
        </div>

        {/* Download Button */}
        <div className="text-center mt-4">
          <button
            onClick={handleDownloadPDF}
            className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 transition"
          >
            Download PDF
          </button>
        </div>
      </div>

      {/* Resume Preview */}
      <div
        ref={resumeRef}
        className="max-w-4xl w-full bg-white shadow-lg rounded-2xl p-8 space-y-4"
      >
        <h1 className="text-4xl font-bold text-gray-800">{personal.name || "Your Name"}</h1>
        <p className="text-indigo-600 font-medium">{personal.title || "Title"}</p>
        <p className="text-gray-600">
          📍 {personal.location || "Location"} | 📧 {personal.email || "Email"} | ☎️ {personal.phone || "Phone"}
        </p>

        {education.length > 0 && (
          <section>
            <h2 className="text-2xl font-semibold text-gray-800 border-b-2 border-indigo-500 inline-block mb-2">
              Education
            </h2>
            {education.map((edu, i) => (
              <div key={i} className="text-gray-700 mb-2">
                <h3 className="font-semibold">{edu.degree}</h3>
                <p>{edu.college} ({edu.year})</p>
                <p className="text-sm">CGPA: {edu.cgpa}</p>
              </div>
            ))}
          </section>
        )}

        {skills.length > 0 && (
          <section>
            <h2 className="text-2xl font-semibold text-gray-800 border-b-2 border-indigo-500 inline-block mb-2">
              Skills
            </h2>
            <div className="flex flex-wrap gap-2">
              {skills.map((skill, i) => (
                <span key={i} className="px-3 py-1 bg-indigo-50 text-indigo-700 rounded-full text-sm">
                  {skill}
                </span>
              ))}
            </div>
          </section>
        )}

        {projects.length > 0 && (
          <section>
            <h2 className="text-2xl font-semibold text-gray-800 border-b-2 border-indigo-500 inline-block mb-2">
              Projects
            </h2>
            {projects.map((project, i) => (
              <div key={i} className="mb-2 text-gray-700">
                <h3 className="font-semibold">{project.title}</h3>
                <p className="text-sm text-gray-600">{project.tech}</p>
                <p className="text-sm">{project.description}</p>
                {project.link && (
                  <a
                    href={project.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-indigo-600 hover:underline text-sm"
                  >
                    View Project
                  </a>
                )}
              </div>
            ))}
          </section>
        )}
      </div>
    </div>
  );
};

export default Resume;
