import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Heart, ShoppingCart, Star } from "lucide-react";
import { useCart } from "../context/CartContext";
import { useFavorites } from "../context/FavoritesContext";

export type Book = {
  rating: number;
  _id: string;
  url: string;
  title: string;
  author: string;
  stock: number;
  price: number;
  desc: string;
  category: string;
  language: string;
  ratings: { id: string; rating: number }[];
  reviews: { id: string; review: string }[];
  createdAt?: string;
  updatedAt?: string;
};

export default function BookDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart, getItemQuantity, increaseQuantity, decreaseQuantity } =
    useCart();
  const { addToFavorites, isFavorite, removeFromFavorites } = useFavorites();
  const isAuthenticated = localStorage.getItem("token");
  const [book, setBook] = useState<Book | null>(null);
  const [loading, setLoading] = useState(true);
  const [showAllFeedback, setShowAllFeedback] = useState(false);

  useEffect(() => {
    if (!id) {
      console.error("Book ID is undefined");
      setLoading(false);
      return;
    }

    const fetchBookDetails = async () => {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_API_URL}/api/v1/get-book-by-id/${id}`
        );
        const data = await response.json();
        if (data.status === "Success" && data.data) {
          setBook(data.data);
        } else {
          setBook(null);
        }
      } catch (error) {
        console.error("Error fetching book details:", error);
        setBook(null);
      } finally {
        setLoading(false);
      }
    };

    fetchBookDetails();
  }, [id]);

  if (loading) return <div className="text-center py-8">Loading...</div>;
  if (!book)
    return <div className="text-center py-8 text-red-600">Book not found.</div>;

  const handleFavoriteToggle = (book: Book, e: React.MouseEvent) => {
    e.stopPropagation();
    if (!isAuthenticated) {
      navigate("/signin");
      return;
    }
    if (isFavorite(book._id)) {
      removeFromFavorites(book._id);
    } else {
      addToFavorites(book);
    }
  };

  const handleAddToCart = (book: Book) => {
    if (!isAuthenticated) {
      navigate("/signin");
      return;
    }
    addToCart(book);
  };

  const averageRating =
    book.ratings.length > 0
      ? book.ratings.reduce((acc, cur) => acc + cur.rating, 0) /
        book.ratings.length
      : 0;

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-5xl mx-auto bg-white rounded-lg shadow-md overflow-hidden">
        <div className="md:flex">
          <div className="md:flex-shrink-0">
            <img
              className="h-96 w-full object-cover md:w-96"
              src={book.url}
              alt={book.title}
            />
          </div>
          <div className="p-8 w-full">
            <div className="flex justify-between items-start">
              <div>
                <h1 className="text-3xl font-bold text-gray-900 mb-2">
                  {book.title}
                </h1>
                <p className="text-xl text-gray-600 mb-2">
                  by <strong>{book.author}</strong>
                </p>
                <p className="text-gray-600 mb-1">
                  Category: <strong>{book.category}</strong>
                </p>
                <p className="text-gray-600 mb-1">
                  Language: <strong>{book.language}</strong>
                </p>
              </div>
              <button
                onClick={(e) => handleFavoriteToggle(book, e)}
                className={`p-2 rounded-full ${
                  isFavorite(book._id) ? "text-red-500" : "text-gray-400"
                } hover:bg-gray-100`}
              >
                <Heart
                  className="w-6 h-6"
                  fill={isFavorite(book._id) ? "currentColor" : "none"}
                />
              </button>
            </div>

            <div className="flex items-center mb-4 mt-2">
              <div className="relative flex">
                {[...Array(5)].map((_, i) => {
                  const fillPercentage =
                    averageRating >= i + 1
                      ? 100
                      : averageRating > i
                      ? (averageRating - i) * 100
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
                ({averageRating.toFixed(1)})
              </span>
            </div>

            <p className="text-2xl font-bold text-gray-900 mb-4">
              ₹{book.price.toFixed(2)}
            </p>
            <p className="text-gray-700 mb-6">{book.desc}</p>

            <div className="flex gap-4 mb-4">
              {book.stock === 0 ? (
                <span className="bg-red-100 text-red-500 px-3 py-2 rounded text-sm font-medium">
                  Out of Stock
                </span>
              ) : getItemQuantity(book._id) === 0 ? (
                <button
                  onClick={() => handleAddToCart(book)}
                  className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
                >
                  <ShoppingCart className="w-5 h-5 inline mr-1" /> Add to Cart
                </button>
              ) : (
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => decreaseQuantity(book._id)}
                    className="bg-gray-200 text-black px-2 rounded hover:bg-gray-300"
                  >
                    −
                  </button>
                  <span className="text-sm font-medium">
                    {getItemQuantity(book._id)}
                  </span>
                  <button
                    onClick={() => increaseQuantity(book)}
                    className="bg-gray-200 text-black px-2 rounded hover:bg-gray-300"
                  >
                    +
                  </button>
                </div>
              )}

              <button
                onClick={() => navigate("/cart")}
                className="bg-gray-100 text-gray-800 px-4 py-2 rounded hover:bg-gray-200"
              >
                View Cart
              </button>
            </div>
          </div>
        </div>

        <div className="px-6 py-4 border-t">
          <h2 className="text-xl font-semibold mb-3">User Feedback</h2>
          {book.ratings.length === 0 && book.reviews.length === 0 ? (
            <p className="text-gray-500">No ratings or reviews yet.</p>
          ) : (
            (() => {
              const feedbackMap = new Map();

              book.ratings.forEach((r) => {
                feedbackMap.set(r.id, { id: r.id, rating: r.rating });
              });

              book.reviews.forEach((r) => {
                if (feedbackMap.has(r.id)) {
                  feedbackMap.get(r.id).review = r.review;
                } else {
                  feedbackMap.set(r.id, { id: r.id, review: r.review });
                }
              });

              const feedbackArray = Array.from(feedbackMap.values());
              const displayedFeedback = showAllFeedback
                ? feedbackArray
                : feedbackArray.slice(0, 1);

              return (
                <div className="space-y-4">
                  {displayedFeedback.map((fb, idx) => (
                    <div
                      key={idx}
                      className="bg-gray-100 rounded-md p-4 shadow-sm"
                    >
                      <p className="text-sm font-semibold text-gray-700 mb-2">
                        <span className="text-blue-700">User ID:</span> {fb.id}
                      </p>
                      {fb.rating !== undefined && (
                        <div className="flex items-center mb-1">
                          <span className="text-sm text-gray-700 mr-2 font-medium">
                            Rating:
                          </span>
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              className={`w-4 h-4 ${
                                i < fb.rating
                                  ? "text-yellow-400 fill-current"
                                  : "text-gray-300"
                              }`}
                            />
                          ))}
                          <span className="ml-2 text-sm text-gray-600">
                            {fb.rating}/5
                          </span>
                        </div>
                      )}
                      {fb.review && (
                        <p className="text-sm text-gray-800 mb-1">
                          <span className="font-medium">Review:</span>{" "}
                          {fb.review}
                        </p>
                      )}
                    </div>
                  ))}
                  {feedbackArray.length > 1 && (
                    <button
                      onClick={() => setShowAllFeedback(!showAllFeedback)}
                      className="text-blue-600 hover:underline text-sm mt-2"
                    >
                      {showAllFeedback ? "Show Less" : "View More"}
                    </button>
                  )}
                </div>
              );
            })()
          )}
        </div>
      </div>
    </div>
  );
}
