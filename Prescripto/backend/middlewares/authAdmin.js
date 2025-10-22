import jwt from "jsonwebtoken";

// admin authentication middleware
export const authAdmin = (req, res, next) => {
  try {
    const { atoken } = req.headers;
    console.log("Auth Admin - Token received:", atoken);
    
    if (!atoken) {
      return res.status(401).json({ success: false, message: "Please Login Again - No Token" });
    }

    // Verify the token
    const token_decode = jwt.verify(atoken, process.env.JWT_SECRET);
    console.log("Token decoded:", token_decode);
    console.log("Expected:", process.env.ADMIN_EMAIL + process.env.ADMIN_PASSWORD);

    if (token_decode !== process.env.ADMIN_EMAIL + process.env.ADMIN_PASSWORD) {
      return res.status(401).json({ success: false, message: "Please Login Again - Invalid Token" });
    }

    // Ensure req.body exists before setting adminId to avoid TypeError
    if (!req.body) req.body = {};
    req.body.adminId = token_decode; // Attach admin ID to the request body

    // If token is valid, proceed to the next middleware or route handler
    next();
  } catch (error) {
    console.log("Auth Admin Error:", error);
    res.status(401).json({ success: false, message: "Authentication failed: " + error.message });
  }
};