import axios from "axios";




// ------------------------------
// 🔍 Fetch Learning Articles via SerpAPI
// ------------------------------
export const testSerpAPI = async (req, res) => {
  try {
    // ✅ Support both JSON body and query params
    const prompt = req.body?.prompt || req.query?.prompt;

    if (!prompt || !prompt.trim()) {
      return res.status(400).json({
        success: false,
        message: "Please provide a valid 'prompt' field.",
      });
    }

    // ✅ Call SerpAPI
    const response = await axios.get("https://serpapi.com/search.json", {
      params: {
        q: `${prompt} learning articles`,
        engine: "google",
        api_key: process.env.SERPAPI_KEY,
      },
    });

    // ✅ Extract top 3 results
    const articles = (response.data?.organic_results || [])
      .slice(0, 3)
      .map((item) => ({
        title: item.title || "No title available",
        link: item.link || "No link available",
        snippet: item.snippet || "No snippet available",
      }));

    return res.status(200).json({
      success: true,
      count: articles.length,
      articles,
    });
  } catch (err) {
    console.error("❌ SerpAPI Error:", err.response?.status, err.response?.data || err.message);

    return res.status(err.response?.status || 500).json({
      success: false,
      message: "Failed to fetch articles from SerpAPI.",
      error: err.response?.data?.error || err.message,
    });
  }
};
