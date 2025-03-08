import { PrismaClient } from "@prisma/client";
import { User } from "../@types/user";
import bcrypt from "bcrypt";
const prisma = new PrismaClient();

const registerUser = async (user: User) => {
  try {
    const password = await bcrypt.hash(user.password, 10);
    return await prisma.user.create({
      data: user,
    });
  } catch (error) {
    return error;
  }
};

const getUserByEmail = async (email: string) => {
  try {
    return await prisma.user.findUnique({
      where: {
        email,
      },
    });
  } catch (error) {
    return error;
  }
};
const userServices = {
  registerUser,
  getUserByEmail,
};

export default userServices;
