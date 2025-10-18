import { v2 as cloudinary } from 'cloudinary';

import jwt from 'jsonwebtoken';

import mongoose from 'mongoose';

import fs from 'fs';



// ✅ Admin Login
const loginAdmin = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (email === process.env.ADMIN_EMAIL && password === process.env.ADMIN_PASSWORD) {
      const token = jwt.sign({ email }, process.env.JWT_SECRET, { expiresIn: '1d' });
      return res.status(200).json({ success: true, token });
    }

    return res.status(401).json({ success: false, message: 'Invalid credentials' });
  } catch (error) {
    console.error('Login Error:', error);
    return res.status(500).json({ success: false, message: error.message || 'Server error' });
  }
};






// ✅ Export All Controllers
export {

  loginAdmin,

};
