// updated React component with proper `rated` and `reviewed` flags 
// being used to disable inputs if already done

import React, { useEffect, useState } from "react";
import axios from "axios";

interface Order {
  _id: string;
  items: {
    book: {
      _id: string;
      title?: string;
      price?: number;
    };
    quantity: number;
    rated: boolean;
    reviewed: boolean;
  }[];
  status: string;
  total: number;
  createdAt: string;
}

const OrdersPage = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [ratings, setRatings] = useState<{ [bookId: string]: number }>({});
  const [reviews, setReviews] = useState<{ [bookId: string]: string }>({});
  const [submitStatus, setSubmitStatus] = useState<{ [bookId: string]: string }>({});

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const token = localStorage.getItem("token");
        const userId = localStorage.getItem("userId");
        if (!token || !userId) {
          setError("Not logged in");
          return;
        }
        const res = await axios.post(
          "http://localhost:3000/api/v1/get-order-history",
          {},
          {
            headers: {
              Authorization: `Bearer ${token}`,
              id: userId,
            },
          }
        );
        setOrders(res.data.data);
      } catch (err) {
        console.error(err);
        setError("Failed to load orders");
      } finally {
        setLoading(false);
      }
    };
    fetchOrders();
  }, []);

  const handleRatingSubmit = async (bookId: string) => {
    const token = localStorage.getItem("token");
    if (!token || submitStatus[bookId]?.includes("Rating submitted")) return;
    try {
      await axios.post(
        "http://localhost:3000/api/v1/add-rating",
        {
          bookid: bookId,
          rating: ratings[bookId],
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setSubmitStatus((prev) => ({ ...prev, [bookId]: "Rating submitted ✅" }));
    } catch (error) {
      console.error(error);
      setSubmitStatus((prev) => ({ ...prev, [bookId]: "Rating submission failed ❌" }));
    }
  };

  const handleReviewSubmit = async (bookId: string) => {
    const token = localStorage.getItem("token");
    if (!token || submitStatus[bookId]?.includes("Review submitted")) return;
    try {
      await axios.post(
        "http://localhost:3000/api/v1/add-review",
        {
          bookid: bookId,
          review: reviews[bookId],
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setSubmitStatus((prev) => ({ ...prev, [bookId]: "Review submitted ✅" }));
    } catch (error) {
      console.error(error);
      setSubmitStatus((prev) => ({ ...prev, [bookId]: "Review submission failed ❌" }));
    }
  };

  if (loading) return <div className="text-center py-8">Loading...</div>;
  if (error) return <div className="text-center text-red-500">{error}</div>;
  if (orders.length === 0) return <div className="text-center py-12">No orders found</div>;

  return (
    <div className="max-w-3xl mx-auto p-4">
      <h2 className="text-2xl font-semibold mb-6 text-gray-800">My Orders</h2>
      {orders.map((order) => (
        <div key={order._id} className="border rounded-lg p-4 mb-6 shadow-sm bg-white">
          {order.items.map((item, idx) => (
            <div key={idx} className="mb-4">
              <div className="flex justify-between mb-1">
                <span>{item.book?.title || "Untitled"} x {item.quantity}</span>
                <span>INR {(item.book?.price || 0) * item.quantity}</span>
              </div>
              {order.status === "Delivered" && (
                <div className="mt-2">
                  <div className="flex items-center space-x-1">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <svg
                        key={star}
                        onClick={() => {
                          if (!item.rated) {
                            setRatings((prev) => ({ ...prev, [item.book._id]: star }));
                          }
                        }}
                        xmlns="http://www.w3.org/2000/svg"
                        className={`h-5 w-5 cursor-pointer ${star <= (ratings[item.book._id] || 0) ? "text-yellow-400" : "text-gray-300"}`}
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.168 3.6a1 1 0 00.95.69h3.917c.969 0 1.371 1.24.588 1.81l-3.17 2.303a1 1 0 00-.364 1.118l1.168 3.6c.3.921-.755 1.688-1.538 1.118l-3.17-2.303a1 1 0 00-1.175 0l-3.17 2.303c-.783.57-1.838-.197-1.538-1.118l1.168-3.6a1 1 0 00-.364-1.118L2.375 9.027c-.783-.57-.38-1.81.588-1.81h3.917a1 1 0 00.95-.69l1.168-3.6z" />
                      </svg>
                    ))}
                    <button
                      onClick={() => handleRatingSubmit(item.book._id)}
                      disabled={item.rated || submitStatus[item.book._id]?.includes("Rating submitted")}
                      className="ml-2 px-2 py-1 bg-blue-600 text-white text-sm rounded disabled:bg-gray-400"
                    >
                      Submit Rating
                    </button>
                  </div>

                  <div className="mt-2">
                    <textarea
                      rows={2}
                      className="w-full border rounded px-2 py-1"
                      placeholder="Write your review..."
                      disabled={item.reviewed}
                      value={reviews[item.book._id] || ""}
                      onChange={(e) => setReviews((prev) => ({ ...prev, [item.book._id]: e.target.value }))}
                    />
                    <button
                      onClick={() => handleReviewSubmit(item.book._id)}
                      disabled={item.reviewed || submitStatus[item.book._id]?.includes("Review submitted")}
                      className="mt-1 px-2 py-1 bg-green-600 text-white text-sm rounded disabled:bg-gray-400"
                    >
                      Submit Review
                    </button>
                  </div>
                </div>
              )}
            </div>
          ))}

          <div className="text-sm text-gray-500 mt-2">
            Order ID: {order._id} | Placed on: {new Date(order.createdAt).toLocaleDateString()}
          </div>
          <div className="mt-2 text-right font-bold">Total: INR {order.total}</div>
        </div>
      ))}
    </div>
  );
};

export default OrdersPage;

// import React, { useEffect, useState } from "react";
// import axios from "axios";

// interface Order {
//   _id: string;
//   user?: {
//     username?: string;
//   };
//   items: {
//     book: {
//       _id: string;
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
//   const [ratings, setRatings] = useState<{ [bookId: string]: number }>({});
//   const [reviews, setReviews] = useState<{ [bookId: string]: string }>({});
//   const [submitStatus, setSubmitStatus] = useState<{ [bookId: string]: string }>({});

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

//         setOrders(res.data.data);
//       } catch (err) {
//         console.error(err);
//         setError("Failed to load orders");
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchOrders();
//   }, []);

//   const handleRatingSubmit = async (bookId: string) => {
//     const token = localStorage.getItem("token");
//     if (!token || submitStatus[bookId]?.includes("Rating submitted")) return;

//     try {
//       await axios.post(
//         "http://localhost:3000/api/v1/add-rating",
//         {
//           bookid: bookId,
//           rating: ratings[bookId],
//         },
//         {
//           headers: { Authorization: `Bearer ${token}` },
//         }
//       );
//       setSubmitStatus((prev) => ({
//         ...prev,
//         [bookId]: "Rating submitted ✅",
//       }));
//     } catch (error) {
//       console.error(error);
//       setSubmitStatus((prev) => ({
//         ...prev,
//         [bookId]: "Rating submission failed ❌",
//       }));
//     }
//   };

//   const handleReviewSubmit = async (bookId: string) => {
//     const token = localStorage.getItem("token");
//     if (!token || submitStatus[bookId]?.includes("Review submitted")) return;

//     try {
//       await axios.post(
//         "http://localhost:3000/api/v1/add-review",
//         {
//           bookid: bookId,
//           review: reviews[bookId],
//         },
//         {
//           headers: { Authorization: `Bearer ${token}` },
//         }
//       );
//       setSubmitStatus((prev) => ({
//         ...prev,
//         [bookId]: "Review submitted ✅",
//       }));
//     } catch (error) {
//       console.error(error);
//       setSubmitStatus((prev) => ({
//         ...prev,
//         [bookId]: "Review submission failed ❌",
//       }));
//     }
//   };

//   if (loading) return <div className="text-center py-8">Loading...</div>;
//   if (error) return <div className="text-center text-red-500">{error}</div>;
//   if (orders.length === 0) return <div className="text-center py-12">No orders found</div>;

//   return (
//     <div className="max-w-3xl mx-auto p-4">
//       <h2 className="text-2xl font-semibold mb-6 text-gray-800">My Orders</h2>

//       {orders.map((order) => (
//         <div key={order._id} className="border rounded-lg p-4 mb-6 shadow-sm bg-white">
//           {order.items.map((item, idx) => (
//             <div key={idx} className="flex justify-between mb-2">
//               <span className="text-gray-800">
//                 {item.book?.title || "Untitled"} x {item.quantity}
//               </span>
//               <span className="text-gray-600 font-semibold">
//                 INR {(item.book?.price || 0) * item.quantity}
//               </span>
//             </div>
//           ))}

//           <div className="mt-3 text-sm text-gray-500">
//             Order ID: <span className="font-mono">{order._id}</span>
//           </div>
//           <div className="flex justify-between items-center mt-1">
//             <div className="text-sm text-gray-500">
//               Placed on: {new Date(order.createdAt).toLocaleDateString()}
//             </div>
//             <div>
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

//           <div className="mt-4 text-right font-semibold text-lg text-gray-800">
//             INR {order.total}
//           </div>

//           {order.status === "Delivered" && (
//             <div className="mt-6 space-y-4">
//               {order.items.map((item) => (
//                 <div key={item.book._id} className="border-t pt-4">
//                   <div className="font-medium text-gray-900 mb-2">{item.book?.title}</div>

//                   {/* Star Rating */}
//                   <div className="flex items-center space-x-1 mb-2">
//                     {[1, 2, 3, 4, 5].map((star) => (
//                       <svg
//                         key={star}
//                         onClick={() =>
//                           setRatings((prev) => ({
//                             ...prev,
//                             [item.book._id]: star,
//                           }))
//                         }
//                         xmlns="http://www.w3.org/2000/svg"
//                         className={`h-6 w-6 cursor-pointer ${
//                           star <= (ratings[item.book._id] || 0)
//                             ? "text-yellow-400"
//                             : "text-gray-300"
//                         }`}
//                         fill="currentColor"
//                         viewBox="0 0 20 20"
//                       >
//                         <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.168 3.6a1 1 0 00.95.69h3.917c.969 0 1.371 1.24.588 1.81l-3.17 2.303a1 1 0 00-.364 1.118l1.168 3.6c.3.921-.755 1.688-1.538 1.118l-3.17-2.303a1 1 0 00-1.175 0l-3.17 2.303c-.783.57-1.838-.197-1.538-1.118l1.168-3.6a1 1 0 00-.364-1.118L2.375 9.027c-.783-.57-.38-1.81.588-1.81h3.917a1 1 0 00.95-.69l1.168-3.6z" />
//                       </svg>
//                     ))}
//                     <button
//                       onClick={() => handleRatingSubmit(item.book._id)}
//                       disabled={submitStatus[item.book._id]?.includes("Rating submitted")}
//                       className={`ml-3 text-sm text-white px-3 py-1 rounded ${
//                         submitStatus[item.book._id]?.includes("Rating submitted")
//                           ? "bg-gray-400 cursor-not-allowed"
//                           : "bg-blue-600 hover:bg-blue-700"
//                       }`}
//                     >
//                       Submit Rating
//                     </button>
//                   </div>

//                   {/* Review Box */}
//                   <div className="mt-3">
//                     <label className="text-sm block mb-1 text-gray-700">Your Review</label>
//                     <textarea
//                       rows={3}
//                       className="w-full border px-3 py-2 rounded focus:outline-none focus:ring focus:border-blue-300"
//                       placeholder="Write something..."
//                       value={reviews[item.book._id] || ""}
//                       onChange={(e) =>
//                         setReviews((prev) => ({
//                           ...prev,
//                           [item.book._id]: e.target.value,
//                         }))
//                       }
//                       disabled={submitStatus[item.book._id]?.includes("Review submitted")}
//                     />
//                     <button
//                       onClick={() => handleReviewSubmit(item.book._id)}
//                       disabled={submitStatus[item.book._id]?.includes("Review submitted")}
//                       className={`mt-2 text-sm text-white px-3 py-1 rounded ${
//                         submitStatus[item.book._id]?.includes("Review submitted")
//                           ? "bg-gray-400 cursor-not-allowed"
//                           : "bg-green-600 hover:bg-green-700"
//                       }`}
//                     >
//                       Submit Review
//                     </button>
//                   </div>

//                   {submitStatus[item.book._id] && (
//                     <p
//                       className={`mt-2 text-sm ${
//                         submitStatus[item.book._id].includes("✅")
//                           ? "text-green-600"
//                           : "text-red-600"
//                       }`}
//                     >
//                       {submitStatus[item.book._id]}
//                     </p>
//                   )}
//                 </div>
//               ))}
//             </div>
//           )}
//         </div>
//       ))}
//     </div>
//   );
// };

// export default OrdersPage;
