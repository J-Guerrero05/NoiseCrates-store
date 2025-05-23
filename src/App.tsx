
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Toaster } from "sonner";
import { AuthProvider } from "./context/AuthContext";
import { CartProvider } from "./context/CartContext";
import AuthGuard from "./components/AuthGuard";
import Navbar from "./components/Navbar";

// Pages
import StorePage from "./pages/StorePage";
import Cart from "./pages/Cart";
import Profile from "./pages/Profile";
import Login from "./pages/Auth/Login";
import Register from "./pages/Auth/Register";
import NotFound from "./pages/NotFound";

// Bootstrap CSS
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";

const queryClient = new QueryClient();

const AppLayout = ({ children }: { children: React.ReactNode }) => (
  <div className="bg-light min-vh-100">
    <Navbar />
    {children}
  </div>
);

const App = () => (
  <QueryClientProvider client={queryClient}>
    <BrowserRouter>
      <AuthProvider>
        <CartProvider>
          <Toaster position="top-right" className="toast-container" />
          <div className="d-flex flex-column min-vh-100">
            <Routes>
              <Route path="/" element={<AppLayout><StorePage /></AppLayout>} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route 
                path="/cart" 
                element={
                  <AuthGuard>
                    <AppLayout><Cart /></AppLayout>
                  </AuthGuard>
                } 
              />
              <Route 
                path="/profile" 
                element={
                  <AuthGuard>
                    <AppLayout><Profile /></AppLayout>
                  </AuthGuard>
                } 
              />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </div>
        </CartProvider>
      </AuthProvider>
    </BrowserRouter>
  </QueryClientProvider>
);

export default App;
