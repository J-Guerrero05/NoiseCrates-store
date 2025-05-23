
import { useState, useEffect } from "react";
import { samplePacks } from "@/data/samplePacks";
import SamplePackCard from "@/components/SamplePackCard";
import Filters from "@/components/Filters";
import { SamplePack } from "@/types/types";
import { useCart } from "@/context/CartContext";
import { useAuth } from "@/context/AuthContext";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";

const StorePage = () => {
  const [filteredPacks, setFilteredPacks] = useState<SamplePack[]>(samplePacks);
  const [searchQuery, setSearchQuery] = useState("");
  const { addToCart } = useCart();
  const { user } = useAuth();
  const navigate = useNavigate();

  const handleSearch = (query: string) => {
    // Filter by name only, as requested
    setSearchQuery(query);
    
    if (query) {
      const lowercaseQuery = query.toLowerCase();
      const filtered = samplePacks.filter(pack => 
        pack.title.toLowerCase().includes(lowercaseQuery)
      );
      setFilteredPacks(filtered);
    } else {
      handleFilterChange("All", 80, 180);
    }
  };

  const handleFilterChange = (genre: string, minBpm: number, maxBpm: number) => {
    let filtered = samplePacks;

    if (genre !== "All") {
      filtered = filtered.filter((pack) => pack.genre === genre);
    }

    filtered = filtered.filter(
      (pack) => pack.bpm >= minBpm && pack.bpm <= maxBpm
    );

    // Apply name search if present
    if (searchQuery) {
      const lowercaseQuery = searchQuery.toLowerCase();
      filtered = filtered.filter(pack => 
        pack.title.toLowerCase().includes(lowercaseQuery)
      );
    }

    setFilteredPacks(filtered);
  };

  useEffect(() => {
    handleFilterChange("All", 80, 180);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleAddToCart = (pack: SamplePack) => {
    if (!user) {
      toast.error("Please log in to add items to your cart");
      navigate("/login");
      return;
    }
    addToCart(pack);
  };

  return (
    <div className="container mb-5">
      <h1 className="mb-4">Sample Packs</h1>
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
                  <div className="card h-100">
                    <img src={pack.imageUrl} className="card-img-top" alt={pack.title} style={{height: "180px", objectFit: "cover"}} />
                    <div className="card-body d-flex flex-column">
                      <h5 className="card-title">{pack.title}</h5>
                      <div className="d-flex mb-2">
                        <span className="badge bg-secondary me-2">{pack.genre}</span>
                        <span className="badge bg-info">{pack.bpm} BPM</span>
                      </div>
                      <p className="card-text flex-grow-1">{pack.description}</p>
                      <div className="d-flex justify-content-between align-items-center mt-auto">
                        <span className="fs-5">${pack.price.toFixed(2)}</span>
                        <button 
                          className="btn btn-primary" 
                          onClick={() => handleAddToCart(pack)}
                        >
                          Add to Cart
                        </button>
                      </div>
                    </div>
                  </div>
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
