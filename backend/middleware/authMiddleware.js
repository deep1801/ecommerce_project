import jwt from "jsonwebtoken";

const authMiddleware = async (req, res, next) => {
  try {
    // Get Header

    const authHeader = req.headers.authorization;

    // Check Header

    if (!authHeader) {
      return res.status(401).json({
        success: false,
        message: "No Token Provided",
      });
    }

    // Extract Token

    const token = authHeader.split(" ")[1];

    console.log(token);

    // Verify Token

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    console.log(decoded);

    // Save User Data

    req.user = decoded;

    next();
  } catch (error) {
    res.status(401).json({
      success: false,
      message: "Invalid Token",
    });
  }
};

export default authMiddleware;
