import { useEffect, useState } from 'react';
import { Users, ChevronDown, ChevronUp } from 'lucide-react';
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

interface AuthorBooks {
  author: string;
  books: Book[];
}

function AuthorsPage() {
  const [authorBooks, setAuthorBooks] = useState<AuthorBooks[]>([]);
  const [expandedAuthors, setExpandedAuthors] = useState<{ [author: string]: boolean }>({});
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchBooks();
  }, []);

  const fetchBooks = async () => {
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/v1/get-all-books`);
      const data = await response.json();

      if (data.status === "Success") {
        const booksByAuthor = data.data.reduce((acc: { [key: string]: Book[] }, book: Book) => {
          if (!acc[book.author]) acc[book.author] = [];
          acc[book.author].push(book);
          return acc;
        }, {});

        const authorsList = Object.entries(booksByAuthor).map(([author, books]) => ({
          author,
          books: books as Book[],
        }));

        setAuthorBooks(authorsList);
      } else {
        setError("Failed to fetch Authors");
      }
    } catch (err) {
      console.error("Fetch error:", err);
      setError("An error occurred while fetching the data");
    } finally {
      setLoading(false);
    }
  };

  const toggleAuthor = (author: string) => {
    setExpandedAuthors(prev => ({
      ...prev,
      [author]: !prev[author],
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
          <Users className="mx-auto h-12 w-12 text-blue-500" />
          <h1 className="mt-4 text-4xl font-bold text-gray-900">Our Authors</h1>
          <p className="mt-2 text-lg text-gray-600">Discover amazing authors and their works</p>
        </div>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {authorBooks.map((authorData) => {
            const [firstBook, ...otherBooks] = authorData.books;
            const isExpanded = expandedAuthors[authorData.author];

            return (
              <div
                key={authorData.author}
                className="bg-white rounded-lg shadow-md overflow-hidden transition-transform transform hover:scale-105 hover:shadow-lg duration-300"
              >
                <div className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h2 className="text-xl font-semibold text-gray-900">{authorData.author}</h2>
                    <button onClick={() => toggleAuthor(authorData.author)} className="text-blue-500">
                      {isExpanded ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                    </button>
                  </div>

                  <p className="text-sm text-gray-600 mb-4">
                    {authorData.books.length} {authorData.books.length === 1 ? 'Book' : 'Books'}
                  </p>

                  {/* Always show the first book */}
                  <div key={firstBook._id} className="border-l-4 border-blue-500 pl-4 mb-4">
                    <h3 className="text-lg font-medium text-gray-900">{firstBook.title}</h3>
                    <p className="text-sm text-gray-600">{firstBook.language} • {firstBook.category}</p>
                    <p className="text-sm font-medium text-blue-600">₹{firstBook.price}</p>
                    <button
                      onClick={() => navigate(`/books/${firstBook._id}`)}
                      className="mt-2 text-sm text-white bg-blue-500 hover:bg-blue-600 px-3 py-1 rounded"
                    >
                      View Details
                    </button>
                  </div>

                  {/* Conditionally show the rest */}
                  {isExpanded && otherBooks.map((book) => (
                    <div key={book._id} className="border-l-4 border-blue-500 pl-4 mb-4">
                      <h3 className="text-lg font-medium text-gray-900">{book.title}</h3>
                      <p className="text-sm text-gray-600">{book.language} • {book.category}</p>
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

export default AuthorsPage;
