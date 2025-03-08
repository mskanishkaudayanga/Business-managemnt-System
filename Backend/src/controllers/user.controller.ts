import { Request, Response } from "express";
import userServices from "../services/users.services";

const AddUser = async (req: Request, res: Response): Promise<void> => {
  try {
    const data = req.body;
    const userExists = await userServices.getUserByEmail(data.email);
    if (userExists) {
      res.status(409).json({ message: "User already exists" });
      return;
    } else {
      const user = await userServices.registerUser(data);
      res.status(201).json(user);
    }
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).json({ message: error.message });
    }
  }
};

const userController = {
  AddUser,
};
export default userController;
