import React, { useEffect, useState } from 'react';
import { BookOpen } from 'lucide-react';

export type Book = {
  rating: any;
  _id: string;
  url: string;
  title: string;
  author: string;
  price: number;
  desc: string;
  language: string;
  category: string;
  ratings: { id: string; rating: number }[] | [];
  reviews: { id: string; review: string }[] | [];
  createdAt?: string;
  updatedAt?: string;
};

interface CategoryBooks {
  category: string;
  books: Book[];
}

function CategoriesPage() {
  const [categoryBooks, setCategoryBooks] = useState<CategoryBooks[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchBooks();
  }, []);

  const fetchBooks = async () => {
    try {
      const response = await fetch('http://localhost:3000/api/v1/get-all-books');
      const data = await response.json();

      if (data.status === "Success") {
        const booksByCategory = data.data.reduce((acc: { [key: string]: Book[] }, book: Book) => {
          if (!acc[book.category]) acc[book.category] = [];
          acc[book.category].push(book);
          return acc;
        }, {});

        const categoriesList = Object.entries(booksByCategory).map(([category, books]) => ({
          category,
          books: books as Book[],
        }));

        setCategoryBooks(categoriesList);
      } else {
        setError("Failed to fetch Categories");
      }
    } catch (err) {
      console.error("Fetch error:", err);
      setError("An error occurred while fetching the data");
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-red-500">{error}</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <BookOpen className="mx-auto h-12 w-12 text-blue-500" />
          <h1 className="mt-4 text-4xl font-bold text-gray-900">Book Categories</h1>
          <p className="mt-2 text-lg text-gray-600">Explore books grouped by genre and subject</p>
        </div>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {categoryBooks.map((categoryData) => (
            <div
              key={categoryData.category}
              className="bg-white rounded-lg shadow-md overflow-hidden transition-transform transform hover:scale-105 hover:shadow-lg duration-300"
            >
              <div className="p-6">
                <h2 className="text-xl font-semibold text-gray-900 mb-4">{categoryData.category}</h2>
                <p className="text-sm text-gray-600 mb-4">
                  {categoryData.books.length} {categoryData.books.length === 1 ? 'Book' : 'Books'}
                </p>
                <div className="space-y-2">
                  {categoryData.books.map((book) => (
                    <div key={book._id} className="border-l-4 border-blue-500 pl-4">
                      <h3 className="text-lg font-medium text-gray-900">{book.title}</h3>
                      <p className="text-sm text-gray-600">{book.language} • {book.author}</p>
                      <p className="text-sm font-medium text-blue-600">₹{book.price}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default CategoriesPage;
