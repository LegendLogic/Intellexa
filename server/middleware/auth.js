import jwt from "jsonwebtoken";
import userModel from "../model/userModel.js";

const userAuth = async (req, res, next) => {
  try {
    // ✅ Get token from either header key 'Authorization' or 'token'
    let token = req.headers.token || req.header("Authorization");

    if (!token) {
      return res.status(401).json({ success: false, message: "Not Authorized. Login Again" });
    }

    // ✅ If token comes with 'Bearer ' prefix, remove it
    if (token.startsWith("Bearer ")) {
      token = token.slice(7, token.length).trimLeft();
    }

    // ✅ Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // ✅ Fetch user from DB (optional but safer)
    const user = await userModel.findById(decoded.id).select("-password");

    if (!user) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    // ✅ Attach user info to request
    req.user = user;

    next();
  } catch (error) {
    console.error("Auth error:", error.message);
    return res.status(401).json({ success: false, message: "Invalid or expired token" });
  }
};

export default userAuth;
