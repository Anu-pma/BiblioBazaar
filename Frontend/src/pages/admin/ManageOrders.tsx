import React, { useEffect, useState } from 'react';
import {
  Package, Search, Filter, RefreshCcw,
  AlertCircle, TrendingUp, ShoppingBag,
  Clock, CheckCircle
} from 'lucide-react';
import { Toaster, toast } from 'react-hot-toast';

interface Order {
  _id: string;
  user?: {
    username?: string;
  };
  items: {
    book: {
      title?: string;
      price?: number;
    };
    quantity: number;
  }[];
  status: string;
  total: number;
  createdAt: string;
}

interface OrderStats {
  totalOrders: number;
  totalRevenue: number;
  pendingOrders: number;
  deliveredOrders: number;
}

function ManageOrders() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [stats, setStats] = useState<OrderStats>({
    totalOrders: 0,
    totalRevenue: 0,
    pendingOrders: 0,
    deliveredOrders: 0
  });
  const [showBooks, setShowBooks] = useState<{ [key: string]: boolean }>({});

  const fetchOrders = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch('http://localhost:3000/api/v1/get-all-orders', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        }
      });
      const data = await response.json();
      if (data.status === "Success") {
        setOrders(data.data);

        const totalRevenue = data.data.reduce((sum: number, order: Order) => sum + (order.total || 0), 0);
        const pendingOrders = data.data.filter((order: Order) => order.status !== 'Delivered' && order.status !== 'Canceled').length;
        const deliveredOrders = data.data.filter((order: Order) => order.status === 'Delivered').length;

        setStats({
          totalOrders: data.data.length,
          totalRevenue,
          pendingOrders,
          deliveredOrders
        });
      }
    } catch (error) {
      console.error('Error fetching orders:', error);
      toast.error('Failed to fetch orders');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const updateOrderStatus = async (orderId: string, newStatus: string) => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch('http://localhost:3000/api/v1/update-status', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
          'id': orderId
        },
        body: JSON.stringify({ status: newStatus })
      });

      if (response.ok) {
        setOrders(orders.map(order =>
          order._id === orderId ? { ...order, status: newStatus } : order
        ));
        toast.success('Order status updated successfully');
        fetchOrders();
      }
    } catch (error) {
      console.error('Error updating order status:', error);
      toast.error('Failed to update order status');
    }
  };

  const toggleShowBooks = (orderId: string) => {
    setShowBooks((prev) => ({
      ...prev,
      [orderId]: !prev[orderId],
    }));
  };

  const filteredOrders = orders.filter(order => {
    const matchesSearch = order.user?.username?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order._id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.items.some(item => item.book?.title?.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesStatus = statusFilter === 'all' || order.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const statusOptions = ["Order Placed", "Out for Delivery", "Delivered", "Canceled"];

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin">
          <RefreshCcw className="w-8 h-8 text-blue-500" />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <Toaster position="top-right" />
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="bg-blue-600 p-2 rounded-lg">
              <Package className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Order Management</h1>
              <p className="text-sm text-gray-500">Monitor and manage all customer orders</p>
            </div>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <StatCard icon={<ShoppingBag className="w-6 h-6 text-blue-600" />} title="Total Orders" value={stats.totalOrders} color="blue" />
          <StatCard icon={<TrendingUp className="w-6 h-6 text-green-600" />} title="Revenue" value={`₹${stats.totalRevenue.toFixed(2)}`} color="green" />
          <StatCard icon={<Clock className="w-6 h-6 text-yellow-600" />} title="Pending" value={stats.pendingOrders} color="yellow" />
          <StatCard icon={<CheckCircle className="w-6 h-6 text-green-600" />} title="Delivered" value={stats.deliveredOrders} color="green" />
        </div>

        {/* Search and Filters */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search orders by ID, customer, or book title..."
                className="pl-10 pr-4 py-2 w-full border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div className="flex items-center gap-2">
              <Filter className="w-5 h-5 text-gray-400" />
              <select
                className="border border-gray-200 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white"
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
              >
                <option value="all">All Status</option>
                {statusOptions.map(status => (
                  <option key={status} value={status}>{status}</option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Orders Table */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <TableHeader>Order ID</TableHeader>
                  <TableHeader>Customer</TableHeader>
                  <TableHeader>Books</TableHeader>
                  <TableHeader>Total</TableHeader>
                  <TableHeader>Status</TableHeader>
                  <TableHeader>Date</TableHeader>
                  <TableHeader>Actions</TableHeader>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredOrders.length === 0 ? (
                  <tr>
                    <td colSpan={7} className="px-6 py-8 text-center text-gray-500">
                      <div className="flex flex-col items-center gap-2">
                        <AlertCircle className="w-6 h-6" />
                        <p>No orders found</p>
                        <p className="text-sm text-gray-400">Try adjusting your search or filter</p>
                      </div>
                    </td>
                  </tr>
                ) : (
                  filteredOrders.map((order) => (
                    <tr key={order._id} className="hover:bg-gray-50 transition-colors">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="text-sm font-medium text-gray-900">#{order._id.slice(-6)}</span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{order.user?.username || "Unknown"}</td>
                      
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        <div>{order.items[0]?.book?.title} x {order.items[0]?.quantity}</div>

                        {order.items.length > 1 && !showBooks[order._id] && (
                          <button
                            onClick={() => toggleShowBooks(order._id)}
                            className="text-blue-500 text-sm mt-2 block"
                          >
                            View All Books
                          </button>
                        )}

                        {showBooks[order._id] && (
                          <>
                            <ul className="mt-2 text-sm text-gray-500">
                              {order.items.slice(1).map((item, index) => (
                                <li key={index}>
                                  {item?.book ? `${item.book.title} x${item.quantity}` : 'No book info'}
                                </li>
                              ))}
                            </ul>
                            <button
                              onClick={() => toggleShowBooks(order._id)}
                              className="text-blue-500 text-sm mt-2 block"
                            >
                              Hide Books
                            </button>
                          </>
                        )}
                      </td>

                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">₹{order.total?.toFixed(2)}</td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full
                          ${order.status === 'Delivered' ? 'bg-green-100 text-green-800' :
                          order.status === 'Canceled' ? 'bg-red-100 text-red-800' :
                          order.status === 'Out for Delivery' ? 'bg-blue-100 text-blue-800' :
                          'bg-yellow-100 text-yellow-800'}`}>
                          {order.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {new Date(order.createdAt).toLocaleDateString('en-US', {
                          year: 'numeric', month: 'short', day: 'numeric'
                        })}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <select
                          className="text-sm border border-gray-200 rounded-md px-3 py-1 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
                          value={order.status}
                          onChange={(e) => updateOrderStatus(order._id, e.target.value)}
                        >
                          {statusOptions.map(status => (
                            <option key={status} value={status}>{status}</option>
                          ))}
                        </select>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

// Reusable Components
const StatCard = ({ icon, title, value, color }: { icon: React.ReactNode; title: string; value: string | number; color: string }) => (
  <div className={`flex items-center p-4 rounded-lg shadow-lg bg-${color}-100`}>
    <div className={`bg-${color}-500 p-2 rounded-lg`}>
      {icon}
    </div>
    <div className="ml-4">
      <h3 className="text-sm font-semibold text-gray-900">{title}</h3>
      <p className="text-lg font-bold text-gray-800">{value}</p>
    </div>
  </div>
);

const TableHeader = ({ children }: { children: React.ReactNode }) => (
  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
    {children}
  </th>
);

export default ManageOrders;