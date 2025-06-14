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
        {id: userId,
        bookid: book._id,},
        {
          headers: {
            Authorization: `Bearer ${token}`,
            
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
        {id: userId,
            bookid: bookId,},
        {
          headers: {
            Authorization: `Bearer ${token}`,
            
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
