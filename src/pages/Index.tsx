
import { useState, useEffect } from "react";
import { samplePacks, purchasedPacks } from "../data/samplePacks";
import Navbar from "../components/Navbar";
import SamplePackCard from "../components/SamplePackCard";
import Filters from "../components/Filters";
import MyPurchases from "../components/MyPurchases";
import { SamplePack, User } from "../types/types";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";

const Index = () => {
  const [filteredPacks, setFilteredPacks] = useState<SamplePack[]>(samplePacks);
  const [searchQuery, setSearchQuery] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showPurchased, setShowPurchased] = useState(false);
  const [user, setUser] = useState<User | null>(null);

  // Mock functions for auth
  const handleLogin = () => {
    setIsLoggedIn(true);
    setUser({
      id: "1",
      name: "John Doe",
      email: "john.doe@example.com",
      avatarUrl: "https://randomuser.me/api/portraits/men/32.jpg",
    });
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setUser(null);
    setShowPurchased(false);
  };

  const handleSearch = (query: string) => {
    setSearchQuery(query);
  };

  const handleFilterChange = (genre: string, minBpm: number, maxBpm: number) => {
    let filtered = samplePacks;

    if (genre !== "All") {
      filtered = filtered.filter((pack) => pack.genre === genre);
    }

    filtered = filtered.filter(
      (pack) => pack.bpm >= minBpm && pack.bpm <= maxBpm
    );

    if (searchQuery) {
      const lowercaseQuery = searchQuery.toLowerCase();
      filtered = filtered.filter(
        (pack) =>
          pack.title.toLowerCase().includes(lowercaseQuery) ||
          pack.description.toLowerCase().includes(lowercaseQuery) ||
          pack.genre.toLowerCase().includes(lowercaseQuery)
      );
    }

    setFilteredPacks(filtered);
  };

  // Apply search filter whenever search query changes
  useEffect(() => {
    handleFilterChange("All", 80, 180);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchQuery]);

  return (
    <div className="bg-light min-vh-100">
      <Navbar
        onSearch={handleSearch}
        isLoggedIn={isLoggedIn}
        user={user}
        onLogin={handleLogin}
        onLogout={handleLogout}
        setShowPurchased={setShowPurchased}
        showPurchased={showPurchased}
      />

      <div className="container">
        {showPurchased && isLoggedIn ? (
          <MyPurchases purchasedPacks={purchasedPacks} />
        ) : (
          <>
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
                        <SamplePackCard samplePack={pack} />
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </>
        )}
      </div>

      <footer className="bg-dark text-white mt-5 py-4">
        <div className="container">
          <div className="row">
            <div className="col-md-6">
              <h5 className="mb-3">
                <span className="text-primary">Sample</span>Market
              </h5>
              <p className="small text-muted">
                The best marketplace for music producers to find high-quality sample packs.
              </p>
            </div>
            <div className="col-md-2">
              <h6 className="mb-3">Company</h6>
              <ul className="nav flex-column">
                <li className="nav-item mb-2"><a href="#" className="nav-link p-0 text-muted small">About</a></li>
                <li className="nav-item mb-2"><a href="#" className="nav-link p-0 text-muted small">Contact</a></li>
                <li className="nav-item mb-2"><a href="#" className="nav-link p-0 text-muted small">Blog</a></li>
              </ul>
            </div>
            <div className="col-md-2">
              <h6 className="mb-3">Legal</h6>
              <ul className="nav flex-column">
                <li className="nav-item mb-2"><a href="#" className="nav-link p-0 text-muted small">Terms</a></li>
                <li className="nav-item mb-2"><a href="#" className="nav-link p-0 text-muted small">Privacy</a></li>
                <li className="nav-item mb-2"><a href="#" className="nav-link p-0 text-muted small">Licensing</a></li>
              </ul>
            </div>
            <div className="col-md-2">
              <h6 className="mb-3">Support</h6>
              <ul className="nav flex-column">
                <li className="nav-item mb-2"><a href="#" className="nav-link p-0 text-muted small">Help Center</a></li>
                <li className="nav-item mb-2"><a href="#" className="nav-link p-0 text-muted small">FAQ</a></li>
                <li className="nav-item mb-2"><a href="#" className="nav-link p-0 text-muted small">Support</a></li>
              </ul>
            </div>
          </div>
          <hr className="my-3" />
          <div className="d-flex justify-content-between">
            <p className="small text-muted">&copy; 2025 SampleMarket. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
