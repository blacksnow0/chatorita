const jwt = require("jsonwebtoken");

require("dotenv").config();

const requireAuth = (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization) {
    return res.status(401).josn({ message: "Authroization token required" });
  }

  const token = authorization.split(" ")[1];

  try {
    const decode = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decode;
    next();
  } catch (err) {
    console.log(err);
    return res.status(401).json({ message: "Invalid token" });
  }
};

module.exports = { requireAuth };
