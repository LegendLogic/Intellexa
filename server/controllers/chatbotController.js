import fetch from "node-fetch";

export const chatWithMentor = async (req, res) => {
  try {
    const { message, mentorType } = req.body;

    if (!message) {
      return res.status(400).json({ error: "Message is required" });
    }

    // Define dynamic system prompt based on mentor type
    const systemPrompt = mentorType
      ? `You are a highly skilled and friendly ${mentorType} mentor. 
         Give practical, clear, and detailed explanations suitable for beginners to advanced learners.`
      : "You are an AI tutor helping students with technology, programming, and online learning.";

    // Make request to OpenRouter API
    const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${process.env.OPENROUTER_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "gpt-oss-20b",
        messages: [
          { role: "system", content: systemPrompt },
          { role: "user", content: message },
        ],
      }),
    });

    const data = await response.json();

    // Return AI response
    const reply = data?.choices?.[0]?.message?.content || "No response from AI.";
    res.json({ reply });

  } catch (error) {
    console.error("Chatbot Controller Error:", error);
    res.status(500).json({ error: "Failed to connect with AI server." });
  }
};
