import { useNavigate } from "react-router-dom";
import React, { useState, useEffect } from "react";
import {
  Search,
  SlidersHorizontal,
  Heart,
  ShoppingCart,
  Star,
} from "lucide-react";
import { useCart } from "../context/CartContext";
import { useFavorites } from "../context/FavoritesContext";

export type Book = {
  rating: any;
  _id: string;
  url: string;
  title: string;
  author: string;
  category: string;
  stock: number;
  price: number;
  desc: string;
  language: string;
  ratings: { id: string; rating: number }[] | [];
  reviews: { id: string; review: string }[] | [];
  createdAt?: string;
  updatedAt?: string;
};

export default function Books() {
  const navigate = useNavigate(); // hook for navigating to diff pages
  const { addToCart, increaseQuantity, getItemQuantity, decreaseQuantity } =
    useCart(); // access cart fun
  const { addToFavorites, removeFromFavorites, isFavorite } = useFavorites(); // access fav fun
  const [books, setBooks] = useState<Book[]>([]); // book list
  const [search, setSearch] = useState(""); // search query
  const [sortBy, setSortBy] = useState<"price" | "title" | "rating">("title"); // sort preference
  const [filterAuthor, setFilterAuthor] = useState(""); // selected author filter
  const [filterCategory, setFilterCategory] = useState("");
  const [filterLanguage, setFilterLanguage] = useState("");
  const [priceRange, setPriceRange] = useState({ min: 0, max: 0 }); // default price range
  const [showFilters, setShowFilters] = useState(false); // filters visibility
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const isAuthenticated = !!localStorage.getItem("token");
  const averageRating = (book: Book): number => {
  if (!book.ratings || book.ratings.length === 0) return 0;
  const total = book.ratings.reduce((acc, cur) => acc + cur.rating, 0);
  return total / book.ratings.length;
};

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        setLoading(true);
        const response = await fetch(
          "http://localhost:3000/api/v1/get-all-books"
        );
        if (!response.ok) throw new Error("Failed to fetch books");
        const result = await response.json();

        if (result.status === "Success" && Array.isArray(result.data)) {
          setBooks(result.data); // store books in state if valid data is received
        } else {
          throw new Error("Invalid data format");
        }
      } catch (err) {
        console.error(err);
        setError("Error fetching books. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchBooks();
  }, []);

  // Prevent .map() errors by ensuring books is an array
  if (!Array.isArray(books)) {
    setBooks([]);
  }

  // Get unique authors for filters
  const authors = [...new Set(books.map((book) => book.author))];
  const categories = [...new Set(books.map((book) => book.category))];
  const languages = [...new Set(books.map((book) => book.language))];

  const filteredBooks = books
    .filter(
      (book) =>
        book.title.toLowerCase().includes(search.toLowerCase()) ||
        book.author.toLowerCase().includes(search.toLowerCase())
    )
    .filter((book) => !filterAuthor || book.author === filterAuthor)
    .filter((book) => !filterCategory || book.category === filterCategory)
    .filter((book) => !filterLanguage || book.language === filterLanguage)
    .filter(
      (book) =>
        (priceRange.min === 0 && priceRange.max === 0) ||
        (book.price >= priceRange.min && book.price <= priceRange.max)
    )
    // .sort((a, b) => {
    //   switch (sortBy) {
    //     case "price":
    //       return a.price - b.price; // ascending by price
    //     case "rating":
    //       return (b.rating || 0) - (a.rating || 0); // descending by rating
    //     default:
    //       return a.title.localeCompare(b.title); // alphabetically by title
    //   }
    // });
    .sort((a, b) => {
  switch (sortBy) {
    case "price":
      return a.price - b.price; // ascending
    case "rating":
      return averageRating(b) - averageRating(a); // descending by average rating
    default:
      return a.title.localeCompare(b.title); // alphabetical
  }
})


  const handleFavoriteToggle = (book: Book, e: React.MouseEvent) => {
    e.stopPropagation(); // ensures clicking fav button only toggles fav status without triggering any parent click handlers
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

  if (loading) return <p className="text-center text-lg">Loading books...</p>;
  if (error) return <p className="text-center text-red-500">{error}</p>;

  // const averageRating = (book: Book): number => {
  //   if (!book.ratings || book.ratings.length === 0) return 0;
  //   const total = book.ratings.reduce((acc, cur) => acc + cur.rating, 0);
  //   return total / book.ratings.length;
  // };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row gap-4 mb-8">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Search books..."
            className="w-full pl-10 pr-4 py-2 border rounded-lg"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        <div className="flex gap-4">
          <select
            className="px-4 py-2 border rounded-lg"
            value={sortBy}
            onChange={(e) =>
              setSortBy(e.target.value as "price" | "title" | "rating")
            }
          >
            <option value="none">None</option>
            <option value="title">Sort by Title</option>
            <option value="price">Sort by Price</option>
            <option value="rating">Sort by Rating</option>
          </select>

          <button
            className="flex items-center gap-2 px-4 py-2 border rounded-lg hover:bg-gray-50"
            onClick={() => setShowFilters(!showFilters)}
          >
            <SlidersHorizontal size={20} />
            Filters
          </button>
        </div>
      </div>

      {showFilters && (
        <div className="bg-white p-6 rounded-lg shadow-md mb-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Filter by Author
              </label>
              <select
                className="w-full px-3 py-2 border rounded-lg"
                value={filterAuthor}
                onChange={(e) => setFilterAuthor(e.target.value)}
              >
                <option value="">All Authors</option>
                {authors.map((author) => (
                  <option key={author} value={author}>
                    {author}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Filter by Category
              </label>
              <select
                className="w-full px-3 py-2 border rounded-lg"
                value={filterCategory}
                onChange={(e) => setFilterCategory(e.target.value)}
              >
                <option value="">All Categories</option>
                {categories.map((category) => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Filter by Language
              </label>
              <select
                className="w-full px-3 py-2 border rounded-lg"
                value={filterLanguage}
                onChange={(e) => setFilterLanguage(e.target.value)}
              >
                <option value="">All Languages</option>
                {languages.map((language) => (
                  <option key={language} value={language}>
                    {language}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Price Range
              </label>
              <div className="flex gap-4">
                <input
                  type="number"
                  placeholder="Min"
                  className="w-full px-3 py-2 border rounded-lg"
                  value={priceRange.min}
                  onChange={(e) =>
                    setPriceRange({
                      ...priceRange,
                      min: Number(e.target.value),
                    })
                  }
                />
                <input
                  type="number"
                  placeholder="Max"
                  className="w-full px-3 py-2 border rounded-lg"
                  value={priceRange.max}
                  onChange={(e) =>
                    setPriceRange({
                      ...priceRange,
                      max: Number(e.target.value),
                    })
                  }
                />
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {filteredBooks.map((book) => (
          <div
            key={book._id}
            className="bg-white rounded-lg shadow-md overflow-hidden"
          >
            <div className="relative">
              <img
                src={book.url}
                alt={book.title}
                className="w-full h-48 object-contain rounded-lg"
              />
              <button
                onClick={(e) => handleFavoriteToggle(book, e)}
                className={`absolute top-2 right-2 p-2 rounded-full bg-white shadow-md transition-transform transform ${
                  isFavorite(book._id)
                    ? "scale-110 text-red-500"
                    : "scale-100 text-gray-400"
                } hover:scale-110 hover:text-red-500 hover:shadow-lg focus:outline-none`}
              >
                <Heart
                  className="w-5 h-5"
                  fill={isFavorite(book._id) ? "currentColor" : "none"}
                  style={{
                    transition: "fill 0.2s ease, transform 0.2s ease",
                  }}
                />
              </button>
            </div>

            <div className="p-4">
              <h3 className="text-lg font-semibold mb-2">{book.title}</h3>
              <p className="text-gray-600 mb-2">{book.author}</p>
              {/* Star rating */}
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
                  className="flex-1 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transform hover:scale-105"
                >
                  View Details
                </button>

                {book.stock === 0 ? (
                  <span className="bg-red-100 text-red-500 px-3 py-3 rounded text-sm font-medium ">
                    Out of Stock
                  </span>
                ) : getItemQuantity(book._id) === 0 ? (
                  <button
                    onClick={() => handleAddToCart(book)}
                    className="bg-green-600 text-white px-3 py-1 rounded hover:bg-green-700"
                    title="Add to Cart"
                  >
                    <ShoppingCart className="w-5 h-5 inline" />
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
