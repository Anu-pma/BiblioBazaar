import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface Book {
  id: string;
  title: string;
  author: string;
  price: number;
  description: string;
  imageUrl: string;
  language: string;
}

interface CartItem {
  book: Book;
  quantity: number;
}

interface BookStore {
  cart: CartItem[];
  favorites: Book[];
  addToCart: (book: Book) => void;
  removeFromCart: (bookId: string) => void;
  updateQuantity: (bookId: string, quantity: number) => void;
  toggleFavorite: (book: Book) => void;
  clearCart: () => void;
}

export const useBookStore = create<BookStore>()(
  persist(
    (set) => ({
      cart: [],
      favorites: [],
      addToCart: (book) =>
        set((state) => {
          const existingItem = state.cart.find((item) => item.book.id === book.id);
          if (existingItem) {
            return {
              cart: state.cart.map((item) =>
                item.book.id === book.id
                  ? { ...item, quantity: item.quantity + 1 }
                  : item
              ),
            };
          }
          return { cart: [...state.cart, { book, quantity: 1 }] };
        }),
      removeFromCart: (bookId) =>
        set((state) => ({
          cart: state.cart.filter((item) => item.book.id !== bookId),
        })),
      updateQuantity: (bookId, quantity) =>
        set((state) => ({
          cart: state.cart.map((item) =>
            item.book.id === bookId ? { ...item, quantity } : item
          ),
        })),
      toggleFavorite: (book) =>
        set((state) => {
          const isFavorite = state.favorites.some((b) => b.id === book.id);
          return {
            favorites: isFavorite
              ? state.favorites.filter((b) => b.id !== book.id)
              : [...state.favorites, book],
          };
        }),
      clearCart: () => set({ cart: [] }),
    }),
    {
      name: 'book-store',
    }
  )
);