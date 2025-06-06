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

      setSubmitStatus((prev) => ({
        ...prev,
        [bookId]: "Thank you for rating us! ✅",
      }));

      setOrders((prevOrders) =>
        prevOrders.map((order) => ({
          ...order,
          items: order.items.map((item) =>
            item.book._id === bookId ? { ...item, rated: true } : item
          ),
        }))
      );
    } catch (error) {
      console.error(error);
      setSubmitStatus((prev) => ({
        ...prev,
        [bookId]: "Rating submission failed ❌",
      }));
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

      setSubmitStatus((prev) => ({
        ...prev,
        [bookId]: "Thank you for your review! ✅",
      }));

      setOrders((prevOrders) =>
        prevOrders.map((order) => ({
          ...order,
          items: order.items.map((item) =>
            item.book._id === bookId ? { ...item, reviewed: true } : item
          ),
        }))
      );
    } catch (error) {
      console.error(error);
      setSubmitStatus((prev) => ({
        ...prev,
        [bookId]: "Review submission failed ❌",
      }));
    }
  };

  if (loading) return <div className="text-center py-8">Loading...</div>;
  if (error) return <div className="text-center text-red-500">{error}</div>;
  if (orders.length === 0)
    return <div className="text-center py-12">No orders found</div>;

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h2 className="text-3xl font-bold mb-8 text-gray-900 border-b pb-2">
        My Orders
      </h2>
      {orders.map((order) => (
        <div
          key={order._id}
          className="bg-white rounded-lg shadow-md p-6 mb-8 border border-gray-200"
        >
          <div className="mb-6">
            <h3 className="text-xl font-semibold text-gray-800 mb-3">
              Order ID: <span className="font-mono">{order._id}</span>
            </h3>
            <p className="text-sm text-gray-600">
              Placed on: {new Date(order.createdAt).toLocaleDateString()}
            </p>
            <p
              className={`mt-1 inline-block px-3 py-1 text-sm rounded-full font-medium ${
                order.status === "Delivered"
                  ? "bg-green-100 text-green-800"
                  : order.status === "Out for Delivery"
                  ? "bg-blue-100 text-blue-800"
                  : "bg-yellow-100 text-yellow-800"
              }`}
            >
              Status: {order.status}
            </p>
          </div>

          <div className="space-y-6">
            {order.items.map((item, idx) => (
              <div
                key={idx}
                className="border rounded-lg p-4 shadow-sm hover:shadow-lg transition-shadow duration-200"
              >
                <div className="flex justify-between items-center mb-3">
                  <h4 className="text-lg font-semibold text-gray-900">
                    {item.book?.title || "Untitled"}{" "}
                    <span className="text-gray-500 font-normal">x {item.quantity}</span>
                  </h4>
                  <span className="font-semibold text-gray-800">
                    INR {(item.book?.price || 0) * item.quantity}
                  </span>
                </div>

                {order.status === "Delivered" && (
                  <div className="mt-3">
                    {/* Star Rating */}
                    <div className="flex items-center space-x-1 mb-2">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <svg
                          key={star}
                          onClick={() => {
                            if (!item.rated) {
                              setRatings((prev) => ({
                                ...prev,
                                [item.book._id]: star,
                              }));
                            }
                          }}
                          xmlns="http://www.w3.org/2000/svg"
                          className={`h-6 w-6 cursor-pointer transition-colors duration-200 ${
                            star <= (ratings[item.book._id] || 0)
                              ? "text-yellow-400"
                              : "text-gray-300"
                          } ${item.rated ? "cursor-default" : "hover:text-yellow-500"}`}
                          fill="currentColor"
                          viewBox="0 0 20 20"
                          aria-label={`${star} Star`}
                          role="button"
                          tabIndex={0}
                          onKeyDown={(e) => {
                            if (e.key === "Enter" && !item.rated) {
                              setRatings((prev) => ({
                                ...prev,
                                [item.book._id]: star,
                              }));
                            }
                          }}
                        >
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.168 3.6a1 1 0 00.95.69h3.917c.969 0 1.371 1.24.588 1.81l-3.17 2.303a1 1 0 00-.364 1.118l1.168 3.6c.3.921-.755 1.688-1.538 1.118l-3.17-2.303a1 1 0 00-1.175 0l-3.17 2.303c-.783.57-1.838-.197-1.538-1.118l1.168-3.6a1 1 0 00-.364-1.118L2.375 9.027c-.783-.57-.38-1.81.588-1.81h3.917a1 1 0 00.95-.69l1.168-3.6z" />
                        </svg>
                      ))}

                      {/* Submit Rating Button or Thank You */}
                      {item.rated || submitStatus[item.book._id]?.includes("Rating submitted") ? (
                        <span className="text-green-600 text-sm ml-3 font-medium select-none">
                          Thank you for rating us! ✅
                        </span>
                      ) : (
                        <button
                          onClick={() => handleRatingSubmit(item.book._id)}
                          disabled={!ratings[item.book._id]}
                          className={`ml-4 px-3 py-1 rounded-md text-white text-sm font-semibold transition-colors ${
                            ratings[item.book._id]
                              ? "bg-blue-600 hover:bg-blue-700 cursor-pointer"
                              : "bg-blue-300 cursor-not-allowed"
                          }`}
                        >
                          Submit Rating
                        </button>
                      )}
                    </div>

                    {/* Review Section */}
                    <div>
                      {item.reviewed || submitStatus[item.book._id]?.includes("Review submitted") ? (
                        <p className="text-green-600 text-sm font-medium select-none">
                          Thank you for your review! ✅
                        </p>
                      ) : (
                        <>
                          <textarea
                            placeholder="Write your review here..."
                            value={reviews[item.book._id] || ""}
                            onChange={(e) =>
                              setReviews((prev) => ({
                                ...prev,
                                [item.book._id]: e.target.value,
                              }))
                            }
                            rows={3}
                            className="w-full border rounded-md p-2 text-sm focus:outline-blue-500"
                          />
                          <button
                            onClick={() => handleReviewSubmit(item.book._id)}
                            disabled={!reviews[item.book._id]?.trim()}
                            className={`mt-2 px-4 py-1 rounded-md text-white font-semibold transition-colors ${
                              reviews[item.book._id]?.trim()
                                ? "bg-green-600 hover:bg-green-700 cursor-pointer"
                                : "bg-green-300 cursor-not-allowed"
                            }`}
                          >
                            Submit Review
                          </button>
                        </>
                      )}
                    </div>
                    {submitStatus[item.book._id] && !item.rated && !item.reviewed && (
                      <p className="mt-2 text-sm text-red-500">{submitStatus[item.book._id]}</p>
                    )}
                  </div>
                )}
              </div>
            ))}
          </div>

          <div className="mt-6 border-t pt-4 flex justify-between items-center text-lg font-semibold text-gray-900">
            <span>Total:</span>
            <span>INR {order.total}</span>
          </div>
        </div>
      ))}
    </div>
  );
};

export default OrdersPage;
