import { useState, useEffect, useCallback } from "react";
import type { ReactNode } from "react";
import { CartContext } from "./CartContext";
import type { CartItem } from "./CartContext";

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [cartItems, setCartItems] = useState<CartItem[]>(() => {
    try {
      const savedCart = localStorage.getItem("outdoor_store_cart");
      return savedCart ? JSON.parse(savedCart) : [];
    } catch (error) {
      console.error("Failed to parse cart from localStorage", error);
      return [];
    }
  });

  const [isCartOpen, setIsCartOpen] = useState(false);

  useEffect(() => {
    try {
      localStorage.setItem("outdoor_store_cart", JSON.stringify(cartItems));
    } catch (error) {
      console.error("Failed to save cart to localStorage", error);
    }
  }, [cartItems]);

  const toggleCart = useCallback(() => {
    setIsCartOpen((prev) => !prev);
  }, []);

  const addToCart = (
    product: { id: number; title: string; price: number; image: string },
    color?: string,
    size?: string,
    quantity: number = 1
  ) => {
    setCartItems((prev) => {
      const existing = prev.find(
        (item) => item.id === product.id && item.color === color && item.size === size
      );
      if (existing) {
        return prev.map((item) =>
          item.id === product.id && item.color === color && item.size === size
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      return [...prev, { ...product, color, size, quantity }];
    });
  };

  const removeFromCart = (id: number) => {
    setCartItems((prev) => {
      const existing = prev.find((item) => item.id === id);
      if (existing && existing.quantity > 1) {
        return prev.map((item) =>
          item.id === id ? { ...item, quantity: item.quantity - 1 } : item
        );
      }
      return prev.filter((item) => item.id !== id);
    });
  };

  const removeCartItem = (id: number, color?: string, size?: string) => {
    setCartItems((prev) =>
      prev.filter(
        (item) => !(item.id === id && item.color === color && item.size === size)
      )
    );
  };

  const clearCart = () => setCartItems([]);

  const cartCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <CartContext.Provider
      value={{
        cartItems,
        cartCount,
        isCartOpen,
        toggleCart,
        addToCart,
        removeFromCart,
        removeCartItem,
        clearCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
