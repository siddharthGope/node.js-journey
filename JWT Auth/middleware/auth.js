const jwt = require("jsonwebtoken");

const JWT_SECRET_KEY = process.env.JWT_SECRET || "12345abcde";

function verifyToken(req, res, next) {
  const authHeader = req.headers["authorization"];
  if (!authHeader) return res.status(401).json({ message: "Token missing" });

  const token = authHeader.split(" ")[1];

  jwt.verify(token, JWT_SECRET_KEY, (err, user) => {
    if (err) return res.status(403).json({ message: "Invalid Token", err });

    req.user = user;
    next();
  });
}

module.exports = verifyToken;
