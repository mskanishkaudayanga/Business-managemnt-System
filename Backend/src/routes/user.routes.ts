import express from "express";
import userController from "../controllers/user.controller";
const userRoutes = express.Router();

userRoutes.post("/adduser", userController.AddUser);

export default userRoutes;
