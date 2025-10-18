import React, { useState, useEffect } from "react";
import axios from "axios";

const Leaderboard = () => {
  const [players, setPlayers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const backendUrl = import.meta.env.VITE_BACKEND_URL; // your backend URL

  useEffect(() => {
    const fetchPlayers = async () => {
      try {
        setLoading(true);
        const res = await axios.get(`${backendUrl}/api/leaderboard`); // adjust endpoint
        if (res.data.success) {
          setPlayers(res.data.players); // assuming response is { success: true, players: [...] }
        } else {
          setError(res.data.message || "Failed to load leaderboard");
        }
      } catch (err) {
        console.error(err);
        setError(err.response?.data?.message || "Server Error");
      } finally {
        setLoading(false);
      }
    };

    fetchPlayers();
  }, [backendUrl]);

  // Sort players by score descending
  const sortedPlayers = [...players].sort((a, b) => b.score - a.score);

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center px-6 py-12">
      <div className="max-w-4xl w-full bg-white shadow-lg rounded-2xl p-8">
        <h1 className="text-4xl font-bold text-gray-800 mb-6 text-center">Leaderboard</h1>
        <p className="text-gray-600 text-center mb-8">
          See the top players and their scores! Keep competing to reach the top. 🏆
        </p>

        {loading ? (
          <p className="text-center text-gray-500">Loading leaderboard...</p>
        ) : error ? (
          <p className="text-center text-red-500">{error}</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full table-auto border-collapse text-left">
              <thead>
                <tr className="bg-indigo-600 text-white">
                  <th className="px-4 py-2 rounded-tl-lg">Rank</th>
                  <th className="px-4 py-2">Player</th>
                  <th className="px-4 py-2 rounded-tr-lg">Score</th>
                </tr>
              </thead>
              <tbody>
                {sortedPlayers.map((player, index) => (
                  <tr
                    key={player.id || index} // use unique id if available
                    className={`${index % 2 === 0 ? "bg-gray-100" : "bg-white"} hover:bg-indigo-50`}
                  >
                    <td className="px-4 py-3 font-semibold">{index + 1}</td>
                    <td className="px-4 py-3">{player.name}</td>
                    <td className="px-4 py-3 font-medium">{player.score}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        <p className="text-gray-500 text-sm mt-6 text-center">
          © {new Date().getFullYear()} MyLeaderboard App
        </p>
      </div>
    </div>
  );
};

export default Leaderboard;
