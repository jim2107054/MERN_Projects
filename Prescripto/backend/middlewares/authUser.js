import jwt from "jsonwebtoken";

// user authentication middleware
export const authUser = (req, res, next) => {
  try {
    const { token } = req.headers;
    if (!token) {
      return res.json({ success: false, message: "Please Login Again." });
    }

    // Verify the token
    const token_decode = jwt.verify(token, process.env.JWT_SECRET);

    // Ensure req.body exists before setting userId to avoid TypeError
    if (!req.body) req.body = {};
    req.body.userId = token_decode.id; // Attach user ID to the request body

    next();
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};
