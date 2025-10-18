import React from 'react';

const Contact = () => {
  return (
    <div className="min-h-screenbg-gradient-to-br from-[#0b0b1d] via-[#141428] to-[#1a1a35] flex flex-col items-center justify-center px-6 py-12">
      <div className="max-w-3xl w-full bg-white shadow-lg rounded-2xl p-8">
        <h1 className="text-4xl font-bold text-gray-800 mb-4 text-center">Contact Us</h1>
        <p className="text-gray-600 text-center mb-8">
          Have any questions, feedback, or collaboration ideas?  
          We'd love to hear from you! Fill out the form below or reach us directly.
        </p>

        <form className="space-y-6">
          <div>
            <label className="block text-gray-700 font-medium mb-2">Full Name</label>
            <input
              type="text"
              placeholder="Enter your name"
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-indigo-500 outline-none"
              required
            />
          </div>

          <div>
            <label className="block text-gray-700 font-medium mb-2">Email Address</label>
            <input
              type="email"
              placeholder="Enter your email"
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-indigo-500 outline-none"
              required
            />
          </div>

          <div>
            <label className="block text-gray-700 font-medium mb-2">Message</label>
            <textarea
              placeholder="Write your message..."
              rows="5"
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-indigo-500 outline-none resize-none"
              required
            ></textarea>
          </div>

          <button
            type="submit"
            className="w-full bg-indigo-600 text-white font-semibold py-3 rounded-lg hover:bg-indigo-700 transition duration-200"
          >
            Send Message
          </button>
        </form>

        <div className="mt-10 text-center text-gray-600">
          <p>📍 Location: Bhubaneswar, Odisha, India</p>
          <p>📧 Email: <a href="mailto:contact@ourplatform.com" className="text-indigo-600 underline">contact@ourplatform.com</a></p>
          <p>📞 Phone: +91 98765 43210</p>
        </div>
      </div>
    </div>
  );
};

export default Contact;
