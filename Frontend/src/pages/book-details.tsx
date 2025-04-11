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
    price: number;
    desc: string;
    language: string;
    ratings: { id: string; rating: number }[] | [];
    reviews: { id: string; review: string }[] | [];
    createdAt?: string;
    updatedAt?: string;
};

export default function BookDetails() {
  const { id } = useParams();//get book id from url
  const navigate = useNavigate();//hook to nav btw pages
  const { addToCart } = useCart();
  const { addToFavorites, isFavorite, removeFromFavorites } = useFavorites();
  
  const [book, setBook] = useState<Book | null>(null);//state to store book details
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) {
      console.error("Book ID is undefined");//err if id is missing
      setLoading(false);
      return;
    }

    const fetchBookDetails = async () => {
      try {
        //fetch book details from backend
        const response = await fetch(`http://localhost:3000/api/v1/get-book-by-id/${id}`);
        const data = await response.json();
        
        console.log("Fetched Book Data:", data); // Debugging log

        if (data.status === "Success" && data.data) {
          setBook(data.data);//store in state
        } else {
          setBook(null);
        }
      } catch (error) {
        console.error("Error fetching book details:", error);
        setBook(null);//set book to null if data not found
      } finally {
        setLoading(false);
      }
    };
    
    fetchBookDetails();
  }, [id]);//fetch detailsl of book whenevr the id changes

  if (loading) return <div>Loading...</div>;
  if (!book) return <div>Book not found.</div>;

  const handleFavoriteToggle = () => {
    if (isFavorite(book._id)) {
      removeFromFavorites(book._id);
    } else {
      addToFavorites(book);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-lg overflow-hidden">
        <div className="md:flex">
          <div className="md:flex-shrink-0">
            <img className="h-96 w-full object-cover md:w-96" src={book.url} alt={book.title} />
          </div>
          <div className="p-8">
            <div className="flex justify-between items-start">
              <div>
                <h1 className="text-3xl font-bold text-gray-900 mb-2">{book.title}</h1>
                <p className="text-xl text-gray-600 mb-4">by {book.author}</p>
              </div>
              <button
                onClick={handleFavoriteToggle}
                className={`p-2 rounded-full ${isFavorite(book._id) ? 'text-red-500' : 'text-gray-400'} hover:bg-gray-100`}
              >
                <Heart className="w-6 h-6" fill={isFavorite(book._id) ? 'currentColor' : 'none'} />
              </button>
            </div>

            <div className="flex items-center mb-4">
              <div className="flex items-center">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className={`w-5 h-5 ${i < Math.floor(book.rating) ? 'text-yellow-400 fill-current' : 'text-gray-300'}`} />
                ))}
              </div>
              <span className="ml-2 text-gray-600">({book.rating})</span>
            </div>

            <p className="text-3xl font-bold text-gray-900 mb-6">${book.price.toFixed(2)}</p>
            <p className="text-gray-700 mb-8">{book.desc}</p>

            <div className="flex gap-4">
              <button onClick={() => addToCart(book)} className="flex-1 bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 flex items-center justify-center gap-2">
                <ShoppingCart className="w-5 h-5" />
                Add to Cart
              </button>
              <button onClick={() => navigate('/cart')} className="bg-gray-100 text-gray-800 px-6 py-3 rounded-lg hover:bg-gray-200">
                View Cart
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
