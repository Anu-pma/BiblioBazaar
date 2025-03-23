import  { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

interface Book {
  _id: string;
  title: string;
  author: string;
  price: number;
  desc: string;
}

const Cart = () => {
  const [cart, setCart] = useState<Book[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string>("");

  useEffect(() => {
    fetchCart();
  }, []);

  const fetchCart = async () => {
    setLoading(true);
    setError("");
    try {
      const response = await fetch("/api/v1/cart-books", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      if (!response.ok) throw new Error("Failed to fetch cart items.");
      
      const data = await response.json();
      if (data.status === "Success" && Array.isArray(data.data)) {
        setCart(data.data);
      } else {
        throw new Error(data.message || "Invalid cart data.");
      }
    } catch (error) {
      setError(error instanceof Error ? error.message : "An unexpected error occurred.");
      console.error("Error fetching cart:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleRemoveFromCart = async (bookId: string) => {
    try {
      const response = await fetch("/api/v1/remove-book-from-cart", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({ bookid: bookId }),
      });

      if (!response.ok) throw new Error("Failed to remove book.");
      
      const data = await response.json();
      if (data.message === "Book removed from cart.") {
        setCart((prevCart) => prevCart.filter((book) => book._id !== bookId));
      } else {
        throw new Error(data.message || "Could not remove book.");
      }
    } catch (error) {
      setError(error instanceof Error ? error.message : "An unexpected error occurred.");
      console.error("Error removing book:", error);
    }
  };

  if (loading) return <div className="text-center">Loading cart...</div>;
  if (error) return <div className="text-center text-red-500">{error}</div>;
  if (cart.length === 0) return <div className="text-center">Your cart is empty.</div>;

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-2xl font-semibold text-center mb-4">Your Cart</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {cart.map((book) => (
          <div key={book._id} className="p-4 border rounded-lg shadow-md">
            <h3 className="text-lg font-semibold">{book.title}</h3>
            <p className="text-sm text-gray-600">{book.author}</p>
            <p className="text-gray-700 mt-2">${book.price}</p>
            <Link to={`/book/${book._id}`}>
              <Button size="sm" className="mt-3">View Details</Button>
            </Link>
            <Button
              size="sm"
              variant="destructive"
              className="mt-3 ml-2"
              onClick={() => handleRemoveFromCart(book._id)}
            >
              Remove
            </Button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Cart;
