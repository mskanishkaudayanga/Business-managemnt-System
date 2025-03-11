import axios from "axios";
import { LoginData, RegisterData } from "../types/types";
import axiosInstance from "./Auth";

const authServices ={
  login: async (login:LoginData) => {
    try{
      console.log("login ",login);
      const response =await axiosInstance.post("login",login);
      return response.data;
    }
    catch(error){
      throw error;
    }
  },
  register: async (register:RegisterData) => {
    try{
      console.log("registerserv ",register);
      const response =await axios.post("http://localhost:5000/adduser",register);
      console.log("response ",response);
      return response.data;
    }
    catch(error){
      console.log("error ",error);
      throw error;

    }
  }
}

export default authServices;