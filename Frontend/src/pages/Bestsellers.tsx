import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Heart, ShoppingCart, Award, Star } from "lucide-react";
import { useCart } from "../context/CartContext";
import { useFavorites } from "../context/FavoritesContext";
import toast from "react-hot-toast";

export type Book = {
  rating: any;
  _id: string;
  url: string;
  title: string;
  author: string;
  price: number;
  desc: string;
  language: string;
  ratings: { id: string; rating: number }[] | [];
  reviews: { id: string; review: string }[] | [];
  createdAt?: string;
  updatedAt?: string;
};

export default function Bestsellers() {
  const [books, setBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const { addToCart, increaseQuantity, decreaseQuantity, getItemQuantity } =
    useCart();
  const { addToFavorites, removeFromFavorites, isFavorite } = useFavorites();

  useEffect(() => {
    fetchBestsellers();
  }, []);

  const fetchBestsellers = async () => {
    try {
      // Fetching books and sort by rating
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/v1/get-all-books`
      );
      const data = await response.json();

      if (data.status === "Success") {
        const sortedBooks = data.data
          .map((book: any) => ({
            _id: book._id,
            title: book.title,
            author: book.author,
            price: book.price,
            desc: book.desc || "",
            url: book.url,
            language: book.language,
            rating:
              book.ratings?.length > 0
                ? book.ratings.reduce(
                    (acc: number, curr: any) => acc + curr.rating,
                    0
                  ) / book.ratings.length
                : 0,
            ratings: book.ratings || [],
            reviews: book.reviews || [],
            createdAt: book.createdAt,
            updatedAt: book.updatedAt,
          }))
          .sort((a: Book, b: Book) => b.rating - a.rating)
          .slice(0, 8); // Get top 8 rated books

        setBooks(sortedBooks);
      }
    } catch (error) {
      console.error("Error fetching bestsellers:", error);
      toast.error("Failed to load bestsellers");
    } finally {
      setLoading(false);
    }
  };

  const handleFavoriteToggle = (book: Book, e: React.MouseEvent) => {
    e.stopPropagation();
    if (isFavorite(book._id)) {
      removeFromFavorites(book._id);
      toast.success("Removed from favorites");
    } else {
      addToFavorites(book);
      toast.success("Added to favorites");
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }
  const averageRating = (book: Book): number => {
    if (!book.ratings || book.ratings.length === 0) return 0;
    const total = book.ratings.reduce((acc, cur) => acc + cur.rating, 0);
    return total / book.ratings.length;
  };
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex items-center gap-3 mb-8">
        <Award className="w-8 h-8 text-yellow-500" />
        <h1 className="text-3xl font-bold">Bestsellers</h1>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {books.map((book, index) => (
          <div
            key={book._id}
            className="bg-white rounded-lg shadow-md overflow-hidden"
          >
            <div className="relative">
              <img
                src={book.url}
                alt={book.title}
                className="w-full h-48 object-cover cursor-pointer"
                onClick={() => navigate(`/books/${book._id}`)}
              />
              <button
                onClick={(e) => handleFavoriteToggle(book, e)}
                className={`absolute top-2 right-2 p-2 rounded-full bg-white shadow-md ${
                  isFavorite(book._id) ? "text-red-500" : "text-gray-400"
                } hover:text-red-500 transition-colors`}
              >
                <Heart
                  className="w-5 h-5"
                  fill={isFavorite(book._id) ? "currentColor" : "none"}
                />
              </button>

              {index < 3 && (
                <div
                  className={`absolute top-2 left-2 ${
                    index === 0
                      ? "bg-yellow-500"
                      : index === 1
                      ? "bg-gray-400"
                      : "bg-orange-600"
                  } text-white px-2 py-1 rounded-full text-sm flex items-center gap-1`}
                >
                  <Award className="w-4 h-4" />#{index + 1}
                </div>
              )}
            </div>

            <div className="p-4">
              <h3
                className="text-lg font-semibold mb-2 cursor-pointer hover:text-blue-600"
                onClick={() => navigate(`/books/${book._id}`)}
              >
                {book.title}
              </h3>
              <p className="text-gray-600 mb-2">{book.author}</p>

              <div className="flex items-center mb-4">
                <div className="relative flex">
                  {[...Array(5)].map((_, i) => {
                    const fillPercentage =
                      averageRating(book) >= i + 1
                        ? 100
                        : averageRating(book) > i
                        ? (averageRating(book) - i) * 100
                        : 0;

                    return (
                      <div key={i} className="relative w-5 h-5">
                        <Star className="w-5 h-5 text-gray-300" />
                        <div
                          className="absolute top-0 left-0 h-full overflow-hidden"
                          style={{ width: `${fillPercentage}%` }}
                        >
                          <Star className="w-5 h-5 text-yellow-400 fill-current" />
                        </div>
                      </div>
                    );
                  })}
                </div>
                <span className="ml-2 text-gray-600">
                  ({averageRating(book).toFixed(1)})
                </span>
              </div>

              <p className="text-xl font-bold mb-4">₹{book.price.toFixed(2)}</p>

              <div className="flex gap-2">
                <button
                  onClick={() => navigate(`/books/${book._id}`)}
                  className="flex-1 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
                >
                  View Details
                </button>
                {getItemQuantity(book._id) === 0 ? (
                  <button
                    onClick={() => addToCart(book)}
                    className="bg-green-600 text-white px-3 py-1 rounded hover:bg-green-700"
                    title="Add to Cart"
                  >
                    <ShoppingCart className="w-4 h-4 inline" />
                  </button>
                ) : (
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => decreaseQuantity(book._id)}
                      className="bg-gray-200 text-black px-2 rounded hover:bg-gray-300"
                      title="Decrease"
                    >
                      −
                    </button>
                    <span className="text-sm font-medium">
                      {getItemQuantity(book._id)}
                    </span>
                    <button
                      onClick={() => increaseQuantity(book)}
                      className="bg-gray-200 text-black px-2 rounded hover:bg-gray-300"
                      title="Increase"
                    >
                      +
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
