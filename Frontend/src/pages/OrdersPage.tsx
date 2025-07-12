import { useEffect, useState } from "react";
import axios from "axios";
import { Star } from "lucide-react";

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
    rating?: number;
    review?: string;
  }[];
  status: string;
  total: number;
  createdAt: string;
}

const StarRatingInput = ({
  rating,
  setRating,
  disabled,
}: {
  rating: number | "";
  setRating: (val: number) => void;
  disabled: boolean;
}) => {
  return (
    <div
      style={{
        display: "flex",
        gap: 6,
        cursor: disabled ? "default" : "pointer",
      }}
    >
      {[1, 2, 3, 4, 5].map((star) => (
        <span
          key={star}
          onClick={() => !disabled && setRating(star)}
          onKeyDown={(e) => {
            if (!disabled && (e.key === "Enter" || e.key === " ")) {
              setRating(star);
            }
          }}
          role="button"
          tabIndex={0}
          aria-label={`${star} Star`}
          style={{
            width: 24,
            height: 24,
            display: "inline-flex",
            alignItems: "center",
            justifyContent: "center",
            cursor: disabled ? "default" : "pointer",
            userSelect: "none",
          }}
        >
          <Star
            size={24}
            color={Number(rating) >= star ? "#FFD700" : "#ccc"}
            fill={Number(rating) >= star ? "#FFD700" : "none"}
          />
        </span>
      ))}
    </div>
  );
};

const StarRatingDisplay = ({ rating }: { rating?: number }) => {
  const rate = rating ?? 0;
  return (
    <div style={{ display: "flex", gap: 4, alignItems: "center" }}>
      {[1, 2, 3, 4, 5].map((star) => (
        <span key={star} aria-hidden="true">
          <Star
            size={20}
            color={rate >= star ? "#FFD700" : "#ccc"}
            fill={rate >= star ? "#FFD700" : "none"}
          />
        </span>
      ))}
      <span style={{ marginLeft: 6, fontSize: 14, color: "#555" }}>
        {rate} / 5
      </span>
    </div>
  );
};

const OrdersPage = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [ratingInputs, setRatingInputs] = useState<{
    [key: string]: number | "";
  }>({});
  const [reviewInputs, setReviewInputs] = useState<{ [key: string]: string }>(
    {}
  );
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [visibleItems, setVisibleItems] = useState<{ [key: string]: boolean }>(
    {}
  );

  const token = localStorage.getItem("token");
  const userId = localStorage.getItem("userId");

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        if (!token || !userId) {
          setError("Not logged in");
          setLoading(false);
          return;
        }
        const res = await axios.post(
          "${import.meta.env.VITE_API_URL}/api/v1/get-order-history",
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
  }, [token, userId]);

  async function submitRating(bookid: string, orderStatus: string) {
    const rating = ratingInputs[bookid];
    if (
      !rating ||
      rating < 1 ||
      rating > 5 ||
      orderStatus.toLowerCase() !== "delivered"
    ) {
      return; // silently skip
    }

    try {
      const res = await fetch("${import.meta.env.VITE_API_URL}/api/v1/add-rating", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ bookid, rating }),
      });
      const data = await res.json();
      if (res.ok) {
        updateOrderWithRating(bookid, rating);
      } else {
        console.error("Failed to submit rating:", data.message);
      }
    } catch (e) {
      console.error("Error submitting rating:", e);
    }
  }

  async function submitReview(bookId: string, orderStatus: string) {
    const review = reviewInputs[bookId];
    if (
      !review ||
      review.trim().length === 0 ||
      orderStatus.toLowerCase() !== "delivered"
    ) {
      return; // silently skip
    }

    try {
      const res = await fetch("${import.meta.env.VITE_API_URL}/api/v1/add-review", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ bookid: bookId, review }),
      });
      const data = await res.json();
      if (res.ok) {
        updateOrderWithReview(bookId, review);
      } else {
        console.error("Failed to submit review:", data.message);
      }
    } catch (e) {
      console.error("Error submitting review:", e);
    }
  }

  function updateOrderWithRating(bookId: string, rating: number) {
    setOrders((prevOrders) =>
      prevOrders.map((order) => {
        const newItems = order.items.map((item) =>
          item.book._id === bookId ? { ...item, rated: true, rating } : item
        );
        return { ...order, items: newItems };
      })
    );
    setRatingInputs((prev) => ({ ...prev, [bookId]: "" }));
  }

  function updateOrderWithReview(bookId: string, review: string) {
    setOrders((prevOrders) =>
      prevOrders.map((order) => {
        const newItems = order.items.map((item) =>
          item.book._id === bookId ? { ...item, reviewed: true, review } : item
        );
        return { ...order, items: newItems };
      })
    );
    setReviewInputs((prev) => ({ ...prev, [bookId]: "" }));
  }

  if (loading)
    return (
      <div style={{ textAlign: "center", marginTop: 50, fontSize: 18 }}>
        Loading orders...
      </div>
    );
  if (error)
    return (
      <div
        style={{
          color: "red",
          textAlign: "center",
          marginTop: 50,
          fontSize: 18,
        }}
      >
        {error}
      </div>
    );
  if (orders.length === 0)
    return (
      <div style={{ textAlign: "center", marginTop: 50, fontSize: 18 }}>
        No orders found.
      </div>
    );

  return (
    <div className="max-w-4xl mx-auto p-4 font-sans">
      <h2 className="text-3xl font-bold mb-8 text-gray-900 border-b pb-2">
        My Orders
      </h2>

      {orders.map((order) => {
        const isExpanded = visibleItems[order._id] ?? false;
        const showToggle = order.items.length > 1;

        return (
          <div
            key={order._id}
            className="border border-gray-300 rounded-xl bg-white p-6 mb-6 shadow-md hover:shadow-lg hover:scale-[1.01] transition duration-300 ease-in-out"
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

            {showToggle && (
              <button
                onClick={() =>
                  setVisibleItems((prev) => ({
                    ...prev,
                    [order._id]: !prev[order._id],
                  }))
                }
                className="text-blue-600 mb-3 underline text-sm"
              >
                {isExpanded ? "Hide items" : `View all items`}
              </button>
            )}

            <ul className="space-y-4">
              {/* Always show the first item */}
              {[order.items[0]].map((item) => {
                const canRateReview =
                  order.status.toLowerCase() === "delivered";
                return (
                  <li
                    key={item.book._id}
                    className="pt-4 border border-gray-300 rounded-lg p-4 mb-4 shadow-sm hover:shadow-md transition-shadow"
                  >
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3">
                      <h4 className="text-lg font-semibold text-gray-900">
                        {item.book?.title || "Untitled"}{" "}
                        <span className="text-gray-500 font-normal">
                          x {item.quantity}
                        </span>
                      </h4>
                      <span className="font-semibold text-gray-800">
                        ₹ {(item.book?.price || 0) * item.quantity}
                      </span>
                    </div>

                    {/* Rating / Review section */}
                    <div className="mt-2 space-y-2">
                      {item.rated ? (
                        <StarRatingDisplay rating={item.rating} />
                      ) : canRateReview ? (
                        <div className="flex items-center gap-3 mt-2">
                          <StarRatingInput
                            rating={ratingInputs[item.book._id] || ""}
                            setRating={(val) =>
                              setRatingInputs((prev) => ({
                                ...prev,
                                [item.book._id]: val,
                              }))
                            }
                            disabled={false}
                          />
                          <button
                            onClick={() =>
                              submitRating(item.book._id, order.status)
                            }
                            className="bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-600"
                          >
                            Submit Rating
                          </button>
                        </div>
                      ) : null}

                      {item.reviewed ? (
                        <p className="text-sm text-gray-800 italic bg-gray-100 px-3 py-2 rounded-md shadow-sm border border-gray-200 mt-2">
                          <span className="font-semibold text-gray-700">
                            Review:
                          </span>{" "}
                          {item.review}
                        </p>
                      ) : canRateReview ? (
                        <div className="mt-2">
                          <textarea
                            value={reviewInputs[item.book._id] || ""}
                            onChange={(e) =>
                              setReviewInputs((prev) => ({
                                ...prev,
                                [item.book._id]: e.target.value,
                              }))
                            }
                            className="w-full p-2 border border-gray-300 rounded"
                            placeholder="Write a review..."
                            rows={2}
                          />
                          <button
                            onClick={() =>
                              submitReview(item.book._id, order.status)
                            }
                            className="mt-2 bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700"
                          >
                            Submit Review
                          </button>
                        </div>
                      ) : null}
                    </div>
                  </li>
                );
              })}

              {/* Conditionally render the rest of the items */}
              {isExpanded &&
                order.items.slice(1).map((item) => {
                  const canRateReview =
                    order.status.toLowerCase() === "delivered";
                  return (
                    <li
                      key={item.book._id}
                      className="pt-4 border border-gray-300 rounded-lg p-4 mb-4 shadow-sm hover:shadow-md transition-shadow"
                    >
                      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3">
                        <h4 className="text-lg font-semibold text-gray-900">
                          {item.book?.title || "Untitled"}{" "}
                          <span className="text-gray-500 font-normal">
                            x {item.quantity}
                          </span>
                        </h4>
                        <span className="font-semibold text-gray-800">
                          ₹ {(item.book?.price || 0) * item.quantity}
                        </span>
                      </div>

                      {/* Rating / Review section */}
                      <div className="mt-2 space-y-2">
                        {item.rated ? (
                          <StarRatingDisplay rating={item.rating} />
                        ) : canRateReview ? (
                          <div className="flex items-center gap-3 mt-2">
                            <StarRatingInput
                              rating={ratingInputs[item.book._id] || ""}
                              setRating={(val) =>
                                setRatingInputs((prev) => ({
                                  ...prev,
                                  [item.book._id]: val,
                                }))
                              }
                              disabled={false}
                            />
                            <button
                              onClick={() =>
                                submitRating(item.book._id, order.status)
                              }
                              className="bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-600"
                            >
                              Submit Rating
                            </button>
                          </div>
                        ) : null}

                        {item.reviewed ? (
                          <p className="text-sm text-gray-700 italic">
                            Review: {item.review}
                          </p>
                        ) : canRateReview ? (
                          <div className="mt-2">
                            <textarea
                              value={reviewInputs[item.book._id] || ""}
                              onChange={(e) =>
                                setReviewInputs((prev) => ({
                                  ...prev,
                                  [item.book._id]: e.target.value,
                                }))
                              }
                              className="w-full p-2 border border-gray-300 rounded"
                              placeholder="Write a review..."
                              rows={2}
                            />
                            <button
                              onClick={() =>
                                submitReview(item.book._id, order.status)
                              }
                              className="mt-2 bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700"
                            >
                              Submit Review
                            </button>
                          </div>
                        ) : null}
                      </div>
                    </li>
                  );
                })}
            </ul>

            <div className="text-right text-lg font-semibold text-gray-900 mt-4">
              Total: ₹{order.total}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default OrdersPage;
