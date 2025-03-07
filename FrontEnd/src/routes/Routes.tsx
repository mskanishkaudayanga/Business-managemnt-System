import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Homepage from "../pages/Home"; // Adjust the path as necessary
import Register from "../pages/Register";
import Login from "../pages/Login";

export default function AppRouter() {
  return (
    <Routes>
      <Route path="/Home" element={<Homepage />} />
      <Route path="/signup" element={<Register />} />
      <Route path="/login" element={<Login />} />
    </Routes>
  );
}
