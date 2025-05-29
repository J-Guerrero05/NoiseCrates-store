
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Toaster } from "sonner";
import { AuthProvider } from "./context/AuthContext";
import { CartProvider } from "./context/CartContext";
import AuthGuard from "./components/AuthGuard";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

// Pages
import StorePage from "./pages/StorePage";
import Cart from "./pages/Cart";
import Profile from "./pages/Profile";
import Login from "./pages/Auth/Login";
import Register from "./pages/Auth/Register";
import NotFound from "./pages/NotFound";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Terms from "./pages/Terms";
import Privacy from "./pages/Privacy";
import Help from "./pages/Help";
import FAQ from "./pages/FAQ";
import Admin from "./pages/Admin";

// Bootstrap CSS
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";

const queryClient = new QueryClient();

const AppLayout = ({ children }: { children: React.ReactNode }) => (
  <div className="d-flex flex-column min-vh-100">
    <Navbar />
    <div className="content-wrapper">
      {children}
    </div>
    <Footer />
  </div>
);

const App = () => (
  <QueryClientProvider client={queryClient}>
    <BrowserRouter>
      <AuthProvider>
        <CartProvider>
          <Toaster position="top-right" className="toast-container" />
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
            <Route 
              path="/admin" 
              element={
                <AuthGuard>
                  <AppLayout><Admin /></AppLayout>
                </AuthGuard>
              } 
            />
            {/* Footer pages */}
            <Route path="/about" element={<AppLayout><About /></AppLayout>} />
            <Route path="/contact" element={<AppLayout><Contact /></AppLayout>} />
            <Route path="/terms" element={<AppLayout><Terms /></AppLayout>} />
            <Route path="/privacy" element={<AppLayout><Privacy /></AppLayout>} />
            <Route path="/help" element={<AppLayout><Help /></AppLayout>} />
            <Route path="/faq" element={<AppLayout><FAQ /></AppLayout>} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </CartProvider>
      </AuthProvider>
    </BrowserRouter>
  </QueryClientProvider>
);

export default App;
