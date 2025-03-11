import React from "react";
import { ServiceCardProps } from "../types/types";

const ServiceCard: React.FC<ServiceCardProps> = ({ name, description, price, image }) => {
  return (
    <div className="bg-white shadow-md rounded-lg overflow-hidden w-80">
      <img src={image} alt={name} className="w-full h-48 object-cover" />
      <div className="p-4">
        <h2 className="text-xl font-semibold text-gray-800">{name}</h2>
        <p className="text-gray-600 text-sm mt-2">{description}</p>
        <div className="mt-4 flex justify-between items-center">
          <span className="text-lg font-bold text-green-600">${price.toFixed(2)}</span>
          <button className="bg-green-500 text-white px-4 py-2 rounded hover:bg-blue-600">
            book now
          </button>
        </div>
      </div>
    </div>
  );
};

export default ServiceCard;
