
import SamplePackCard from "@/components/SamplePackCard";
import Filters from "@/components/Filters";
import SearchBar from "@/components/search/SearchBar";
import { SamplePack } from "@/types/types";
import { useCart } from "@/context/CartContext";
import { useAuth } from "@/context/AuthContext";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import { useSamplePacks } from "@/hooks/useSamplePacks";
import { useStoreFilters } from "@/hooks/useStoreFilters";

const StorePage = () => {
  const { data: samplePacks = [], isLoading, error } = useSamplePacks();
  const { filteredPacks, handleSearch, handleFilterChange } = useStoreFilters({ samplePacks });
  const { addToCart } = useCart();
  const { user } = useAuth();
  const navigate = useNavigate();

  const handleAddToCart = (pack: SamplePack) => {
    if (!user) {
      toast.error("Please log in to add items to your cart");
      navigate("/login");
      return;
    }
    addToCart(pack);
  };

  if (isLoading) {
    return (
      <div className="container mb-5">
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
      <div className="container mb-5">
        <div className="alert alert-danger" role="alert">
          <h4 className="alert-heading">Error Loading Sample Packs</h4>
          <p>We encountered an error while loading the sample packs. Please try refreshing the page.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container mb-5">
      <h1 className="mb-4">Sample Packs</h1>
      <SearchBar onSearch={handleSearch} />
      <div className="row">
        <div className="col-md-3">
          <Filters onFilterChange={handleFilterChange} />
        </div>
        <div className="col-md-9">
          {filteredPacks.length === 0 ? (
            <div className="text-center my-5 py-5">
              <h3 className="text-muted">No sample packs found</h3>
              <p>Try adjusting your search or filters</p>
            </div>
          ) : (
            <div className="row row-cols-1 row-cols-sm-2 row-cols-lg-3 g-4">
              {filteredPacks.map((pack) => (
                <div key={pack.id} className="col">
                  <SamplePackCard samplePack={pack} />
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default StorePage;
