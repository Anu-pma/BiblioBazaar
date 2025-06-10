// import React, { useState, useEffect } from "react";
// import { useParams, useNavigate } from "react-router-dom";
// import { Heart, ShoppingCart, Star } from "lucide-react";
// import { useCart } from "../context/CartContext";
// import { useFavorites } from "../context/FavoritesContext";

// export type Book = {
//     rating: number;
//     _id: string;
//     url: string;
//     title: string;
//     author: string;
//     price: number;
//     desc: string;
//     category: string;
//     language: string;
//     ratings: { id: string; rating: number }[] | [];
//     reviews: { id: string; review: string }[] | [];
//     createdAt?: string;
//     updatedAt?: string;
// };

// export default function BookDetails() {
//   const { id } = useParams();//get book id from url
//   const navigate = useNavigate();//hook to nav btw pages
//   const { addToCart,getItemQuantity, increaseQuantity, decreaseQuantity } = useCart();
//   const { addToFavorites, isFavorite, removeFromFavorites } = useFavorites();
//   const isAuthenticated = localStorage.getItem('token');
//   const [book, setBook] = useState<Book | null>(null);//state to store book details
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     if (!id) {
//       console.error("Book ID is undefined");//err if id is missing
//       setLoading(false);
//       return;
//     }

//     const fetchBookDetails = async () => {
//       try {
//         //fetch book details from backend
//         const response = await fetch(`http://localhost:3000/api/v1/get-book-by-id/${id}`);
//         const data = await response.json();
        
//         console.log("Fetched Book Data:", data); // Debugging log

//         if (data.status === "Success" && data.data) {
//           setBook(data.data);//store in state
//         } else {
//           setBook(null);
//         }
//       } catch (error) {
//         console.error("Error fetching book details:", error);
//         setBook(null);//set book to null if data not found
//       } finally {
//         setLoading(false);
//       }
//     };
    
//     fetchBookDetails();
//   }, [id]);//fetch detailsl of book whenevr the id changes

//   if (loading) return <div>Loading...</div>;
//   if (!book) return <div>Book not found.</div>;

//   const handleFavoriteToggle = (book: Book, e: React.MouseEvent) => {
//       e.stopPropagation(); // ensures clicking fav button only toggles fav status without triggering any parent click handlers
//       if (!isAuthenticated) {
//         // Redirect to sign-in page if user is not authenticated
//         navigate('/signin');
//         return;
//       }
//       if (isFavorite(book._id)) {
//         removeFromFavorites(book._id);
//       } else {
//         addToFavorites(book);
//       }
//     };

//     const handleAddToCart = (book: Book) => {
//         if (!isAuthenticated) {
//           // Redirect to sign-in page if user is not authenticated
//           navigate('/signin');
//           return;
//         }
//         addToCart(book);
//       };
//     const averageRating = book.ratings.length > 0
//   ? book.ratings.reduce((acc, cur) => acc + cur.rating, 0) / book.ratings.length
//   : 0;


//   return (
//     <div className="container mx-auto px-4 py-8">
//       <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-lg overflow-hidden">
//         <div className="md:flex">
//           <div className="md:flex-shrink-0">
//             <img className="h-96 w-full object-cover md:w-96" src={book.url} alt={book.title} />
//           </div>
//           <div className="p-8">
//             <div className="flex justify-between items-start">
//               <div>
//                 <h1 className="text-3xl font-bold text-gray-900 mb-2">{book.title}</h1>
//                 <p className="text-xl text-gray-600 mb-4">by <strong>{book.author}</strong></p>
//                 <p className="text-xl text-gray-600 mb-4">Category: <strong>{book.category}</strong> </p>
//                 <p className="text-xl text-gray-600 mb-4">Language: <strong>{book.language}</strong> </p>
//               </div>
//               <button
//                 onClick={(e) => {
//                   // If authenticated, toggle favorite logic
//                   handleFavoriteToggle(book, e); 
//                 }}
//                 className={`p-2 rounded-full ${isFavorite(book._id) ? 'text-red-500' : 'text-gray-400'} hover:bg-gray-100`}
//               >
//                 <Heart className="w-6 h-6" fill={isFavorite(book._id) ? 'currentColor' : 'none'} />
//               </button>
//             </div>

//             {/* <div className="flex items-center mb-4">
//               <div className="flex items-center">
//                 {[...Array(5)].map((_, i) => (
//                   <Star key={i} className={`w-5 h-5 ${i < Math.floor(book.rating) ? 'text-yellow-400 fill-current' : 'text-gray-300'}`} />
//                 ))}
//               </div>
//               <span className="ml-2 text-gray-600">({book.rating})</span>
//             </div> */}
//             <div className="flex items-center mb-4">
//               <div className="flex items-center">
//                 {[...Array(5)].map((_, i) => (
//                   <Star
//                     key={i}
//                     className={`w-5 h-5 ${i < Math.floor(averageRating) ? 'text-yellow-400 fill-current' : 'text-gray-300'}`}
//                   />
//                 ))}
//               </div>
//               <span className="ml-2 text-gray-600">({averageRating.toFixed(1)})</span>
//             </div>


//             <p className="text-3xl font-bold text-gray-900 mb-6">${book.price.toFixed(2)}</p>
//             <p className="text-gray-700 mb-8">{book.desc}</p>

//             <div className="flex gap-4">
//               {/* <button
//               onClick={(e) => {
//                 // Check if user is authenticated
//                 if (!isAuthenticated) {
//                   // If not authenticated, redirect to sign-in page
//                   navigate('/signin');
//                   return;
//                 }

//                 // If authenticated, add item to cart
//                 addToCart(book);
//               }}
//               className="flex-1 bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 flex items-center justify-center gap-2 transform hover:scale-105"
//             >
//               <ShoppingCart className="w-5 h-5" />
//               Add to Cart
//             </button> */}
//             {getItemQuantity(book._id) === 0 ? (
//   <button
//     onClick={() => handleAddToCart(book)}
//     className="flex-1 bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 flex items-center justify-center gap-2 transform hover:scale-105"
//   >
//     <ShoppingCart className="w-5 h-5" />
//     Add to Cart
//   </button>
// ) : (
//   <div className="flex items-center gap-2 bg-gray-100 px-4 py-2 rounded-lg">
//     <button
//       onClick={() => decreaseQuantity(book._id)}
//       className="bg-gray-200 px-2 py-1 rounded hover:bg-gray-300"
//     >
//       −
//     </button>
//     <span className="text-sm font-medium px-2">{getItemQuantity(book._id)}</span>
//     <button
//       onClick={() => increaseQuantity(book)}
//       className="bg-gray-200 px-2 py-1 rounded hover:bg-gray-300"
//     >
//       +
//     </button>
//   </div>
// )}

//               <button onClick={() => navigate('/cart')} className="bg-gray-100 text-gray-800 px-6 py-3 rounded-lg hover:bg-gray-200 transform hover:scale-105">
//                 View Cart
//               </button>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }


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
  category: string;
  language: string;
  ratings: { id: string; rating: number }[] | [];
  reviews: { id: string; review: string }[] | [];
  createdAt?: string;
  updatedAt?: string;
};

export default function BookDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart, getItemQuantity, increaseQuantity, decreaseQuantity } = useCart();
  const { addToFavorites, isFavorite, removeFromFavorites } = useFavorites();
  const isAuthenticated = localStorage.getItem('token');
  const [book, setBook] = useState<Book | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) {
      console.error("Book ID is undefined");
      setLoading(false);
      return;
    }

    const fetchBookDetails = async () => {
      try {
        const response = await fetch(`http://localhost:3000/api/v1/get-book-by-id/${id}`);
        const data = await response.json();

        console.log("Fetched Book Data:", data);

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

  if (loading) return <div>Loading...</div>;
  if (!book) return <div>Book not found.</div>;

  const handleFavoriteToggle = (book: Book, e: React.MouseEvent) => {
    e.stopPropagation();
    if (!isAuthenticated) {
      navigate('/signin');
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
      navigate('/signin');
      return;
    }
    addToCart(book);
  };

  const averageRating =
    book.ratings.length > 0
      ? book.ratings.reduce((acc, cur) => acc + cur.rating, 0) / book.ratings.length
      : 0;

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
                <p className="text-xl text-gray-600 mb-4">by <strong>{book.author}</strong></p>
                <p className="text-xl text-gray-600 mb-4">Category: <strong>{book.category}</strong></p>
                <p className="text-xl text-gray-600 mb-4">Language: <strong>{book.language}</strong></p>
              </div>
              <button
                onClick={(e) => handleFavoriteToggle(book, e)}
                className={`p-2 rounded-full ${isFavorite(book._id) ? 'text-red-500' : 'text-gray-400'} hover:bg-gray-100`}
              >
                <Heart className="w-6 h-6" fill={isFavorite(book._id) ? 'currentColor' : 'none'} />
              </button>
            </div>

            {/* Star rating with partial fill */}
            <div className="flex items-center mb-4">
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
              <span className="ml-2 text-gray-600">({averageRating.toFixed(1)})</span>
            </div>

            <p className="text-3xl font-bold text-gray-900 mb-6">₹{book.price.toFixed(2)}</p>
            <p className="text-gray-700 mb-8">{book.desc}</p>

            <div className="flex gap-4">
              {getItemQuantity(book._id) === 0 ? (
                <button
                  onClick={() => handleAddToCart(book)}
                  className="flex-1 bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 flex items-center justify-center gap-2 transform hover:scale-105"
                >
                  <ShoppingCart className="w-5 h-5" />
                  Add to Cart
                </button>
              ) : (
                <div className="flex items-center gap-2 bg-gray-100 px-4 py-2 rounded-lg">
                  <button
                    onClick={() => decreaseQuantity(book._id)}
                    className="bg-gray-200 px-2 py-1 rounded hover:bg-gray-300"
                  >
                    −
                  </button>
                  <span className="text-sm font-medium px-2">{getItemQuantity(book._id)}</span>
                  <button
                    onClick={() => increaseQuantity(book)}
                    className="bg-gray-200 px-2 py-1 rounded hover:bg-gray-300"
                  >
                    +
                  </button>
                </div>
              )}

              <button
                onClick={() => navigate('/cart')}
                className="bg-gray-100 text-gray-800 px-6 py-3 rounded-lg hover:bg-gray-200 transform hover:scale-105"
              >
                View Cart
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
