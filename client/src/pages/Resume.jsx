import React, { useState } from "react";
import { Download, Plus, Trash2, ChevronDown, ChevronUp } from "lucide-react";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";

const Resume = () => {
  const [resumeData, setResumeData] = useState({
    name: "First Last",
    contact: {
      address: "123 Street Name, Town, State 12345",
      phone: "123-456-7890",
      email: "email@gmail.com",
      linkedin: "linkedin.com/in/username",
      github: "github.com/username"
    },
    education: [
      {
        school: "State University",
        degree: "Bachelor of Science in Computer Science",
        location: "City, State",
        duration: "Sep. 2017 – May 2021"
      }
    ],
    coursework: [
      "Data Structures",
      "Software Methodology",
      "Algorithms Analysis",
      "Database Management",
      "Artificial Intelligence",
      "Internet Technology",
      "Systems Programming",
      "Computer Architecture"
    ],
    experience: [
      {
        company: "Electronics Company",
        role: "Software Engineer Intern",
        location: "City, State",
        duration: "May 2020 – August 2020",
        points: [
          "Developed a service to automatically perform a set of unit tests daily on a product in development in order to decrease time needed for team members to identify and fix bugs/issues.",
          "Incorporated scripts using Python and PowerShell to aggregate XML test results into an organized format and to load the latest build code onto the hardware, so that daily testing can be performed.",
          "Utilized Jenkins to provide a continuous integration service in order to automate the entire process of loading the latest build code and test files, running the tests, and generating a report of the results once per day.",
          "Explored ways to visualize and send a daily report of test results to team members using HTML, Javascript, and CSS."
        ]
      }
    ],
    projects: [
      {
        title: "Gym Reservation Bot",
        tech: "Python, Selenium, Google Cloud Console",
        date: "January 2021",
        points: [
          "Developed an automatic bot using Python and Google Cloud Console to register myself for a timeslot at my school gym.",
          "Implemented Selenium to create an instance of Chrome in order to interact with the correct elements of the web page.",
          "Created a Linux virtual machine to run on Google Cloud so that the program is able to run everyday from the cloud.",
          "Used Cron to schedule the program to execute automatically at 11 AM every morning so a reservation is made for me."
        ]
      }
    ],
    skills: {
      languages: "Python, Java, C, HTML/CSS, JavaScript, SQL",
      tools: "VS Code, Eclipse, Google Cloud Platform, Android Studio",
      frameworks: "Linux, Jenkins, GitHub, JUnit, WordPress"
    },
    leadership: [
      {
        organization: "Fraternity",
        role: "President",
        location: "University Name",
        duration: "Spring 2020 – Present",
        points: [
          "Achieved a 4 star fraternity ranking by the Office of Fraternity and Sorority Affairs (highest possible ranking).",
          "Managed executive board of 5 members and ran weekly meetings to oversee progress in essential parts of the chapter.",
          "Led chapter of 30+ members to work towards goals that improve and promote community service, academics, and unity."
        ]
      }
    ]
  });

  const [expandedSections, setExpandedSections] = useState({
    contact: true,
    education: true,
    coursework: false,
    experience: true,
    projects: true,
    skills: true,
    leadership: false
  });

  const [isGenerating, setIsGenerating] = useState(false);

  const toggleSection = (section) => {
    setExpandedSections(prev => ({ ...prev, [section]: !prev[section] }));
  };

  const updateContact = (field, value) => {
    setResumeData(prev => ({
      ...prev,
      contact: { ...prev.contact, [field]: value }
    }));
  };

  const updateArrayItem = (section, index, field, value) => {
    setResumeData(prev => ({
      ...prev,
      [section]: prev[section].map((item, i) =>
        i === index ? { ...item, [field]: value } : item
      )
    }));
  };

  const updateArrayItemPoint = (section, itemIndex, pointIndex, value) => {
    setResumeData(prev => ({
      ...prev,
      [section]: prev[section].map((item, i) =>
        i === itemIndex
          ? {
              ...item,
              points: item.points.map((p, j) => (j === pointIndex ? value : p))
            }
          : item
      )
    }));
  };

  const addArrayItem = (section, template) => {
    setResumeData(prev => ({
      ...prev,
      [section]: [...prev[section], template]
    }));
  };

  const removeArrayItem = (section, index) => {
    setResumeData(prev => ({
      ...prev,
      [section]: prev[section].filter((_, i) => i !== index)
    }));
  };

  const addPoint = (section, itemIndex) => {
    setResumeData(prev => ({
      ...prev,
      [section]: prev[section].map((item, i) =>
        i === itemIndex
          ? { ...item, points: [...item.points, "New bullet point"] }
          : item
      )
    }));
  };

  const removePoint = (section, itemIndex, pointIndex) => {
    setResumeData(prev => ({
      ...prev,
      [section]: prev[section].map((item, i) =>
        i === itemIndex
          ? { ...item, points: item.points.filter((_, j) => j !== pointIndex) }
          : item
      )
    }));
  };

  const handleDownloadPDF = async () => {
    const resumeElement = document.getElementById("resume-preview");
    setIsGenerating(true);
    
    try {
      // Create canvas from the resume element
      const canvas = await html2canvas(resumeElement, {
        scale: 2, // Higher quality
        useCORS: true,
        logging: false,
        backgroundColor: "#ffffff"
      });

      // Calculate dimensions for letter size (8.5 x 11 inches)
      const imgWidth = 210; // A4 width in mm (similar to letter)
      const imgHeight = (canvas.height * imgWidth) / canvas.width;
      
      // Create PDF
      const pdf = new jsPDF({
        orientation: "portrait",
        unit: "mm",
        format: "letter"
      });

      const imgData = canvas.toDataURL("image/png");
      pdf.addImage(imgData, "PNG", 0, 0, imgWidth, imgHeight);
      
      // Download the PDF
      const fileName = `${resumeData.name.replace(/\s+/g, "_")}_Resume.pdf`;
      pdf.save(fileName);
      
      setIsGenerating(false);
    } catch (error) {
      console.error("Error generating PDF:", error);
      alert("Failed to generate PDF. Please try again.");
      setIsGenerating(false);
    }
  };

  const SectionHeader = ({ title, section }) => (
    <button
      onClick={() => toggleSection(section)}
      className="w-full flex items-center justify-between p-3 bg-gradient-to-r from-orange-600 to-orange-700 text-white rounded-lg hover:from-orange-700 hover:to-orange-800 transition-all mb-2"
    >
      <span className="font-semibold">{title}</span>
      {expandedSections[section] ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
    </button>
  );

  return (
    <div className="min-h-screen"
     style={{
    background:
      "radial-gradient(circle 600px at 60% 20%, rgba(249,115,22,0.25), transparent 70%), radial-gradient(circle 800px at 10% 80%, rgba(255,56,0,0.15), transparent 70%), #0e0b11",
  }}>
      <div className="max-w-[1600px] mx-auto p-4">
        {/* Header */}
        <div className="text-center mt-18 py-6">
          <h1 className="text-4xl font-bold text-orange-300 mb-2">Resume Builder</h1>
          <p className="text-orange-200">Create ATS-friendly professional resumes</p>
        </div>

        <div className="flex flex-col lg:flex-row gap-4">
          {/* Left Panel - Editor */}
          <div className="lg:w-1/2">
            <div className=" rounded-xl shadow-2xl p-4 sticky top-4 max-h-[calc(100vh-2rem)] overflow-y-auto">
              {/* Name */}
              <div className="mb-4">
                <input
                  type="text"
                  value={resumeData.name}
                  onChange={(e) => setResumeData(prev => ({ ...prev, name: e.target.value }))}
                  className="w-full bg-slate-700 text-white text-2xl font-bold p-3 rounded-lg border-2 border-orange-500 focus:border-orange-400 outline-none"
                  placeholder="Your Name"
                />
              </div>

              {/* Contact Information */}
              <SectionHeader title="Contact Information" section="contact" />
              {expandedSections.contact && (
                <div className="space-y-2 mb-4 bg-slate-700/50 p-4 rounded-lg">
                  {Object.entries(resumeData.contact).map(([key, value]) => (
                    <input
                      key={key}
                      type="text"
                      value={value}
                      onChange={(e) => updateContact(key, e.target.value)}
                      className="w-full  text-white p-2 rounded border border-slate-600 focus:border-orange-400 outline-none text-sm"
                      placeholder={key.charAt(0).toUpperCase() + key.slice(1)}
                    />
                  ))}
                </div>
              )}

              {/* Education */}
              <SectionHeader title="Education" section="education" />
              {expandedSections.education && (
                <div className="mb-4 bg-slate-700/50 p-4 rounded-lg">
                  {resumeData.education.map((edu, i) => (
                    <div key={i} className="space-y-2 mb-3 p-3 bg-slate-800 rounded-lg">
                      <input
                        type="text"
                        value={edu.school}
                        onChange={(e) => updateArrayItem("education", i, "school", e.target.value)}
                        className="w-full bg-slate-700 text-white p-2 rounded border border-slate-600 focus:border-blue-400 outline-none text-sm"
                        placeholder="School Name"
                      />
                      <input
                        type="text"
                        value={edu.degree}
                        onChange={(e) => updateArrayItem("education", i, "degree", e.target.value)}
                        className="w-full bg-slate-700 text-white p-2 rounded border border-slate-600 focus:border-blue-400 outline-none text-sm"
                        placeholder="Degree"
                      />
                      <div className="flex gap-2">
                        <input
                          type="text"
                          value={edu.location}
                          onChange={(e) => updateArrayItem("education", i, "location", e.target.value)}
                          className="flex-1 bg-slate-700 text-white p-2 rounded border border-slate-600 focus:border-blue-400 outline-none text-sm"
                          placeholder="Location"
                        />
                        <input
                          type="text"
                          value={edu.duration}
                          onChange={(e) => updateArrayItem("education", i, "duration", e.target.value)}
                          className="flex-1 bg-slate-700 text-white p-2 rounded border border-slate-600 focus:border-blue-400 outline-none text-sm"
                          placeholder="Duration"
                        />
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* Experience */}
              <SectionHeader title="Experience" section="experience" />
              {expandedSections.experience && (
                <div className="mb-4 bg-slate-700/50 p-4 rounded-lg">
                  {resumeData.experience.map((exp, i) => (
                    <div key={i} className="space-y-2 mb-4 p-3 bg-slate-800 rounded-lg border-l-4 border-blue-500">
                      <div className="flex gap-2 items-start">
                        <div className="flex-1 space-y-2">
                          <input
                            type="text"
                            value={exp.company}
                            onChange={(e) => updateArrayItem("experience", i, "company", e.target.value)}
                            className="w-full bg-slate-700 text-white p-2 rounded border border-slate-600 focus:border-blue-400 outline-none text-sm font-semibold"
                            placeholder="Company"
                          />
                          <input
                            type="text"
                            value={exp.role}
                            onChange={(e) => updateArrayItem("experience", i, "role", e.target.value)}
                            className="w-full bg-slate-700 text-white p-2 rounded border border-slate-600 focus:border-blue-400 outline-none text-sm"
                            placeholder="Role"
                          />
                        </div>
                        <button
                          onClick={() => removeArrayItem("experience", i)}
                          className="text-red-400 hover:text-red-300 p-2"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                      <div className="flex gap-2">
                        <input
                          type="text"
                          value={exp.location}
                          onChange={(e) => updateArrayItem("experience", i, "location", e.target.value)}
                          className="flex-1 bg-slate-700 text-white p-2 rounded border border-slate-600 focus:border-blue-400 outline-none text-sm"
                          placeholder="Location"
                        />
                        <input
                          type="text"
                          value={exp.duration}
                          onChange={(e) => updateArrayItem("experience", i, "duration", e.target.value)}
                          className="flex-1 bg-slate-700 text-white p-2 rounded border border-slate-600 focus:border-blue-400 outline-none text-sm"
                          placeholder="Duration"
                        />
                      </div>
                      {exp.points.map((point, j) => (
                        <div key={j} className="flex gap-2 items-start">
                          <textarea
                            value={point}
                            onChange={(e) => updateArrayItemPoint("experience", i, j, e.target.value)}
                            className="flex-1 bg-slate-700 text-white p-2 rounded border border-slate-600 focus:border-blue-400 outline-none text-sm"
                            rows="2"
                          />
                          <button
                            onClick={() => removePoint("experience", i, j)}
                            className="text-red-400 hover:text-red-300 p-1"
                          >
                            <Trash2 size={14} />
                          </button>
                        </div>
                      ))}
                      <button
                        onClick={() => addPoint("experience", i)}
                        className="text-orange-400 hover:text-blue-300 text-sm flex items-center gap-1"
                      >
                        <Plus size={14} /> Add Bullet Point
                      </button>
                    </div>
                  ))}
                  <button
                    onClick={() =>
                      addArrayItem("experience", {
                        company: "Company Name",
                        role: "Role",
                        location: "City, State",
                        duration: "Month Year – Month Year",
                        points: ["Accomplishment or responsibility"]
                      })
                    }
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white p-2 rounded flex items-center justify-center gap-2 text-sm"
                  >
                    <Plus size={16} /> Add Experience
                  </button>
                </div>
              )}

              {/* Projects */}
              <SectionHeader title="Projects" section="projects" />
              {expandedSections.projects && (
                <div className="mb-4 bg-slate-700/50 p-4 rounded-lg">
                  {resumeData.projects.map((proj, i) => (
                    <div key={i} className="space-y-2 mb-4 p-3 bg-slate-800 rounded-lg border-l-4 border-orange-500">
                      <div className="flex gap-2 items-start">
                        <div className="flex-1 space-y-2">
                          <input
                            type="text"
                            value={proj.title}
                            onChange={(e) => updateArrayItem("projects", i, "title", e.target.value)}
                            className="w-full bg-slate-700 text-white p-2 rounded border border-slate-600 focus:border-blue-400 outline-none text-sm font-semibold"
                            placeholder="Project Title"
                          />
                          <input
                            type="text"
                            value={proj.tech}
                            onChange={(e) => updateArrayItem("projects", i, "tech", e.target.value)}
                            className="w-full bg-slate-700 text-white p-2 rounded border border-slate-600 focus:border-blue-400 outline-none text-sm"
                            placeholder="Technologies"
                          />
                        </div>
                        <button
                          onClick={() => removeArrayItem("projects", i)}
                          className="text-red-400 hover:text-red-300 p-2"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                      <input
                        type="text"
                        value={proj.date}
                        onChange={(e) => updateArrayItem("projects", i, "date", e.target.value)}
                        className="w-full bg-slate-700 text-white p-2 rounded border border-slate-600 focus:border-blue-400 outline-none text-sm"
                        placeholder="Date"
                      />
                      {proj.points.map((point, j) => (
                        <div key={j} className="flex gap-2 items-start">
                          <textarea
                            value={point}
                            onChange={(e) => updateArrayItemPoint("projects", i, j, e.target.value)}
                            className="flex-1 bg-slate-700 text-white p-2 rounded border border-slate-600 focus:border-blue-400 outline-none text-sm"
                            rows="2"
                          />
                          <button
                            onClick={() => removePoint("projects", i, j)}
                            className="text-red-400 hover:text-red-300 p-1"
                          >
                            <Trash2 size={14} />
                          </button>
                        </div>
                      ))}
                      <button
                        onClick={() => addPoint("projects", i)}
                        className="text-blue-400 hover:text-blue-300 text-sm flex items-center gap-1"
                      >
                        <Plus size={14} /> Add Bullet Point
                      </button>
                    </div>
                  ))}
                  <button
                    onClick={() =>
                      addArrayItem("projects", {
                        title: "Project Name",
                        tech: "Technology Stack",
                        date: "Month Year",
                        points: ["Project description or achievement"]
                      })
                    }
                    className="w-full bg-orange-600 hover:bg-orange-400 text-white p-2 rounded flex items-center justify-center gap-2 text-sm"
                  >
                    <Plus size={16} /> Add Project
                  </button>
                </div>
              )}

              {/* Skills */}
              <SectionHeader title="Technical Skills" section="skills" />
              {expandedSections.skills && (
                <div className="mb-4 bg-slate-700/50 p-4 rounded-lg space-y-2">
                  {Object.entries(resumeData.skills).map(([key, value]) => (
                    <div key={key}>
                      <label className="text-white text-sm font-semibold capitalize block mb-1">
                        {key}
                      </label>
                      <input
                        type="text"
                        value={value}
                        onChange={(e) =>
                          setResumeData(prev => ({
                            ...prev,
                            skills: { ...prev.skills, [key]: e.target.value }
                          }))
                        }
                        className="w-full bg-slate-700 text-white p-2 rounded border border-slate-600 focus:border-blue-400 outline-none text-sm"
                      />
                    </div>
                  ))}
                </div>
              )}

              <button
                onClick={handleDownloadPDF}
                disabled={isGenerating}
                className="w-full bg-gradient-to-r from-orange-400 to-orange-600  text-white p-4 rounded-lg font-bold text-lg flex items-center justify-center gap-3 shadow-lg hover:shadow-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <Download size={24} />
                {isGenerating ? "Generating PDF..." : "Download as PDF"}
              </button>
            </div>
          </div>

          {/* Right Panel - Resume Preview */}
          <div className="lg:w-1/2">
            <div id="resume-preview" className="bg-white rounded-xl shadow-2xl overflow-hidden">
              <div
                className="p-12 max-w-[8.5in] mx-auto"
                style={{ 
                  fontFamily: "'Times New Roman', Times, serif",
                  fontSize: "11pt",
                  lineHeight: "1.15"
                }}
              >
                {/* Header */}
                <div className="text-center mb-2 pb-2 ">
                  <h1 className="text-4xl font-bold uppercase tracking-wide mb-1">
                    {resumeData.name}
                  </h1>
                  <p className="text-sm mb-0.5">{resumeData.contact.address}</p>
                  <p className="text-sm mb-0.5">
                    {resumeData.contact.phone} | {resumeData.contact.email}
                  </p>
                  <p className="text-sm">
                    {resumeData.contact.linkedin} | {resumeData.contact.github}
                  </p>
                </div>

                {/* Education */}
                <section className="mb-4">
                  <h2 className="uppercase font-bold text-base mb-2 pb-0.5 border-b border-black">
                    Education
                  </h2>
                  {resumeData.education.map((edu, i) => (
                    <div key={i} className="mb-1">
                      <div className="flex justify-between items-start">
                        <div>
                          <p className="font-bold text-sm">{edu.school}</p>
                          <p className="text-sm italic">{edu.degree}</p>
                        </div>
                        <div className="text-right">
                          <p className="text-sm font-bold">{edu.duration}</p>
                          <p className="text-sm">{edu.location}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </section>

                {/* Relevant Coursework */}
                {resumeData.coursework && resumeData.coursework.length > 0 && (
                  <section className="mb-4">
                    <h2 className="uppercase font-bold text-base mb-2 pb-0.5 border-b border-black">
                      Relevant Coursework
                    </h2>
                    <div className="grid grid-cols-4 gap-x-2 gap-y-0 text-xs">
                      {resumeData.coursework.map((course, i) => (
                        <div key={i} className="flex items-center">
                          <span className="mr-1">•</span>
                          <span>{course}</span>
                        </div>
                      ))}
                    </div>
                  </section>
                )}

                {/* Experience */}
                <section className="mb-4">
                  <h2 className="uppercase font-bold text-base mb-2 pb-0.5 border-b border-black">
                    Experience
                  </h2>
                  {resumeData.experience.map((exp, i) => (
                    <div key={i} className="mb-3">
                      <div className="flex justify-between items-start mb-1">
                        <div>
                          <p className="font-bold text-sm">{exp.company}</p>
                          <p className="text-sm italic">{exp.role}</p>
                        </div>
                        <div className="text-right">
                          <p className="text-sm font-bold">{exp.duration}</p>
                          <p className="text-sm">{exp.location}</p>
                        </div>
                      </div>
                      <ul className="list-disc list-outside ml-5 space-y-0.5">
                        {exp.points.map((point, j) => (
                          <li key={j} className="text-xs leading-tight">{point}</li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </section>

                {/* Projects */}
                <section className="mb-4">
                  <h2 className="uppercase font-bold text-base mb-2 pb-0.5 border-b border-black">
                    Projects
                  </h2>
                  {resumeData.projects.map((proj, i) => (
                    <div key={i} className="mb-3">
                      <div className="flex justify-between items-start mb-1">
                        <div>
                          <p className="font-bold text-sm">
                            {proj.title} <span className="font-normal">|</span>{" "}
                            <span className="font-normal italic">{proj.tech}</span>
                          </p>
                        </div>
                        <p className="text-sm font-bold">{proj.date}</p>
                      </div>
                      <ul className="list-disc list-outside ml-5 space-y-0.5">
                        {proj.points.map((point, j) => (
                          <li key={j} className="text-xs leading-tight">{point}</li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </section>

                {/* Technical Skills */}
                <section className="mb-4">
                  <h2 className="uppercase font-bold text-base mb-2 pb-0.5 border-b border-black">
                    Technical Skills
                  </h2>
                  <div className="space-y-0.5 text-xs">
                    <p>
                      <strong>Languages:</strong> {resumeData.skills.languages}
                    </p>
                    <p>
                      <strong>Developer Tools:</strong> {resumeData.skills.tools}
                    </p>
                    <p>
                      <strong>Technologies/Frameworks:</strong> {resumeData.skills.frameworks}
                    </p>
                  </div>
                </section>

                {/* Leadership */}
                {resumeData.leadership && resumeData.leadership.length > 0 && (
                  <section>
                    <h2 className="uppercase font-bold text-base mb-2 pb-0.5 border-b border-black">
                      Leadership / Extracurricular
                    </h2>
                    {resumeData.leadership.map((lead, i) => (
                      <div key={i} className="mb-3">
                        <div className="flex justify-between items-start mb-1">
                          <div>
                            <p className="font-bold text-sm">{lead.organization}</p>
                            <p className="text-sm italic">{lead.role}</p>
                          </div>
                          <div className="text-right">
                            <p className="text-sm font-bold">{lead.duration}</p>
                            <p className="text-sm">{lead.location}</p>
                          </div>
                        </div>
                        <ul className="list-disc list-outside ml-5 space-y-0.5">
                          {lead.points.map((point, j) => (
                            <li key={j} className="text-xs leading-tight">{point}</li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </section>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Resume;