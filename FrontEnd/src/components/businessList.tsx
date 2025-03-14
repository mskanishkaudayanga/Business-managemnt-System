import { useState, useEffect } from "react";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "../components/ui/pagination";
import BusinessCard from "./businessCard";
import axiosInstance from "../services/Auth";
import { Business, BusinessListProps } from "../types/types";

const BusinessList: React.FC<BusinessListProps> = ({
  location,
  category,
  timeZone,
  searchQuery,
}) => {
  const [businesses, setBusinesses] = useState<Business[]>([]);
  const [filteredBusinesses, setFilteredBusinesses] = useState<Business[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const itemsPerPage = 8;

  useEffect(() => {
    const fetchBusinesses = async () => {
      try {
        const response = await axiosInstance.get(`/GetAllBusiness`, {
          params: {
            location: location,
            category: category,
            timeZone: timeZone,
          },
        });
        console.log("response", response.data);
        setBusinesses(response.data);
      } catch (error) {
        console.error("Error fetching businesses:", error);
      }
    };

    fetchBusinesses();
  }, [location, category, timeZone]);

  // Filter businesses based on search query
  useEffect(() => {
    const filtered = businesses.filter((business) =>
      business.name.toLowerCase().includes((searchQuery ?? "").toLowerCase())
    );
    setFilteredBusinesses(filtered);
    setTotalPages(Math.ceil(filtered.length / itemsPerPage));
    setCurrentPage(1); // Reset to first page when filtering
  }, [searchQuery, businesses]);

  // Get businesses for the current page
  const businessesToDisplay = filteredBusinesses.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handlePrevPage = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  return (
    <div className="mt-2 text-center w-full flex flex-col justify-center items-center">
      <h1 className="text-2xl font-semibold text-green-500 mt-3 mb-3">
        Services Or Products
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {businessesToDisplay.length > 0 ? (
          businessesToDisplay.map((business) => (
            <BusinessCard
              key={business.id}
              name={business.name}
              location={business.location}
              category={business.category}
              timeZone={business.timeZone}
              profileImage={business.profileImage}
              id={business.id}
            />
          ))
        ) : (
          <p className="text-center text-gray-500">No businesses available</p>
        )}
      </div>

      {/* Pagination controls */}
      <div className="mt-5 mb-5">
        <Pagination>
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious
                href="#"
                onClick={handlePrevPage}
                className={
                  currentPage === 1 ? "opacity-50 cursor-not-allowed" : ""
                }
              />
            </PaginationItem>
            {Array.from({ length: totalPages }, (_, index) => (
              <PaginationItem key={index}>
                <PaginationLink
                  href="#"
                  onClick={() => setCurrentPage(index + 1)}
                  className={currentPage === index + 1 ? "font-bold" : ""}
                >
                  {index + 1}
                </PaginationLink>
              </PaginationItem>
            ))}
            <PaginationItem>
              <PaginationNext
                href="#"
                onClick={handleNextPage}
                className={
                  currentPage === totalPages
                    ? "opacity-50 cursor-not-allowed"
                    : ""
                }
              />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      </div>
    </div>
  );
};

export default BusinessList;
