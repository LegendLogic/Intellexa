import jwt from "jsonwebtoken";
import userModel from "../model/userModel.js";

const userAuth = async (req, res, next) => {
  try {
    let token;

    // ✅ Get token from headers
    if (req.headers.authorization && req.headers.authorization.startsWith("Bearer ")) {
      token = req.headers.authorization.split(" ")[1]; // Extract token after 'Bearer'
    } else if (req.headers.token) {
      token = req.headers.token; // fallback
    }

    // ❌ No token found
    if (!token) {
      return res.status(401).json({
        success: false,
        message: "Not authorized. Please log in again.",
      });
    }

    // ✅ Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // ✅ Find user by decoded id
    const user = await userModel.findById(decoded.id).select("-password");
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found.",
      });
    }

    // ✅ Attach user to request
    req.user = user;
    next();
  } catch (error) {
    console.error("❌ Auth Error:", error.message);
    return res.status(401).json({
      success: false,
      message: "Invalid or expired token.",
    });
  }
};


export default userAuth;
