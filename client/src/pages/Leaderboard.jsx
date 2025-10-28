import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Leaderboard = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentUser, setCurrentUser] = useState(null);
  const [userLoading, setUserLoading] = useState(true);

  const navigate = useNavigate();

  const backendUrl =
    import.meta.env.VITE_BACKEND_URL || "http://localhost:4000";

  // 🔹 Fetch all users (name + creditBalance)
  useEffect(() => {
    const fetchAllUsers = async () => {
      try {
        setLoading(true);
        const res = await axios.get(`${backendUrl}/api/user/all`);
        if (res.data.success) {
          setUsers(res.data.users);
        } else {
          setError(res.data.message || "Failed to load users");
        }
      } catch (err) {
        console.error(err);
        setError(err.response?.data?.message || "Server error");
      } finally {
        setLoading(false);
      }
    };

    fetchAllUsers();
  }, [backendUrl]);

  // 🔹 Fetch currently logged-in user
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

        setCurrentUser(res.data.user || res.data); // Ensure structure
      } catch (err) {
        console.error(err);
        setCurrentUser(null);
      } finally {
        setUserLoading(false);
      }
    };

    fetchUser();
  }, [backendUrl]);

  // 🔹 Sort users by creditBalance descending
  const sortedUsers = [...users].sort(
    (a, b) => b.creditBalance - a.creditBalance
  );

  return (
    <div
      className="min-h-screen flex flex-col items-center px-6 py-12"
      style={{
        background:
          "radial-gradient(circle 600px at 60% 20%, rgba(249,115,22,0.25), transparent 70%), radial-gradient(circle 800px at 10% 80%, rgba(255,56,0,0.15), transparent 70%), #0e0b11",
      }}
    >
      <div className="max-w-4xl w-full mt-20 bg-transparent border border-white shadow-lg rounded-2xl p-8">
        <h1 className="text-4xl font-bold text-red-500 mb-6 text-center">
          LEADERBOARD
        </h1>

        {/* 🔹 Current User Info */}
        {userLoading ? (
          <p className="text-gray-500 text-center mb-4">
            Loading your info...
          </p>
        ) : currentUser ? (
          <div className="text-center mb-6 bg-transparent rounded-lg p-4 shadow">
            <p className="text-lg font-semibold text-red-400">
              Hello, {currentUser.name} 👋
            </p>
            <p className="text-white">
              Credit Balance:{" "}
              <span className="font-semibold text-white">
                {currentUser.creditBalance}
              </span>{" "}
              points
            </p>
          </div>
        ) : (
          <p className="text-red-500 text-center mb-4">
            User info not available
          </p>
        )}

        {/* 🔹 Leaderboard Table */}
        {loading ? (
          <p className="text-center text-red-600">Loading leaderboard...</p>
        ) : error ? (
          <p className="text-center text-red-500">{error}</p>
        ) : sortedUsers.length === 0 ? (
          <p className="text-center text-gray-400">No users found</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full table-auto border-collapse text-left">
              <thead>
                <tr className="bg-white/20 text-white">
                  <th className="px-4 text-amber-600 py-2 rounded-tl-lg">Rank</th>
                  <th className="px-4 text-amber-600 py-2">Name</th>
                  <th className="px-4 text-amber-600 py-2 rounded-tr-lg">
                    Credit Balance
                  </th>
                </tr>
              </thead>
              <tbody>
                {sortedUsers.map((user, index) => (
                  <tr
                    key={user._id || index}
                    className={`hover:bg-white/20 ${
                      currentUser && user._id === currentUser._id
                        ? "bg-yellow-100/30 font-semibold"
                        : "bg-transparent"
                    }`}
                  >
                    <td className="px-4 text-red-600 py-3">{index + 1}</td>
                    <td
                      className="px-4 text-green-400 py-3 cursor-pointer hover:underline"
                      onClick={() => navigate(`/userprofile/${user._id}`)}
                    >
                      {user.name}
                    </td>
                    <td className="px-4 text-orange-400 py-3">
                      {user.creditBalance}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        <p className="text-orange-700 text-3xl mt-6 text-center">
          © {new Date().getFullYear()} INTELLEXA LEADERBOARD
        </p>
      </div>
    </div>
  );
};

export default Leaderboard;
