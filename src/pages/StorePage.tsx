
import { useState } from "react";
import SamplePackCard from "../components/SamplePackCard";
import Filters from "../components/Filters";
import SearchBar from "../components/search/SearchBar";
import { useSamplePacks } from "@/hooks/useSamplePacks";
import { useStoreFilters } from "@/hooks/useStoreFilters";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

const StorePage = () => {
  const { data: samplePacks = [], isLoading, error } = useSamplePacks();
  const {
    filteredPacks,
    searchQuery,
    handleSearch,
    handleFilterChange
  } = useStoreFilters({ samplePacks });

  const [currentPage, setCurrentPage] = useState(1);
  const packsPerPage = 12;

  // Calculate pagination
  const totalPages = Math.ceil(filteredPacks.length / packsPerPage);
  const startIndex = (currentPage - 1) * packsPerPage;
  const endIndex = startIndex + packsPerPage;
  const currentPacks = filteredPacks.slice(startIndex, endIndex);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  if (isLoading) {
    return (
      <div className="container-fluid py-4">
        <div className="d-flex justify-content-center align-items-center" style={{ minHeight: "400px" }}>
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container-fluid py-4">
        <div className="alert alert-danger text-center">
          <h4>Error loading sample packs</h4>
          <p>Please try refreshing the page or contact support if the problem persists.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container-fluid py-4">
      <div className="row">
        <div className="col-12 mb-4">
          <h1 className="display-5 fw-bold text-center mb-4">
            Discover Amazing <span className="text-primary">Sample Packs</span>
          </h1>
          <p className="lead text-center text-muted mb-4">
            Find the perfect sounds for your next track from our curated collection
          </p>
        </div>
      </div>

      <div className="row">
        <div className="col-lg-3 col-md-4">
          <div className="sticky-top" style={{ top: "20px" }}>
            <SearchBar 
              searchQuery={searchQuery}
              onSearchChange={handleSearch}
            />
            <Filters onFilterChange={handleFilterChange} />
          </div>
        </div>
        
        <div className="col-lg-9 col-md-8">
          {filteredPacks.length === 0 ? (
            <div className="text-center py-5">
              <div className="mb-4">
                <i className="bi bi-music-note-list display-1 text-muted"></i>
              </div>
              <h3 className="text-muted mb-3">No sample packs found</h3>
              <p className="text-muted">
                {searchQuery 
                  ? "Try adjusting your search terms or filters to find what you're looking for."
                  : "Try adjusting your filters to see more sample packs."
                }
              </p>
            </div>
          ) : (
            <>
              <div className="d-flex justify-content-between align-items-center mb-4">
                <h5 className="text-muted mb-0">
                  {filteredPacks.length} sample pack{filteredPacks.length !== 1 ? 's' : ''} found
                </h5>
                <small className="text-muted">
                  Page {currentPage} of {totalPages}
                </small>
              </div>
              
              <div className="row row-cols-1 row-cols-sm-2 row-cols-lg-3 row-cols-xl-4 g-4 mb-5">
                {currentPacks.map((pack) => (
                  <div key={pack.id} className="col">
                    <SamplePackCard samplePack={pack} />
                  </div>
                ))}
              </div>

              {totalPages > 1 && (
                <div className="d-flex justify-content-center">
                  <Pagination>
                    <PaginationContent>
                      <PaginationItem>
                        <PaginationPrevious 
                          onClick={() => handlePageChange(Math.max(1, currentPage - 1))}
                          className={currentPage === 1 ? "pointer-events-none opacity-50" : "cursor-pointer"}
                        />
                      </PaginationItem>
                      
                      {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                        let pageNumber;
                        if (totalPages <= 5) {
                          pageNumber = i + 1;
                        } else if (currentPage <= 3) {
                          pageNumber = i + 1;
                        } else if (currentPage >= totalPages - 2) {
                          pageNumber = totalPages - 4 + i;
                        } else {
                          pageNumber = currentPage - 2 + i;
                        }
                        
                        return (
                          <PaginationItem key={pageNumber}>
                            <PaginationLink
                              onClick={() => handlePageChange(pageNumber)}
                              isActive={currentPage === pageNumber}
                              className="cursor-pointer"
                            >
                              {pageNumber}
                            </PaginationLink>
                          </PaginationItem>
                        );
                      })}
                      
                      <PaginationItem>
                        <PaginationNext 
                          onClick={() => handlePageChange(Math.min(totalPages, currentPage + 1))}
                          className={currentPage === totalPages ? "pointer-events-none opacity-50" : "cursor-pointer"}
                        />
                      </PaginationItem>
                    </PaginationContent>
                  </Pagination>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default StorePage;
