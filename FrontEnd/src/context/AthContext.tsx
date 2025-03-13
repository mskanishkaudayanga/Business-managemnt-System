import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import authServices from "../services/userServices"; // Your API service

// Define Auth Context Type
type AuthContextType = {
  isAuthorized: boolean;
  login: (formData: any) => Promise<void>;
  logout: () => void;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const isTokenValid = (token: string | null) => {
  if (!token) return false;

  try {
    const payload = JSON.parse(atob(token.split(".")[1])); // Decode JWT payload
    const expiry = payload.exp * 1000; // Convert to milliseconds
    return expiry > Date.now(); // Check if token is valid
  } catch (error) {
    return false;
  }
};

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const navigate = useNavigate();
  const [isAuthorized, setAuthorized] = useState<boolean>(false);

  useEffect(() => {
    const token = sessionStorage.getItem("token");
    if (isTokenValid(token)) {
      setAuthorized(true);
    } else {
      setAuthorized(false);
      sessionStorage.removeItem("token");
    }
  }, []);

  const login = async (formData: any) => {
    try {
      const response = await authServices.login(formData);
      console.log("Login Response:", response);

      toast.success("Login successful! Redirecting...");
      sessionStorage.setItem("token", response.token);
      setAuthorized(true);

      setTimeout(() => navigate("/"), 1000);
    } catch (error) {
      toast.error("Login failed. Please check your credentials.");
      console.error("Login error:", error);
    }
  };


  const logout = () => {
    sessionStorage.removeItem("token");
    setAuthorized(false);
    toast.info("Logged out successfully!");
    navigate("/login");
  };

  return (
    <AuthContext.Provider value={{ isAuthorized, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};


export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
