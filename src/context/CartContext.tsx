
import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { SamplePack } from "@/types/types";
import { toast } from "sonner";

interface CartItem extends SamplePack {
  quantity: number;
}

interface CartContextType {
  items: CartItem[];
  addToCart: (pack: SamplePack) => void;
  removeFromCart: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  clearCart: () => void;
  totalItems: number;
  totalPrice: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  
  useEffect(() => {
    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
      try {
        setItems(JSON.parse(savedCart));
      } catch (error) {
        console.error('Failed to parse cart from localStorage:', error);
        localStorage.removeItem('cart');
      }
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(items));
  }, [items]);

  const addToCart = (pack: SamplePack) => {
    setItems(prevItems => {
      const existingItem = prevItems.find(item => item.id === pack.id);
      if (existingItem) {
        toast.info(`${pack.title} quantity increased`);
        return prevItems.map(item =>
          item.id === pack.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      } else {
        toast.success(`${pack.title} added to cart`);
        return [...prevItems, { ...pack, quantity: 1 }];
      }
    });
  };

  const removeFromCart = (id: string) => {
    setItems(prevItems => {
      const itemName = prevItems.find(item => item.id === id)?.title || 'Item';
      toast.info(`${itemName} removed from cart`);
      return prevItems.filter(item => item.id !== id);
    });
  };

  const updateQuantity = (id: string, quantity: number) => {
    if (quantity < 1) return;
    
    setItems(prevItems => 
      prevItems.map(item => 
        item.id === id ? { ...item, quantity } : item
      )
    );
  };

  const clearCart = () => {
    setItems([]);
    toast.info('Cart cleared');
  };

  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = items.reduce((sum, item) => sum + (item.price * item.quantity), 0);

  return (
    <CartContext.Provider
      value={{
        items,
        addToCart,
        removeFromCart,
        updateQuantity,
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
