import React, { useState, useEffect } from "react";
import { Search, TrendingUp, BookmarkPlus, Bookmark, Eye, ThumbsUp, Sparkles, Filter, X, ChevronRight } from "lucide-react";

// Extended mocked API articles data with more metadata
const articlesData = [
  {
    id: 1,
    title: "The Future of AI: How Artificial Intelligence is Shaping the World",
    author: "Sangram Das",
    date: "2025-10-19",
    readTime: "8 min read",
    tags: ["AI", "Technology", "Future"],
    category: "Technology",
    url: "https://www.example.com/articles/ai-future",
    image: "https://images.unsplash.com/photo-1677442136019-21780ecad995",
    views: 15420,
    likes: 892,
    summary: "Exploring how AI is revolutionizing industries and reshaping our daily lives.",
    difficulty: "Intermediate",
    trending: true,
  },
  {
    id: 2,
    title: "Climate Change and Its Impact on Global Ecosystems",
    author: "Jane Doe",
    date: "2025-09-12",
    readTime: "6 min read",
    tags: ["Environment", "Climate", "Science"],
    category: "Science",
    url: "https://www.example.com/articles/climate-change",
    image: "https://images.unsplash.com/photo-1569163139394-de4798aa62b6",
    views: 12300,
    likes: 654,
    summary: "Understanding the far-reaching effects of climate change on our planet's biodiversity.",
    difficulty: "Beginner",
    trending: false,
  },
  {
    id: 3,
    title: "How Blockchain is Transforming Finance",
    author: "John Smith",
    date: "2025-08-21",
    readTime: "7 min read",
    tags: ["Blockchain", "Finance", "Technology"],
    category: "Finance",
    url: "https://www.example.com/articles/blockchain-finance",
    image: "https://images.unsplash.com/photo-1639762681485-074b7f938ba0",
    views: 9800,
    likes: 445,
    summary: "The revolutionary impact of blockchain technology on financial systems worldwide.",
    difficulty: "Advanced",
    trending: true,
  },
  {
    id: 4,
    title: "Machine Learning Fundamentals for Beginners",
    author: "Emily Chen",
    date: "2025-10-15",
    readTime: "10 min read",
    tags: ["AI", "Machine Learning", "Education"],
    category: "Technology",
    url: "https://www.example.com/articles/ml-basics",
    image: "https://images.unsplash.com/photo-1555949963-aa79dcee981c",
    views: 18500,
    likes: 1240,
    summary: "A comprehensive introduction to machine learning concepts and applications.",
    difficulty: "Beginner",
    trending: true,
  },
  {
    id: 5,
    title: "Sustainable Energy Solutions for Tomorrow",
    author: "Michael Green",
    date: "2025-10-10",
    readTime: "5 min read",
    tags: ["Environment", "Energy", "Innovation"],
    category: "Science",
    url: "https://www.example.com/articles/sustainable-energy",
    image: "https://images.unsplash.com/photo-1509391366360-2e959784a276",
    views: 7600,
    likes: 389,
    summary: "Innovative approaches to renewable energy and sustainability challenges.",
    difficulty: "Intermediate",
    trending: false,
  },
  {
    id: 6,
    title: "The Psychology of Decision Making",
    author: "Dr. Sarah Williams",
    date: "2025-10-05",
    readTime: "9 min read",
    tags: ["Psychology", "Behavior", "Science"],
    category: "Science",
    url: "https://www.example.com/articles/decision-psychology",
    image: "https://images.unsplash.com/photo-1507413245164-6160d8298b31",
    views: 11200,
    likes: 678,
    summary: "Understanding the cognitive processes behind our daily choices.",
    difficulty: "Intermediate",
    trending: false,
  },
];

const Article = () => {
  const [articles, setArticles] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedTag, setSelectedTag] = useState("All");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedDifficulty, setSelectedDifficulty] = useState("All");
  const [sortBy, setSortBy] = useState("trending");
  const [bookmarked, setBookmarked] = useState([]);
  const [viewedArticles, setViewedArticles] = useState([]);
  const [showFilters, setShowFilters] = useState(false);
  const [recommendations, setRecommendations] = useState([]);

  useEffect(() => {
    setArticles(articlesData);
    generateRecommendations();
  }, []);

  // AI-powered recommendation system
  const generateRecommendations = () => {
    // Simulate AI recommendation based on viewed articles and bookmarks
    const viewedTags = viewedArticles.flatMap(id => 
      articlesData.find(a => a.id === id)?.tags || []
    );
    const bookmarkedTags = bookmarked.flatMap(id => 
      articlesData.find(a => a.id === id)?.tags || []
    );
    
    const userInterests = [...viewedTags, ...bookmarkedTags];
    
    if (userInterests.length === 0) {
      // Show trending articles for new users
      setRecommendations(articlesData.filter(a => a.trending).slice(0, 3));
      return;
    }

    // Score articles based on tag overlap
    const scored = articlesData.map(article => {
      const score = article.tags.reduce((acc, tag) => 
        acc + userInterests.filter(t => t === tag).length, 0
      );
      return { ...article, score };
    });

    // Sort by score and exclude already viewed
    const recommended = scored
      .filter(a => !viewedArticles.includes(a.id))
      .sort((a, b) => b.score - a.score)
      .slice(0, 3);

    setRecommendations(recommended);
  };

  useEffect(() => {
    generateRecommendations();
  }, [viewedArticles, bookmarked]);

  const tags = ["All", ...new Set(articlesData.flatMap(a => a.tags))];
  const categories = ["All", ...new Set(articlesData.map(a => a.category))];
  const difficulties = ["All", "Beginner", "Intermediate", "Advanced"];

  const toggleBookmark = (id) => {
    setBookmarked(prev => 
      prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]
    );
  };

  const handleArticleView = (id) => {
    if (!viewedArticles.includes(id)) {
      setViewedArticles(prev => [...prev, id]);
    }
  };

  // Advanced filtering
  const filteredArticles = articles
    .filter(article => {
      const matchesTag = selectedTag === "All" || article.tags.includes(selectedTag);
      const matchesCategory = selectedCategory === "All" || article.category === selectedCategory;
      const matchesDifficulty = selectedDifficulty === "All" || article.difficulty === selectedDifficulty;
      const matchesSearch = article.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           article.summary.toLowerCase().includes(searchTerm.toLowerCase());
      return matchesTag && matchesCategory && matchesDifficulty && matchesSearch;
    })
    .sort((a, b) => {
      if (sortBy === "trending") return b.views - a.views;
      if (sortBy === "popular") return b.likes - a.likes;
      if (sortBy === "recent") return new Date(b.date) - new Date(a.date);
      return 0;
    });

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent flex items-center gap-2">
                <Sparkles className="text-purple-600" size={32} />
                AI Article Hub
              </h1>
              <p className="text-gray-600 mt-2">Personalized learning powered by AI</p>
            </div>
            <div className="flex gap-3">
              <button className="px-4 py-2 bg-purple-100 text-purple-700 rounded-lg font-semibold hover:bg-purple-200 transition-colors flex items-center gap-2">
                <Bookmark size={18} />
                Bookmarks ({bookmarked.length})
              </button>
            </div>
          </div>

          {/* Search and Sort */}
          <div className="flex flex-col sm:flex-row gap-3">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-3 text-gray-400" size={20} />
              <input
                type="text"
                placeholder="Search articles by title or content..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none"
              />
            </div>
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="px-6 py-3 bg-gray-100 hover:bg-gray-200 rounded-xl font-semibold flex items-center gap-2 transition-colors"
            >
              <Filter size={18} />
              Filters
              {showFilters && <X size={16} />}
            </button>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-purple-500 outline-none"
            >
              <option value="trending">Trending</option>
              <option value="popular">Most Popular</option>
              <option value="recent">Most Recent</option>
            </select>
          </div>

          {/* Advanced Filters */}
          {showFilters && (
            <div className="mt-4 p-4 bg-gray-50 rounded-xl border border-gray-200 animate-in fade-in slide-in-from-top-2">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Category</label>
                  <select
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                    className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-purple-500 outline-none"
                  >
                    {categories.map(cat => (
                      <option key={cat} value={cat}>{cat}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Tag</label>
                  <select
                    value={selectedTag}
                    onChange={(e) => setSelectedTag(e.target.value)}
                    className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-purple-500 outline-none"
                  >
                    {tags.map(tag => (
                      <option key={tag} value={tag}>{tag}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Difficulty</label>
                  <select
                    value={selectedDifficulty}
                    onChange={(e) => setSelectedDifficulty(e.target.value)}
                    className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-purple-500 outline-none"
                  >
                    {difficulties.map(diff => (
                      <option key={diff} value={diff}>{diff}</option>
                    ))}
                  </select>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* AI Recommendations */}
        {recommendations.length > 0 && (
          <div className="mb-8">
            <div className="flex items-center gap-2 mb-4">
              <Sparkles className="text-purple-600" size={24} />
              <h2 className="text-2xl font-bold text-gray-800">Recommended For You</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {recommendations.map(article => (
                <div
                  key={article.id}
                  className="bg-gradient-to-br from-purple-100 to-blue-100 rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl hover:scale-105 transition-all duration-300 border-2 border-purple-200"
                >
                  <div className="relative">
                    <img
                      src={article.image}
                      alt={article.title}
                      className="w-full h-40 object-cover"
                    />
                    <div className="absolute top-2 right-2 bg-purple-600 text-white px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1">
                      <Sparkles size={12} />
                      AI Pick
                    </div>
                  </div>
                  <div className="p-5">
                    <h3 className="text-lg font-bold text-gray-800 mb-2 line-clamp-2">{article.title}</h3>
                    <p className="text-gray-600 text-sm mb-3 line-clamp-2">{article.summary}</p>
                    <a
                      href={article.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={() => handleArticleView(article.id)}
                      className="text-purple-600 font-semibold hover:text-purple-700 flex items-center gap-1 group"
                    >
                      Read Now
                      <ChevronRight size={16} className="group-hover:translate-x-1 transition-transform" />
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Main Articles Grid */}
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-2xl font-bold text-gray-800">
            All Articles ({filteredArticles.length})
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredArticles.map(article => (
            <div
              key={article.id}
              className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 group"
            >
              <div className="relative overflow-hidden">
                <img
                  src={article.image}
                  alt={article.title}
                  className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-300"
                />
                {article.trending && (
                  <div className="absolute top-2 left-2 bg-red-500 text-white px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1">
                    <TrendingUp size={12} />
                    Trending
                  </div>
                )}
                <button
                  onClick={() => toggleBookmark(article.id)}
                  className="absolute top-2 right-2 bg-white p-2 rounded-full shadow-lg hover:scale-110 transition-transform"
                >
                  {bookmarked.includes(article.id) ? (
                    <Bookmark size={18} className="text-purple-600 fill-purple-600" />
                  ) : (
                    <BookmarkPlus size={18} className="text-gray-600" />
                  )}
                </button>
              </div>

              <div className="p-6">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-semibold text-purple-600 bg-purple-100 px-2 py-1 rounded-full">
                    {article.category}
                  </span>
                  <span className="text-xs text-gray-500">{article.difficulty}</span>
                </div>

                <h2 className="text-xl font-bold text-gray-800 mb-2 line-clamp-2 group-hover:text-purple-600 transition-colors">
                  {article.title}
                </h2>

                <p className="text-gray-600 text-sm mb-3 line-clamp-2">{article.summary}</p>

                <div className="text-gray-500 text-xs mb-4">
                  By <span className="font-semibold">{article.author}</span> • {article.date} • {article.readTime}
                </div>

                <div className="flex flex-wrap gap-2 mb-4">
                  {article.tags.map(tag => (
                    <span key={tag} className="bg-gray-100 text-gray-700 px-2 py-1 rounded-full text-xs font-medium">
                      {tag}
                    </span>
                  ))}
                </div>

                <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                  <div className="flex items-center gap-4 text-sm text-gray-500">
                    <div className="flex items-center gap-1">
                      <Eye size={16} />
                      {article.views.toLocaleString()}
                    </div>
                    <div className="flex items-center gap-1">
                      <ThumbsUp size={16} />
                      {article.likes.toLocaleString()}
                    </div>
                  </div>
                  <a
                    href={article.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => handleArticleView(article.id)}
                    className="text-purple-600 font-semibold hover:text-purple-700 flex items-center gap-1 group"
                  >
                    Read
                    <ChevronRight size={16} className="group-hover:translate-x-1 transition-transform" />
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredArticles.length === 0 && (
          <div className="text-center py-16">
            <div className="text-6xl mb-4">📭</div>
            <p className="text-xl text-gray-600 font-semibold">No articles found</p>
            <p className="text-gray-500 mt-2">Try adjusting your filters or search terms</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Article;