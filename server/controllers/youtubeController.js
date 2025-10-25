import axios from "axios";

export const testYouTube = async (req, res) => {
  try {
    const { query } = req.body;
    if (!query)
      return res.status(400).json({ success: false, message: "Please provide a query" });

    const response = await axios.get("https://www.googleapis.com/youtube/v3/search", {
      params: {
        part: "snippet",
        q: `${query} tutorial`,
        type: "video",
        maxResults: 3,
        key: process.env.YOUTUBE_API_KEY,
      },
    });

    const videos = response.data.items.map(item => ({
      title: item.snippet.title,
      channel: item.snippet.channelTitle,
      thumbnail: item.snippet.thumbnails.medium.url,
      url: `https://www.youtube.com/watch?v=${item.id.videoId}`,
    }));

    res.json({ success: true, videos });
  } catch (err) {
    console.error("❌ YouTube API Error:", err.response?.status, err.response?.data);
    res.status(err.response?.status || 500).json({
      success: false,
      message: "YouTube API failed",
      error: err.response?.data || err.message,
    });
  }
};
