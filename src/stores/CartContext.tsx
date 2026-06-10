import { createContext, useContext } from "react";

export interface CartItem {
  id: number;
  title: string;
  price: number;
  image: string;
  quantity: number;
  color?: string;
  size?: string;
}

export interface CartContextType {
  cartItems: CartItem[];
  cartCount: number;
  isCartOpen: boolean;
  toggleCart: () => void;
  addToCart: (
    product: { id: number; title: string; price: number; image: string },
    color?: string,
    size?: string,
    quantity?: number
  ) => void;
  removeCartItem: (id: number, color?: string, size?: string) => void;
  clearCart: () => void;
}

export const CartContext = createContext<CartContextType | undefined>(undefined);

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};
