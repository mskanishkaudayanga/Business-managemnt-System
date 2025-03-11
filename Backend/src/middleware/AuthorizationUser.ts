import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { DecodedToken } from "../@types/user";

declare module "express" {
  interface Request {
    user?: DecodedToken;
  }
}

const authMiddleware = (req: Request, res: Response, next: NextFunction): void => {
  const token = req.header("Authorization")?.replace("Bearer ", "");

  console.log("Token", token);
  if (!token) {
    res.status(401).json({ message: "Access denied. No token provided." });
    return; // Ensure function exits here
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET || "your_jwt_secret") as DecodedToken;
    req.user = decoded;
    next(); // Call next() only after successful authentication
  } catch (error) {
    res.status(400).json({ message: "Invalid token." });
    return; // Exit function after sending response
  }
};

export default authMiddleware;
