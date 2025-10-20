
import React, { useState } from "react";

const AI = () => {
  const [prompt, setPrompt] = useState("");
  const [response, setResponse] = useState("");
  const [loading, setLoading] = useState(false);

  // Simulated AI response
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!prompt) return;

    setLoading(true);
    setResponse("");

    // Fake AI processing delay
    setTimeout(() => {
      setResponse(`AI Response: You said "${prompt}"! 🤖`);
      setLoading(false);
    }, 1000);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-6">
      <h1 className="text-3xl font-bold mb-6">Demo AI Model</h1>

      <form
        onSubmit={handleSubmit}
        className="flex flex-col w-full max-w-md gap-4"
      >
        <textarea
          className="p-3 border rounded-lg w-full"
          rows={4}
          placeholder="Type your prompt..."
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
        />

        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-600 text-white font-semibold px-4 py-2 rounded"
          disabled={loading}
        >
          {loading ? "Thinking..." : "Submit"}
        </button>
      </form>

      {response && (
        <div className="mt-6 p-4 bg-white rounded shadow w-full max-w-md">
          <p>{response}</p>
        </div>
      )}
    </div>
  );
};

export default AI;
