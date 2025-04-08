// // // import React, { createContext, useContext, useState } from 'react';
// // // export type Book = {
// // //     rating: any;
// // //     _id: string; // MongoDB uses `_id`
// // //     url: string;
// // //     title: string;
// // //     author: string;
// // //     price: number;
// // //     desc: string;
// // //     language: string;
// // //     ratings: { id: string; rating: number }[] | []; // Ensure it's an array
// // //     reviews: { id: string; review: string }[] | []; // Ensure it's an array
// // //     createdAt?: string;
// // //     updatedAt?: string;
// // //   };

// // // interface FavoritesContextType {
// // //   favorites: Book[];
// // //   addToFavorites: (book: Book) => void;
// // //   removeFromFavorites: (bookId: string) => void;
// // //   isFavorite: (bookId: string) => boolean;
// // // }

// // // const FavoritesContext = createContext<FavoritesContextType | undefined>(undefined);

// // // export const FavoritesProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
// // //   const [favorites, setFavorites] = useState<Book[]>([]);

// // //   const addToFavorites = (book: Book) => {
// // //     setFavorites(prev => [...prev, book]);
// // //   };

// // //   const removeFromFavorites = (bookId: string) => {
// // //     setFavorites(prev => prev.filter(book => book._id !== bookId));
// // //   };

// // //   const isFavorite = (bookId: string) => {
// // //     return favorites.some(book => book._id === bookId);
// // //   };

// // //   return (
// // //     <FavoritesContext.Provider value={{ favorites, addToFavorites, removeFromFavorites, isFavorite }}>
// // //       {children}
// // //     </FavoritesContext.Provider>
// // //   );
// // // };

// // // export const useFavorites = () => {
// // //   const context = useContext(FavoritesContext);
// // //   if (!context) {
// // //     throw new Error('useFavorites must be used within a FavoritesProvider');
// // //   }
// // //   return context;
// // // };

// // import React, { createContext, useContext, useEffect, useState } from 'react';
// // import axios from 'axios';
// // // import { Book } from '../types';

// // export type Book = {
// //   rating: any;
// //   _id: string; // MongoDB uses `_id`
// //   url: string;
// //   title: string;
// //   author: string;
// //   price: number;
// //   desc: string;
// //   language: string;
// //   ratings: { id: string; rating: number }[] | []; // Ensure it's an array
// //   reviews: { id: string; review: string }[] | []; // Ensure it's an array
// //   createdAt?: string;
// //   updatedAt?: string;
// // };


// // interface FavoritesContextType {
// //   favorites: Book[];
// //   addToFavorites: (book: Book) => void;
// //   removeFromFavorites: (bookId: string) => void;
// //   isFavorite: (bookId: string) => boolean;
// //   fetchFavorites: () => void;
// // }

// // const FavoritesContext = createContext<FavoritesContextType | undefined>(undefined);

// // export const FavoritesProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
// //   const [favorites, setFavorites] = useState<Book[]>([]);

// //   const userId = localStorage.getItem('id');
// //   const token = localStorage.getItem('token');

// //   const fetchFavorites = async () => {
// //     try {
// //       const res = await axios.get('http://localhost:3000/api/v1/favourite-books', {
// //         headers: {
// //           id: userId,
// //           Authorization: `Bearer ${token}`,
// //         },
// //       });
// //       setFavorites(res.data.data || []);
// //     } catch (error) {
// //       console.error("Failed to fetch favorite books", error);
// //     }
// //   };

// //   const addToFavorites = async (book: Book) => {
// //     try {
// //       await axios.put(
// //         'http://localhost:3000/api/v1/add-book-to-favourite',
// //         {},
// //         {
// //           headers: {
// //             id: userId,
// //             bookid: book._id,
// //             Authorization: `Bearer ${token}`,
// //           },
// //         }
// //       );
// //       await fetchFavorites();
// //       setFavorites((prev) => [...prev, book]);
// //     } catch (error) {
// //       console.error("Failed to add book to favorites", error);
// //     }
// //   };

// //   const removeFromFavorites = async (bookId: string) => {
// //     try {
// //       await axios.put(
// //         'http://localhost:3000/api/v1/remove-book-from-favourite',
// //         {},
// //         {
// //           headers: {
// //             id: userId,
// //             bookid: bookId,
// //             Authorization: `Bearer ${token}`,
// //           },
// //         }
// //       );
// //       setFavorites((prev) => prev.filter((book) => book._id !== bookId));
// //     } catch (error) {
// //       console.error("Failed to remove book from favorites", error);
// //     }
// //   };

// //   const isFavorite = (bookId: string) => {
// //     return favorites.some((book) => book._id === bookId);
// //   };

// //   useEffect(() => {
// //     if (userId && token) {
// //       fetchFavorites();
// //     }
// //   }, [userId, token]);

// //   return (
// //     <FavoritesContext.Provider
// //       value={{ favorites, addToFavorites, removeFromFavorites, isFavorite, fetchFavorites }}
// //     >
// //       {children}
// //     </FavoritesContext.Provider>
// //   );
// // };

// // export const useFavorites = () => {
// //   const context = useContext(FavoritesContext);
// //   if (!context) {
// //     throw new Error('useFavorites must be used within a FavoritesProvider');
// //   }
// //   return context;
// // };


// // // import React, { createContext, useContext, useState } from 'react';
// // // import axios from 'axios';
// // // // import { Book } from '../types';

// // // export type Book = {
// // //   rating: any;
// // //   _id: string; // MongoDB uses `_id`
// // //   url: string;
// // //   title: string;
// // //   author: string;
// // //   price: number;
// // //   desc: string;
// // //   language: string;
// // //   ratings: { id: string; rating: number }[] | []; // Ensure it's an array
// // //   reviews: { id: string; review: string }[] | []; // Ensure it's an array
// // //   createdAt?: string;
// // //   updatedAt?: string;
// // // };

// // // interface FavoritesContextType {
// // //   favorites: Book[];
// // //   loading: boolean;
// // //   addToFavorites: (bookId: string) => void;
// // //   removeFromFavorites: (bookId: string) => void;
// // //   isFavorite: (bookId: string) => boolean;
// // //   fetchFavorites: () => void;
// // // }

// // // const FavoritesContext = createContext<FavoritesContextType | undefined>(undefined);

// // // export const FavoritesProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
// // //   const [favorites, setFavorites] = useState<Book[]>([]);
// // //   const [loading, setLoading] = useState<boolean>(false);

// // //   const token = localStorage.getItem('token');
// // //   const userId = localStorage.getItem('id');

// // //   const fetchFavorites = async () => {
// // //     if (!token || !userId) return;
// // //     setLoading(true);
// // //     try {
// // //       const res = await axios.get('http://localhost:3000/api/v1/user/favourite-books', {
// // //         headers: {
// // //           Authorization: `Bearer ${token}`,
// // //           id: userId,
// // //         },
// // //       });
// // //       setFavorites(res.data.data || []);
// // //     } catch (err) {
// // //       console.error('Failed to fetch favorites:', err);
// // //     } finally {
// // //       setLoading(false);
// // //     }
// // //   };

// // //   const addToFavorites = async (bookId: string) => {
// // //     if (!token || !userId) return;
// // //     try {
// // //       await axios.put(
// // //         'http://localhost:3000/api/v1/user/add-book-to-favourite',
// // //         {},
// // //         {
// // //           headers: {
// // //             Authorization: `Bearer ${token}`,
// // //             id: userId,
// // //             bookid: bookId,
// // //           },
// // //         }
// // //       );
// // //       fetchFavorites(); // Refresh list
// // //     } catch (err) {
// // //       console.error('Failed to add to favorites:', err);
// // //     }
// // //   };

// // //   const removeFromFavorites = async (bookId: string) => {
// // //     if (!token || !userId) return;
// // //     try {
// // //       await axios.put(
// // //         'http://localhost:3000/api/v1/user/remove-book-from-favourite',
// // //         {},
// // //         {
// // //           headers: {
// // //             Authorization: `Bearer ${token}`,
// // //             id: userId,
// // //             bookid: bookId,
// // //           },
// // //         }
// // //       );
// // //       fetchFavorites(); // Refresh list
// // //     } catch (err) {
// // //       console.error('Failed to remove from favorites:', err);
// // //     }
// // //   };

// // //   const isFavorite = (bookId: string) => {
// // //     return favorites.some(book => book._id === bookId);
// // //   };

// // //   return (
// // //     <FavoritesContext.Provider
// // //       value={{
// // //         favorites,
// // //         loading,
// // //         addToFavorites,
// // //         removeFromFavorites,
// // //         isFavorite,
// // //         fetchFavorites,
// // //       }}
// // //     >
// // //       {children}
// // //     </FavoritesContext.Provider>
// // //   );
// // // };

// // // export const useFavorites = () => {
// // //   const context = useContext(FavoritesContext);
// // //   if (!context) {
// // //     throw new Error('useFavorites must be used within a FavoritesProvider');
// // //   }
// // //   return context;
// // // };

// import React, { createContext, useContext, useEffect, useState } from 'react';
// import axios from 'axios';

// export type Book = {
//   rating: any;
//   _id: string;
//   url: string;
//   title: string;
//   author: string;
//   price: number;
//   desc: string;
//   language: string;
//   ratings: { id: string; rating: number }[] | [];
//   reviews: { id: string; review: string }[] | [];
//   createdAt?: string;
//   updatedAt?: string;
// };

// interface FavoritesContextType {
//   favorites: Book[];
//   addToFavorites: (book: Book) => void;
//   removeFromFavorites: (bookId: string) => void;
//   isFavorite: (bookId: string) => boolean;
// }

// const FavoritesContext = createContext<FavoritesContextType | undefined>(undefined);

// export const FavoritesProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
//   const [favorites, setFavorites] = useState<Book[]>([]);

//   const API_URL = 'http://localhost:3000/api/v1';
//   const token = localStorage.getItem('token');
//   const userId = localStorage.getItem('userId');

//   const addToFavorites = async (book: Book) => {
//     try {
//       await axios.put(
//         `${API_URL}/add-book-to-favourite`,
//         {},
//         {
//           headers: {
//             Authorization: `Bearer ${token}`,
//             id: userId,
//             bookid: book._id,
//           },
//         }
//       );
//       setFavorites((prev) => [...prev, book]);
//     } catch (error) {
//       console.error('Failed to add to favorites:', error);
//     }
//   };

//   const removeFromFavorites = async (bookId: string) => {
//     try {
//       await axios.put(
//         `${API_URL}/remove-book-from-favourite`,
//         {},
//         {
//           headers: {
//             Authorization: `Bearer ${token}`,
//             id: userId,
//             bookid: bookId,
//           },
//         }
//       );
//       setFavorites((prev) => prev.filter((book) => book._id !== bookId));
//     } catch (error) {
//       console.error('Failed to remove from favorites:', error);
//     }
//   };

//   const isFavorite = (bookId: string) => {
//     return favorites.some((book) => book._id === bookId);
//   };

//   const fetchFavorites = async () => {
//     try {
//       const res = await axios.get(`${API_URL}/favourite-books`, {
//         headers: {
//           Authorization: `Bearer ${token}`,
//           id: userId,
//         },
//       });
//       setFavorites(res.data.data || []);
//     } catch (error) {
//       console.error('Error fetching favorite books:', error);
//     }
//   };

//   useEffect(() => {
//     if (token && userId) {
//       fetchFavorites();
//     }
//   }, [token, userId]);

//   return (
//     <FavoritesContext.Provider value={{ favorites, addToFavorites, removeFromFavorites, isFavorite }}>
//       {children}
//     </FavoritesContext.Provider>
//   );
// };

// export const useFavorites = () => {
//   const context = useContext(FavoritesContext);
//   if (!context) {
//     throw new Error('useFavorites must be used within a FavoritesProvider');
//   }
//   return context;
// };

import React, { createContext, useContext, useEffect, useState } from 'react';
import axios from 'axios';

export type Book = {
  rating: any;
  _id: string;
  url: string;
  title: string;
  author: string;
  price: number;
  desc: string;
  language: string;
  ratings: { id: string; rating: number }[];
  reviews: { id: string; review: string }[];
  createdAt?: string;
  updatedAt?: string;
};

interface FavoritesContextType {
  favorites: Book[];
  addToFavorites: (book: Book) => void;
  removeFromFavorites: (bookId: string) => void;
  isFavorite: (bookId: string) => boolean;
  fetchFavorites: () => void;
}

const FavoritesContext = createContext<FavoritesContextType | undefined>(undefined);

export const FavoritesProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [favorites, setFavorites] = useState<Book[]>([]);
  const API_URL = 'http://localhost:3000/api/v1';

  const token = localStorage.getItem('token');
  const userId = localStorage.getItem('userId'); // Make sure you're storing as 'userId'

  const fetchFavorites = async () => {
    if (!token || !userId) return;
    try {
      const res = await axios.get(`${API_URL}/favourite-books`, {
        headers: {
          Authorization: `Bearer ${token}`,
          id: userId,
        },
      });
      setFavorites(res.data.data || []);
    } catch (error) {
      console.error('Failed to fetch favorite books:', error);
    }
  };

  const addToFavorites = async (book: Book) => {
    if (!token || !userId) return;
    try {
      await axios.put(
        `${API_URL}/add-book-to-favourite`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
            id: userId,
            bookid: book._id,
          },
        }
      );
      fetchFavorites();
    } catch (error) {
      console.error('Failed to add to favorites:', error);
    }
  };

  const removeFromFavorites = async (bookId: string) => {
    if (!token || !userId) return;
    try {
      await axios.put(
        `${API_URL}/remove-book-from-favourite`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
            id: userId,
            bookid: bookId,
          },
        }
      );
      fetchFavorites();
    } catch (error) {
      console.error('Failed to remove from favorites:', error);
    }
  };

  const isFavorite = (bookId: string) => {
    return favorites.some((book) => book._id === bookId);
  };

  useEffect(() => {
    fetchFavorites();
  }, [token, userId]);

  return (
    <FavoritesContext.Provider
      value={{ favorites, addToFavorites, removeFromFavorites, isFavorite, fetchFavorites }}
    >
      {children}
    </FavoritesContext.Provider>
  );
};

export const useFavorites = () => {
  const context = useContext(FavoritesContext);
  if (!context) {
    throw new Error('useFavorites must be used within a FavoritesProvider');
  }
  return context;
};
