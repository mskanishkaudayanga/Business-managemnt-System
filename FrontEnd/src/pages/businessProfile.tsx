import { Edit, Star } from "lucide-react";
import photo from "../../public/OIP (1).jpeg";
import ServiceCard from "../components/serviceCard";

import { useState } from "react";
import {
  Drawer,
  DrawerTrigger,
  DrawerContent,
  DrawerTitle,
  DrawerDescription,
  DrawerHeader,
} from "../components/ui/drawer";
import EditProfile from "../components/EditProfile";

const BusinessProfile = () => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [userData, setUserData] = useState({
    name: "John Doe",
    address: "123 Main St",
    phone: "123-456-7890",
    website: "www.johndoe.com",
    openTime: "09:00",
    closeTime: "18:00",
  });

  const openDrawer = () => {
    setIsDrawerOpen(true);
  };

  const closeDrawer = () => {
    setIsDrawerOpen(false);
  };

  const saveChanges = (updatedData: Record<string, string>) => {
    // setUserData(updatedData);
    // You can also handle additional logic like API calls here
  };

  return (
    <>
      <div className="w-[90%] mx-auto bg-white shadow-lg rounded-lg overflow-hidden">
        <div className="relative h-[250px] w-full">
          <img
            src={photo}
            alt="Business Cover"
            className="w-full h-full object-cover"
          />
        </div>
        <div className="px-10 pt-14 pb-6 flex flex-col md:flex-row justify-between">
          <div className="flex-1">
            <h1 className="text-3xl font-bold text-gray-800">Business Name</h1>
            <div className="flex items-center gap-1 mt-2">
              <Star className="text-yellow-500 fill-yellow-500 w-5 h-5" />
              <p className="text-gray-700">1.0 Rating</p>
            </div>
            <p className="text-gray-700 font-semibold mt-2">
              Category: Restaurant
            </p>
            <p className="text-gray-700 font-semibold mt-2">
              Location: Restaurant
            </p>

            <p className="text-gray-600 mt-2">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua.
            </p>
            <Drawer>
              <div className="mt-4 bg-green-500 text-white py-2 px-4 rounded-lg w-[100px] text-center cursor-pointer">
              <DrawerTrigger>Open</DrawerTrigger>
              </div>
              <DrawerContent>
                <DrawerHeader>
                  <DrawerTitle>Edit Profile</DrawerTitle>
                  <DrawerDescription>
                   <EditProfile />
                  </DrawerDescription>
                </DrawerHeader>
              </DrawerContent>
            </Drawer>
          </div>
          <div className="mt-6 md:mt-0 md:w-1/3 flex flex-col gap-4">
            <div>
              <h2 className="text-lg font-semibold text-gray-800">
                Opening Hours
              </h2>
              <p className="text-gray-600">Mon - Fri: 8:00 AM - 10:00 PM</p>
            </div>
            <div>
              <h2 className="text-lg font-semibold text-gray-800">Address</h2>
              <p className="text-gray-600">123 Main Street, Galle, Sri Lanka</p>
            </div>
            <div>
              <h2 className="text-lg font-semibold text-gray-800">
                Phone Number
              </h2>
              <p className="text-gray-600">+94 76 123 4567</p>
            </div>
            <div>
              <h2 className="text-lg font-semibold text-gray-800">Website</h2>
              <a
                href="https://example.com"
                className="text-blue-600 hover:underline"
              >
                www.example.com
              </a>
            </div>
            <div>
              <h2 className="text-lg font-semibold text-gray-800">
                Profile Views
              </h2>
              <p className="text-gray-600">15,230 views</p>
            </div>
          </div>
        </div>
      </div>
      <div className="w-[90%] mx-auto mt-10 text-center">
        <h1 className="text-2xl font-semibold text-green-500">
          Services Or Products
        </h1>
        <div className="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mt-4 place-items-center">
          <ServiceCard
            name={"new Service Name"}
            description={"the descriptions"}
            price={100.0}
            image={photo}
          />
          <ServiceCard
            name={"new Service Name"}
            description={"the descriptions"}
            price={100.0}
            image={photo}
          />
          <ServiceCard
            name={"new Service Name"}
            description={"the descriptions"}
            price={100.0}
            image={photo}
          />
          <ServiceCard
            name={"new Service Name"}
            description={"the descriptions"}
            price={100.0}
            image={photo}
          />
        </div>
      </div>
    </>
  );
};

export default BusinessProfile;
