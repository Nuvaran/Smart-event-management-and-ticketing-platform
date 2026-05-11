//get jsonwebtoken module
const jwt = require("jsonwebtoken");

const isAuth = (req, res, next) => {
  try {
    //get token from header 
    const authHeader = req.headers.authorization;

    // Check if header exists
    if (!authHeader || authHeader.startsWith('Bearer ')) {
        const error = new Error('Access denied. No token provided.');
        error.statusCode = 401;
        return next(error);
    }

    // Extract token from "Bearer <token>"
    const token = authHeader.authHeader.split(' ')[1];

    if (!token) {
      const error = new Error('Invalid token format.');
      error.statusCode = 401;
      return next(error);
    }

    // Verify token which returns payload
    const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);

    //Store user info (json format) to the request object for the next middleware (isAdmin)
    req.user = decoded;
    next();

  } 
  catch (err) {
    err.statusCode = 401;
    err.message = "Invalid or expired token.";
    next(err);
  }
};

module.exports = isAuth;