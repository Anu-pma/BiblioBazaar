import { useEffect, useState } from "react";
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
  // Display 5 stars, clickable unless disabled
  return (
    <div style={{ display: "flex", gap: 6, cursor: disabled ? "default" : "pointer" }}>
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
    cursor: disabled ? "default" : "pointer",
    transition: "fill 0.2s",
    userSelect: "none",
  }}
>
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="100%"
    height="100%"
    viewBox="0 0 24 24"
    fill={Number(rating) >= star ? "#FFD700" : "#ccc"}
  >
    <path 
      d="M12 .587l3.668 7.431 8.2 1.193-5.934 5.787 1.4 8.167L12 18.896l-7.334 3.87 1.4-8.167L.132 9.211l8.2-1.193z" 
      />
  </svg>
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
        <span
          key={star}
          style={{
            fontSize: 20,
            color: rate >= star ? "#FFD700" : "#ccc",
            userSelect: "none",
          }}
          aria-hidden="true"
        >
          ★
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
  const [ratingInputs, setRatingInputs] = useState<{ [key: string]: number | "" }>({});
  const [reviewInputs, setReviewInputs] = useState<{ [key: string]: string }>({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

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
  }, [token, userId]);

  async function submitRating(bookid: string, orderStatus: string) {
    if (orderStatus.toLowerCase() !== "delivered") {
      alert("You can only rate books from delivered orders.");
      return;
    }
    const rating = ratingInputs[bookid];
    if (!rating || rating < 1 || rating > 5) {
      alert("Please enter a rating between 1 and 5");
      return;
    }

    try {
      const res = await fetch("http://localhost:3000/api/v1/add-rating", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ bookid, rating }),
      });
      const data = await res.json();
      if (res.ok) {
        alert("Rating submitted");
        updateOrderWithRating(bookid, rating);
      } else {
        alert(data.message || "Failed to submit rating");
      }
    } catch (e) {
      console.error(e);
      alert("Error submitting rating");
    }
  }

  async function submitReview(bookId: string, orderStatus: string) {
    if (orderStatus.toLowerCase() !== "delivered") {
      alert("You can only review books from delivered orders.");
      return;
    }
    const review = reviewInputs[bookId];
    if (!review || review.trim().length === 0) {
      alert("Please enter a review");
      return;
    }

    try {
      const res = await fetch("http://localhost:3000/api/v1/add-review", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ bookid: bookId, review }),
      });
      const data = await res.json();
      if (res.ok) {
        alert("Review submitted");
        updateOrderWithReview(bookId, review);
      } else {
        alert(data.message || "Failed to submit review");
      }
    } catch (e) {
      console.error(e);
      alert("Error submitting review");
    }
  }

  function updateOrderWithRating(bookId: string, rating: number) {
    setOrders((prevOrders) =>
      prevOrders.map((order) => {
        const newItems = order.items.map((item) => {
          if (item.book._id === bookId) {
            return { ...item, rated: true, rating };
          }
          return item;
        });
        return { ...order, items: newItems };
      })
    );
    setRatingInputs((prev) => ({ ...prev, [bookId]: "" }));
  }

  function updateOrderWithReview(bookId: string, review: string) {
    setOrders((prevOrders) =>
      prevOrders.map((order) => {
        const newItems = order.items.map((item) => {
          if (item.book._id === bookId) {
            return { ...item, reviewed: true, review };
          }
          return item;
        });
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
      <div style={{ color: "red", textAlign: "center", marginTop: 50, fontSize: 18 }}>
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
  <div
    style={{
      maxWidth: 900,
      margin: "auto",
      padding: 20,
      fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
    }}
  >
    <h2 className="text-3xl font-bold mb-8 text-gray-900 border-b pb-2">
      My Orders
    </h2>

    {orders.map((order) => {
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

          <ul className="space-y-4">
            {order.items.map((item) => {
              const canRateReview = order.status.toLowerCase() === "delivered";
              return (
                <li
                  key={item.book._id}
                  className="pt-4 border border-gray-300 rounded-lg p-4 mb-4 shadow-sm hover:shadow-md transition-shadow"
                >
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3">
                    <h4 className="text-lg font-semibold text-gray-900">
                     {item.book?.title || "Untitled"}{" "}
                     <span className="text-gray-500 font-normal">x {item.quantity}</span>
                   </h4>
                    <span className="font-semibold text-gray-800">
                     ₹ {(item.book?.price || 0) * item.quantity}
                   </span>
                  </div>

                  {/* Rating */}
                  <div className="mt-2">
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
                          className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded text-sm"
                        >
                          Submit Rating
                        </button>
                      </div>
                    ) : null}
                  </div>

                  {/* Review */}
                  <div className="mt-3">
                    {item.reviewed ? (
                      <p className="text-gray-800 bg-gray-50 border border-gray-200 rounded-lg p-3 shadow-sm italic">
  📝                    <span className="font-semibold not-italic">Review:</span> {item.review}
                      </p>
                    ) : canRateReview ? (
                      <div>
                        <textarea
                          placeholder="Write a review..."
                          value={reviewInputs[item.book._id] || ""}
                          onChange={(e) =>
                            setReviewInputs((prev) => ({
                              ...prev,
                              [item.book._id]: e.target.value,
                            }))
                          }
                          className="w-full border rounded px-3 py-2 mt-2 text-sm"
                          rows={2}
                        ></textarea>
                        <button
                          onClick={() =>
                            submitReview(item.book._id, order.status)
                          }
                          className="mt-2 bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded text-sm"
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

          <p className="text-right mt-4 text-lg font-medium text-gray-800">
            Total: ₹ {order.total}
          </p>
        </div>
      );
    })}
  </div>
);

};

export default OrdersPage;
