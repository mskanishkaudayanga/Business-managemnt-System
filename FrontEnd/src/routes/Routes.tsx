import { Routes, Route } from "react-router-dom";
import Register from "../pages/Register";
import Login from "../pages/Login";
import Home from "../pages/Home";
import BusinessProfile from "../pages/businessProfile";
import { AuthProvider } from "../context/AthContext";

export default function AppRouter() {
  return (
    <AuthProvider>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signup" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/businessProfile/:id" element={<BusinessProfile />} />
        <Route path="*" element={<h1>Not Found</h1>} />
      </Routes>
    </AuthProvider>
  );
}
