import { LoginData } from "../types/types";
import axiosInstance from "./Auth";

const authServices ={
  login: async (login:LoginData) => {
    try{
      const response =await axiosInstance.post("login",login);
      return response.data;
    }
    catch(error){
      throw error;
    }
  },
  register: async (register:RegisterData) => {
    try{
      const response =await axiosInstance.post("register",register);
      return response.data;
    }
    catch(error){
      throw error;
    }
  }
}

export default authServices;