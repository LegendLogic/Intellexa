import React, { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { Mail, Lock } from 'lucide-react';
import { motion } from 'framer-motion';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const backendUrl = import.meta.env.VITE_BACKEND_URL;

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${backendUrl}/api/admin/login`, { email, password });
      const data = response.data;
      if (data.success) {
        localStorage.setItem('aToken', data.token);
        toast.success('✅ Login successful');
        navigate('/dashboard');
      } else {
        toast.error(data.message || '❌ Login failed');
      }
    } catch (error) {
      toast.error('❌ Login failed. Please try again.');
      console.error(error);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-tr from-indigo-300 via-purple-200 to-pink-300">
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        className="bg-white p-10 rounded-3xl shadow-2xl w-full max-w-md border border-indigo-300"
      >
        <motion.h2
          className="text-3xl font-extrabold text-center text-indigo-700 mb-8 tracking-tight"
          initial={{ y: -20 }}
          animate={{ y: 0 }}
          transition={{ type: 'spring', stiffness: 120 }}
        >
          Admin Login
        </motion.h2>

        <form onSubmit={onSubmitHandler} className="space-y-6">
          {/* Email Field */}
          <motion.div whileFocus={{ scale: 1.01 }}>
            <div className="relative">
              <label className="absolute text-sm text-gray-500 transition-all transform -translate-y-4 scale-75 top-2 left-10 origin-[0] peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-2.5 peer-placeholder-shown:left-11 peer-focus:scale-75 peer-focus:-translate-y-4 peer-focus:left-10">
                Email
              </label>
              <div className="flex items-center border border-gray-300 rounded-xl px-4 py-3 bg-white focus-within:ring-2 focus-within:ring-indigo-400 transition">
                <Mail className="w-5 h-5 text-indigo-500 mr-2" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder=" "
                  required
                  className="peer w-full outline-none text-gray-700"
                />
              </div>
            </div>
          </motion.div>

          {/* Password Field */}
          <motion.div whileFocus={{ scale: 1.01 }}>
            <div className="relative">
              <label className="absolute text-sm text-gray-500 transition-all transform -translate-y-4 scale-75 top-2 left-10 origin-[0] peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-2.5 peer-placeholder-shown:left-11 peer-focus:scale-75 peer-focus:-translate-y-4 peer-focus:left-10">
                Password
              </label>
              <div className="flex items-center border border-gray-300 rounded-xl px-4 py-3 bg-white focus-within:ring-2 focus-within:ring-indigo-400 transition">
                <Lock className="w-5 h-5 text-indigo-500 mr-2" />
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder=" "
                  required
                  className="peer w-full outline-none text-gray-700"
                />
              </div>
            </div>
          </motion.div>

          {/* Submit Button */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            transition={{ type: 'spring', stiffness: 300 }}
            type="submit"
            className="w-full py-3 px-4 bg-indigo-600 text-white font-semibold rounded-xl shadow-md hover:bg-indigo-700 transition duration-300 relative overflow-hidden group"
          >
            <span className="relative z-10">Login</span>
            <div className="absolute inset-0 bg-indigo-500 opacity-0 group-hover:opacity-20 transition duration-300 rounded-xl blur-sm"></div>
          </motion.button>
        </form>
      </motion.div>
    </div>
  );
};

export default Login;
