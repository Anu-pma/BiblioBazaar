import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

export type Book = {
  rating: any;
  _id: string;
  url: string;
  title: string;
  author: string;
  category: string;
  price: number;
  stock: number;
  desc: string;
  language: string;
  ratings: { id: string; rating: number }[] | [];
  reviews: { id: string; review: string }[] | [];
  createdAt?: string;
  updatedAt?: string;
};

export default function BookForm() {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEditing = Boolean(id);

  const [formData, setFormData] = useState<Partial<Book>>({
    title: "",
    author: "",
    price: 0,
    desc: "",
    url: "",
    category: "",
    stock: 0,
  });

  useEffect(() => {
    if (isEditing) {
      fetchBook();
    }
  }, [isEditing]);

  const fetchBook = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(
        `http://localhost:3000/api/v1/get-book-by-id/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!response.ok) throw new Error("Failed to fetch book");

      const data = await response.json();
      if (data.status === "Success") {
        setFormData({
          title: data.data.title,
          author: data.data.author,
          price: data.data.price,
          desc: data.data.desc,
          url: data.data.url,
          category: data.data.category,
          language: data.data.language,
          stock: data.data.stock,
          ratings: data.data.ratings,
          reviews: data.data.reviews,
        });
      }
    } catch (error) {
      console.error("Error fetching book:", error);
      toast.error("Failed to load book details");
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const token = localStorage.getItem("token");
      const userId = localStorage.getItem("userId");

      const endpoint = isEditing ? "update-book" : "add-book";
      const method = isEditing ? "PUT" : "POST";

      const headers: HeadersInit = {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
        id: userId!,
      };

      if (isEditing) {
        headers["bookid"] = id!;
      }

      const response = await fetch(`http://localhost:3000/api/v1/${endpoint}`, {
        method,
        headers,
        body: JSON.stringify({
          title: formData.title,
          author: formData.author,
          price: formData.price,
          category: formData.category,
          stock: formData.stock,
          desc: formData.desc,
          url: formData.url,
          language: formData.language,
          ratings: formData.ratings,
          reviews: formData.reviews,
        }),
      });

      if (!response.ok) throw new Error("Failed to save book");

      const data = await response.json();
      toast.success(data.message);
      navigate("/admin/books/managebooks");
    } catch (error) {
      console.error("Error saving book:", error);
      toast.error("Failed to save book");
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-8">
        {isEditing ? "Edit Book" : "Add New Book"}
      </h1>

      <form
        onSubmit={handleSubmit}
        className="max-w-2xl bg-white p-6 rounded-lg shadow-md"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Title
            </label>
            <input
              type="text"
              value={formData.title}
              onChange={(e) =>
                setFormData({ ...formData, title: e.target.value })
              }
              className="w-full px-3 py-2 border rounded-lg"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Author
            </label>
            <input
              type="text"
              value={formData.author}
              onChange={(e) =>
                setFormData({ ...formData, author: e.target.value })
              }
              className="w-full px-3 py-2 border rounded-lg"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Language
            </label>
            <input
              type="text"
              value={formData.language}
              onChange={(e) =>
                setFormData({ ...formData, language: e.target.value })
              }
              className="w-full px-3 py-2 border rounded-lg"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Category
            </label>
            <input
              type="text"
              value={formData.category}
              onChange={(e) =>
                setFormData({ ...formData, category: e.target.value })
              }
              className="w-full px-3 py-2 border rounded-lg"
              required
              placeholder="e.g., Fiction, Non-Fiction"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Price
            </label>
            <input
              type="number"
              step="0.01"
              value={formData.price ?? 0}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  price: parseFloat(e.target.value) || 0,
                })
              }
              className="w-full px-3 py-2 border rounded-lg"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Stock
            </label>
            <input
              type="number"
              min={0}
              value={formData.stock ?? 0}
              onChange={(e) => {
                    const value = Math.max(0, parseInt(e.target.value) || 0);
                    setFormData({ ...formData, stock: value });
                 }}
              className="w-full px-3 py-2 border rounded-lg"
              required
            />
          </div>

          <div className="col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Cover Image URL
            </label>
            <input
              type="url"
              value={formData.url}
              onChange={(e) =>
                setFormData({ ...formData, url: e.target.value })
              }
              className="w-full px-3 py-2 border rounded-lg"
              required
            />
          </div>

          <div className="col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              desc
            </label>
            <textarea
              value={formData.desc}
              onChange={(e) =>
                setFormData({ ...formData, desc: e.target.value })
              }
              className="w-full px-3 py-2 border rounded-lg"
              rows={4}
              required
            />
          </div>
        </div>

        <div className="mt-6 flex gap-4">
          <button
            type="submit"
            className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700"
          >
            {isEditing ? "Update Book" : "Add Book"}
          </button>
          <button
            type="button"
            onClick={() => navigate("/admin/books/managebooks")}
            className="bg-gray-100 text-gray-800 px-6 py-2 rounded-lg hover:bg-gray-200"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}
