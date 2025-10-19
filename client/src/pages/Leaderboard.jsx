import React, { useState, useEffect } from "react";
import axios from "axios";

const Leaderboard = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [currentUser, setCurrentUser] = useState(null);
  const [userLoading, setUserLoading] = useState(true);

  const backendUrl = import.meta.env.VITE_BACKEND_URL || "http://localhost:4000";

  // 🔹 Fetch all users' name + creditBalance
  useEffect(() => {
    const fetchAllUsers = async () => {
      try {
        setLoading(true);
        const res = await axios.get(`${backendUrl}/api/user/all`);
        if (res.data.success) {
          setUsers(res.data.users); // expects { name, creditBalance }
        } else {
          setError(res.data.message || "Failed to load users");
        }
      } catch (err) {
        console.error(err);
        setError(err.response?.data?.message || "Server Error");
      } finally {
        setLoading(false);
      }
    };

    fetchAllUsers();
  }, [backendUrl]);

  // 🔹 Fetch logged-in user info
  useEffect(() => {
    const fetchUser = async () => {
      try {
        setUserLoading(true);
        const token = localStorage.getItem("token");
        if (!token) {
          setCurrentUser(null);
          return;
        }

        const res = await axios.get(`${backendUrl}/api/user/profile`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        setCurrentUser(res.data); // expects { name, creditBalance }
      } catch (err) {
        console.error(err);
        setCurrentUser(null);
      } finally {
        setUserLoading(false);
      }
    };

    fetchUser();
  }, [backendUrl]);

  // 🔹 Sort by creditBalance descending
  const sortedUsers = [...users].sort((a, b) => b.creditBalance - a.creditBalance);

  return (
    <div className="min-h-screen  flex flex-col items-center px-6 py-12"
    style={{
    background:
      "radial-gradient(circle 600px at 60% 20%, rgba(249,115,22,0.25), transparent 70%), radial-gradient(circle 800px at 10% 80%, rgba(255,56,0,0.15), transparent 70%), #0e0b11",
  }}
    >
      <div className="max-w-4xl w-full mt-20 bg-transparent border-2 shadow-lg rounded-2xl p-8">
        <h1 className="text-4xl font-bold text-white mb-6 text-center">Leaderboard</h1>

        {/* Logged-in User Info */}
        {userLoading ? (
          <p className="text-gray-500 text-center mb-4">Loading your info...</p>
        ) : currentUser ? (
          <div className="text-center mb-6 bg-gray-100 rounded-lg p-4 shadow">
            <p className="text-lg font-semibold text-gray-800">Hello, {currentUser.name} 👋</p>
            <p className="text-gray-600">
              Credit Balance:{" "}
              <span className="font-semibold">{currentUser.creditBalance}</span> points
            </p>
          </div>
        ) : (
          <p className="text-red-500 text-center mb-4">User info not available</p>
        )}

        {/* Leaderboard Table */}
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
                  <th className="px-4 py-2">Name</th>
                  <th className="px-4 py-2 rounded-tr-lg">Credit Balance</th>
                </tr>
              </thead>
              <tbody>
                {sortedUsers.map((user, index) => (
                  <tr
                    key={user._id || index}
                    className={`${
                      index % 2 === 0 ? "bg-gray-100" : "bg-white"
                    } hover:bg-indigo-50 ${
                      currentUser && user._id === currentUser._id
                        ? "bg-yellow-100 font-semibold"
                        : ""
                    }`}
                  >
                    <td className="px-4 text-red-600 py-3">{index + 1}</td>
                    <td className="px-4 text-green-400 py-3">{user.name}</td>
                    <td className="px-4 text-black py-3">{user.creditBalance}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        <p className="text-pink-500 text-3xl mt-6 text-center">
          © {new Date().getFullYear()} Intellexa Leaderboard App
        </p>
      </div>
    </div>
  );
};

export default Leaderboard;
