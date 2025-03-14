import express from "express";
import userController from "../controllers/user.controller";
import authMiddleware from "../middleware/AuthorizationUser";
const userRoutes = express.Router();

userRoutes.post("/adduser", userController.AddUser);
userRoutes.post("/login", userController.LoginUser);
userRoutes.get("/getAuthorizeUserId",authMiddleware, userController.getAuthorizeUserId);

export default userRoutes;
