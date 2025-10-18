import React, { useState, useEffect } from 'react';
import { Gift, FileText, BookOpen } from 'lucide-react';
import axios from 'axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Prize = () => {
  const BASE_URL = import.meta.env.VITE_BACKEND_URL || "http://localhost:4000";
  const [userCredit, setUserCredit] = useState(0);
  const [loading, setLoading] = useState(true);

  const prizes = [
    { id: 1, name: "150 DSA Questions", pointsRequired: 50, type: "physical" },
    { id: 2, name: "Exclusive Interview E-Book", pointsRequired: 30, type: "digital" },
    { id: 3, name: "Full Stack Roadmap", pointsRequired: 100, type: "subscription" },
    { id: 4, name: "Premium Mock Interview Session", pointsRequired: 150, type: "digital" },
    { id: 5, name: "Gemini AI Support", pointsRequired: 200, type: "physical" },
    { id: 6, name: "Coding Cheat Sheet PDF", pointsRequired: 20, type: "digital" },
  ];

  // 🔹 Fetch logged-in user credit points
  const fetchUserCredit = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem('token');
      if (!token) return setUserCredit(0);

      const res = await axios.get(`${BASE_URL}/api/user/profile`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (res.data.user) {
        setUserCredit(res.data.user.creditBalance || 0);
      }
    } catch (err) {
      console.error(err);
      toast.error("⚠️ Failed to fetch user credit points");
      setUserCredit(0);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUserCredit();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-gray-500 text-lg">Loading user credit points...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-purple-50 p-6">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-bold text-gray-800 mb-6 flex items-center gap-3">
          <Gift className="text-purple-600" size={40} />
          Rewards & Prizes
        </h1>

        <div className="mb-6 text-lg font-medium text-purple-700">
          Your Points: <span className="font-bold">{userCredit}</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {prizes.map(prize => (
            <div
              key={prize.id}
              className="bg-white rounded-2xl shadow-lg p-5 flex flex-col justify-between hover:shadow-2xl transition-all duration-300"
            >
              <div className="flex items-center gap-3 mb-4">
                {prize.type === "digital" && <FileText size={24} className="text-blue-500" />}
                {prize.type === "subscription" && <BookOpen size={24} className="text-green-500" />}
                {prize.type === "physical" && <Gift size={24} className="text-purple-500" />}
                <h3 className="text-lg font-semibold text-gray-800">{prize.name}</h3>
              </div>

              <p className="text-sm text-gray-600 mb-4">
                Points Required: <span className="font-bold">{prize.pointsRequired}</span>
              </p>

              <button
                className={`py-2 px-4 rounded-lg font-semibold transition-all duration-300 flex items-center justify-center gap-2 ${
                  userCredit >= prize.pointsRequired
                    ? "bg-purple-600 text-white hover:bg-purple-700"
                    : "bg-gray-300 text-gray-500 cursor-not-allowed"
                }`}
                disabled={userCredit < prize.pointsRequired}
              >
                {userCredit >= prize.pointsRequired ? "Claim Prize" : "Locked"}
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Prize;
