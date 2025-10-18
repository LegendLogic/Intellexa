import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const DailyStreak = () => {
  const [streak, setStreak] = useState([
    { day: "Mon", completed: true },
    { day: "Tue", completed: true },
    { day: "Wed", completed: false },
    { day: "Thu", completed: true },
    { day: "Fri", completed: true },
    { day: "Sat", completed: true },
    { day: "Sun", completed: false },
  ]);

  const [user, setUser] = useState({ name: "User", credits: 0 });
  const [loading, setLoading] = useState(true);

  const completedDays = streak.filter((day) => day.completed).length;

  // Fetch user profile
  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/user/profile`, {
          method: "GET",
          credentials: "include",
          headers: { "Content-Type": "application/json" },
        });

        if (!response.ok) throw new Error("Failed to fetch user profile");

        const data = await response.json();
        setUser({ name: data.name, credits: data.creditBalance });
      } catch (error) {
        console.error(error);
        setUser({ name: "User", credits: 0 });
      } finally {
        setLoading(false);
      }
    };

    fetchUserProfile();
  }, []);

  const toggleToday = () => {
    const todayIndex = new Date().getDay();
    setStreak((prev) =>
      prev.map((d, i) =>
        i === (todayIndex === 0 ? 6 : todayIndex - 1)
          ? { ...d, completed: !d.completed }
          : d
      )
    );
  };

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, x: -50, y: 50 }}
        animate={{ opacity: 1, x: 0, y: 0 }}
        exit={{ opacity: 0 }}
        className="fixed bottom-4 left-4 w-72 bg-gray-900 rounded-3xl shadow-2xl p-6 z-50 text-white"
      >
        {/* User Info Header */}
        <div className="flex justify-between items-center mb-4">
          <div>
            <p className="text-gray-400 text-xs uppercase tracking-widest">User</p>
            <h2 className="text-sm font-bold text-indigo-400">{loading ? "Loading..." : user.name}</h2>
          </div>
          <div>
            <p className="text-gray-400 text-xs uppercase tracking-widest">Credits</p>
            <h2 className="text-sm font-bold text-indigo-400">{loading ? "--" : user.credits}</h2>
          </div>
        </div>

        {/* Weekly Streak Calendar */}
        <div className="grid grid-cols-7 gap-2 mb-4">
          {streak.map((day, index) => (
            <motion.div
              key={index}
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: index * 0.05, type: "spring", stiffness: 300 }}
              className={`w-10 h-10 flex items-center justify-center rounded-lg font-semibold shadow-md cursor-pointer transition-all duration-200 ${
                day.completed
                  ? "bg-indigo-500 hover:bg-indigo-600"
                  : "bg-gray-700 hover:bg-gray-600 text-gray-300"
              }`}
              onClick={() =>
                setStreak((prev) =>
                  prev.map((d, i) =>
                    i === index ? { ...d, completed: !d.completed } : d
                  )
                )
              }
              title={day.day}
            >
              {day.day.slice(0, 3)}
            </motion.div>
          ))}
        </div>

        {/* Progress Bar */}
        <div className="w-full bg-gray-700 rounded-full h-2 mb-3 overflow-hidden">
          <motion.div
            className="bg-indigo-500 h-2 rounded-full"
            initial={{ width: 0 }}
            animate={{ width: `${(completedDays / streak.length) * 100}%` }}
            transition={{ duration: 0.8, ease: "easeInOut" }}
          />
        </div>

        {/* Footer: Completed Days + Action Button */}
        <div className="flex justify-between items-center">
          <p className="text-gray-300 text-xs font-medium">
            {completedDays}/{streak.length} days
          </p>
          <motion.button
            onClick={toggleToday}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-indigo-500 text-white px-3 py-1 rounded-md font-semibold shadow hover:bg-indigo-600 transition-all duration-200 text-xs"
          >
            Mark Today
          </motion.button>
        </div>
      </motion.div>
    </AnimatePresence>
  );
};

export default DailyStreak;
