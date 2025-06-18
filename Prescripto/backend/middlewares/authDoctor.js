import jwt from "jsonwebtoken";

// doctor authentication middleware
export const authDoctor = (req, res, next) => {
  try {
    const { dtoken } = req.headers;
    if (!dtoken) {
      return res.json({ success: false, message: "Please Login Again." });
    }

    // Verify the dtoken
    const dtoken_decode = jwt.verify(dtoken, process.env.JWT_SECRET);

    // Ensure req.body exists before setting doctorId to avoid TypeError
    if (!req.body) req.body = {};
    req.body.doctorId = dtoken_decode.id; // Attach doctor ID to the request body

    next();
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};
