// import React, { useEffect, useState } from "react";
// import axios from "axios";

// interface Book {
//   _id: string;
//   productName: string;
//   price: number;
//   title: string;
// }

// // interface Order {
// //   _id: string;
// //   createdAt: string;
// //   status: string;
// //   total: number;
// //   book: Book;
// // }

// interface Order {
//   _id: string;
//   user?: {
//     username?: string;
//   };
//   items: {
//     book: {
//       title?: string;
//       price?: number;
//     };
//     quantity: number;
//   }[];
//   status: string;
//   total: number;
//   createdAt: string;
// }


// const OrdersPage = () => {
//   const [orders, setOrders] = useState<Order[]>([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState<string | null>(null);

//   useEffect(() => {
//     const fetchOrders = async () => {
//       try {
//         const token = localStorage.getItem("token");
//         const userId = localStorage.getItem("userId");

//         if (!token || !userId) {
//           setError("Not logged in");
//           return;
//         }

//         const config = {
//           headers: {
//             Authorization: `Bearer ${token}`,
//             id: userId,
//           },
//         };

//         const res = await axios.post(
//           "http://localhost:3000/api/v1/get-order-history",
//           {},
//           config
//         );

//         const ordersData: Order[] = res.data.data; // backend must return: { data: [orders] }

//         setOrders(ordersData);
//       } catch (err) {
//         console.error(err);
//         setError("Failed to load orders");
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchOrders();
//   }, []);

//   if (loading) {
//     return <div className="text-center py-8">Loading...</div>;
//   }

//   if (error) {
//     return <div className="text-center text-red-500">{error}</div>;
//   }

//   if (orders.length === 0) {
//     return <div className="text-center py-12">No orders found</div>;
//   }

//   return (
//     <div className="max-w-3xl mx-auto p-4">
//       <h2 className="text-2xl font-semibold mb-4">My Orders</h2>

//       {orders.map((order) => (
//         <div
//           key={order._id}
//           className="border border-gray-200 rounded-lg p-4 mb-4 shadow-sm"
//         >
//           <div className="flex justify-between">
//             <div>
//               {/* Book name shown above */}
//               {order.items.book ? (
//                 <span className="text-gray-700 font-medium">
//                    {order.book.title}
//                 </span>
//               ) : (
//                 <p className="text-gray-500 italic">Book details not available</p>
//               )}
//             </div>
//             <div>
//               {/* Order status displayed */}
//               <span
//                 className={`px-2 py-1 text-sm rounded-full ${
//                   order.status === "Delivered"
//                     ? "bg-green-100 text-green-800"
//                     : order.status === "Canceled"
//                     ? "bg-red-100 text-red-800"
//                     : "bg-blue-100 text-blue-800"
//                 }`}
//               >
//                 {order.status}
//               </span>
//             </div>
//           </div>

//           {/* Order placed date shown below */}
//           <div className="mt-2 text-sm text-gray-500">
//             Placed on: {new Date(order.createdAt).toLocaleDateString()}
//           </div>

//           <div className="mt-4 flex justify-between">
//             {/* Book price */}
//             <span className="text-gray-900">₹{order.book?.price}</span>
//             <div className="mt-2 text-right font-semibold text-lg">
//               Total: ₹{order.total}
//             </div>
//           </div>
//         </div>
//       ))}
//     </div>
//   );
// };

// export default OrdersPage;

// // import React, { useEffect, useState } from "react";
// // import axios from "axios";

// // interface Book {
// //   _id: string;
// //   productName: string;
// //   price: number;
// //   title: string;
// //   ratings: { id: string; rating: number }[];
// //   reviews: { id: string; review: string }[];
// // }

// // interface Order {
// //   _id: string;
// //   createdAt: string;
// //   status: string;
// //   total: number;
// //   book: Book;
// // }

// // interface StarRatingProps {
// //   rating: number;
// //   onChange: (rating: number) => void;
// // }

// // const StarRating: React.FC<StarRatingProps> = ({ rating, onChange }) => {
// //   return (
// //     <div className="flex space-x-1 text-2xl">
// //       {[1, 2, 3, 4, 5].map((star) => (
// //         <span
// //           key={star}
// //           onClick={() => onChange(star)}
// //           className={`cursor-pointer transition-colors ${
// //             star <= rating ? "text-yellow-400" : "text-gray-300"
// //           }`}
// //         >
// //           {star <= rating ? "★" : "☆"}
// //         </span>
// //       ))}
// //     </div>
// //   );
// // };

// // const OrdersPage = () => {
// //   const [orders, setOrders] = useState<Order[]>([]);
// //   const [loading, setLoading] = useState(true);
// //   const [error, setError] = useState<string | null>(null);
// //   const [userId, setUserId] = useState<string | null>(null);

// //   const [ratings, setRatings] = useState<{ [bookId: string]: number }>({});
// //   const [reviews, setReviews] = useState<{ [bookId: string]: string }>({});

// //   useEffect(() => {
// //     const fetchOrders = async () => {
// //       try {
// //         const token = localStorage.getItem("token");
// //         const uid = localStorage.getItem("userId");

// //         if (!token || !uid) {
// //           setError("Not logged in");
// //           return;
// //         }

// //         setUserId(uid);

// //         const config = {
// //           headers: {
// //             Authorization: `Bearer ${token}`,
// //             id: uid,
// //           },
// //         };

// //         const res = await axios.post(
// //           "http://localhost:3000/api/v1/get-order-history",
// //           {},
// //           config
// //         );

// //         const ordersData: Order[] = res.data.data;

// //         const prefillRatings: { [bookId: string]: number } = {};
// //         const prefillReviews: { [bookId: string]: string } = {};

// //         ordersData.forEach((order) => {
// //           const book = order.book;
// //           if (book) {
// //             const userRating = book.ratings?.find((r) => r.id === uid);
// //             if (userRating) prefillRatings[book._id] = userRating.rating;

// //             const userReview = book.reviews?.find((r) => r.id === uid);
// //             if (userReview) prefillReviews[book._id] = userReview.review;
// //           }
// //         });

// //         setRatings(prefillRatings);
// //         setReviews(prefillReviews);
// //         setOrders(ordersData);
// //       } catch (err) {
// //         console.error(err);
// //         setError("Failed to load orders");
// //       } finally {
// //         setLoading(false);
// //       }
// //     };

// //     fetchOrders();
// //   }, []);

// //   const handleRatingChange = (bookId: string, rating: number) => {
// //     setRatings((prev) => ({ ...prev, [bookId]: rating }));
// //   };

// //   const handleReviewChange = (bookId: string, review: string) => {
// //     setReviews((prev) => ({ ...prev, [bookId]: review }));
// //   };

// //   const submitFeedback = async (bookId: string) => {
// //     const token = localStorage.getItem("token");
// //     if (!token || !userId) {
// //       alert("Please login to submit feedback.");
// //       return;
// //     }
  
// //     const rating = ratings[bookId];
// //     const review = reviews[bookId];
  
// //     console.log("Submitting feedback for:", {
// //         bookId,
// //         rating,
// //         review,
// //       });

// //     try {
// //       if (rating) {
// //         await axios.post(
// //           "http://localhost:3000/api/v1/add-rating",
// //           { rating },
// //           {
// //             headers: {
// //               Authorization: `Bearer ${token}`,
// //               bookid: bookId,
// //             },
// //           }
// //         );
// //       }
  
// //       if (review) {
// //         await axios.post(
// //           "http://localhost:3000/api/v1/add-review",
// //           { review },
// //           {
// //             headers: {
// //               Authorization: `Bearer ${token}`,
// //               bookid: bookId,
// //             },
// //           }
// //         );
// //       }
  
// //       alert("Feedback submitted!");
// //     } catch (err: any) {
// //       console.error("Error submitting feedback:", err.response?.data || err.message);
// //       alert("Something went wrong while submitting feedback.");
// //     }
// //   };
  

// //   if (loading) return <div className="text-center py-8">Loading...</div>;
// //   if (error) return <div className="text-center text-red-500">{error}</div>;
// //   if (orders.length === 0) return <div className="text-center py-12">No orders found</div>;

// //   return (
// //     <div className="max-w-3xl mx-auto p-4">
// //       <h2 className="text-2xl font-semibold mb-4">My Orders</h2>

// //       {orders.map((order) => (
// //         <div
// //           key={order._id}
// //           className="border border-gray-200 rounded-lg p-4 mb-6 shadow-sm"
// //         >
// //           <div className="flex justify-between">
// //             <div>
// //               {order.book ? (
// //                 <span className="text-lg font-semibold text-gray-800">
// //                   {order.book.title}
// //                 </span>
// //               ) : (
// //                 <p className="text-gray-500 italic">Book details not available</p>
// //               )}
// //             </div>
// //             <div>
// //               <span
// //                 className={`px-2 py-1 text-sm rounded-full ${
// //                   order.status === "Delivered"
// //                     ? "bg-green-100 text-green-800"
// //                     : order.status === "Canceled"
// //                     ? "bg-red-100 text-red-800"
// //                     : "bg-blue-100 text-blue-800"
// //                 }`}
// //               >
// //                 {order.status}
// //               </span>
// //             </div>
// //           </div>

// //           <div className="mt-2 text-sm text-gray-500">
// //             Placed on: {new Date(order.createdAt).toLocaleDateString()}
// //           </div>

// //           <div className="mt-4 flex justify-between">
// //             <span className="text-gray-900">₹{order.book?.price}</span>
// //             <div className="text-right font-semibold text-lg">
// //               Total: ₹{order.total}
// //             </div>
// //           </div>

// //           {order.status === "Delivered" && order.book && (
// //             <div className="mt-4 border-t pt-4">
// //                 <label className="block text-sm font-medium text-gray-700 mb-1">
// //                 Rate this book:
// //                 </label>
// //                 <StarRating
// //                 rating={ratings[order.book._id] || 0}
// //                 onChange={(newRating) =>
// //                     handleRatingChange(order.book._id, newRating)
// //                 }
// //                 />

// //                 <textarea
// //                 value={reviews[order.book._id] || ""}
// //                 onChange={(e) =>
// //                     handleReviewChange(order.book._id, e.target.value)
// //                 }
// //                 placeholder="Write your review here..."
// //                 className="border p-2 w-full mt-2 rounded"
// //                 />

// //                 <button
// //                 onClick={() => submitFeedback(order.book._id)}
// //                 className="bg-blue-600 text-white px-4 py-2 rounded mt-2 hover:bg-blue-700"
// //                 >
// //                 Submit Feedback
// //                 </button>
// //             </div>
// //             )}

// //         </div>
// //       ))}
// //     </div>
// //   );
// // };

// // export default OrdersPage;


import React, { useEffect, useState } from "react";
import axios from "axios";

interface Order {
  _id: string;
  user?: {
    username?: string;
  };
  items: {
    book: {
      title?: string;
      price?: number;
    };
    quantity: number;
  }[];
  status: string;
  total: number;
  createdAt: string;
}

const OrdersPage = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const token = localStorage.getItem("token");
        const userId = localStorage.getItem("userId");

        if (!token || !userId) {
          setError("Not logged in");
          return;
        }

        const config = {
          headers: {
            Authorization: `Bearer ${token}`,
            id: userId,
          },
        };

        const res = await axios.post(
          "http://localhost:3000/api/v1/get-order-history",
          {},
          config
        );

        const ordersData: Order[] = res.data.data;
        setOrders(ordersData);
      } catch (err) {
        console.error(err);
        setError("Failed to load orders");
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  if (loading) {
    return <div className="text-center py-8">Loading...</div>;
  }

  if (error) {
    return <div className="text-center text-red-500">{error}</div>;
  }

  if (orders.length === 0) {
    return <div className="text-center py-12">No orders found</div>;
  }

  return (
    <div className="max-w-3xl mx-auto p-4">
      <h2 className="text-2xl font-semibold mb-4">My Orders</h2>

      {orders.map((order) => (
        <div
          key={order._id}
          className="border border-gray-200 rounded-lg p-4 mb-4 shadow-sm"
        >
          <div className="flex justify-between items-center">
            <div className="text-sm text-gray-500">
              Order ID: <span className="font-mono">{order._id}</span>
            </div>
            <div>
              <span
                className={`px-2 py-1 text-sm rounded-full ${
                  order.status === "Delivered"
                    ? "bg-green-100 text-green-800"
                    : order.status === "Canceled"
                    ? "bg-red-100 text-red-800"
                    : "bg-blue-100 text-blue-800"
                }`}
              >
                {order.status}
              </span>
            </div>
          </div>

          <div className="mt-2 text-sm text-gray-500">
            Placed on: {new Date(order.createdAt).toLocaleDateString()}
          </div>

          <div className="mt-4 space-y-2">
            {order.items.map((item, index) => (
              <div key={index} className="flex justify-between">
                <div>
                  <span className="text-gray-800 font-medium">
                    {item.book?.title || "Unknown Book"}
                  </span>
                  <span className="ml-2 text-sm text-gray-500">
                    x{item.quantity}
                  </span>
                </div>
                <span className="text-gray-700">
                  ₹{(item.book?.price || 0) * item.quantity}
                </span>
              </div>
            ))}
          </div>

          <div className="mt-4 text-right font-semibold text-lg">
            Total: ₹{order.total}
          </div>
        </div>
      ))}
    </div>
  );
};

export default OrdersPage;
