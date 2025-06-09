import React, { createContext, useContext, useEffect, useState } from 'react';
import axios from 'axios';

export type Book = {
    rating: any;
    _id: string; // MongoDB uses `_id`
    url: string;
    title: string;
    
    
    author: string;
    price: number;
    desc: string;
    language: string;
    ratings: { id: string; rating: number }[] | []; // Ensure it's an array
    reviews: { id: string; review: string }[] | []; // Ensure it's an array
    createdAt?: string;
    updatedAt?: string;
  };

    export interface CartItem extends Book {
      quantity: number;
    }




interface CartContextType {
  items: CartItem[];
  addToCart: (book: Book) => void;
  removeFromCart: (bookId: string) => void;
  updateQuantity: (bookId: string, quantity: number) => void;
  clearCart: () => void;
  getItemQuantity: (bookId: string) => number;
  increaseQuantity: (book: Book) => void;
  decreaseQuantity: (bookId: string) => void;

  total: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [items, setItems] = useState<CartItem[]>([]);

  const token = localStorage.getItem('token');
  const userId = localStorage.getItem('userId');

  // Fetch cart from DB on mount
  useEffect(() => {
    const fetchCart = async () => {
      try {
        const res = await axios.get('http://localhost:3000/api/v1/cart-books', {
          headers: { Authorization: `Bearer ${token}`, id: userId }
        });
        const cartData = res.data.data.map((book: Book) => ({ ...book, quantity: 1 }));
        setItems(cartData);
      } catch (err) {
        console.error('Failed to fetch cart:', err);
      }
    };
    fetchCart();
  }, []);

  const addToCart = async (book: Book) => {
    try {
      await axios.put(
      'http://localhost:3000/api/v1/add-book-to-cart',
      {
        bookid: book._id,
        //id: userId, // Send this in body
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
      setItems(prev => {
        const exists = prev.find(item => item._id === book._id);
        if (exists) return prev;
        return [...prev, { ...book, quantity: 1 }];
      });
    } catch (err) {
      console.error('Failed to add to cart:', err);
    }
  };

  const removeFromCart = async (bookId: string) => {
    try {
      await axios.put(
        'http://localhost:3000/api/v1/remove-book-from-cart',
        {bookid: bookId,
            id: userId,}, // no body
        {
          headers: {
            Authorization: `Bearer ${token}`,
            
          },
        }
      );
      setItems(prev => prev.filter(item => item._id !== bookId));
    } catch (err) {
      console.error('Failed to remove from cart:', err);
    }
  };

  

  const updateQuantity = (bookId: string, quantity: number) => {
    setItems(prev =>
      prev
        .map(item =>
          item._id === bookId
            ? { ...item, quantity: Math.max(1, quantity) }
            : item
        )
    );
  };

  const getItemQuantity = (bookId: string) => {
    const item = items.find(i => i._id === bookId);
    return item ? item.quantity : 0;
  };

  const increaseQuantity = (book: Book) => {
    const item = items.find(i => i._id === book._id);
    if (item) {
      updateQuantity(book._id, item.quantity + 1);
    } else {
      addToCart(book); // adds with quantity 1
    }
  };

  const decreaseQuantity = (bookId: string) => {
    const item = items.find(i => i._id === bookId);
    if (item) {
      if (item.quantity === 1) {
        removeFromCart(bookId);
      } else {
        updateQuantity(bookId, item.quantity - 1);
      }
    }
  };

  const clearCart = () => {
    setItems([]); // You can also implement a backend call if needed
  };

  const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <CartContext.Provider
      value={{
        items,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        total,
        getItemQuantity,
        increaseQuantity,
        decreaseQuantity
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
