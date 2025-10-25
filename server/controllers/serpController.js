import axios from "axios";

export const testSerpAPI = async (req, res) => {
  try {
    const { query } = req.body;
    if (!query)
      return res.status(400).json({ success: false, message: "Please provide a query" });

    const response = await axios.get("https://serpapi.com/search.json", {
      params: {
        q: `${query} learning articles`,
        engine: "google",
        api_key: process.env.SERPAPI_KEY,
      },
    });

    const articles = (response.data.organic_results || []).slice(0, 3).map(a => ({
      title: a.title,
      link: a.link,
      snippet: a.snippet,
    }));

    res.json({ success: true, articles });
  } catch (err) {
    console.error("❌ SerpAPI Error:", err.response?.status, err.response?.data);
    res.status(err.response?.status || 500).json({
      success: false,
      message: "SerpAPI failed",
      error: err.response?.data || err.message,
    });
  }
};
