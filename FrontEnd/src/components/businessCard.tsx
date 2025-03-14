import { useNavigate } from "react-router-dom";
import { businessCardData } from "../types/types";
import { Card } from "flowbite-react";

const BusinessCard = (props: businessCardData) => {
  const navigate = useNavigate();
  return (
    <Card
      onClick={() => navigate(`/businessProfile/${props.id}`)}
      className="max-w-sm w-[300px] border rounded-3 rounded-lg"
      imgAlt="Business Image"
    >
      {props.profileImage ? (
      <img
        src={props.profileImage}
        alt="Business Image"
        className="w-[90%] h-[150px] object-cover mx-auto rounded-lg"
      />
      ) : (
      <div
        className="w-[90%] h-[150px] mx-auto rounded-lg flex items-center justify-center"
        style={{ backgroundColor: `#${Math.floor(Math.random()*16777215).toString(16)}` }}
      >
        <span
          className="text-4xl font-bold"
          style={{
        color: parseInt(Math.floor(Math.random()*16777215).toString(16), 16) > 0xffffff / 2 ? 'black' : 'white'
          }}
        >
          {props.name.charAt(0)}
        </span>
      </div>
      )}
      <h5 className="text-xl font-semibold tracking-tight text-gray-900 dark:text-white">
      {props.name}
      </h5>
      <div className="flex flex-col justify-start">
      <p className="text-sm font-medium">
        {props.category} <span className="text-gray-800">Company</span>
      </p>
      <p className="text-sm font-medium">
        <span className="text-gray-800">Location:</span> {props.location}
      </p>
      <p className="text-sm font-medium">
        <span className="text-gray-800">Time Zone:</span> {props.timeZone}
      </p>
      </div>
      <button className="mt-4 bg-green-500 text-white py-2 px-4 rounded-lg">
      View Business
      </button>
    </Card>
  );
};

export default BusinessCard;
