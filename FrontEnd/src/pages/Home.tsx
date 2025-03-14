import { useState, useEffect } from "react";
import { FaTimes } from "react-icons/fa";
import { FlickeringGrid } from "../components/magicui/flickering-grid";
import BusinessCard from "../components/businessCard";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "../components/ui/pagination";
import BusinessList from "../components/businessList";

const Home = () => {
  const locations = [
    "Colombo",
    "Gampaha",
    "Kandy",
    "Galle",
    "Matara",
    "Jaffna",
    "Anuradhapura",
    "Badulla",
    "Batticaloa",
    "Hambantota",
    "Kurunegala",
    "Mannar",
    "Monaragala",
    "Nuwara Eliya",
    "Polonnaruwa",
    "Puttalam",
    "Ratnapura",
    "Trincomalee",
    "Vavuniya",
  ];
  const categories = [
    "It",
    "Health",
    "Food",
    "Education",
    "Entertainment",
    "Other",
  ];
  const timeZones = [
    "FullTime",
    "PartTime",
    "TwentyFourHours"
  ];

  const [selectedLocation, setSelectedLocation] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState<string>("");

  const handleSearch = () => {
    console.log("Searching for:", searchQuery);
  };
  const fetchFilteredData = () => {
    console.log("Fetching data for:", {
      selectedLocation,
      selectedCategory,
      selectedTime,
    });
    // Simulated API fetch request
  };

  // Handle Location Change (Clears previous selections)
  const handleLocationChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedLocation(e.target.value || null);
    fetchFilteredData();
  };

  // Handle Category Change
  const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedCategory(e.target.value || null);
    fetchFilteredData();
  };

  // Handle Time Change
  const handleTimeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedTime(e.target.value || null);
    fetchFilteredData();
  };

  // Remove Filters Individually
  const removeFilter = (type: string) => {
    if (type === "location") {
      setSelectedLocation(null);
    } else if (type === "category") {
      setSelectedCategory(null);
    } else if (type === "time") {
      setSelectedTime(null);
    }
    fetchFilteredData();
  };

  return (
    <>
      <div className="flex flex-col items-center justify-center min-h-[75vh] w-full p-4 pb-[3%] bg-white-100 relative">
        <FlickeringGrid
          className="absolute inset-0 z-0 size-full h-full"
          squareSize={4}
          gridGap={6}
          color="#6B7280"
          maxOpacity={0.5}
          flickerChance={0.1}
        />
    

        {/* Main Container */}
        <div className="w-[80%] h-auto bg-green-700 shadow-lg rounded-lg flex flex-col items-center justify-center p-6 z-10">
          {/* Title */}
          <div className="text-center w-full">
            <h1 className="text-3xl md:text-4xl text-white font-bold leading-tight">
              Join with Our Trusted Business Partners <br />
              Success Your Life
            </h1>

            {/* Search Bar */}
            <div className="flex w-full justify-center mt-4">
              <input
               onChange={(e) => setSearchQuery(e.target.value)}
                type="text"
                placeholder="Search for services"
                className="w-3/4 md:w-4/6 p-2 rounded-l-lg bg-white text-gray-800 focus:outline-none"
              />
              <button   onClick={handleSearch} className="p-2 bg-white text-green-700 border-2 border-green-700 rounded-r-lg hover:bg-green-100">
                Search
              </button>
            </div>
          </div>

          {/* Filters Section */}
          <div className="grid grid-cols-1 md:grid-cols-7 gap-2 w-full mt-4">
            <div></div> <div></div> {/* Empty divs for spacing in grid */}
            {/* Location Dropdown */}
            <select
              onChange={handleLocationChange}
              value={selectedLocation || ""}
              className="w-full p-2 rounded-lg bg-white text-gray-800 focus:outline-none"
            >
              <option value="">Select Location</option>
              {locations.map((location, index) => (
                <option key={index} value={location}>
                  {location}
                </option>
              ))}
            </select>
            {/* Category Dropdown */}
            <select
              onChange={handleCategoryChange}
              value={selectedCategory || ""}
              className="w-full p-2 rounded-lg bg-white text-gray-800 focus:outline-none"
            >
              <option value="">Select Category</option>
              {categories.map((category, index) => (
                <option key={index} value={category}>
                  {category}
                </option>
              ))}
            </select>
            {/* Time Period Dropdown */}
            <select
              onChange={handleTimeChange}
              value={selectedTime || ""}
              className="w-full p-2 rounded-lg bg-white text-gray-800 focus:outline-none"
            >
              <option value="">Select Time Period</option>
              {timeZones.map((time, index) => (
                <option key={index} value={time}>
                  {time}
                </option>
              ))}
            </select>
          </div>

          {/* Selected Filters Display */}
          <div className="flex flex-wrap mt-4 gap-2">
            {selectedLocation && (
              <div className="bg-white text-green-700 px-3 py-1 rounded-full flex items-center">
                {selectedLocation}
                <button
                  onClick={() => removeFilter("location")}
                  className="ml-2"
                >
                  <FaTimes />
                </button>
              </div>
            )}
            {selectedCategory && (
              <div className="bg-white text-green-700 px-3 py-1 rounded-full flex items-center">
                {selectedCategory}
                <button
                  onClick={() => removeFilter("category")}
                  className="ml-2"
                >
                  <FaTimes />
                </button>
              </div>
            )}
            {selectedTime && (
              <div className="bg-white text-green-700 px-3 py-1 rounded-full flex items-center">
                {selectedTime}
                <button onClick={() => removeFilter("time")} className="ml-2">
                  <FaTimes />
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Passing props to BusinessList to display filtered businesses */}
   
      <BusinessList
        location={selectedLocation}
        category={selectedCategory}
        timeZone={selectedTime}
        searchQuery={searchQuery}
      />
    </>
  );
};

export default Home;
