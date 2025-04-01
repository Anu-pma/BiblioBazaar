import React from 'react';
import { BookOpen, ShoppingCart, Users, DollarSign } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function AdminDashboard() {
  // Mock data - replace with actual API calls
  const stats = {
    totalBooks: 150,
    totalOrders: 45,
    totalUsers: 89,
    revenue: 2547.99
  };

  const recentOrders = [
    { id: 1, user: 'John Doe', total: 59.99, status: 'Completed', date: '2024-03-15' },
    { id: 2, user: 'Jane Smith', total: 29.99, status: 'Processing', date: '2024-03-14' },
    // Add more orders...
  ];

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-8">Admin Dashboard</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-500">Total Books</p>
              <p className="text-2xl font-bold">{stats.totalBooks}</p>
            </div>
            <BookOpen className="text-blue-500" size={24} />
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-500">Total Orders</p>
              <p className="text-2xl font-bold">{stats.totalOrders}</p>
            </div>
            <ShoppingCart className="text-green-500" size={24} />
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-500">Total Users</p>
              <p className="text-2xl font-bold">{stats.totalUsers}</p>
            </div>
            <Users className="text-purple-500" size={24} />
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-500">Revenue</p>
              <p className="text-2xl font-bold">${stats.revenue.toFixed(2)}</p>
            </div>
            <DollarSign className="text-yellow-500" size={24} />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-bold mb-4">Recent Orders</h2>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="text-left border-b">
                  <th className="pb-3">Order ID</th>
                  <th className="pb-3">Customer</th>
                  <th className="pb-3">Total</th>
                  <th className="pb-3">Status</th>
                  <th className="pb-3">Date</th>
                </tr>
              </thead>
              <tbody>
                {recentOrders.map(order => (
                  <tr key={order.id} className="border-b">
                    <td className="py-3">#{order.id}</td>
                    <td>{order.user}</td>
                    <td>${order.total}</td>
                    <td>
                      <span className={`px-2 py-1 rounded-full text-sm ${
                        order.status === 'Completed' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                      }`}>
                        {order.status}
                      </span>
                    </td>
                    <td>{order.date}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-bold mb-4">Quick Actions</h2>
          <div className="grid grid-cols-2 gap-4">
            <Link
              to="/admin/books/new"
              className="p-4 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors"
            >
              <h3 className="font-semibold">Add New Book</h3>
              <p className="text-sm text-gray-600">Add a new book to the store</p>
            </Link>
            <Link
              to="/admin/orders"
              className="p-4 bg-green-50 rounded-lg hover:bg-green-100 transition-colors"
            >
              <h3 className="font-semibold">Manage Orders</h3>
              <p className="text-sm text-gray-600">View and update order status</p>
            </Link>
            <Link
              to="/admin/users"
              className="p-4 bg-purple-50 rounded-lg hover:bg-purple-100 transition-colors"
            >
              <h3 className="font-semibold">Manage Users</h3>
              <p className="text-sm text-gray-600">View and manage user accounts</p>
            </Link>
            <Link
              to="/admin/books"
              className="p-4 bg-yellow-50 rounded-lg hover:bg-yellow-100 transition-colors"
            >
              <h3 className="font-semibold">Manage Books</h3>
              <p className="text-sm text-gray-600">Edit or remove existing books</p>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}