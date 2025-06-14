import React, { useEffect, useState } from 'react';
import { BookOpen, ShoppingCart, Users, DollarSign } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '@/context/AuthContext';

type Stats = {
  totalBooks: number;
  totalOrders: number;
  totalUsers: number;
  revenue: number;
};

type Order = {
  _id: string;
  user: string;
  total: number;
  status: string;
  date: string;
};

export default function AdminDashboard() {
  const [stats, setStats] = useState<Stats>({
    totalBooks: 0,
    totalOrders: 0,
    totalUsers: 0,
    revenue: 0,
  });

  const { signOut } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    signOut(); // Clear user context & token
    navigate('/signin'); 
  };

  const [recentOrders, setRecentOrders] = useState<Order[]>([]);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const statsRes = await axios.get("http://localhost:3000/api/v1/stats");
        const ordersRes = await axios.get("http://localhost:3000/api/v1/orders/recent");

        setStats(statsRes.data);
        setRecentOrders(ordersRes.data);
      } catch (error) {
        console.error('Error fetching dashboard data:', error);
      }
    };

    fetchDashboardData();
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-8">Admin Dashboard</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <DashboardCard label="Total Books" value={stats.totalBooks} icon={<BookOpen className="text-blue-500" size={24} />} />
        <DashboardCard label="Total Orders" value={stats.totalOrders} icon={<ShoppingCart className="text-green-500" size={24} />} />
        <DashboardCard label="Total Users" value={stats.totalUsers} icon={<Users className="text-purple-500" size={24} />} />
        <DashboardCard
          label="Revenue"
          value={`₹${typeof stats.revenue === 'number' ? stats.revenue.toFixed(2) : '0.00'}`}
          icon={<span className="text-yellow-500 text-xl">₹</span>}
        />
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
                  <tr key={order._id} className="border-b">
                    <td className="py-3">#{order._id}</td>
                    <td>{order.user}</td>
                    <td>{`₹${typeof order.total === 'number' ? order.total.toFixed(2) : '0.00'}`}</td>
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
              to="/admin/books/manageorders"
              className="p-4 bg-green-50 rounded-lg hover:bg-green-100 transition-colors"
            >
              <h3 className="font-semibold">Manage Orders</h3>
              <p className="text-sm text-gray-600">View and update order status</p>
            </Link>

            <Link
              to="/admin/books/managebooks"
              className="p-4 bg-yellow-50 rounded-lg hover:bg-yellow-100 transition-colors"
            >
              <h3 className="font-semibold">Manage Books</h3>
              <p className="text-sm text-gray-600">Edit or remove existing books</p>
            </Link>

            <div
              onClick={handleLogout}
              className="p-4 bg-red-50 rounded-lg hover:bg-red-100 transition-colors cursor-pointer"
            >
              <h3 className="font-semibold">Sign Out</h3>
              <p className="text-sm text-gray-600">Log out of the admin panel</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// Reusable UI components
const DashboardCard = ({ label, value, icon }: { label: string; value: number | string; icon: React.ReactNode }) => (
  <div className="bg-white p-6 rounded-lg shadow-md">
    <div className="flex items-center justify-between">
      <div>
        <p className="text-gray-500">{label}</p>
        <p className="text-2xl font-bold">{value}</p>
      </div>
      {icon}
    </div>
  </div>
);
