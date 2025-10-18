import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const plans = [
  {
    title: "Free Plan",
    desc: "Perfect for beginners exploring our platform.",
    features: ["Basic Access", "Limited API Usage", "Community Support", "No Customization"],
    btnText: "Current Plan",
    btnDisabled: true,
    border: "border-gray-400",
    btnClass: "bg-gray-300 text-gray-700 cursor-not-allowed",
    color: "gray",
  },
  {
    title: "Pro Plan",
    desc: "For professionals who need more power and control.",
    features: ["Unlimited Projects", "Advanced Analytics", "AI-Powered Recommendations", "Email Support"],
    btnText: "Upgrade Now",
    btnLink: "/subscribe",
    border: "border-indigo-600",
    btnClass: "bg-indigo-600 text-white hover:bg-indigo-700",
    color: "indigo",
  },
  {
    title: "Enterprise",
    desc: "Tailored solutions for organizations and teams.",
    features: ["Dedicated AI Tools", "API Integration", "24/7 Premium Support", "Custom Dashboards"],
    btnText: "Contact Sales",
    btnLink: "/contact",
    border: "border-yellow-500",
    btnClass: "bg-yellow-500 text-white hover:bg-yellow-600",
    color: "yellow",
  },
];

const cardVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.2, type: "spring", stiffness: 80 },
  }),
  hover: { scale: 1.05, boxShadow: "0 20px 40px rgba(0,0,0,0.2)" },
};

const Premium = () => {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center px-6 py-12">
      <motion.div
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="max-w-6xl w-full text-center"
      >
        {/* Header Section */}
        <h1 className="text-5xl font-bold text-gray-800 mb-4">
          Upgrade to <span className="text-indigo-600">Premium</span>
        </h1>
        <p className="text-lg text-gray-600 mb-12">
          Unlock exclusive tools and features that help you grow faster and smarter.  
          Experience performance, customization, and insights like never before.
        </p>

        {/* Plans Section */}
        <div className="grid md:grid-cols-3 gap-8">
          {plans.map((plan, idx) => (
            <motion.div
              key={plan.title}
              custom={idx}
              initial="hidden"
              animate="visible"
              whileHover="hover"
              variants={cardVariants}
              className={`bg-white rounded-2xl shadow-md transition duration-300 p-8 border-t-4 ${plan.border}`}
            >
              <h2 className="text-2xl font-bold text-gray-700 mb-4">{plan.title}</h2>
              <p className="text-gray-600 mb-6">{plan.desc}</p>
              <ul className="text-gray-600 text-left mb-8 space-y-2">
                {plan.features.map((feat, i) => (
                  <li key={i}>{feat.includes("No") ? "❌ " : "✅ "}{feat}</li>
                ))}
              </ul>

              {plan.btnDisabled ? (
                <button className={`w-full py-3 rounded-lg font-medium ${plan.btnClass}`}>
                  {plan.btnText}
                </button>
              ) : (
                <Link
                  to={plan.btnLink}
                  className={`w-full inline-block py-3 rounded-lg font-medium text-center ${plan.btnClass} transition duration-200`}
                >
                  {plan.btnText}
                </Link>
              )}
            </motion.div>
          ))}
        </div>

        {/* Why Upgrade Section */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mt-20 max-w-4xl mx-auto text-center"
        >
          <h2 className="text-3xl font-semibold text-gray-800 mb-4">Why Go Premium?</h2>
          <p className="text-gray-600 mb-8">
            Premium members enjoy priority access, deeper insights, and faster growth.  
            Whether you're building your brand or scaling your business — our tools give you the edge you need.
          </p>

          <Link
            to="/subscribe"
            className="bg-gradient-to-r from-indigo-500 to-indigo-700 text-white px-8 py-4 rounded-lg font-medium hover:scale-105 hover:shadow-lg transition transform duration-300"
          >
            Get Started with Premium
          </Link>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default Premium;
