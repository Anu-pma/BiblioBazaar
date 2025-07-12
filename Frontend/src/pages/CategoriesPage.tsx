import { useEffect, useState } from 'react';
import { BookOpenCheck, ChevronDown, ChevronUp } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

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
  const [expandedCategories, setExpandedCategories] = useState<{ [category: string]: boolean }>({});
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchBooks();
  }, []);

  const fetchBooks = async () => {
    try {
      const response = await fetch('${import.meta.env.VITE_API_URL}/api/v1/get-all-books');
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

  const toggleCategory = (category: string) => {
    setExpandedCategories(prev => ({
      ...prev,
      [category]: !prev[category],
    }));
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
          <BookOpenCheck className="mx-auto h-12 w-12 text-blue-500" />
          <h1 className="mt-4 text-4xl font-bold text-gray-900">Book Categories</h1>
          <p className="mt-2 text-lg text-gray-600">Explore books grouped by category</p>
        </div>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {categoryBooks.map((categoryData) => {
            const [firstBook, ...otherBooks] = categoryData.books;
            const isExpanded = expandedCategories[categoryData.category];

            return (
              <div
                key={categoryData.category}
                className="bg-white rounded-lg shadow-md overflow-hidden transition-transform transform hover:scale-105 hover:shadow-lg duration-300"
              >
                <div className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h2 className="text-xl font-semibold text-gray-900">{categoryData.category}</h2>
                    <button onClick={() => toggleCategory(categoryData.category)} className="text-blue-500">
                      {isExpanded ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                    </button>
                  </div>

                  <p className="text-sm text-gray-600 mb-4">
                    {categoryData.books.length} {categoryData.books.length === 1 ? 'Book' : 'Books'}
                  </p>

                  <div key={firstBook._id} className="border-l-4 border-blue-500 pl-4 mb-4">
                    <h3 className="text-lg font-medium text-gray-900">{firstBook.title}</h3>
                    <p className="text-sm text-gray-600">{firstBook.language} • {firstBook.author}</p>
                    <p className="text-sm font-medium text-blue-600">₹{firstBook.price}</p>
                    <button
                      onClick={() => navigate(`/books/${firstBook._id}`)}
                      className="mt-2 text-sm text-white bg-blue-500 hover:bg-blue-600 px-3 py-1 rounded"
                    >
                      View Details
                    </button>
                  </div>

                  {isExpanded && otherBooks.map((book) => (
                    <div key={book._id} className="border-l-4 border-blue-500 pl-4 mb-4">
                      <h3 className="text-lg font-medium text-gray-900">{book.title}</h3>
                      <p className="text-sm text-gray-600">{book.language} • {book.author}</p>
                      <p className="text-sm font-medium text-blue-600">₹{book.price}</p>
                      <button
                        onClick={() => navigate(`/books/${book._id}`)}
                        className="mt-2 text-sm text-white bg-blue-500 hover:bg-blue-600 px-3 py-1 rounded"
                      >
                        View Details
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default CategoriesPage;