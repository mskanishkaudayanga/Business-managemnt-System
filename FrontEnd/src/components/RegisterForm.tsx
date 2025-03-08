import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import InputField from "./InputFeild";
import SelectField from "./SelectFeild";
import { toast } from "react-toastify";
import authServices from "../services/userServices";

const RegisterForm = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    name: "",
    password: "",
    confirmPassword: "",
    role: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;

    setFormData({
      ...formData,
      [name]: value,
    });
  };
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const newErrors = {
      email: validateField("email", formData.email),
      restaurantName: validateField("restaurantName", formData.name),
      password: validateField("password", formData.password),
      confirmPassword: validateField(
        "confirmPassword",
        formData.confirmPassword
      ),
      role: validateField("role", formData.role),
    };

    if (Object.values(newErrors).some((error) => error !== "")) {
      return;
    }
    try {
      const registerData = {
        email: formData.email,
        name: formData.name,
        password: formData.password,
        role: formData.role,
      };
      console.log("rehister ", registerData);
      const register = await authServices.register(registerData);
      console.log("register ", register);
      if (register.error) {
        toast.error(register.error);
        return;
      }
      toast.success("Registration successful. Redirecting to login page...");
      setTimeout(() => navigate("/login"), 1500);
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    }
  };
  //validation
  const validateField = (name: string, value: string) => {
    let errorMessage = "";

    switch (name) {
      case "email":
        errorMessage = /\S+@\S+\.\S+/.test(value) ? "" : "Invalid email format";
        break;
      case "name":
        errorMessage =
          value.length >= 3
            ? ""
            : " name must be at least 3 characters";
        break;
      case "password":
        errorMessage =
          value.length >= 6 ? "" : "Password must be at least 6 characters";
        break;
      case "confirmPassword":
        errorMessage =
          value === formData.password ? "" : "Passwords do not match";
        break;
      case "role":
        errorMessage = value ? "" : "Please select a role";
        break;
      default:
        break;
    }

    return errorMessage;
  };
  return (
    <div className="w-full max-w-md p-8">
      {/* Alert Message */}
      {/* <AlertMessage message={alertMessage} /> */}

      <h2 className="text-3xl font-bold text-center text-green-500 mb-6">
        Sign Up
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
          label="Name"
          type="text"
          name="name"
          value={formData.name}
          placeholder="Enter your name or business name"
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
        <InputField
          label="Confirm Password"
          type="password"
          name="confirmPassword"
          value={formData.confirmPassword}
          placeholder="Confirm your password"
          onChange={handleChange}
          validate={validateField}
        />

        <SelectField
          label="Role"
          name="role"
          value={formData.role}
          onChange={handleChange}
          options={[
            { value: "USER", label: "User" },
            { value: "BUSINESS", label: "Business" },
          ]}
        />

        <button
          type="submit"
          className="w-full bg-green-500 text-white font-bold py-2 px-4 rounded-lg hover:bg-green-600 transition duration-300"
        >
          Sign Up
        </button>
      </form>

      <div className="flex justify-center items-center mt-4">
        <p className="mr-2">Already have an account?</p>
        <button
          onClick={() => navigate("/login")}
          className="text-green-500 bg-white hover:bg-white"
        >
          Sign In
        </button>
      </div>
    </div>
  );
};

export default RegisterForm;
