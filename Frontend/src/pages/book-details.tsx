import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

interface Review {
  review: string;
}

interface Book {
  _id: string;
  title: string;
  desc: string;
  author: string;
  price: number;
  reviews: Review[];
}

const BookDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [book, setBook] = useState<Book | null>(null);
  const [rating, setRating] = useState<number>(0);
  const [review, setReview] = useState<string>("");

  useEffect(() => {
    fetchBookDetails();
  }, []);

  const fetchBookDetails = async () => {
    try {
      const response = await fetch(`/api/v1/get-book-by-id/${id}`);
      const data = await response.json();
      if (data.data) {
        setBook(data.data);
      }
    } catch (error) {
      console.error("Error fetching book details:", error);
    }
  };

  const handleRatingSubmit = async () => {
    if (!rating) return;

    try {
      await fetch(`/api/v1/add-rating`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ bookid: id, rating }),
      });
      fetchBookDetails();
    } catch (error) {
      console.error("Error adding rating:", error);
    }
  };

  const handleReviewSubmit = async () => {
    if (!review.trim()) return;

    try {
      await fetch(`/api/v1/add-review`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ bookid: id, review }),
      });
      fetchBookDetails();
    } catch (error) {
      console.error("Error adding review:", error);
    }
  };

  if (!book) return <div>Loading...</div>;

  return (
    <div>
      <h1>{book.title}</h1>
      <p>{book.desc}</p>
      <p>Author: {book.author}</p>
      <p>Price: ${book.price}</p>
      <h3>Ratings & Reviews</h3>
      <ul>
        {book.reviews.map((rev, index) => (
          <li key={index}>{rev.review}</li>
        ))}
      </ul>
      <input type="number" min="1" max="5" value={rating} onChange={(e) => setRating(Number(e.target.value))} />
      <button onClick={handleRatingSubmit}>Submit Rating</button>
      <textarea value={review} onChange={(e) => setReview(e.target.value)}></textarea>
      <button onClick={handleReviewSubmit}>Submit Review</button>
    </div>
  );
};

export default BookDetails;
