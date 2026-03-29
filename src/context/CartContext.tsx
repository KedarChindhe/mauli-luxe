import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { Product } from "@/data/products";

export interface CartItem {
  product: Product;
  quantity: number;
  size: number;
  customization?: string;
}

interface CartContextType {
  items: CartItem[];
  favorites: string[];
  addToCart: (product: Product, size: number, quantity?: number, customization?: string) => void;
  removeFromCart: (productId: string, size: number) => void;
  updateQuantity: (productId: string, size: number, quantity: number) => void;
  clearCart: () => void;
  toggleFavorite: (productId: string) => void;
  isFavorite: (productId: string) => boolean;
  cartTotal: number;
  cartCount: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [items, setItems] = useState<CartItem[]>(() => {
    const saved = localStorage.getItem("mauli-cart");
    return saved ? JSON.parse(saved) : [];
  });
  const [favorites, setFavorites] = useState<string[]>(() => {
    const saved = localStorage.getItem("mauli-favorites");
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => { localStorage.setItem("mauli-cart", JSON.stringify(items)); }, [items]);
  useEffect(() => { localStorage.setItem("mauli-favorites", JSON.stringify(favorites)); }, [favorites]);

  const addToCart = (product: Product, size: number, quantity = 1, customization?: string) => {
    setItems(prev => {
      const existing = prev.find(i => i.product.id === product.id && i.size === size);
      if (existing) {
        return prev.map(i => i.product.id === product.id && i.size === size ? { ...i, quantity: i.quantity + quantity } : i);
      }
      return [...prev, { product, quantity, size, customization }];
    });
  };

  const removeFromCart = (productId: string, size: number) => {
    setItems(prev => prev.filter(i => !(i.product.id === productId && i.size === size)));
  };

  const updateQuantity = (productId: string, size: number, quantity: number) => {
    if (quantity <= 0) return removeFromCart(productId, size);
    setItems(prev => prev.map(i => i.product.id === productId && i.size === size ? { ...i, quantity } : i));
  };

  const clearCart = () => setItems([]);

  const toggleFavorite = (productId: string) => {
    setFavorites(prev => prev.includes(productId) ? prev.filter(id => id !== productId) : [...prev, productId]);
  };

  const isFavorite = (productId: string) => favorites.includes(productId);

  const cartTotal = items.reduce((sum, i) => sum + i.product.price * i.quantity, 0);
  const cartCount = items.reduce((sum, i) => sum + i.quantity, 0);

  return (
    <CartContext.Provider value={{ items, favorites, addToCart, removeFromCart, updateQuantity, clearCart, toggleFavorite, isFavorite, cartTotal, cartCount }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within CartProvider");
  return ctx;
};
