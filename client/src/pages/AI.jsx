
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
      setResponse(`AI Response: You said "${prompt}"! `);
      setLoading(false);
    }, 1000);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center  p-6"
    style={{
        background:
          "radial-gradient(circle 600px at 60% 20%, rgba(249,115,22,0.25), transparent 70%), radial-gradient(circle 800px at 10% 80%, rgba(255,56,0,0.15), transparent 70%), #0e0b11",
      }}
    >
      <h1 className="text-3xl text-white font-bold mb-6">Demo AI Model</h1>

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
          className="bg-white/20 hover:bg-white/60 text-white font-semibold px-4 py-2 rounded"
          disabled={loading}
        >
          {loading ? "Thinking..." : "Submit"}
        </button>
      </form>

      {response && (
        <div className="mt-6 p-4 bg-white/20 rounded shadow w-full max-w-md">
          <p>{response}</p>
        </div>
      )}
    </div>
  );
};

export default AI;
