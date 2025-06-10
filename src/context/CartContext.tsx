
import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { SamplePack } from "@/types/types";
import { useAuth } from "./AuthContext";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

interface CartContextType {
  cartItems: SamplePack[];
  addToCart: (samplePack: SamplePack) => void;
  removeFromCart: (id: string) => void;
  clearCart: () => void;
  getTotalPrice: () => number;
  getItemCount: () => number;
  checkout: () => Promise<void>;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: ReactNode }) {
  const [cartItems, setCartItems] = useState<SamplePack[]>([]);
  const { user } = useAuth();

  // Load cart from localStorage on mount
  useEffect(() => {
    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
      try {
        setCartItems(JSON.parse(savedCart));
      } catch (error) {
        console.error('Error loading cart from localStorage:', error);
      }
    }
  }, []);

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cartItems));
  }, [cartItems]);

  const addToCart = (samplePack: SamplePack) => {
    setCartItems(prev => {
      const existingItem = prev.find(item => item.id === samplePack.id);
      if (existingItem) {
        toast.info("Item already in cart");
        return prev;
      }
      toast.success("Added to cart!");
      return [...prev, samplePack];
    });
  };

  const removeFromCart = (id: string) => {
    setCartItems(prev => prev.filter(item => item.id !== id));
    toast.success("Removed from cart");
  };

  const clearCart = () => {
    setCartItems([]);
    localStorage.removeItem('cart');
  };

  const getTotalPrice = () => {
    return cartItems.reduce((total, item) => total + item.price, 0);
  };

  const getItemCount = () => {
    return cartItems.length;
  };

  const checkout = async () => {
    if (!user) {
      toast.error("Please log in to complete your purchase");
      return;
    }

    if (cartItems.length === 0) {
      toast.error("Your cart is empty");
      return;
    }

    try {
      console.log("Starting checkout process for user:", user.id);
      console.log("Cart items:", cartItems);

      // Insert each cart item as a purchased pack
      const purchasePromises = cartItems.map(async (item) => {
        console.log("Purchasing item:", item.id);
        
        const { error } = await supabase
          .from("purchased_packs")
          .insert({
            user_id: user.id,
            sample_pack_id: item.id,
            purchased_at: new Date().toISOString()
          });

        if (error) {
          console.error("Error purchasing item:", item.id, error);
          throw error;
        }
        
        console.log("Successfully purchased item:", item.id);
      });

      await Promise.all(purchasePromises);
      
      // Clear the cart after successful purchase
      clearCart();
      
      toast.success(`Successfully purchased ${cartItems.length} item(s)!`);
      console.log("Checkout completed successfully");
    } catch (error) {
      console.error("Error during checkout:", error);
      toast.error("Failed to complete purchase. Please try again.");
    }
  };

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        removeFromCart,
        clearCart,
        getTotalPrice,
        getItemCount,
        checkout,
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
