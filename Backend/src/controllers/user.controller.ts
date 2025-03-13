import { Request, Response } from "express";
import userServices from "../services/users.services";
import bcrypt from "bcrypt";

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

const LoginUser = async (req: Request, res: Response): Promise<void> => {
  try {
    const data = req.body;
    const userData = await userServices.getUserByEmail(data.email);
    if (!userData) {
      res.status(404).json({ message: "User not found" });
      return;
    }
    const isMatch = await bcrypt.compare(data.password, userData.password);
    if (!isMatch) {
      res.status(401).json({ message: "Invalid credentials" });
      return;
    }
    if(!userData.id || !userData.role){
      res.status(500).json({ message: "Internal server error" });
      return;
    }
    const token = await userServices.genarateToken(userData.id, userData.role);
    res.status(200).json({ token, role: userData.role });

  } catch (error) {
    if (error instanceof Error) {
      res.status(500).json({ message: error.message });
    }
  }

}
const getAuthorizeUserId = async (req: Request, res: Response): Promise<void> => {
  try {
    const userId = req.user?.id;
    if (!userId) {
      res.status(401).json({ message: "Unauthorized" });
      return;
    }
    res.status(200).json({ userId });
  }
  catch (error) {
    if (error instanceof Error) {
      res.status(500).json({ message: error.message });
    }
  }
}

const userController = {
  AddUser,
  LoginUser,
  getAuthorizeUserId
};
export default userController;
