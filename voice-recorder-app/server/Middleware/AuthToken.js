import jwt from "jsonwebtoken";

const authToken = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (!token) {
    res.status(401).json({ message: "Unauthorized Access" });
  }

  try {
    const decodedUser = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
    req.user = decodedUser;
    next();
  } catch (error) {
    res.status(403).json("Access Forbidden");
  }
};

export default authToken;
