import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { DecodedToken } from "../@types/user";

declare module "express" {
  interface Request {
    user?: DecodedToken;
  }
}

const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
  const token = req.header("Authorization")?.replace("Bearer ", "");

  if (!token) {
    return res.status(401).json({ message: "Access denied. No token provided." });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET || "your_jwt_secret") as DecodedToken;
    req.user = decoded;
    next();
  } catch (error) {
    return res.status(400).json({ message: "Invalid token." });
  }
};

export default authMiddleware;
