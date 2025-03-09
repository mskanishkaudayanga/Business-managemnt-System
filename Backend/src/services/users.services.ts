import { PrismaClient } from "@prisma/client";
import { User } from "../@types/user";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();
const secrate = process.env.JWT_SECRET;
const exprie = process.env.JWT_EXPIRES_IN;
const prisma = new PrismaClient();

const registerUser = async (user: User) => {
  try {
    const password = await bcrypt.hash(user.password, 10);
    return await prisma.user.create({
      data: {
        ...user,
        password,
      },
    });
  } catch (error) {
    throw error;
  }
};

const getUserByEmail = async (email: string): Promise<User | null> => {
  try {;
    return await prisma.user.findUnique({
      where: {
        email,
      },
    });
  } catch (error) {
    throw error;
  }
};

const genarateToken = async (id: number, role: string) => {
  try {
    return jwt.sign({ id, role }, secrate as string, {
      expiresIn: "1h",
    });
  } catch (error) {
    return error;
  }
};

const userServices = {
  registerUser,
  getUserByEmail,
  genarateToken,
};

export default userServices;
