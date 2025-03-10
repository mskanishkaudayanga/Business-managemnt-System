import { BrowserRouter as Router, Routes, Route } from "react-router-dom"; // Adjust the path as necessary
import Register from "../pages/Register";
import Login from "../pages/Login";
import Home from "../pages/Home";
import BusinessProfile from "../pages/businessProfile";

export default function AppRouter() {
  return (
    <Routes>
      <Route path="/" element={ <Home/>} />
      <Route path="/signup" element={<Register />} />
      <Route path="/login" element={<Login />} />
      <Route path="/Business:id" element={<BusinessProfile/>} />
      <Route path="*" element={<h1>Not Found</h1>} />
    </Routes>
  );
}
