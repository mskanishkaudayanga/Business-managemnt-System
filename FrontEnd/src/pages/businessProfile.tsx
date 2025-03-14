import { Star } from "lucide-react";
import photo from "../../public/OIP (1).jpeg";
import ServiceCard from "../components/serviceCard";
import {
  Drawer,
  DrawerTrigger,
  DrawerContent,
  DrawerTitle,
  DrawerDescription,
  DrawerHeader,
} from "../components/ui/drawer";
import EditProfile from "../components/EditProfile";
import { useEffect, useState } from "react";
import businesSevices from "../services/businessServices";
import { BusinessData } from "../types/types";
import { useParams } from "react-router-dom";
import { useAuth } from "../context/AthContext";
import userServices from "../services/userServices";

const BusinessProfile = () => {
  const { id } = useParams<{ id: string }>();

  const { isAuthorized } = useAuth();
  const [userId, setUserId] = useState<number | null>(null);
  const [businessData, setBusinessData] = useState<BusinessData | null>(null);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await businesSevices.getBusinessDetails(Number(id));
        setBusinessData(data);
      } catch (error) {
        console.error("Error fetching business details:", error);
      }
    };

    fetchData();
  }, []);
  useEffect(() => {
    const getUserId = async () => {
      try {
        const userIDfletch = await userServices.getAuthorizeUserId();
        // await businesSevices.countProfileVies(Number(id));
        setUserId(userIDfletch.userId);
      } catch (error) {
        console.error("Error fetching business details:", error);
      }
    };
    getUserId();
  }, []);
  useEffect(() => {
  const   getProfileViews=async ()=>{
      try {
        await businesSevices.countProfileVies(Number(id));
      } catch (error) {
        console.error("Error fetching business details:", error);
      }
    }
    getProfileViews()
  }, [id]);

  const checkAuthorization = () => {
    if (isAuthorized === true && businessData?.ownerId === userId) {
      return true;
    } else false;
  };
  return (
    <>
      <div className="w-[90%] mx-auto bg-white shadow-lg rounded-lg overflow-hidden">
        <div className="relative h-[250px] w-full flex items-center justify-center bg-gray-200">
          {businessData?.profileImage ? (
            <img
              src={businessData.profileImage}
              alt="Business Cover"
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-green-500 text-white text-6xl font-bold">
              {businessData?.name?.charAt(0)}
            </div>
          )}
        </div>
        <div className="px-10 pt-14 pb-6 flex flex-col md:flex-row justify-between">
          <div className="flex-1">
            <h1 className="text-3xl font-bold text-gray-800">
              {businessData?.name}
            </h1>
            <div className="flex items-center gap-1 mt-2">
              <Star className="text-yellow-500 fill-yellow-500 w-5 h-5" />
              <p className="text-gray-700">1.0 Rating</p>
            </div>
            <p className="text-gray-700 font-semibold mt-2">
              Category: {businessData?.category}
            </p>
            <p className="text-gray-700 font-semibold mt-2">
              Location:{businessData?.location}
            </p>

            <p className="text-gray-600 mt-2">{businessData?.description}</p>
            {checkAuthorization() && (
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
            )}
          </div>
          <div className="mt-6 md:mt-0 md:w-1/3 flex flex-col gap-4">
            <div>
              <h2 className="text-lg font-semibold text-gray-800">
                Opening Hours
              </h2>
              <p className="text-gray-600">{businessData?.timeZone}</p>
            </div>
            <div>
              <h2 className="text-lg font-semibold text-gray-800">Address</h2>
              <p className="text-gray-600">{businessData?.address}</p>
            </div>
            <div>
              <h2 className="text-lg font-semibold text-gray-800">
                Phone Number
              </h2>
              <p className="text-gray-600">{businessData?.phone}</p>
            </div>
            <div>
              <h2 className="text-lg font-semibold text-gray-800">Website</h2>
              <a
                href={businessData?.website}
                className="text-blue-600 hover:underline"
              >
                {businessData?.website}
              </a>
            </div>
            <div>
              <h2 className="text-lg font-semibold text-gray-800">
                Profile Views
              </h2>
              <p className="text-gray-600">{businessData?.profileViews} views</p>
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
