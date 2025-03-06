import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Homepage from "../pages/Home"; // Adjust the path as necessary

export default function AppRouter() {
  return (
    <Routes>
      <Route path="/Home" element={<Homepage />} />

      {/* <Route path="/resturent" element={<ResturentPage />} />
        <Route path="/resturent/auth" element={<AuthRestaurantPage />} />
        <Route path="/signup" element={<SignUp/>} />
        <Route path='/login' element={<Login/>} /> */}
    </Routes>
  );
}
