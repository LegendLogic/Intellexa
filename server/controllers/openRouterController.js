import axios from "axios";

export const analyzeImage = async (req, res) => {
  try {
    const { imageUrl, prompt } = req.body;

    if (!imageUrl) {
      return res.status(400).json({
        success: false,
        message: "Please provide an image URL",
      });
    }

    // Default prompt if not provided
    const userPrompt = prompt || "Describe this image in detail.";

    const response = await axios.post(
      "https://openrouter.ai/api/v1/chat/completions",
      {
        model: "google/gemini-2.5-flash-image",
        messages: [
          {
            role: "user",
            content: [
              { type: "text", text: userPrompt },
              {
                type: "image_url",
                image_url: { url: imageUrl },
              },
            ],
          },
        ],
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.OPENROUTER_API_KEY}`,
          "Content-Type": "application/json",
        },
      }
    );

    // Safely extract AI response
    const aiResponse =
      response.data.choices?.[0]?.message?.content || "No response from AI model.";

    res.status(200).json({
      success: true,
      result: aiResponse,
    });
  } catch (error) {
    console.error("❌ OpenRouter API Error:", error.response?.data || error.message);

    // Handle quota specifically
    const isQuotaError =
      error.response?.data?.error?.code === "insufficient_quota";

    res.status(error.response?.status || 500).json({
      success: false,
      message: isQuotaError
        ? "Your API quota is exhausted. Please check your OpenRouter account."
        : "OpenRouter API request failed",
      error: error.response?.data || error.message,
    });
  }
};
