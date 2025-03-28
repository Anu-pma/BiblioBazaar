import React, { createContext, useContext, useState } from 'react';
import { useAuth } from './AuthContext';
import toast from 'react-hot-toast';

interface Review {
  id: string;
  bookId: string;
  userId: string;
  userEmail: string;
  rating: number;
  comment: string;
  createdAt: string;
}

interface ReviewsContextType {
  addReview: (bookId: string, rating: number, comment: string) => void;
  getBookReviews: (bookId: string) => Review[];
  getUserRating: (bookId: string) => number | null;
  getAverageRating: (bookId: string) => number;
}

const ReviewsContext = createContext<ReviewsContextType | undefined>(undefined);

export const ReviewsProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user } = useAuth();
  const [reviews, setReviews] = useState<Review[]>(() => {
    const savedReviews = localStorage.getItem('reviews');
    return savedReviews ? JSON.parse(savedReviews) : [];
  });

  const addReview = (bookId: string, rating: number, comment: string) => {
    if (!user) {
      toast.error('Please sign in to leave a review');
      return;
    }

    const existingReview = reviews.find(
      (r) => r.bookId === bookId && r.userId === user.email
    );

    if (existingReview) {
      const updatedReviews = reviews.map((r) =>
        r.id === existingReview.id
          ? {
              ...r,
              rating,
              comment,
              createdAt: new Date().toISOString(),
            }
          : r
      );
      setReviews(updatedReviews);
      localStorage.setItem('reviews', JSON.stringify(updatedReviews));
      toast.success('Review updated successfully');
    } else {
      const newReview: Review = {
        id: Math.random().toString(36).substr(2, 9),
        bookId,
        userId: user.email,
        userEmail: user.email,
        rating,
        comment,
        createdAt: new Date().toISOString(),
      };
      const updatedReviews = [...reviews, newReview];
      setReviews(updatedReviews);
      localStorage.setItem('reviews', JSON.stringify(updatedReviews));
      toast.success('Review added successfully');
    }
  };

  const getBookReviews = (bookId: string) => {
    return reviews.filter((review) => review.bookId === bookId);
  };

  const getUserRating = (bookId: string) => {
    if (!user) return null;
    const userReview = reviews.find(
      (r) => r.bookId === bookId && r.userId === user.email
    );
    return userReview ? userReview.rating : null;
  };

  const getAverageRating = (bookId: string) => {
    const bookReviews = reviews.filter((review) => review.bookId === bookId);
    if (bookReviews.length === 0) return 0;
    const sum = bookReviews.reduce((acc, review) => acc + review.rating, 0);
    return sum / bookReviews.length;
  };

  return (
    <ReviewsContext.Provider
      value={{ addReview, getBookReviews, getUserRating, getAverageRating }}
    >
      {children}
    </ReviewsContext.Provider>
  );
};

export const useReviews = () => {
  const context = useContext(ReviewsContext);
  if (!context) {
    throw new Error('useReviews must be used within a ReviewsProvider');
  }
  return context;
};