import { useNavigate } from "react-router-dom";
import { businessCardData } from "../types/types";
import { Card } from "flowbite-react";

const BusinessCard = (props: businessCardData) => {
  const navigate = useNavigate();
  return (
    <Card
    onClick={() => navigate(`//BusinessProfile/${props.id}`)}
      className="max-w-sm w-[300px] border rounded-3 rounded-lg"
      imgAlt="Business Image"
      imgSrc="../public/OIP (1).jpeg"
    >
      <h5 className="text-xl font-semibold tracking-tight text-gray-900 dark:text-white">
        {props.name}
      </h5>
      <div className="flex flex-col justify-start">
        <p className="text-sm font-medium">
          {props.category} <span className=" text-gray-800">Company</span>
        </p>
        <p className="text-sm font-medium">
          <span className=" text-gray-800">Location:</span> {props.location}
        </p>
        <div className="flex justify-between ">
          <p className="text-sm font-medium">
            <span className=" text-gray-800">Open:</span> {props.openTime}
          </p>
          <p className="text-sm font-medium">
            <span className=" text-gray-800">Close:</span> {props.closeTime}
          </p>
        </div>
      </div>
      <button className="mt-4 bg-green-500 text-white py-2 px-4 rounded-lg">
        View Business
      </button>
    </Card>
  );
};

export default BusinessCard;
