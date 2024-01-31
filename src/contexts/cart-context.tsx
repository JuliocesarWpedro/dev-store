'use client';

import React from 'react';

interface CartItem {
  productId: string;
  quantity: number;
}

interface CartContextType {
  items: CartItem[];
  addToCart: (productId: string) => void;
}

const CartContext = React.createContext({} as CartContextType);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [cartItems, setCartItems] = React.useState<CartItem[]>([]);

  function addToCart(productId: string) {
    setCartItems((value) => {
      const productInCart = value.some((item) => item.productId === productId);

      if (productInCart) {
        return value.map((item) => {
          if (item.productId === productId) {
            return { ...item, quantity: item.quantity + 1 };
          } else {
            return item;
          }
        });
      } else {
        return [...value, { productId, quantity: 1 }];
      }
    });
  }

  return (
    <CartContext.Provider value={{ items: cartItems, addToCart }}>
      {children}
    </CartContext.Provider>
  );
}

export const useCart = () => React.useContext(CartContext);
