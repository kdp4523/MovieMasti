require("dotenv").config({ path: __dirname + "/../.env" });
const jwt = require("jsonwebtoken");
const secretKey = process.env.JWT_SECRET || "SSC";

const fetchUser = (req, res, next) => {
  // get user from jwt token and add id to req object
  const token = req.header("auth-token");
  
  if (!token) {
    return res.json({
      status: false,
      msg: "Login to access features :)",
    });
  }
  try {
    //extract payload data from the jwt by verifying jwt with the help of secret key.
    const data = jwt.verify(token, secretKey);
    
    req.user = data;
    next();
  } catch (error) {
    return res.json({
      status: false,
      msg: "Session expired. Please login again.",
      errorType: "JWT_INVALID"
    });
  }
};

module.exports = fetchUser;
