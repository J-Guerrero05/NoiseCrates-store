
import { useState } from "react";
import { Search } from "lucide-react";
import { User } from "../types/types";

interface NavbarProps {
  onSearch: (query: string) => void;
  isLoggedIn: boolean;
  user: User | null;
  onLogin: () => void;
  onLogout: () => void;
  setShowPurchased: (show: boolean) => void;
  showPurchased: boolean;
}

const Navbar = ({
  onSearch,
  isLoggedIn,
  user,
  onLogin,
  onLogout,
  setShowPurchased,
  showPurchased
}: NavbarProps) => {
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(searchQuery);
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark mb-4">
      <div className="container">
        <a className="navbar-brand" href="#">
          <span className="fw-bold text-primary">Sample</span>Market
        </a>
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
                placeholder="Search sample packs..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <button className="btn btn-primary" type="submit">
                <Search size={18} />
              </button>
            </div>
          </form>

          <ul className="navbar-nav ms-auto">
            {isLoggedIn ? (
              <>
                <li className="nav-item">
                  <button 
                    className={`btn ${showPurchased ? 'btn-primary' : 'btn-outline-light'} me-2`}
                    onClick={() => setShowPurchased(!showPurchased)}
                  >
                    {showPurchased ? 'Browse All' : 'My Purchases'}
                  </button>
                </li>
                <li className="nav-item dropdown">
                  <a
                    className="nav-link dropdown-toggle d-flex align-items-center"
                    href="#"
                    role="button"
                    data-bs-toggle="dropdown"
                  >
                    <img
                      src={user?.avatarUrl || "https://via.placeholder.com/30"}
                      alt="User avatar"
                      className="rounded-circle me-2"
                      width="30"
                      height="30"
                    />
                    {user?.name || "User"}
                  </a>
                  <ul className="dropdown-menu dropdown-menu-end">
                    <li>
                      <a className="dropdown-item" href="#">
                        Profile
                      </a>
                    </li>
                    <li>
                      <a className="dropdown-item" href="#">
                        Settings
                      </a>
                    </li>
                    <li>
                      <hr className="dropdown-divider" />
                    </li>
                    <li>
                      <button className="dropdown-item" onClick={onLogout}>
                        Logout
                      </button>
                    </li>
                  </ul>
                </li>
              </>
            ) : (
              <li className="nav-item">
                <button className="btn btn-primary" onClick={onLogin}>
                  <img
                    src="https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg"
                    alt="Google logo"
                    className="me-2"
                    width="18"
                    height="18"
                  />
                  Sign in with Google
                </button>
              </li>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
