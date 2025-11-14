import jwt from "jsonwebtoken";
import type { Request, Response, NextFunction } from "express";

// types/express/index.d.ts
declare namespace Express {
  export interface Request {
    user?: {
      id: number;
      email: string;
      role?: string;
      iat?: number;
      exp?: number;
    };
  }
}

const authToken = (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split("")[1];

  if (!token) {
    return res.sendStatus(401).json({ message: "Invalid Token" });
  }

  jwt.verify(token, process.env.JWT_SECRET!, (err, user) => {
    if (err) {
      return res.sendStatus(403).json({ message: " Token does not match" });
    }
    req.user = user;
    console.log("JWT Verification successful");
    next();
  });
};

export default authToken;
