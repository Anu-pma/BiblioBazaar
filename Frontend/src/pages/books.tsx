// Books.jsx - Fetch and Display Books
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

interface Book {
  _id: string;
  title: string;
  author: string;
  price: number;
}

const Books: React.FC = () => {
  const [books, setBooks] = useState<Book[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState<"title" | "price" | "author">("title");
  const [order, setOrder] = useState<"asc" | "desc">("asc");

  useEffect(() => {
    fetchBooks();
  }, []);

  useEffect(() => {
    handleSort(sortBy);
  }, [sortBy, order]);

  const fetchBooks = async () => {
    try {
      const response = await fetch(`/api/v1/get-all-books`);
      const data = await response.json();
      if (Array.isArray(data.data)) {
        setBooks(data.data);
      }
    } catch (error) {
      console.error("Error fetching books:", error);
    }
  };

  const handleSearch = async () => {
    if (!searchQuery) return;
    try {
      const response = await fetch(`/api/v1/search-books?title=${searchQuery}`);
      const data = await response.json();
      if (Array.isArray(data.data)) {
        setBooks(data.data);
      }
    } catch (error) {
      console.error("Error searching books:", error);
    }
  };

  const handleSort = async (sortKey: "title" | "price" | "author") => {
    setSortBy(sortKey);
    setOrder(order === "asc" ? "desc" : "asc");

    try {
      const response = await fetch(`/api/v1/sort-books?sortBy=${sortKey}&order=${order}`);
      const data = await response.json();
      if (Array.isArray(data.data)) {
        setBooks(data.data);
      }
    } catch (error) {
      console.error("Error sorting books:", error);
    }
  };

  return (
    <div>
      <h1>Books</h1>
      <input
        type="text"
        placeholder="Search by title"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />
      <button onClick={handleSearch}>Search</button>
      <button onClick={() => handleSort("price")}>Sort by Price</button>
      <button onClick={() => handleSort("author")}>Sort by Author</button>
      <ul>
        {books.map((book) => (
          <li key={book._id}>
            <Link to={`/book/${book._id}`}>{book.title}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Books;


