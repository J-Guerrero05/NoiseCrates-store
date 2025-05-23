
import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { SamplePack } from "@/types/types";
import { useAuth } from "./AuthContext";
import { toast } from "sonner";

interface CartContextType {
  cart: SamplePack[];
  addToCart: (product: SamplePack) => void;
  removeFromCart: (productId: string) => void;
  clearCart: () => void;
  totalItems: number;
  totalPrice: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: ReactNode }) {
  const [cart, setCart] = useState<SamplePack[]>([]);
  const { user } = useAuth();
  
  // Load cart from localStorage when user changes
  useEffect(() => {
    if (user) {
      const savedCart = localStorage.getItem(`cart-${user.id}`);
      if (savedCart) {
        try {
          setCart(JSON.parse(savedCart));
        } catch (e) {
          console.error("Error parsing cart from localStorage:", e);
          setCart([]);
        }
      }
    } else {
      // Clear cart if user logs out
      setCart([]);
    }
  }, [user]);

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    if (user && cart.length > 0) {
      localStorage.setItem(`cart-${user.id}`, JSON.stringify(cart));
    }
  }, [cart, user]);

  const addToCart = (product: SamplePack) => {
    if (!user) {
      return;
    }
    
    // Check if product is already in cart
    const existingItem = cart.find(item => item.id === product.id);
    if (existingItem) {
      toast.info("This item is already in your cart");
      return;
    }

    setCart([...cart, product]);
    toast.success(`${product.title} added to cart!`);
  };

  const removeFromCart = (productId: string) => {
    setCart(cart.filter(item => item.id !== productId));
    toast.info("Item removed from cart");
  };

  const clearCart = () => {
    setCart([]);
    if (user) {
      localStorage.removeItem(`cart-${user.id}`);
    }
    toast.info("Cart cleared");
  };

  const totalItems = cart.length;

  const totalPrice = cart.reduce(
    (sum, item) => sum + item.price,
    0
  );

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        clearCart,
        totalItems,
        totalPrice,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export const useCart = () => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};
