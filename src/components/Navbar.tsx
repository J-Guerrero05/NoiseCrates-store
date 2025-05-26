
import { Link, useLocation } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import { useCart } from "@/context/CartContext";
import { useState } from "react";
import { Search, LogOut, User } from "lucide-react";

interface NavbarProps {
  onSearch?: (query: string) => void;
}

const Navbar = ({ onSearch }: NavbarProps) => {
  const { user, signOut } = useAuth();
  const { totalItems } = useCart();
  const [searchQuery, setSearchQuery] = useState("");
  const location = useLocation();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (onSearch) {
      onSearch(searchQuery);
    }
  };
  
  const isActive = (path: string) => {
    return location.pathname === path ? "active" : "";
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark mb-4">
      <div className="container">
        <Link className="navbar-brand" to="/">
          <span className="fw-bold text-primary">Noise</span>Crate
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarContent"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarContent">
          <form className="d-flex mx-auto my-2 my-lg-0" onSubmit={handleSearch}>
            <div className="input-group">
              <input
                className="form-control"
                type="search"
                placeholder="Search by name..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <button className="btn btn-primary animated-btn" type="submit">
                <Search size={18} />
              </button>
            </div>
          </form>

          <ul className="navbar-nav ms-auto">
            <li className="nav-item">
              <Link className={`nav-link ${isActive("/")}`} to="/">
                Store
              </Link>
            </li>
            <li className="nav-item">
              <Link className={`nav-link position-relative ${isActive("/cart")}`} to="/cart">
                Cart
                {totalItems > 0 && (
                  <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                    {totalItems}
                  </span>
                )}
              </Link>
            </li>
            {user ? (
              <>
                <li className="nav-item">
                  <Link className={`nav-link d-flex align-items-center ${isActive("/profile")}`} to="/profile">
                    <User className="me-1 icon-profile" size={18} />
                    Profile
                  </Link>
                </li>
                <li className="nav-item">
                  <button 
                    className="btn btn-outline-light compact-btn ms-2 d-flex align-items-center logout-btn animated-btn" 
                    onClick={() => signOut()}
                  >
                    <LogOut className="me-1 icon-logout" size={14} />
                    Logout
                  </button>
                </li>
              </>
            ) : (
              <li className="nav-item d-flex gap-2 align-items-center">
                <Link 
                  className="btn btn-outline-primary compact-btn animated-btn" 
                  to="/login"
                >
                  Login
                </Link>
                <Link 
                  className="btn btn-primary compact-btn animated-btn" 
                  to="/register"
                >
                  Register
                </Link>
              </li>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
