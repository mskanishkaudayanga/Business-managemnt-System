import { Link } from "react-router-dom";
import { useAuth } from "../context/AthContext";
import { useEffect, useState } from "react";
import businesSevices from "../services/businessServices";

const Navbar = () => {
  const {isAuthorized,logout}=useAuth();
console.log(isAuthorized)
  function handleLogout(): void {
    logout()
  }
    const [userId, setUserId] = useState<number | null>(null);
  useEffect(() => {
    const getUserId = async () => {
      try {
        const userIDfletch = await businesSevices.getBusinesIdAuthorized();
        setUserId(userIDfletch);
      } catch (error) {
        console.error("Error fetching business details:", error);
      }
    };
    getUserId();
  }, []);

  console.log(userId);

  return (
    <nav className="w-[95%] h-[100px] mx-auto flex items-center justify-between px-6 bg-white-800 text-white rounded-lg shadow-lg">

      <Link to="/" className="text-2xl font-bold text-2xl text-green-600">
       AzCom
      </Link>

      <div className="flex gap-4">
        {
         !isAuthorized ? (
            <>
              <Link to="/signup" className="px-4 py-2 bg-white-500  text-green-600 rounded-md hover:bg-blue-600">
                Sign Up
              </Link>
              <Link to="/login" className="px-4 py-2 bg-green-500 rounded-md hover:bg-green-600">
                Login
              </Link>
            </>
          ) : (
            <>
              <Link to="/" className="px-4 py-2 text-green-600 rounded-md hover:bg-blue-600">
                Home
                </Link>
                <Link to="/about" className="px-4 py-2 text-green-600 rounded-md hover:bg-blue-600">
                About Us
                </Link>
                <Link to={`/businessProfile/${userId}`} className="px-4 py-2 text-green-600 rounded-md hover:bg-blue-600">
                Profile
                </Link>
                <Link to="/" className="px-4 py-2 text-green-600 rounded-md hover:bg-blue-600" onClick={handleLogout}>
                  Logout
                </Link>

              
            </>
          )
        }
       
      </div>
    </nav>
  );
};

export default Navbar;
