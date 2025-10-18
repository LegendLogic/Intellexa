import React from "react";

const platforms = [
  { name: "Windows", icon: "fab fa-windows", color: "text-blue-600" },
  { name: "MacOS", icon: "fab fa-apple", color: "text-gray-800" },
  { name: "Linux", icon: "fab fa-linux", color: "text-orange-600" },
  { name: "iOS", icon: "fab fa-apple", color: "text-gray-800" },
  { name: "Android", icon: "fab fa-android", color: "text-green-600" },
  { name: "Web", icon: "fas fa-globe", color: "text-indigo-600" },
];

const PlatformSupport = () => {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center px-6 py-12">
      <div className="max-w-5xl w-full text-center">
        <h1 className="text-4xl font-bold text-gray-800 mb-4">Platform Support</h1>
        <p className="text-gray-600 mb-10">
          Our platform works seamlessly across all major operating systems and devices.
        </p>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 gap-8">
          {platforms.map((platform, index) => (
            <div
              key={index}
              className="bg-white shadow-md rounded-xl p-6 flex flex-col items-center hover:shadow-xl transition duration-300"
            >
              <i className={`${platform.icon} ${platform.color} text-5xl mb-4`}></i>
              <h3 className="text-lg font-semibold text-gray-800">{platform.name}</h3>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PlatformSupport;
