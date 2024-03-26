import jwt from "jsonwebtoken";

const authToken = (req, res, nxt) => {
  const token = req.cookies.accessToken;
  if (token == null) {
    return res.status(401).end("Unauthorized: Token missing");
  }
  jwt.verify(token, process.env.TOKEN_SECRET, (err, decoded) => {
    if (err) {
      console.error("JWT Verification Error:", err);
      if (err.name === "JsonWebTokenError") {
        return res.status(403).end("Forbidden: Invalid token");
      }
      return res.status(500).end("Internal Server Error");
    }
    req.user = decoded;
    nxt();
  });
};

export default authToken;
