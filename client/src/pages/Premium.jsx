import React, { useState } from "react";
import { Check, X, Zap, Shield, Sparkles, TrendingUp, Users, Headphones } from "lucide-react";

const plans = [
  {
    title: "Free Plan",
    price: "0",
    period: "forever",
    desc: "Perfect for beginners exploring our platform.",
    features: [
      { text: "Basic Access", included: true },
      { text: "Limited API Usage", included: true },
      { text: "Community Support", included: true },
      { text: "No Customization", included: false },
      { text: "Basic Analytics", included: false },
    ],
    btnText: "Current Plan",
    btnDisabled: true,
    gradient: "from-gray-400 to-gray-500",
    glowColor: "rgba(156, 163, 175, 0.3)",
    popular: false,
  },
  {
    title: "Pro Plan",
    price: "150",
    period: "per month",
    desc: "For professionals who need more power and control.",
    features: [
      { text: "Unlimited Projects", included: true },
      { text: "Advanced Analytics", included: true },
      { text: "AI-Powered Recommendations", included: true },
      { text: "Priority Email Support", included: true },
      { text: "Custom Integrations", included: true },
    ],
    btnText: "Upgrade Now",
    btnLink: "/subscribe",
    gradient: "from-indigo-600 to-purple-600",
    glowColor: "rgba(99, 102, 241, 0.4)",
    popular: true,
  },
  {
    title: "Enterprise",
    price: "Custom",
    period: "contact us",
    desc: "Tailored solutions for organizations and teams.",
    features: [
      { text: "Dedicated AI Tools", included: true },
      { text: "Full API Integration", included: true },
      { text: "24/7 Premium Support", included: true },
      { text: "Custom Dashboards", included: true },
      { text: "White-label Solutions", included: true },
    ],
    btnText: "Contact Sales",
    btnLink: "/contact",
    gradient: "from-yellow-500 to-orange-500",
    glowColor: "rgba(245, 158, 11, 0.4)",
    popular: false,
  },
];

const benefits = [
  {
    icon: Zap,
    title: "Lightning Fast Performance",
    desc: "Experience blazing-fast load times and real-time updates.",
  },
  {
    icon: Shield,
    title: "Enterprise-Grade Security",
    desc: "Your data is protected with military-grade encryption.",
  },
  {
    icon: TrendingUp,
    title: "Actionable Insights",
    desc: "Make data-driven decisions with advanced analytics.",
  },
  {
    icon: Headphones,
    title: "Premium Support",
    desc: "Get help when you need it from our expert team.",
  },
];

const Premium = () => {
  const [hoveredCard, setHoveredCard] = useState(null);

  return (
    <div className="min-h-screen  relative overflow-hidden"
    style={{
    background:
      "radial-gradient(circle 600px at 60% 20%, rgba(249,115,22,0.25), transparent 70%), radial-gradient(circle 800px at 10% 80%, rgba(255,56,0,0.15), transparent 70%), #0e0b11",
  }}
    >
      {/* Background Elements */}
      <div className="absolute  top-0 right-0 w-96 h-96 bg-indigo-500 rounded-full blur-3xl opacity-20 animate-pulse"></div>
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-purple-200 rounded-full blur-3xl opacity-20 animate-pulse" style={{ animationDelay: '1s' }}></div>
      
      <div className="relative z-10 flex flex-col items-center px-6 py-16">
        <div className="max-w-7xl w-full">
          {/* Header Section */}
          <div className="text-center mt-10 mb-16">
            <div className="inline-flex items-center gap-2 border text-indigo-700 px-4 py-2 rounded-full text-sm font-medium mb-6 animate-fade-in">
              <Sparkles className="w-4 h-4" />
              <span className="text-orange-300">Unlock Your Full Potential</span>
            </div>
            
            <h1 className="text-6xl font-extrabold text-white mb-6 leading-tight">
              Upgrade to{" "}
              <span className="bg-orange-300 bg-clip-text text-transparent">
                Premium
              </span>
            </h1>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto leading-relaxed">
              Unlock exclusive tools and features that help you grow faster and smarter.
              Experience performance, customization, and insights like never before.
            </p>
          </div>

          {/* Plans Section */}
          <div className="grid lg:grid-cols-3 gap-8 mb-24">
            {plans.map((plan, idx) => (
              <div
                key={plan.title}
                className="relative"
                style={{ animation: `slideUp 0.6s ease-out ${idx * 0.15}s both` }}
              >
                {plan.popular && (
                  <div className="absolute -top-5 left-1/2 transform -translate-x-1/2 z-10">
                    <div className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-4 py-1 rounded-full text-sm font-semibold shadow-lg">
                      Most Popular
                    </div>
                  </div>
                )}

                <div
                  onMouseEnter={() => setHoveredCard(idx)}
                  onMouseLeave={() => setHoveredCard(null)}
                  className={`relative bg-transparent rounded-3xl shadow-xl overflow-hidden h-full transition-all duration-300 ${
                    plan.popular ? "ring-2 ring-indigo-600" : ""
                  } ${hoveredCard === idx ? "transform -translate-y-2" : ""}`}
                  style={{
                    boxShadow: hoveredCard === idx ? `0 20px 60px ${plan.glowColor}` : undefined,
                  }}
                >
                  {/* Gradient Top Bar */}
                  <div className={`h-2 bg-gradient-to-r  ${plan.gradient}`}></div>

                  <div className="p-8">
                    {/* Plan Header */}
                    <div className="mb-6">
                      <h2 className="text-2xl font-bold text-white mb-2">{plan.title}</h2>
                      <div className="flex items-baseline gap-2 mb-3">
                        <span className="text-5xl font-extrabold text-white">{plan.price}</span>
                        <span className="text-white">/ {plan.period}</span>
                      </div>
                      <p className="text-white">{plan.desc}</p>
                    </div>

                    {/* Features List */}
                    <ul className="space-y-4 mb-8">
                      {plan.features.map((feat, i) => (
                        <li
                          key={i}
                          className="flex items-start gap-3"
                          style={{ animation: `fadeIn 0.4s ease-out ${0.5 + i * 0.1}s both` }}
                        >
                          <div className={`rounded-full p-1 ${
                            feat.included 
                              ? "bg-green-100 text-green-600" 
                              : "bg-gray-100 text-gray-400"
                          }`}>
                            {feat.included ? (
                              <Check className="w-4 h-4" />
                            ) : (
                              <X className="w-4 h-4" />
                            )}
                          </div>
                          <span className={feat.included ? "text-white" : "text-gray-600"}>
                            {feat.text}
                          </span>
                        </li>
                      ))}
                    </ul>

                    {/* CTA Button */}
                    {plan.btnDisabled ? (
                      <button className="w-full py-4 rounded-xl font-semibold bg-gray-200 text-white cursor-not-allowed">
                        {plan.btnText}
                      </button>
                    ) : (
                      <a href={plan.btnLink}>
                        <button
                          className={`w-full py-4 rounded-xl font-semibold bg-gradient-to-r ${plan.gradient} text-white shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105`}
                        >
                          {plan.btnText}
                        </button>
                      </a>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Benefits Section */}
          <div className="mb-24">
            <h2 className="text-4xl font-bold text-center text-orange-300 mb-12">
              Why Go Premium?
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {benefits.map((benefit, idx) => {
                const Icon = benefit.icon;
                return (
                  <div
                    key={benefit.title}
                    className="border border-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
                    style={{ animation: `fadeIn 0.6s ease-out ${idx * 0.1}s both` }}
                  >
                    <div className=" w-12 h-12 rounded-xl flex items-center justify-center mb-4">
                      <Icon className="w-6 h-6 text-orange-300" />
                    </div>
                    <h3 className="text-lg font-semibold text-orange-400 mb-2">{benefit.title}</h3>
                    <p className="text-orange-600 text-sm">{benefit.desc}</p>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Final CTA Section */}
          <div className=" rounded-3xl p-12 text-center border border-white shadow-2xl relative overflow-hidden">
            {/* Animated Background */}
            <div className="absolute inset-0 opacity-20">
              <div className="absolute top-0 left-1/4 w-64 h-64 bg-white rounded-full blur-3xl animate-pulse"></div>
              <div className="absolute bottom-0 right-1/4 w-64 h-64 bg-white rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
            </div>

            <div className="relative z-10">
              <Users className="w-16 h-16 text-orange-500 mx-auto mb-6" />
              <h2 className="text-4xl font-bold text-orange-600 mb-4">
                Join 10,000+ Premium Members
              </h2>
              <p className="text-orange-400 text-lg mb-8 max-w-2xl mx-auto">
                Premium members enjoy priority access, deeper insights, and faster growth.
                Whether you're building your brand or scaling your business — our tools give you the edge you need.
              </p>
              <a href="/subscribe">
                <button className="border text-orange-300 px-10 py-4 rounded-xl font-bold text-lg shadow-2xl hover:shadow-3xl transition-all duration-300 inline-flex items-center gap-2 hover:scale-105">
                  <span>Get Started with Premium</span>
                  <Zap className="text-red-700 w-5 h-5" />
                </button>
              </a>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes slideUp {
          from {
            opacity: 0;
            transform: translateY(50px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }

        @keyframes pulse {
          0%, 100% {
            opacity: 0.2;
          }
          50% {
            opacity: 0.4;
          }
        }

        .animate-pulse {
          animation: pulse 3s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
};

export default Premium;