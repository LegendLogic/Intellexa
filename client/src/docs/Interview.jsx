import React, { useState, useEffect } from 'react';
import { Mic, StopCircle, PlayCircle, BookOpen, TrendingUp, Award, ExternalLink, Clock, CheckCircle, AlertCircle } from 'lucide-react';

const Interview = () => {
  const [isRecording, setIsRecording] = useState(false);
  const [answer, setAnswer] = useState('');
  const [feedback, setFeedback] = useState(null);
  const [timer, setTimer] = useState(0);
  const [selectedCategory, setSelectedCategory] = useState('technical');
  const [currentQuestion, setCurrentQuestion] = useState(0);

  const questions = {
    technical: [
      "Explain the difference between let, const, and var in JavaScript.",
      "What is the virtual DOM and how does React use it?",
      "Describe the concept of closures in JavaScript.",
      "What are the main differences between SQL and NoSQL databases?"
    ],
    behavioral: [
      "Tell me about a time when you faced a challenging problem at work.",
      "How do you handle conflicts with team members?",
      "Describe a situation where you had to meet a tight deadline.",
      "What's your greatest professional achievement?"
    ],
    situational: [
      "How would you handle a situation where a project is behind schedule?",
      "What would you do if you disagreed with your manager's decision?",
      "How would you prioritize multiple urgent tasks?",
      "Describe how you'd approach learning a new technology quickly."
    ]
  };

  const resources = [
    { name: "LeetCode", url: "https://leetcode.com", description: "Coding interview practice", icon: "💻" },
    { name: "Pramp", url: "https://pramp.com", description: "Free peer mock interviews", icon: "🤝" },
    { name: "InterviewBit", url: "https://interviewbit.com", description: "Technical interview prep", icon: "📚" },
    { name: "Glassdoor", url: "https://glassdoor.com", description: "Company reviews & interview questions", icon: "🏢" },
    { name: "Big Interview", url: "https://biginterview.com", description: "Video interview practice", icon: "🎥" },
    { name: "HackerRank", url: "https://hackerrank.com", description: "Coding challenges", icon: "⚡" }
  ];

  useEffect(() => {
    let interval;
    if (isRecording) {
      interval = setInterval(() => {
        setTimer(prev => prev + 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isRecording]);

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const analyzeAnswer = (text) => {
    const wordCount = text.trim().split(/\s+/).length;
    const hasStructure = text.includes('first') || text.includes('second') || text.includes('finally');
    const hasExample = text.toLowerCase().includes('example') || text.toLowerCase().includes('instance');
    
    let score = 0;
    let tips = [];

    if (wordCount > 50) {
      score += 30;
      tips.push({ type: 'success', text: 'Good answer length - detailed response' });
    } else {
      tips.push({ type: 'warning', text: 'Try to provide more detail (aim for 50+ words)' });
    }

    if (hasStructure) {
      score += 35;
      tips.push({ type: 'success', text: 'Excellent structure with clear points' });
    } else {
      tips.push({ type: 'warning', text: 'Use structured points (First..., Then..., Finally...)' });
    }

    if (hasExample) {
      score += 35;
      tips.push({ type: 'success', text: 'Great use of examples!' });
    } else {
      tips.push({ type: 'warning', text: 'Include specific examples to strengthen your answer' });
    }

    if (timer > 30 && timer < 180) {
      tips.push({ type: 'success', text: 'Good timing for your response' });
    } else if (timer < 30) {
      tips.push({ type: 'warning', text: 'Take more time to think through your answer' });
    } else {
      tips.push({ type: 'warning', text: 'Try to be more concise' });
    }

    return { score, tips, wordCount };
  };

  const handleStartRecording = () => {
    setIsRecording(true);
    setTimer(0);
    setAnswer('');
    setFeedback(null);
  };

  const handleStopRecording = () => {
    setIsRecording(false);
    if (answer.trim()) {
      const analysis = analyzeAnswer(answer);
      setFeedback(analysis);
    }
  };

  const handleNextQuestion = () => {
    setCurrentQuestion((prev) => (prev + 1) % questions[selectedCategory].length);
    setAnswer('');
    setFeedback(null);
    setTimer(0);
    setIsRecording(false);
  };

  return (
    <div className="min-h-screen   p-6"
    style={{
        background:
          "radial-gradient(circle 600px at 60% 20%, rgba(249,115,22,0.25), transparent 70%), radial-gradient(circle 800px at 10% 80%, rgba(255,56,0,0.15), transparent 70%), #0e0b11",
      }}>
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl mt-20 font-bold text-orange-800 mb-2 flex items-center justify-center gap-3">
            <Award className="text-orange-600" size={40} />
            Interview Practice Platform
          </h1>
          <p className="text-white">Practice, Get Feedback, Excel in Your Interviews</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Practice Area */}
          <div className="lg:col-span-2 space-y-6">
            {/* Category Selection */}
            <div className="border rounded-xl shadow-lg p-6">
              <h2 className="text-xl text-white font-semibold mb-4 flex items-center gap-2">
                <BookOpen className="text-orange-600" />
                Select Category
              </h2>
              <div className="flex gap-3">
                {['technical', 'behavioral', 'situational'].map((cat) => (
                  <button
                    key={cat}
                    onClick={() => {
                      setSelectedCategory(cat);
                      setCurrentQuestion(0);
                      setAnswer('');
                      setFeedback(null);
                    }}
                    className={`flex-1 py-3 px-4 rounded-lg font-medium transition-all ${
                      selectedCategory === cat
                        ? 'bg-orange-400 text-white shadow-md'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    {cat.charAt(0).toUpperCase() + cat.slice(1)}
                  </button>
                ))}
              </div>
            </div>

            {/* Question Display */}
            <div className="border rounded-xl shadow-lg p-6">
              <div className="flex justify-between items-start mb-4">
                <h3 className="text-lg text-white font-semibold text-gray-800">
                  Question {currentQuestion + 1} of {questions[selectedCategory].length}
                </h3>
                <div className="flex items-center gap-2 text-indigo-600 font-mono font-bold">
                  <Clock size={20} />
                  {formatTime(timer)}
                </div>
              </div>
              <p className="text-xl text-gray-700 mb-6 p-4 bg-indigo-50 rounded-lg border-l-4 border-indigo-600">
                {questions[selectedCategory][currentQuestion]}
              </p>

              {/* Recording Controls */}
              <div className="flex gap-3 mb-4">
                {!isRecording ? (
                  <button
                    onClick={handleStartRecording}
                    className="flex-1 bg-green-600 hover:bg-green-700 text-white py-3 rounded-lg font-semibold flex items-center justify-center gap-2 transition-all"
                  >
                    <Mic size={20} />
                    Start Practicing
                  </button>
                ) : (
                  <button
                    onClick={handleStopRecording}
                    className="flex-1 bg-red-600 hover:bg-red-700 text-white py-3 rounded-lg font-semibold flex items-center justify-center gap-2 transition-all"
                  >
                    <StopCircle size={20} />
                    Stop & Get Feedback
                  </button>
                )}
                <button
                  onClick={handleNextQuestion}
                  className="bg-indigo-600 hover:bg-indigo-700 text-white py-3 px-6 rounded-lg font-semibold flex items-center gap-2 transition-all"
                >
                  <PlayCircle size={20} />
                  Next
                </button>
              </div>

              {/* Answer Input */}
              <textarea
                value={answer}
                onChange={(e) => setAnswer(e.target.value)}
                placeholder="Type your answer here as you practice speaking..."
                className="w-full h-40 p-4 border-2 text-white border-gray-200 rounded-lg focus:border-indigo-500 focus:outline-none resize-none"
                disabled={!isRecording}
              />
            </div>

            {/* Real-time Feedback */}
            {feedback && (
              <div className="bg-white rounded-xl shadow-lg p-6">
                <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
                  <TrendingUp className="text-green-600" />
                  Real-time Feedback
                </h3>
                
                {/* Score Display */}
                <div className="mb-6 p-4 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-lg text-white">
                  <div className="flex justify-between items-center">
                    <span className="text-lg">Overall Score</span>
                    <span className="text-4xl font-bold">{feedback.score}/100</span>
                  </div>
                  <div className="mt-2 bg-white/30 rounded-full h-2">
                    <div
                      className="bg-white h-2 rounded-full transition-all duration-500"
                      style={{ width: `${feedback.score}%` }}
                    />
                  </div>
                </div>

                {/* Metrics */}
                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div className="p-3 bg-blue-50 rounded-lg">
                    <p className="text-sm text-gray-600">Word Count</p>
                    <p className="text-2xl font-bold text-blue-600">{feedback.wordCount}</p>
                  </div>
                  <div className="p-3 bg-purple-50 rounded-lg">
                    <p className="text-sm text-gray-600">Response Time</p>
                    <p className="text-2xl font-bold text-purple-600">{formatTime(timer)}</p>
                  </div>
                </div>

                {/* Tips */}
                <div className="space-y-2">
                  {feedback.tips.map((tip, idx) => (
                    <div
                      key={idx}
                      className={`flex gap-3 p-3 rounded-lg ${
                        tip.type === 'success' ? 'bg-green-50' : 'bg-yellow-50'
                      }`}
                    >
                      {tip.type === 'success' ? (
                        <CheckCircle className="text-green-600 flex-shrink-0" size={20} />
                      ) : (
                        <AlertCircle className="text-yellow-600 flex-shrink-0" size={20} />
                      )}
                      <span className="text-sm text-gray-700">{tip.text}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Resources Sidebar */}
          <div className="lg:col-span-1">
            <div className=" rounded-xl shadow-lg p-6 sticky top-6">
              <h3 className="text-xl text-orange-400 font-semibold mb-4 flex items-center gap-2">
                <ExternalLink className="text-orange-600" />
                Recommended Resources
              </h3>
              <div className="space-y-3">
                {resources.map((resource, idx) => (
                  <a
                    key={idx}
                    href={resource.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block p-4  rounded-lg hover:shadow-md transition-all border border-gray-200 hover:border-indigo-300"
                  >
                    <div className="flex items-start gap-3">
                      <span className="text-2xl">{resource.icon}</span>
                      <div className="flex-1">
                        <h4 className="font-semibold text-orange-500 flex items-center gap-2">
                          {resource.name}
                          <ExternalLink size={14} className="text-white" />
                        </h4>
                        <p className="text-sm text-white">{resource.description}</p>
                      </div>
                    </div>
                  </a>
                ))}
              </div>

              {/* Quick Tips */}
              <div className="mt-6 p-4 rounded-lg border border-indigo-200">
                <h4 className="font-semibold text-orange-500 mb-2"> Quick Tips</h4>
                <ul className="text-sm text-indigo-800 space-y-1">
                  <li className='text-white'>• Use the STAR method for behavioral questions</li>
                  <li className='text-white'>• Practice out loud, not just in your head</li>
                  <li className='text-white'>• Record yourself to identify filler words</li>
                  <li className='text-white'>• Take a pause before answering</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Interview;