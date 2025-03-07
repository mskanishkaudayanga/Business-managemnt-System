import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    restaurantName: "",
    password: "",
    confirmPassword: "",
    role: "",
  });

  const [alertVisible, setAlertVisible] = useState(false); // Alert visibility state
  const [alertMessage, setAlertMessage] = useState(""); // Alert message

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const fletchData = async (formData: any) => {
    // try {
    //   const response = await RestuarentService.addResturent(formData);
    //   if (response) {
    //     setAlertMessage("Registration successful!"); // Set success message
    //     setAlertVisible(true); // Show alert
    //     setFormData({
    //       email: "",
    //       restaurantName: "",
    //       password: "",
    //       confirmPassword: "",
    //       city: "",
    //     });
    //   }
    // } catch (error) {
    //   setAlertMessage("Registration failed! Please try again."); // Set error message
    //   setAlertVisible(true); // Show alert
    //   console.log(error);
    // }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await fletchData(formData);
    navigate("/login");
  };

  return (
    <div
      className="min-h-screen flex flex-col lg:flex-row items-center justify-center bg-cover bg-center"
      style={{
        backgroundImage: "url('https://example.com/background-image.jpg')",
      }}
    >
      {/* Left side: Sign Up Form */}
      <div className="lg:w-1/2 flex items-center justify-center bg-white bg-opacity-80 p-8 rounded-lg shadow-lg">
        <div className="w-full max-w-md p-8">
          {/* Alert Message */}
          {alertVisible && (
            <div
              className={`w-full p-4 mb-4 text-white ${
                alertMessage.includes("successful")
                  ? "bg-green-500"
                  : "bg-red-500"
              } rounded-lg`}
            >
              {alertMessage}
            </div>
          )}

          {/* Heading */}
          <h2 className="text-3xl font-bold text-center text-green-500 mb-6">
            Sign Up
          </h2>

          {/* Sign Up Form */}
          <form onSubmit={handleSubmit}>
            {/* Email Input */}
            <div className="mb-4">
              <label className="block text-gray-700 mb-2" htmlFor="email">
                Email
              </label>
              <input
                type="email"
                name="email"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400"
                placeholder="Enter your email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>

            {/* Restaurant Name Input */}
            <div className="mb-4">
              <label
                className="block text-gray-700 mb-2"
                htmlFor="restaurantName"
              >
                Name
              </label>
              <input
                type="text"
                name="restaurantName"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400"
                placeholder="Enter your restaurant name"
                value={formData.restaurantName}
                onChange={handleChange}
                required
              />
            </div>

            {/* Password Input */}
            <div className="mb-4">
              <label className="block text-gray-700 mb-2" htmlFor="password">
                Password
              </label>
              <input
                type="password"
                name="password"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400"
                placeholder="Enter your password"
                value={formData.password}
                onChange={handleChange}
                required
              />
            </div>

            {/* Confirm Password Input */}
            <div className="mb-4">
              <label
                className="block text-gray-700 mb-2"
                htmlFor="confirmPassword"
              >
                Confirm Password
              </label>
              <input
                type="password"
                name="confirmPassword"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400"
                placeholder="Confirm your password"
                value={formData.confirmPassword}
                onChange={handleChange}
                required
              />
            </div>

            {/* Location Input */}
            <div className="mb-4">
              <label className="block text-gray-700 mb-2" htmlFor="role">
                Role
              </label>
              <select
                name="role"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400"
                value={formData.role}
                onChange={handleChange}
                required
              >
                <option value="" disabled>
                  Select your role
                </option>
                <option value="USER">User</option>
                <option value="BUSINESS">Business</option>
              </select>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full bg-green-500 text-white font-bold py-2 px-4 rounded-lg hover:bg-green-600 transition duration-300"
            >
              Sign Up
            </button>
          </form>

          {/* Sign In Button */}
          <div className="flex justify-center items-center mt-4">
            <p className="mr-2">Already have an account?</p>
            <button
              onClick={handleSubmit}
              className="text-green-500 bg-white hover:bg-white"
            >
              Sign In
            </button>
          </div>
        </div>
      </div>

      {/* Right side: Image */}
      <div className="lg:w-1/2 hidden lg:block">
        <img
          src="/OIP (1).jpeg" // Replace with your image URL
          alt="Restaurant"
          className="w-full h-full object-cover rounded-lg"
        />
      </div>
    </div>
  );
};

export default Register;
