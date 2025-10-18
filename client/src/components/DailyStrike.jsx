import React, { useState } from "react";

const DailyStreak = () => {
  // Example state: array of last 7 days completion
  const [streak, setStreak] = useState([
    { day: "Mon", completed: true },
    { day: "Tue", completed: true },
    { day: "Wed", completed: false },
    { day: "Thu", completed: true },
    { day: "Fri", completed: true },
    { day: "Sat", completed: true },
    { day: "Sun", completed: false },
  ]);

  const completedDays = streak.filter((day) => day.completed).length;

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center px-6 py-12">
      <div className="max-w-3xl w-full bg-white shadow-lg rounded-2xl p-8 text-center">
        <h1 className="text-4xl font-bold text-gray-800 mb-2">Daily Streak</h1>
        <p className="text-gray-600 mb-6">
          Keep your streak alive! Consistency is key to mastering your skills.
        </p>

        {/* Streak Display */}
        <div className="flex justify-center gap-4 mb-6">
          {streak.map((day, index) => (
            <div
              key={index}
              className={`w-12 h-12 flex items-center justify-center rounded-full font-medium text-white ${
                day.completed ? "bg-indigo-600" : "bg-gray-300 text-gray-600"
              }`}
            >
              {day.day.slice(0, 3)}
            </div>
          ))}
        </div>

        {/* Progress Bar */}
        <div className="w-full bg-gray-200 rounded-full h-4 mb-6">
          <div
            className="bg-indigo-600 h-4 rounded-full transition-all duration-500"
            style={{ width: `${(completedDays / streak.length) * 100}%` }}
          ></div>
        </div>

        <p className="text-gray-700 mb-6">
          Completed <span className="font-semibold">{completedDays}</span> out of{" "}
          {streak.length} days
        </p>

        {/* Action Button */}
        <button
          onClick={() => {
            // Toggle today's completion for demo purposes
            const todayIndex = new Date().getDay(); // Sunday = 0
            setStreak((prev) =>
              prev.map((d, i) =>
                i === (todayIndex === 0 ? 6 : todayIndex - 1)
                  ? { ...d, completed: !d.completed }
                  : d
              )
            );
          }}
          className="bg-indigo-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-indigo-700 transition duration-200"
        >
          Mark Today
        </button>
      </div>
    </div>
  );
};

export default DailyStreak;
