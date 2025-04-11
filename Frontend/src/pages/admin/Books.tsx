import React, { useState, useEffect } from 'react';
import { Plus, Search, Edit2, Trash2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import toast from 'react-hot-toast';

export type Book = {
    rating: any;
    _id: string; // MongoDB uses `__id`
    url: string;
    title: string;
    author: string;
    category: string;
    price: number;
    stock:number;
    desc: string;
    language: string;
    ratings: { _id: string; rating: number }[] | []; // Ensure it's an array
    reviews: { _id: string; review: string }[] | []; // Ensure it's an array
    createdAt?: string;
    updatedAt?: string;
  };

export default function AdminBooks() {
  const [books, setBooks] = useState<Book[]>([]);
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  useEffect(() => {
    fetchBooks();
  }, []);

  const fetchBooks = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch('http://localhost:5000/api/v1/get-all-books', {
        headers: {
          'Authorization': `Bearer ${token}`,
        }
      });

      if (!response.ok) throw new Error('Failed to fetch books');

      const data = await response.json();
      if (data.status === 'Success') {
        setBooks(data.data.map((book: any) => ({
          _id: book.__id,
          title: book.title,
          author: book.author,
          price: book.price,
          description: book.desc,
          url: book.url,
          category: book.language,
          rating: book.ratings.length > 0 
            ? book.ratings.reduce((acc: number, curr: any) => acc + curr.rating, 0) / book.ratings.length 
            : 0,
          stock: 10 // Add stock management if needed
        })));
      }
    } catch (error) {
      console.error('Error fetching books:', error);
      toast.error('Failed to load books');
    }
  };

  const handleDeleteBook = async (book_id: string) => {
    try {
      const token = localStorage.getItem('token');
      const user_id = localStorage.getItem('user_id');

      const response = await fetch('http://localhost:5000/api/v1/delete-book', {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`,
          '_id': user_id!,
          'book_id': book_id
        }
      });

      if (!response.ok) throw new Error('Failed to delete book');

      const data = await response.json();
      toast.success(data.message);
      fetchBooks(); // Refresh the book list
    } catch (error) {
      console.error('Error deleting book:', error);
      toast.error('Failed to delete book');
    }
  };

  const filteredBooks = books.filter(book => 
    (book.title.toLowerCase().includes(search.toLowerCase()) ||
    book.author.toLowerCase().includes(search.toLowerCase())) &&
    (selectedCategory === 'all' || book.category === selectedCategory)
  );

  const categories = [...new Set(books.map(book => book.category))];

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Manage Books</h1>
        <Link
          to="/admin/books/new"
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 flex items-center gap-2"
        >
          <Plus size={20} />
          Add New Book
        </Link>
      </div>

      <div className="flex gap-4 mb-6">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Search books..."
            className="w-full pl-10 pr-4 py-2 border rounded-lg"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        
        <select
          className="px-4 py-2 border rounded-lg"
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
        >
          <option value="all">All Categories</option>
          {categories.map(category => (
            <option key={category} value={category}>{category}</option>
          ))}
        </select>
      </div>

      <div className="bg-white rounded-lg shadow-md overflow-h_idden">
        <table className="w-full">
          <thead>
            <tr className="bg-gray-50 text-left">
              <th className="px-6 py-3">Book</th>
              <th className="px-6 py-3">Author</th>
              <th className="px-6 py-3">Category</th>
              <th className="px-6 py-3">Price</th>
              <th className="px-6 py-3">Rating</th>
              <th className="px-6 py-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredBooks.map(book => (
              <tr key={book._id} className="border-t">
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <img
                      src={book.url}
                      alt={book.title}
                      className="w-12 h-16 object-cover rounded"
                    />
                    <span className="font-medium">{book.title}</span>
                  </div>
                </td>
                <td className="px-6 py-4">{book.author}</td>
                <td className="px-6 py-4">{book.category}</td>
                <td className="px-6 py-4">${book.price.toFixed(2)}</td>
                <td className="px-6 py-4">{book.rating.toFixed(1)}</td>
                <td className="px-6 py-4">
                  <div className="flex gap-2">
                    <Link
                      to={`/admin/books/edit/${book._id}`}
                      className="p-2 text-blue-600 hover:bg-blue-50 rounded"
                    >
                      <Edit2 size={20} />
                    </Link>
                    <button
                      onClick={() => handleDeleteBook(book._id)}
                      className="p-2 text-red-600 hover:bg-red-50 rounded"
                    >
                      <Trash2 size={20} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}