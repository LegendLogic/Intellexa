import React, { useState, useEffect } from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, LineChart, Line, CartesianGrid } from 'recharts';
import { Brain, Sparkles, Target, Clock, Calendar, TrendingUp, Award, BookOpen, Zap, MessageSquare, Activity, Menu, X, ChevronRight, Save, RefreshCw } from 'lucide-react';

const API_BASE_URL = 'http://localhost:4000';

const api = {
  call: async (endpoint, method = 'GET', data = null) => {
    const token = sessionStorage.getItem('authToken');
    const headers = {
      'Content-Type': 'application/json',
      ...(token && { Authorization: `Bearer ${token}` })
    };

    try {
      const response = await fetch(`${API_BASE_URL}${endpoint}`, {
        method,
        headers,
        ...(data && { body: JSON.stringify(data) })
      });
      
      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.message || `API Error: ${response.status}`);
      }
      
      return await response.json();
    } catch (error) {
      console.error('API Call Failed:', error);
      throw error;
    }
  }
};

const TabButton = ({ active, onClick, icon, label }) => (
  <button 
    onClick={onClick}
    className={`px-3 md:px-4 py-2 font-medium transition-colors whitespace-nowrap text-sm md:text-base flex items-center gap-1 ${
      active 
        ? 'text-red-500 border-b-2 border-red-500' 
        : 'text-gray-400 hover:text-white'
    }`}
  >
    <span>{icon}</span>
    <span className="hidden sm:inline">{label}</span>
  </button>
);

const StatCard = ({ icon, label, value, subtitle }) => (
  <div className="bg-gray-800/50 border border-gray-700 rounded-lg p-3 md:p-4">
    <div className="flex items-center gap-2 text-gray-400 text-xs md:text-sm mb-2">
      {icon}
      <span>{label}</span>
    </div>
    <div className="text-xl md:text-3xl font-bold text-white mb-1">{value}</div>
    {subtitle && <div className="text-xs text-gray-400">{subtitle}</div>}
    <div className="w-full bg-gray-700 rounded-full h-1 mt-2">
      <div className="bg-gradient-to-r from-orange-500 to-red-500 h-1 rounded-full" style={{width: '75%'}}></div>
    </div>
  </div>
);

const ComingSoonCard = ({ icon, title, description }) => (
  <div className="bg-gray-800/50 border border-gray-700 rounded-lg p-8 md:p-12 text-center">
    <div className="text-red-500 mx-auto mb-4 flex justify-center">
      {React.cloneElement(icon, { className: 'w-12 h-12 md:w-16 md:h-16' })}
    </div>
    <h2 className="text-xl md:text-2xl font-bold text-white mb-2">{title}</h2>
    <p className="text-gray-400 text-sm md:text-base">{description}</p>
  </div>
);

const AI = () => {
  const [activeTab, setActiveTab] = useState('learning-plan');
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [userProfile, setUserProfile] = useState(null);
  const [saveStatus, setSaveStatus] = useState('');
  
  const [settings, setSettings] = useState({
    name: 'sangram',
    skillLevel: 'intermediate',
    studyTime: 3,
    days: 14,
    goal: 'Web Development',
  });

  const [learningPlan, setLearningPlan] = useState(null);
  const [expandedDay, setExpandedDay] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const [analyticsData, setAnalyticsData] = useState({
    totalHours: 94.8,
    dailyAverage: '3.2h',
    peakDay: 'Jul 26',
    activeDays: 86,
    longestSession: '3.7h',
    currentStreak: 9,
    languages: [
      { name: 'TypeScript', hours: 46.6, percentage: 49, color: '#7c7cff' },
      { name: 'TSX', hours: 21.8, percentage: 23, color: '#61dafb' },
      { name: 'JavaScript', hours: 10.1, percentage: 11, color: '#5fd485' },
      { name: 'Prisma', hours: 4.6, percentage: 5, color: '#f4d03f' },
      { name: 'Properties', hours: 3.5, percentage: 4, color: '#ff7b7b' },
      { name: 'JSON', hours: 3.2, percentage: 3, color: '#5fd485' }
    ],
    weeklyActivity: [
      { day: 'Mon', hours: 4.2 },
      { day: 'Tue', hours: 3.8 },
      { day: 'Wed', hours: 2.5 },
      { day: 'Thu', hours: 5.1 },
      { day: 'Fri', hours: 3.9 },
      { day: 'Sat', hours: 2.1 },
      { day: 'Sun', hours: 3.3 }
    ]
  });

  useEffect(() => {
    fetchUserProfile();
    fetchAnalytics();
  }, []);

  const fetchUserProfile = async () => {
    try {
      const data = await api.call('/user/profile');
      setUserProfile(data);
      
      if (data) {
        setSettings({
          name: data.name || 'sangram',
          skillLevel: data.skillLevel || 'intermediate',
          studyTime: data.studyTime || 3,
          days: data.days || 14,
          goal: data.goal || 'Web Development',
        });
      }
    } catch (err) {
      console.error('Error fetching profile:', err);
      if (err.message.includes('401')) {
        setError('Please login to continue');
      }
    }
  };

  const fetchAnalytics = async () => {
    try {
      const data = await api.call('/analytics/stats');
      if (data) {
        setAnalyticsData(prev => ({ ...prev, ...data }));
      }
    } catch (err) {
      console.error('Analytics fetch failed:', err);
    }
  };

  // const updateUserProfile = async () => {
  //   setSaveStatus('saving');
  //   try {
  //     const data = await api.call('/user/profile', 'PUT', settings);
  //     setUserProfile(data);
  //     setSaveStatus('saved');
  //     setTimeout(() => setSaveStatus(''), 2000);
  //     setError('');
  //   } catch (err) {
  //     setSaveStatus('error');
  //     setError('Error updating profile: ' + err.message);
  //     setTimeout(() => setSaveStatus(''), 2000);
  //   }
  // };

  const generateLearningPlan = async () => {
    setLoading(true);
    setError('');

    try {
      // await updateUserProfile();

      const data = await api.call('/learning-plan/generate', 'POST', {
        goal: settings.goal,
        skillLevel: settings.skillLevel,
        studyTime: settings.studyTime,
        days: settings.days,
        name: settings.name,
      });

      setLearningPlan(data);
    } catch (err) {
      console.error('Error generating plan:', err);
      const mockPlan = generateMockPlan();
      setLearningPlan(mockPlan);
    } finally {
      setLoading(false);
    }
  };

  const generateMockPlan = () => {
    const topics = {
      'Web Development': ['HTML & CSS', 'JavaScript ES6+', 'React Basics', 'State Management', 'API Integration', 'Backend with Node.js', 'Database Design', 'Authentication', 'Deployment', 'Final Project'],
      'Data Science': ['Python Basics', 'NumPy & Pandas', 'Data Visualization', 'Statistics', 'Machine Learning Basics', 'Advanced ML', 'Deep Learning', 'Model Deployment', 'Real-world Projects', 'Portfolio'],
      'Machine Learning': ['Python & Math', 'Linear Algebra', 'Probability', 'Supervised Learning', 'Unsupervised Learning', 'Neural Networks', 'Deep Learning', 'NLP', 'Computer Vision', 'MLOps'],
      'Mobile Development': ['Mobile Basics', 'React Native', 'UI Components', 'Navigation', 'State Management', 'APIs', 'Native Modules', 'Performance', 'Testing', 'Publishing'],
      'DevOps': ['Linux Basics', 'Docker', 'Kubernetes', 'CI/CD', 'AWS/Cloud', 'Monitoring', 'Infrastructure as Code', 'Security', 'Automation', 'Best Practices']
    };

    const selectedTopics = topics[settings.goal] || topics['Web Development'];
    
    const plan = {
      intro: `Here's a personalized ${settings.days}-day learning plan for ${settings.name} to master ${settings.goal} at ${settings.skillLevel} level`,
      days: [],
    };

    for (let i = 1; i <= settings.days; i++) {
      const topicIndex = Math.floor((i - 1) / (settings.days / selectedTopics.length));
      const currentTopic = selectedTopics[topicIndex] || 'Advanced Topics';
      
      plan.days.push({
        day: i,
        title: `Day ${String(i).padStart(2, '0')}: ${currentTopic}`,
        topics: [
          `${currentTopic} - Core concepts and fundamentals`,
          `Hands-on practice with real examples`,
          `Quiz and knowledge assessment`
        ],
        activities: [
          `📚 Study session: ${settings.studyTime} hours`,
          `💻 Coding practice: ${Math.floor(settings.studyTime * 0.6)} hours`,
          `✅ Review and exercises: ${Math.floor(settings.studyTime * 0.3)} hours`
        ],
        resources: [
          '📹 Video tutorials',
          '📄 Documentation & articles',
          '🏆 Practice challenges'
        ]
      });
    }

    return plan;
  };

  const handleGenerate = () => {
    generateLearningPlan();
  };

  const toggleDay = (dayNum) => {
    setExpandedDay(expandedDay === dayNum ? null : dayNum);
  };

  return (
    <div className="min-h-screen flex flex-col lg:flex-row" style={{
      background: 'radial-gradient(circle 600px at 60% 20%, rgba(249,115,22,0.25), transparent 70%), radial-gradient(circle 800px at 10% 80%, rgba(255,56,0,0.15), transparent 70%), #0e0b11',
    }}>
      


      {/* Sidebar - User Settings */}
      

      {sidebarOpen && (
        <div 
          className="lg:hidden fixed inset-0 bg-black/50 z-30 mt-14"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Main Content */}
      <div className="flex-1 overflow-auto mt-14 lg:mt-0">
        <div className="p-4 md:p-6 lg:p-8 lg:pt-20">
          <div className="mb-6 lg:mb-8">
            <h1 className="text-2xl mt-20 md:text-3xl lg:text-4xl font-bold text-orange-500 mb-2">
              Intellexa — AI Learning & Interview Coach
            </h1>
            <p className="text-white text-sm md:text-base">
              Personalized AI Tutor + Voice-Based AI Interview Coach
            </p>
          </div>

          <div className="flex gap-2 md:gap-4 mb-6 lg:mb-8 border-b border-gray-800 overflow-x-auto pb-2 scrollbar-hide">
            <TabButton 
              active={activeTab === 'learning-plan'} 
              onClick={() => setActiveTab('learning-plan')}
              icon=""
              label="Learning Plan"
            />
            <TabButton 
              active={activeTab === 'progress-dashboard'} 
              onClick={() => setActiveTab('progress-dashboard')}
              icon=""
              label="Dashboard"
            />
            <TabButton 
              active={activeTab === 'ai-tutor'} 
              onClick={() => setActiveTab('ai-tutor')}
              icon=""
              label="AI Tutor"
            />
            <TabButton 
              active={activeTab === 'interview-coach'} 
              onClick={() => setActiveTab('interview-coach')}
              icon=""
              label="Interview"
            />
            <TabButton 
              active={activeTab === 'doubt-visualizer'} 
              onClick={() => setActiveTab('doubt-visualizer')}
              icon=""
              label="Visualizer"
            />
          </div>

          <div>
            {activeTab === 'learning-plan' && (
              <div className="space-y-6">
                <h2 className="text-xl md:text-2xl font-bold text-orange-400">
                  AI-Powered Personalized Learning Plan
                </h2>

                {error && (
                  <div className="bg-red-500/20 text-red-400 px-4 py-3 rounded-lg border border-red-500/50">
                    {error}
                  </div>
                )}

                <div>
                  <label className="text-gray-400 text-sm mb-2 block">
                    Choose your Goal
                  </label>
                  <select
                    value={settings.goal}
                    onChange={(e) => setSettings({ ...settings, goal: e.target.value })}
                    className="w-full bg-gray-800 text-white px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 border border-gray-700"
                  >
                    <option value="Web Development">Web Development</option>
                    <option value="Data Science">Data Science</option>
                    <option value="Machine Learning">Machine Learning</option>
                    <option value="Mobile Development">Mobile Development</option>
                    <option value="DevOps">DevOps</option>
                  </select>
                </div>

                <button
                  onClick={handleGenerate}
                  disabled={loading}
                  className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold px-6 py-4 rounded-lg transition-colors flex items-center justify-center gap-2 disabled:opacity-50 shadow-lg shadow-green-500/30"
                >
                  <Sparkles className="w-5 h-5" />
                  {loading ? 'Generating Your Plan...' : 'Generate AI Learning Plan'}
                </button>

                {learningPlan && (
                  <div className="space-y-6">
                    <div className="flex items-start justify-between gap-4">
                      <h3 className="text-lg md:text-xl font-bold text-white">
                        Your AI-generated plan:
                      </h3>
                      <button className="text-gray-400 hover:text-white transition-colors">
                        🔗
                      </button>
                    </div>

                    <div className="bg-gray-900/50 p-4 md:p-6 rounded-lg border border-gray-800">
                      <p className="text-gray-300 text-sm md:text-base">{learningPlan.intro}</p>
                    </div>

                    <div className="flex items-center gap-2">
                      <Calendar className="w-5 h-5 text-orange-500" />
                      <h3 className="text-lg md:text-xl font-bold text-white">
                        Click a Day to View Details
                      </h3>
                    </div>

                    <div className="space-y-3">
                      {learningPlan.days.map((day) => (
                        <div
                          key={day.day}
                          className="bg-white/30 rounded-lg border border-gray-700 overflow-hidden hover:border-red-500/50 transition-all"
                        >
                          <button
                            onClick={() => toggleDay(day.day)}
                            className="w-full px-4 md:px-6 py-3 md:py-4 flex items-center justify-between text-left hover:bg-gray-800/70 transition-colors"
                          >
                            <span className="font-medium text-white text-sm md:text-base">
                              {day.title}
                            </span>
                            <ChevronRight 
                              className={`w-5 h-5 text-white transition-transform ${expandedDay === day.day ? 'rotate-90' : ''}`}
                            />
                          </button>

                          {expandedDay === day.day && (
                            <div className="px-4 md:px-6 py-3 md:py-4 border-t border-gray-700 bg-gray-900/30 space-y-4">
                              <div>
                                <h4 className="text-white font-semibold mb-2 flex items-center gap-2 text-sm md:text-base">
                                  <BookOpen className="w-4 h-4 text-orange-500" />
                                  Key Topics
                                </h4>
                                <ul className="space-y-1 text-gray-300 text-sm">
                                  {day.topics.map((topic, idx) => (
                                    <li key={idx} className="flex items-start gap-2">
                                      <span className="text-orange-500 mt-1">•</span>
                                      <span>{topic}</span>
                                    </li>
                                  ))}
                                </ul>
                              </div>
                              <div>
                                <h4 className="text-white font-semibold mb-2 flex items-center gap-2 text-sm md:text-base">
                                  <Target className="w-4 h-4 text-orange-500" />
                                  Activities
                                </h4>
                                <ul className="space-y-1 text-gray-300 text-sm">
                                  {day.activities.map((activity, idx) => (
                                    <li key={idx} className="flex items-start gap-2">
                                      <span className="text-orange-500 mt-1">•</span>
                                      <span>{activity}</span>
                                    </li>
                                  ))}
                                </ul>
                              </div>
                              {day.resources && (
                                <div>
                                  <h4 className="text-white font-semibold mb-2 flex items-center gap-2 text-sm md:text-base">
                                    <Sparkles className="w-4 h-4 text-orange-500" />
                                    Resources
                                  </h4>
                                  <ul className="space-y-1 text-gray-300 text-sm">
                                    {day.resources.map((resource, idx) => (
                                      <li key={idx}>{resource}</li>
                                    ))}
                                  </ul>
                                </div>
                              )}
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}

            {activeTab === 'progress-dashboard' && (
              <div className="space-y-6">
                <h2 className="text-xl md:text-2xl font-bold text-white">
                   Coding Metrics and Achievements
                </h2>

                <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4">
                  <StatCard 
                    icon={<Clock className="w-4 h-4" />}
                    label="Daily Average"
                    value={analyticsData.dailyAverage}
                  />
                  <StatCard 
                    icon={<Zap className="w-4 h-4" />}
                    label="Peak Day"
                    value={analyticsData.peakDay}
                    subtitle="Most productive"
                  />
                  <StatCard 
                    icon={<Calendar className="w-4 h-4" />}
                    label="Active Days"
                    value={`${analyticsData.activeDays}`}
                    subtitle="287% coverage"
                  />
                  <StatCard 
                    icon={<Activity className="w-4 h-4" />}
                    label="Longest"
                    value={analyticsData.longestSession}
                    subtitle="Caffeine! ☕"
                  />
                </div>

                <div className="bg-gray-800/50 border border-gray-700 rounded-lg p-4 md:p-6">
                  <h3 className="text-lg md:text-xl font-bold text-white mb-4">
                     Language Distribution
                  </h3>
                  <p className="text-gray-400 text-xs md:text-sm mb-6">
                    Hours spent by programming language
                  </p>
                  
                  <div className="flex flex-col lg:flex-row items-center gap-6 lg:gap-8">
                    <div className="w-48 h-48 md:w-64 md:h-64 flex-shrink-0">
                      <ResponsiveContainer width="100%" height="100%">
                        <PieChart>
                          <Pie
                            data={analyticsData.languages}
                            cx="50%"
                            cy="50%"
                            innerRadius={50}
                            outerRadius={80}
                            paddingAngle={2}
                            dataKey="hours"
                          >
                            {analyticsData.languages.map((entry, index) => (
                              <Cell key={`cell-${index}`} fill={entry.color} />
                            ))}
                          </Pie>
                          <Tooltip 
                            contentStyle={{ 
                              background: '#1f2937', 
                              border: 'none', 
                              borderRadius: '8px', 
                              color: '#fff',
                              fontSize: '12px'
                            }}
                          />
                        </PieChart>
                      </ResponsiveContainer>
                      <div className="text-center mt-2">
                        <div className="text-white font-bold text-sm">typescript</div>
                        <div className="text-red-500 text-xl md:text-2xl font-bold">52%</div>
                        <div className="text-gray-400 text-xs">46.6 hours</div>
                      </div>
                    </div>

                    <div className="flex-1 w-full">
                      <div className="text-gray-400 text-xs md:text-sm mb-3">All Languages</div>
                      <div className="space-y-2">
                        {analyticsData.languages.map((lang, idx) => (
                          <div key={idx} className="flex items-center gap-2">
                            <div className="w-2 h-2 md:w-3 md:h-3 rounded-full flex-shrink-0" style={{ background: lang.color }}></div>
                            <div className="flex-1 flex items-center justify-between min-w-0">
                              <span className="text-white text-xs md:text-sm truncate">{lang.name}</span>
                              <div className="flex items-center gap-2 flex-shrink-0">
                                <span className="text-gray-400 text-xs">{lang.hours}h</span>
                                <span className="text-white text-xs font-semibold">({lang.percentage}%)</span>
                              </div>
                            </div>
                          </div>
                        ))}
                        <button className="text-gray-400 text-xs hover:text-white transition-colors">
                          +13 more
                        </button>
                      </div>
                    </div>
                  </div>

                  <div className="mt-6 text-right text-gray-400 text-xs md:text-sm">
                    {analyticsData.totalHours} total hours
                  </div>
                </div>

                <div className="bg-gray-800/50 border border-gray-700 rounded-lg p-4 md:p-6">
                  <h3 className="text-lg md:text-xl font-bold text-white mb-4">
                     Weekly Activity
                  </h3>
                  <div className="h-48 md:h-64">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={analyticsData.weeklyActivity}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                        <XAxis 
                          dataKey="day" 
                          stroke="#9ca3af"
                          style={{ fontSize: '12px' }}
                        />
                        <YAxis 
                          stroke="#9ca3af"
                          style={{ fontSize: '12px' }}
                        />
                        <Tooltip 
                          contentStyle={{ 
                            background: '#1f2937', 
                            border: 'none', 
                            borderRadius: '8px',
                            fontSize: '12px'
                          }}
                          cursor={{ fill: 'rgba(249, 115, 22, 0.1)' }}
                        />
                        <Bar dataKey="hours" fill="#f97316" radius={[8, 8, 0, 0]} />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'ai-tutor' && (
              <ComingSoonCard 
                icon={<MessageSquare />} 
                title="AI Tutor" 
                description="Interactive AI-powered tutoring sessions coming soon" 
              />
            )}

            {activeTab === 'interview-coach' && (
              <ComingSoonCard 
                icon={<Target />} 
                title="AI Interview Coach" 
                description="Voice-based interview practice with real-time feedback" 
              />
            )}

            {activeTab === 'doubt-visualizer' && (
              <ComingSoonCard 
                icon={<Brain />} 
                title="AI Doubt Visualizer" 
                description="Visual explanations for complex concepts" 
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AI;