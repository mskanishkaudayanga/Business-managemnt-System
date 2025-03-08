import express from "express";
import userController from "../controllers/user.controller";
const userRoutes = express.Router();

userRoutes.post("/adduser", userController.AddUser);
userRoutes.post("/login", userController.LoginUser);

export default userRoutes;
