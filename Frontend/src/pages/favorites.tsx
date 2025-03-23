import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const Favorites = () => {
  const [favorites, setFavorites] = useState<Book[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  
  interface Book {
    _id: string;
    title: string;
    author: string;
    price: number;
  }

  useEffect(() => {
    fetchFavorites();
  }, []);

  const fetchFavorites = async () => {
    setLoading(true);
    try {
      const response = await fetch("/api/v1/favourite-books", {
        method: "GET",
        headers: { "Content-Type": "application/json", id: "user_id_here" },
      });
      const data = await response.json();
      if (data.status === "Success") {
        setFavorites(data.data);
      } else {
        setError("Failed to load favorites");
      }
    } catch (err) {
      setError("An error occurred while fetching favorites.");
    } finally {
      setLoading(false);
    }
  };

  const removeFromFavorites = async (bookId: string) => {
    try {
      const response = await fetch("/api/v1/remove-book-from-favourite", {
        method: "PUT",
        headers: { "Content-Type": "application/json", bookid: bookId, id: "user_id_here" },
      });
      const data = await response.json();
      if (response.ok) {
        setFavorites(favorites.filter((book) => book._id !== bookId));
      } else {
        setError(data.message || "Failed to remove from favorites");
      }
    } catch (err) {
      setError("An error occurred while removing the book.");
    }
  };

  if (loading) return <p>Loading favorites...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div>
      <h1>Favorites</h1>
      {favorites.length === 0 ? (
        <p>No favorite books added yet.</p>
      ) : (
        <ul>
          {favorites.map((book) => (
            <li key={book._id}>
              <Link to={`/book/${book._id}`}>{book.title}</Link> - {book.author} - ${book.price}
              <button onClick={() => removeFromFavorites(book._id)}>Remove</button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Favorites;
