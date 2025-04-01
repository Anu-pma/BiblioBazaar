import React from 'react';
import { useAuth } from '../../context/AuthContext';
import { ShoppingBag, Heart, Clock, Settings } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function UserDashboard() {
  const { user } = useAuth();

  const activities = [
    { id: 1, type: 'purchase', book: 'The Great Gatsby', date: '2024-03-15' },
    { id: 2, type: 'favorite', book: '1984', date: '2024-03-14' },
    // Add more activities...
  ];

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold">Welcome back!</h1>
        <p className="text-gray-600">{user?.email}</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-500">Orders</p>
              <p className="text-2xl font-bold">3</p>
            </div>
            <ShoppingBag className="text-blue-500" size={24} />
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-500">Favorites</p>
              <p className="text-2xl font-bold">12</p>
            </div>
            <Heart className="text-red-500" size={24} />
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-500">Reading List</p>
              <p className="text-2xl font-bold">5</p>
            </div>
            <Clock className="text-green-500" size={24} />
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-500">Reviews</p>
              <p className="text-2xl font-bold">8</p>
            </div>
            <Settings className="text-purple-500" size={24} />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-bold mb-4">Recent Activity</h2>
          <div className="space-y-4">
            {activities.map(activity => (
              <div key={activity.id} className="flex items-center justify-between border-b pb-4">
                <div>
                  <p className="font-medium">{activity.book}</p>
                  <p className="text-sm text-gray-500">
                    {activity.type === 'purchase' ? 'Purchased' : 'Added to favorites'}
                  </p>
                </div>
                <p className="text-sm text-gray-500">{activity.date}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-bold mb-4">Quick Actions</h2>
          <div className="grid grid-cols-2 gap-4">
            <Link
              to="/books"
              className="p-4 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors"
            >
              <h3 className="font-semibold">Browse Books</h3>
              <p className="text-sm text-gray-600">Discover new titles</p>
            </Link>
            <Link
              to="/favorites"
              className="p-4 bg-red-50 rounded-lg hover:bg-red-100 transition-colors"
            >
              <h3 className="font-semibold">My Favorites</h3>
              <p className="text-sm text-gray-600">View saved books</p>
            </Link>
            <Link
              to="/orders"
              className="p-4 bg-green-50 rounded-lg hover:bg-green-100 transition-colors"
            >
              <h3 className="font-semibold">Order History</h3>
              <p className="text-sm text-gray-600">View past purchases</p>
            </Link>
            <Link
              to="/profile"
              className="p-4 bg-purple-50 rounded-lg hover:bg-purple-100 transition-colors"
            >
              <h3 className="font-semibold">Profile Settings</h3>
              <p className="text-sm text-gray-600">Update your information</p>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

