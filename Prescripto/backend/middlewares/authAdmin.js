import jwt from "jsonwebtoken";

// admin authentication middleware
export const authAdmin = (req, res, next) => {
  try {
    const { atoken } = req.headers;
    if (!atoken) {
      return res.json({ success: false, message: "Please Login Again." });
    }

    // Verify the token
    const token_decode = jwt.verify(atoken, process.env.JWT_SECRET);

    if (token_decode !== process.env.ADMIN_EMAIL + process.env.ADMIN_PASSWORD) {
      return res.json({ success: false, message: "Please Login Again." });
    }

    // Ensure req.body exists before setting adminId to avoid TypeError
    if (!req.body) req.body = {};
    req.body.adminId = token_decode; // Attach admin ID to the request body

    // If token is valid, proceed to the next middleware or route handler
    next();
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};
