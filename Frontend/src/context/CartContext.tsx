// // import React, { createContext, useContext,useEffect, useState } from 'react';
// // //import { CartItem } from '../types';

// export type Book = {
//     rating: any;
//     _id: string; // MongoDB uses `_id`
//     url: string;
//     title: string;
//     author: string;
//     price: number;
//     desc: string;
//     language: string;
//     ratings: { id: string; rating: number }[] | []; // Ensure it's an array
//     reviews: { id: string; review: string }[] | []; // Ensure it's an array
//     createdAt?: string;
//     updatedAt?: string;
//   };

// //   export interface CartItem extends Book {
// //       quantity: number;
// //     }

// // interface CartContextType {
// //   items: CartItem[];
// //   addToCart: (book: Book) => void;
// //   removeFromCart: (bookId: string) => void;
// //   updateQuantity: (bookId: string, quantity: number) => void;
// //   clearCart: () => void;
// //   total: number;
// // }

// // const CartContext = createContext<CartContextType | undefined>(undefined);

// // export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
// //   const [items, setItems] = useState<CartItem[]>([]);

// //    // Load cart from localStorage on mount
// //    useEffect(() => {
// //     const storedCart = localStorage.getItem("cart");
// //     if (storedCart) {
// //         setItems(JSON.parse(storedCart));
// //     }
// // }, []);

// // // Save cart to localStorage whenever items change
// // useEffect(() => {
// //     localStorage.setItem("cart", JSON.stringify(items));
// // }, [items]);

// //   const addToCart = (book: Book) => {
// //     setItems(prev => {
// //       const existingItem = prev.find(item => item._id === book._id);
// //       if (existingItem) {
// //         return prev.map(item =>
// //           item._id === book._id
// //             ? { ...item, quantity: item.quantity + 1 }
// //             : item
// //         );
// //       }
// //       return [...prev, { ...book, quantity: 1 }];
// //     });
// //   };

// //   const removeFromCart = (bookId: string) => {
// //     setItems(prev => prev.filter(item => item._id !== bookId));
// //   };

// //   const updateQuantity = (bookId: string, quantity: number) => {
// //     setItems(prev =>
// //       prev.map(item =>
// //         item._id === bookId
// //           ? { ...item, quantity: Math.max(0, quantity) }
// //           : item
// //       ).filter(item => item.quantity > 0)
// //     );
// //   };

// //   const clearCart = () => {
// //     setItems([]);
// //   };

// //   const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0);

// //   return (
// //     <CartContext.Provider value={{ items, addToCart, removeFromCart, updateQuantity, clearCart, total }}>
// //       {children}
// //     </CartContext.Provider>
// //   );
// // };

// // export const useCart = () => {
// //   const context = useContext(CartContext);
// //   if (!context) {
// //     throw new Error('useCart must be used within a CartProvider');
// //   }
// //   return context;
// // };

// import React, { createContext, useContext, useEffect, useState } from 'react';

// export type Book = {
//     rating: any;
//     url:string;
//     _id: string;
//     title: string;
//     author: string;
//     price: number;
//     desc: string;
//     language: string;
//     ratings: { id: string; rating: number }[] | [];
//     reviews: { id: string; review: string }[] | [];
//     createdAt?: string;
//     updatedAt?: string;
// };

// export interface CartItem extends Book {
//     quantity: number;
// }

// interface CartContextType {
//     items: CartItem[];
//     addToCart: (book: Book) => void;
//     removeFromCart: (bookId: string) => void;
//     updateQuantity: (bookId: string, quantity: number) => void;
//     clearCart: () => void;
//     total: number;
// }

// interface CartProviderProps {
//     children: React.ReactNode;
//     userToken: string;
//     userId: string;
// }

// const CartContext = createContext<CartContextType | undefined>(undefined);

// const api/v1_BASE_URL = 'http://localhost:3000/api/v1/v1/';

// export const CartProvider: React.FC<CartProviderProps> = ({ children, userToken, userId }) => {
//     const [items, setItems] = useState<CartItem[]>([]);

//     useEffect(() => {
//         const fetchCart = async () => {
//             if (userToken && userId) {
//                 try {
//                     const response = await fetch(`${api/v1_BASE_URL}cart-books`, {
//                         method: 'GET',
//                         headers: {
//                             Authorization: `Bearer ${userToken}`,
//                             id: userId,
//                         },
//                     });
//                     const data = await response.json();
//                     setItems(data.data || []);
//                     localStorage.setItem('cart', JSON.stringify(data.data || []));
//                 } catch (err) {
//                     console.error('Error fetching cart:', err);
//                 }
//             }
//         };
//         fetchCart();
//     }, [userToken, userId]);

//     useEffect(() => {
//         if (userToken && userId) {
//             fetch(`${api/v1_BASE_URL}update-cart`, {
//                 method: 'PUT',
//                 headers: {
//                     'Content-Type': 'application/json',
//                     Authorization: `Bearer ${userToken}`,
//                     id: userId,
//                 },
//                 body: JSON.stringify({ cart: items }),
//             }).catch((err) => console.error('Error saving cart:', err));
//         }
//         localStorage.setItem('cart', JSON.stringify(items));
//     }, [items, userToken, userId]);

//     const addToCart = async (book: Book) => {
//         try {
//             const response = await fetch(`${api/v1_BASE_URL}add-book-to-cart`, {
//                 method: 'PUT',
//                 headers: {
//                     'Content-Type': 'application/json',
//                     Authorization: `Bearer ${userToken}`,
//                     id: userId,
//                 },
//                 body: JSON.stringify({ bookid: book._id }),
//             });
//             const data = await response.json();
//             setItems(data.cart);
//         } catch (error) {
//             console.error('Error adding to cart:', error);
//         }
//     };

//     const removeFromCart = async (bookId: string) => {
//         try {
//             await fetch(`${api/v1_BASE_URL}remove-book-from-cart`, {
//                 method: 'PUT',
//                 headers: {
//                     'Content-Type': 'application/json',
//                     Authorization: `Bearer ${userToken}`,
//                     id: userId,
//                 },
//                 body: JSON.stringify({ bookid: bookId }),
//             });
//             setItems((prev) => prev.filter((item) => item._id !== bookId));
//         } catch (error) {
//             console.error('Error removing from cart:', error);
//         }
//     };

//     const updateQuantity = async (bookId: string, quantity: number) => {
//         try {
//             await fetch(`${api/v1_BASE_URL}update-cart`, {
//                 method: 'PUT',
//                 headers: {
//                     'Content-Type': 'application/json',
//                     Authorization: `Bearer ${userToken}`,
//                     id: userId,
//                 },
//                 body: JSON.stringify({ bookid: bookId, quantity }),
//             });
//             setItems((prev) =>
//                 prev.map((item) =>
//                     item._id === bookId ? { ...item, quantity } : item
//                 )
//             );
//         } catch (error) {
//             console.error('Error updating quantity:', error);
//         }
//     };

//     const clearCart = async () => {
//         setItems([]);
//     };

//     const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0);

//     return (
//         <CartContext.Provider value={{ items, addToCart, removeFromCart, updateQuantity, clearCart, total }}>
//             {children}
//         </CartContext.Provider>
//     );
// };

// export const useCart = () => {
//     const context = useContext(CartContext);
//     if (!context) {
//         throw new Error('useCart must be used within a CartProvider');
//     }
//     return context;
// };
import React, { createContext, useContext, useEffect, useState } from 'react';
import axios from 'axios';
// import { Book, CartItem } from '../types';

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

// // interface CartContextType {
// //   items: CartItem[];
// //   addToCart: (book: Book) => void;
// //   removeFromCart: (bookId: string) => void;
// //   updateQuantity: (bookId: string, quantity: number) => void;
// //   clearCart: () => void;
// //   total: number;
// // }


interface CartContextType {
  items: CartItem[];
  addToCart: (book: Book) => void;
  removeFromCart: (bookId: string) => void;
  updateQuantity: (bookId: string, quantity: number) => void;
  clearCart: () => void;
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
        {}, // no body
        {
          headers: {
            Authorization: `Bearer ${token}`,
            bookid: book._id,
            id: userId,
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
        {}, // no body
        {
          headers: {
            Authorization: `Bearer ${token}`,
            bookid: bookId,
            id: userId,
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

  const clearCart = () => {
    setItems([]); // You can also implement a backend call if needed
  };

  const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <CartContext.Provider
      value={{ items, addToCart, removeFromCart, updateQuantity, clearCart, total }}
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
