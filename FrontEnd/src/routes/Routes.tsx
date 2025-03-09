import { BrowserRouter as Router, Routes, Route } from "react-router-dom"; // Adjust the path as necessary
import Register from "../pages/Register";
import Login from "../pages/Login";
import Home from "../pages/Home";

export default function AppRouter() {
  return (
    <Routes>
      <Route path="/" element={ <Home/>} />
      <Route path="/signup" element={<Register />} />
      <Route path="/login" element={<Login />} />
    </Routes>
  );
}
