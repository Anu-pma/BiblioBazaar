// import React from 'react';
// import { Trash2, ShoppingCart } from 'lucide-react';
// import { useFavorites } from '../context/FavoritesContext';
// import { useCart } from '../context/CartContext';
// import { useNavigate } from 'react-router-dom';

// export default function Favorites() {
//   const { favorites, removeFromFavorites } = useFavorites();
//   const { addToCart } = useCart();
//   const navigate = useNavigate();

//   if (favorites.length === 0) {
//     return (
//       <div className="container mx-auto px-4 py-16 text-center">
//         <h2 className="text-2xl font-bold mb-4">No favorites yet</h2>
//         <p className="text-gray-600 mb-8">Start adding some books to your favorites!</p>
//         <button
//           onClick={() => navigate('/books')}
//           className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700"
//         >
//           Browse Books
//         </button>
//       </div>
//     );
//   }

//   return (
//     <div className="container mx-auto px-4 py-8">
//       <h1 className="text-3xl font-bold mb-8">My Favorites</h1>

//       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
//         {favorites.map(book => (
//           <div key={book._id} className="bg-white rounded-lg shadow-md overflow-hidden">
//             <img
//               src={book.url}
//               alt={book.title}
//               className="w-full h-48 object-cover"
//             />
//             <div className="p-4">
//               <h3 className="text-lg font-semibold mb-2">{book.title}</h3>
//               <p className="text-gray-600 mb-2">{book.author}</p>
//               <p className="text-xl font-bold mb-4">${book.price.toFixed(2)}</p>
              
//               <div className="flex gap-2">
//                 <button
//                   onClick={() => addToCart(book)}
//                   className="flex-1 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 flex items-center justify-center gap-2"
//                 >
//                   <ShoppingCart size={20} />
//                   Add to Cart
//                 </button>
//                 <button
//                   onClick={() => removeFromFavorites(book._id)}
//                   className="bg-red-100 text-red-600 p-2 rounded-lg hover:bg-red-200"
//                 >
//                   <Trash2 size={20} />
//                 </button>
//               </div>
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// }

// // import React, { useEffect } from 'react';
// // import { Trash2, ShoppingCart } from 'lucide-react';
// // import { useFavorites } from '../context/FavoritesContext';
// // import { useCart } from '../context/CartContext';
// // import { useNavigate } from 'react-router-dom';
// // import { toast } from 'react-hot-toast';

// // export default function Favorites() {
// //   const { favorites, removeFromFavorites, fetchFavorites} = useFavorites();
// //   const { items, addToCart } = useCart();
// //   const navigate = useNavigate();

// //   useEffect(() => {
// //     fetchFavorites();
// //   }, []);

// //   const isInCart = (bookId: string) => items.some(item => item._id === bookId);

// //   // if (loading) {
// //   //   return (
// //   //     <div className="container mx-auto px-4 py-16 text-center">
// //   //       <h2 className="text-xl font-semibold">Loading your favorites...</h2>
// //   //     </div>
// //   //   );
// //   // }

// //   if (favorites.length === 0) {
// //     return (
// //       <div className="container mx-auto px-4 py-16 text-center">
// //         <h2 className="text-2xl font-bold mb-4">No favorites yet</h2>
// //         <p className="text-gray-600 mb-8">Start adding some books to your favorites!</p>
// //         <button
// //           onClick={() => navigate('/books')}
// //           className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700"
// //         >
// //           Browse Books
// //         </button>
// //       </div>
// //     );
// //   }

// //   return (
// //     <div className="container mx-auto px-4 py-8">
// //       <h1 className="text-3xl font-bold mb-8">My Favorites</h1>

// //       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
// //         {favorites.map(book => (
// //           <div key={book._id} className="bg-white rounded-lg shadow-md overflow-hidden">
// //             <img
// //               src={book.url}
// //               alt={book.title}
// //               className="w-full h-48 object-cover"
// //             />
// //             <div className="p-4">
// //               <h3 className="text-lg font-semibold mb-2">{book.title}</h3>
// //               <p className="text-gray-600 mb-2">{book.author}</p>
// //               <p className="text-xl font-bold mb-4">${book.price.toFixed(2)}</p>

// //               <div className="flex gap-2">
// //                 <button
// //                   onClick={() => {
// //                     if (!isInCart(book._id)) {
// //                       addToCart(book);
// //                       toast.success('Book added to cart');
// //                     } else {
// //                       toast('Book is already in cart');
// //                     }
// //                   }}
// //                   className="flex-1 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 flex items-center justify-center gap-2"
// //                 >
// //                   <ShoppingCart size={20} />
// //                   Add to Cart
// //                 </button>
// //                 <button
// //                   onClick={() => {
// //                     removeFromFavorites(book._id);
// //                     toast.success('Removed from favorites');
// //                   }}
// //                   className="bg-red-100 text-red-600 p-2 rounded-lg hover:bg-red-200"
// //                 >
// //                   <Trash2 size={20} />
// //                 </button>
// //               </div>
// //             </div>
// //           </div>
// //         ))}
// //       </div>
// //     </div>
// //   );
// // }

import React from 'react';
import { Trash2, ShoppingCart } from 'lucide-react';
import { useFavorites } from '../context/FavoritesContext';
import { useCart } from '../context/CartContext';
import { useNavigate } from 'react-router-dom';

export default function Favorites() {
  const { favorites, removeFromFavorites } = useFavorites();
  const { addToCart } = useCart();
  const navigate = useNavigate();

  if (favorites.length === 0) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <h2 className="text-2xl font-bold mb-4">No favorites yet</h2>
        <p className="text-gray-600 mb-8">Start adding some books to your favorites!</p>
        <button
          onClick={() => navigate('/books')}
          className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700"
        >
          Browse Books
        </button>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">My Favorites</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {favorites.map(book => (
          <div key={book._id} className="bg-white rounded-lg shadow-md overflow-hidden">
            <img
              src={book.url}
              alt={book.title}
              className="w-full h-48 object-cover"
            />
            <div className="p-4">
              <h3 className="text-lg font-semibold mb-2">{book.title}</h3>
              <p className="text-gray-600 mb-2">{book.author}</p>
              <p className="text-xl font-bold mb-4">${book.price.toFixed(2)}</p>
              
              <div className="flex gap-2">
                <button
                  onClick={() => addToCart(book)}
                  className="flex-1 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 flex items-center justify-center gap-2"
                >
                  <ShoppingCart size={20} />
                  Add to Cart
                </button>
                <button
                  onClick={() => removeFromFavorites(book._id)}
                  className="bg-red-100 text-red-600 p-2 rounded-lg hover:bg-red-200"
                >
                  <Trash2 size={20} />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}