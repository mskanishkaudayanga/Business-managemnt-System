import { useState, useEffect } from "react";
import axios from "axios"; // Ensure axios is installed
import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from "../components/ui/pagination";
import BusinessCard from "./businessCard";

interface Business {
  id: string;
  name: string;
  location: string;
  category: string;
  openTime: string;
  closeTime: string;
  image: string;
}

const BusinessList: React.FC = () => {
  const [businesses, setBusinesses] = useState<Business[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const itemsPerPage = 8; // Adjust based on your preference

  useEffect(() => {
    const fetchBusinesses = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/businesses?page=${currentPage}&limit=${itemsPerPage}`);
        setBusinesses(response.data.businesses);
        setTotalPages(response.data.totalPages);
      } catch (error) {
        console.error("Error fetching businesses:", error);
      }
    };

    fetchBusinesses();
  }, [currentPage]); // Refetch when page changes

  const handlePrevPage = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  return (
    <div className="mt-2 text-center w-full flex flex-col justify-center items-center">
      <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {businesses.map((business) => (
          <BusinessCard
            key={business.id}
            name={business.name}
            location={business.location}
            category={business.category}
            openTime={business.openTime}
            closeTime={business.closeTime}
            image={business.image}
          />
        ))}
      </div>

      <div>
        <Pagination>
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious
                href="#"
                onClick={handlePrevPage}
                className={currentPage === 1 ? "opacity-50 cursor-not-allowed" : ""}
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
                className={currentPage === totalPages ? "opacity-50 cursor-not-allowed" : ""}
              />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      </div>
    </div>
  );
};

export default BusinessList;
