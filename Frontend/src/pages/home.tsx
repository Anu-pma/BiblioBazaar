import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Link, useNavigate } from "react-router-dom";

interface Book {
  _id: string;
  url: string;
  title: string;
  author: string;
  price: number;
}

export function Home() {
  const [recentBooks, setRecentBooks] = useState<Book[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchRecentBooks = async () => {
      try {
        const response = await fetch("http://localhost:3000/api/v1/get-recent-books");
        const data = await response.json();
        if (data.status === "Success") {
          setRecentBooks(data.data as Book[]);
        }
      } catch (error) {
        console.error("Error fetching recent books:", error);
      }
    };
    fetchRecentBooks();
  }, []);

  return (
    <section className="space-y-6 pb-8 pt-6 md:pb-12 md:pt-10 lg:py-32">
      <motion.div 
        className="container flex max-w-[64rem] flex-col items-center gap-4 text-center"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="font-heading text-3xl sm:text-5xl md:text-6xl lg:text-7xl">
          Welcome to BiblioBazaar
        </h1>
        <p className="max-w-[42rem] leading-normal text-muted-foreground sm:text-xl sm:leading-8">
          Your digital bookstore for discovering, reading, and managing your favorite books.
        </p>

        <div className="space-x-4">
          <Link to="/books">
            <Button
              size="lg"
              className="transition-transform duration-300 hover:-translate-y-1 hover:shadow-lg"
            >
              Browse Books
            </Button>
          </Link>
          <Link to="/learnMore">
            <Button
              variant="ghost"
              size="lg"
              className="bg-white text-black border border-black transition-transform duration-300 hover:-translate-y-1 hover:shadow-lg"
            >
              Learn More
            </Button>
          </Link>
        </div>
      </motion.div>

      {/* Display recent books */}
      <div className="container max-w-[64rem] mx-auto mt-10">
        <h2 className="text-2xl font-semibold text-center mb-4">Recently Added Books</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {recentBooks.map((book) => (
            <div key={book._id} className="p-4 border rounded-lg shadow-md">
              <img src={book.url} alt={book.title} className="w-full h-40 object-contain rounded-md mb-2" />
              <h3 className="text-lg font-semibold">{book.title}</h3>
              <p className="text-sm text-gray-600">{book.author}</p>
              <p className="text-gray-700 mt-2">₹{book.price}</p>
              <Button
                onClick={() => navigate(`/books/${book._id}`)}
                size="sm"
                className="mt-3 transition-transform duration-300 hover:scale-105"
              >
                View Details
              </Button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
