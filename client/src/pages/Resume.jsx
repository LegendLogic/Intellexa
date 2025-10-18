import React, { useState, useRef } from "react";
import { Download, User, Briefcase, GraduationCap, Code, Award } from "lucide-react";
import { FaExternalLinkAlt, FaRegFileAlt } from "react-icons/fa";

const Resume = () => {
  const [resumeData, setResumeData] = useState({
    name: "First Last",
    address: "123 Street Name, Town, State 12345",
    phone: "123-456-7890",
    email: "email@gmail.com",
    linkedin: "linkedin.com/in/username",
    github: "github.com/username",
    education: [
      {
        university: "State University",
        degree: "B.Sc. in Computer Science",
        duration: "Sep 2017 – May 2021",
        location: "City, State",
      },
    ],
    experience: [
      {
        company: "Electronics Company",
        role: "Software Engineer Intern",
        duration: "May 2020 – Aug 2020",
        details: [
          "Developed automated testing services for daily unit tests.",
          "Used Python and PowerShell to aggregate XML reports.",
          "Integrated Jenkins for continuous integration.",
          "Generated HTML-based result dashboards.",
        ],
      },
    ],
    projects: [
      {
        title: "Gym Reservation Bot",
        stack: "Python, Selenium, Google Cloud",
        date: "Jan 2021",
        points: [
          "Automated gym slot booking with Selenium.",
          "Deployed on Google Cloud VM with daily cron jobs.",
        ],
      },
    ],
    skills: {
      languages: "Python, Java, C, HTML/CSS, JavaScript, SQL",
      tools: "VS Code, Eclipse, Google Cloud Platform, Android Studio",
      frameworks: "Linux, Jenkins, GitHub, JUnit, WordPress",
    },
  });


   const websites = [
    { name: "Canva", url: "https://www.canva.com/resumes/templates/" },
    { name: "Zety", url: "https://zety.com/resume-builder" },
    { name: "Novoresume", url: "https://novoresume.com/" },
    { name: "Kickresume", url: "https://kickresume.com/" },
    { name: "Resume.io", url: "https://resume.io/" },
    { name: "VisualCV", url: "https://www.visualcv.com/" },
    { name: "Enhancv", url: "https://enhancv.com/" },
    { name: "Indeed", url: "https://www.indeed.com/create-resume" },
    { name: "CakeResume", url: "https://www.cakeresume.com/" },
    { name: "Standard Resume", url: "https://standardresume.co/" },
  ];

  const resumeRef = useRef();
  const [loading, setLoading] = useState(false);

  const handleInputChange = (field, value) => {
    setResumeData((prev) => ({ ...prev, [field]: value }));
  };

  const handleArrayChange = (section, index, field, value) => {
    setResumeData((prev) => ({
      ...prev,
      [section]: prev[section].map((item, i) =>
        i === index ? { ...item, [field]: value } : item
      ),
    }));
  };

  const handleDetailsChange = (section, index, detailIndex, value) => {
    setResumeData((prev) => ({
      ...prev,
      [section]: prev[section].map((item, i) =>
        i === index
          ? {
              ...item,
              [section === "experience" ? "details" : "points"]: item[
                section === "experience" ? "details" : "points"
              ].map((d, j) => (j === detailIndex ? value : d)),
            }
          : item
      ),
    }));
  };

  const handleSkillChange = (field, value) => {
    setResumeData((prev) => ({
      ...prev,
      skills: { ...prev.skills, [field]: value },
    }));
  };

  const handleDownloadPDF = () => {
    setLoading(true);
    // Simulate PDF generation
    setTimeout(() => {
      window.print();
      setLoading(false);
    }, 500);
  };

  return (
    <div className="min-h-screen mt-20 bg-gradient-to-br from-blue-50 to-indigo-100 p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-8 print:hidden">
          <h1 className="text-4xl font-bold text-gray-800 mb-2">Resume Builder</h1>
          <p className="text-gray-600">Create your professional resume in minutes</p>
        </div>

        <div className="flex flex-col lg:flex-row gap-6">
          {/* Left Panel - Edit Section */}
          <div className="lg:w-2/5 print:hidden">
            <div className="bg-white rounded-xl shadow-lg p-6 sticky top-4">
              <div className="flex items-center gap-2 mb-6">
                <User className="w-6 h-6 text-blue-600" />
                <h2 className="text-2xl font-bold text-gray-800">Edit Details</h2>
              </div>

              <div className="space-y-6 max-h-[calc(100vh-200px)] overflow-y-auto pr-2">
                {/* Personal Info */}
                <div className="space-y-3">
                  <h3 className="font-semibold text-gray-700 flex items-center gap-2">
                    <Award className="w-4 h-4" />
                    Personal Information
                  </h3>
                  {[
                    ["Full Name", "name"],
                    ["Address", "address"],
                    ["Phone", "phone"],
                    ["Email", "email"],
                    ["LinkedIn", "linkedin"],
                    ["GitHub", "github"],
                  ].map(([label, key]) => (
                    <div key={key}>
                      <label className="block text-xs font-medium text-gray-600 mb-1">
                        {label}
                      </label>
                      <input
                        type="text"
                        value={resumeData[key]}
                        onChange={(e) => handleInputChange(key, e.target.value)}
                        className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>
                  ))}
                </div>

                {/* Education */}
                <div className="space-y-3 pt-4 border-t">
                  <h3 className="font-semibold text-gray-700 flex items-center gap-2">
                    <GraduationCap className="w-4 h-4" />
                    Education
                  </h3>
                  {resumeData.education.map((edu, i) => (
                    <div key={i} className="space-y-2 p-3 bg-gray-50 rounded-lg">
                      <input
                        type="text"
                        value={edu.university}
                        onChange={(e) =>
                          handleArrayChange("education", i, "university", e.target.value)
                        }
                        className="w-full border border-gray-300 rounded px-2 py-1 text-sm"
                        placeholder="University"
                      />
                      <input
                        type="text"
                        value={edu.degree}
                        onChange={(e) =>
                          handleArrayChange("education", i, "degree", e.target.value)
                        }
                        className="w-full border border-gray-300 rounded px-2 py-1 text-sm"
                        placeholder="Degree"
                      />
                      <input
                        type="text"
                        value={edu.duration}
                        onChange={(e) =>
                          handleArrayChange("education", i, "duration", e.target.value)
                        }
                        className="w-full border border-gray-300 rounded px-2 py-1 text-sm"
                        placeholder="Duration"
                      />
                    </div>
                  ))}
                </div>

                {/* Experience */}
                <div className="space-y-3 pt-4 border-t">
                  <h3 className="font-semibold text-gray-700 flex items-center gap-2">
                    <Briefcase className="w-4 h-4" />
                    Experience
                  </h3>
                  {resumeData.experience.map((exp, i) => (
                    <div key={i} className="space-y-2 p-3 bg-gray-50 rounded-lg">
                      <input
                        type="text"
                        value={exp.company}
                        onChange={(e) =>
                          handleArrayChange("experience", i, "company", e.target.value)
                        }
                        className="w-full border border-gray-300 rounded px-2 py-1 text-sm"
                        placeholder="Company"
                      />
                      <input
                        type="text"
                        value={exp.role}
                        onChange={(e) =>
                          handleArrayChange("experience", i, "role", e.target.value)
                        }
                        className="w-full border border-gray-300 rounded px-2 py-1 text-sm"
                        placeholder="Role"
                      />
                      <input
                        type="text"
                        value={exp.duration}
                        onChange={(e) =>
                          handleArrayChange("experience", i, "duration", e.target.value)
                        }
                        className="w-full border border-gray-300 rounded px-2 py-1 text-sm"
                        placeholder="Duration"
                      />
                      {exp.details.map((detail, j) => (
                        <textarea
                          key={j}
                          value={detail}
                          onChange={(e) =>
                            handleDetailsChange("experience", i, j, e.target.value)
                          }
                          className="w-full border border-gray-300 rounded px-2 py-1 text-sm"
                          rows="2"
                        />
                      ))}
                    </div>
                  ))}
                </div>

                {/* Skills */}
                <div className="space-y-3 pt-4 border-t">
                  <h3 className="font-semibold text-gray-700 flex items-center gap-2">
                    <Code className="w-4 h-4" />
                    Technical Skills
                  </h3>
                  {[
                    ["Languages", "languages"],
                    ["Tools", "tools"],
                    ["Frameworks", "frameworks"],
                  ].map(([label, key]) => (
                    <div key={key}>
                      <label className="block text-xs font-medium text-gray-600 mb-1">
                        {label}
                      </label>
                      <input
                        type="text"
                        value={resumeData.skills[key]}
                        onChange={(e) => handleSkillChange(key, e.target.value)}
                        className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>
                  ))}
                </div>
              </div>

              <button
                onClick={handleDownloadPDF}
                disabled={loading}
                className={`w-full mt-6 py-3 rounded-lg font-semibold text-white transition-all flex items-center justify-center gap-2 ${
                  loading
                    ? "bg-gray-400 cursor-not-allowed"
                    : "bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 shadow-lg hover:shadow-xl"
                }`}
              >
                <Download className="w-5 h-5" />
                {loading ? "Preparing..." : "Download PDF"}
              </button>
            </div>
          </div>

          {/* Right Panel - Resume Preview */}
          <div className="lg:w-3/5">
            <div className="bg-white rounded-xl shadow-2xl overflow-hidden print:shadow-none print:rounded-none">
              <div
                ref={resumeRef}
                className="bg-white text-gray-900 p-12 max-w-[210mm] mx-auto print:p-16"
                style={{ fontFamily: "Georgia, serif" }}
              >
                {/* Header */}
                <div className="text-center mb-6 pb-4 border-b-2 border-gray-300">
                  <h1 className="text-4xl font-bold uppercase tracking-wider mb-2">
                    {resumeData.name}
                  </h1>
                  <p className="text-sm text-gray-700 mb-1">{resumeData.address}</p>
                  <p className="text-sm text-gray-700">
                    {resumeData.phone} | {resumeData.email}
                  </p>
                  <p className="text-sm text-gray-700">
                    {resumeData.linkedin} | {resumeData.github}
                  </p>
                </div>

                {/* Education */}
                <section className="mb-6">
                  <h2 className="uppercase font-bold text-lg mb-3 pb-1 border-b-2 border-gray-400">
                    Education
                  </h2>
                  {resumeData.education.map((edu, i) => (
                    <div key={i} className="mb-2">
                      <div className="flex justify-between items-start">
                        <div>
                          <p className="font-bold">{edu.university}</p>
                          <p className="text-sm italic">{edu.degree}</p>
                        </div>
                        <p className="text-sm text-gray-700">{edu.duration}</p>
                      </div>
                    </div>
                  ))}
                </section>

                {/* Experience */}
                <section className="mb-6">
                  <h2 className="uppercase font-bold text-lg mb-3 pb-1 border-b-2 border-gray-400">
                    Experience
                  </h2>
                  {resumeData.experience.map((exp, i) => (
                    <div key={i} className="mb-4">
                      <div className="flex justify-between items-start mb-1">
                        <div>
                          <p className="font-bold">{exp.role}</p>
                          <p className="text-sm italic">{exp.company}</p>
                        </div>
                        <p className="text-sm text-gray-700">{exp.duration}</p>
                      </div>
                      <ul className="list-disc list-outside ml-5 text-sm space-y-1">
                        {exp.details.map((d, j) => (
                          <li key={j}>{d}</li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </section>

                {/* Projects */}
                <section className="mb-6">
                  <h2 className="uppercase font-bold text-lg mb-3 pb-1 border-b-2 border-gray-400">
                    Projects
                  </h2>
                  {resumeData.projects.map((proj, i) => (
                    <div key={i} className="mb-4">
                      <div className="flex justify-between items-start mb-1">
                        <div>
                          <p className="font-bold">{proj.title}</p>
                          <p className="text-sm italic">{proj.stack}</p>
                        </div>
                        <p className="text-sm text-gray-700">{proj.date}</p>
                      </div>
                      <ul className="list-disc list-outside ml-5 text-sm space-y-1">
                        {proj.points.map((p, j) => (
                          <li key={j}>{p}</li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </section>

                {/* Skills */}
                <section>
                  <h2 className="uppercase font-bold text-lg mb-3 pb-1 border-b-2 border-gray-400">
                    Technical Skills
                  </h2>
                  <div className="space-y-1 text-sm">
                    <p>
                      <strong>Languages:</strong> {resumeData.skills.languages}
                    </p>
                    <p>
                      <strong>Tools:</strong> {resumeData.skills.tools}
                    </p>
                    <p>
                      <strong>Frameworks:</strong> {resumeData.skills.frameworks}
                    </p>
                  </div>
                </section>
              </div>
            </div>
          </div>
        </div>
      </div>
     <div className="max-w-4xl mx-auto p-6 bg-gray-900 text-white rounded-2xl shadow-2xl mt-6 border border-gray-700">
      <h2 className="text-3xl font-bold text-indigo-400 mb-6 text-center">
        🚀 Top Resume-Building Websites
      </h2>
      <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {websites.map((site, index) => (
          <li
            key={index}
            className="flex items-center justify-between bg-gray-800 hover:bg-gray-700 transition-colors rounded-lg p-4 shadow-md"
          >
            <div className="flex items-center space-x-3">
              <FaRegFileAlt className="text-indigo-400 text-xl" />
              <span className="font-medium text-gray-100">{site.name}</span>
            </div>
            <a
              href={site.url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-indigo-300 hover:text-indigo-500 transition-colors text-lg"
            >
              <FaExternalLinkAlt />
            </a>
          </li>
        ))}
      </ul>
      <p className="text-gray-400 text-sm mt-4 text-center">
        Click the icon to visit the website.
      </p>
    </div>

      <style>{`
        @media print {
          body {
            margin: 0;
            padding: 0;
          }
          .print\\:hidden {
            display: none !important;
          }
          .print\\:shadow-none {
            box-shadow: none !important;
          }
          .print\\:rounded-none {
            border-radius: 0 !important;
          }
          .print\\:p-16 {
            padding: 4rem !important;
          }
        }
      `}</style>
    </div>
  );
};

export default Resume;