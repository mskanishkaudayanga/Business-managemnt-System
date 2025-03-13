import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import InputField from "./InputFeild";
import { useAuth } from "../context/AthContext";

const LoginForm = () => {
  const {login} = useAuth();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const validateField = (name: string, value: string) => {
    let errorMessage = "";

    switch (name) {
      case "email":
        errorMessage = /\S+@\S+\.\S+/.test(value) ? "" : "Invalid email format";
        break;
      case "password":
        errorMessage =
          value.length >= 6 ? "" : "Password must be at least 6 characters";
        break;
      default:
        break;
    }

    return errorMessage;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const newErrors = {
      email: validateField("email", formData.email),
      password: validateField("password", formData.password),
    };

    if (Object.values(newErrors).some((error) => error !== "")) {
      return;
    }
  await login(formData);
  };

  return (
    <div className="w-full max-w-md p-8">
      <h2 className="text-3xl font-bold text-center text-green-500 mb-6">
        Login
      </h2>

      <form onSubmit={handleSubmit}>
        <InputField
          label="Email"
          type="email"
          name="email"
          value={formData.email}
          placeholder="Enter your email"
          onChange={handleChange}
          validate={validateField}
        />
        <InputField
          label="Password"
          type="password"
          name="password"
          value={formData.password}
          placeholder="Enter your password"
          onChange={handleChange}
          validate={validateField}
        />

        <button
          type="submit"
          className="w-full bg-green-500 text-white font-bold py-2 px-4 rounded-lg hover:bg-green-600 transition duration-300"
        >
          Login
        </button>
      </form>

      <div className="flex justify-center items-center mt-4">
        <p className="mr-2">Don't have an account?</p>
        <button
          onClick={() => navigate("/register")}
          className="text-green-500 bg-white hover:bg-white"
        >
          Sign Up
        </button>
      </div>
    </div>
  );
};

export default LoginForm;
