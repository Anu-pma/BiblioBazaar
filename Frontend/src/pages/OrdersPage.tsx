// import React, { useEffect, useState } from "react";
// import axios from "axios";

// interface Order {
//   _id: string;
//   user?: {
//     username?: string;
//   };
//   items: {
//     book: {
//       title?: string;
//       price?: number;
//     };
//     quantity: number;
//   }[];
//   status: string;
//   total: number;
//   createdAt: string;
// }

// const OrdersPage = () => {
//   const [orders, setOrders] = useState<Order[]>([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState<string | null>(null);
//   const [expandedOrderId, setExpandedOrderId] = useState<string | null>(null);

//   useEffect(() => {
//     const fetchOrders = async () => {
//       try {
//         const token = localStorage.getItem("token");
//         const userId = localStorage.getItem("userId");

//         if (!token || !userId) {
//           setError("Not logged in");
//           return;
//         }

//         const config = {
//           headers: {
//             Authorization: `Bearer ${token}`,
//             id: userId,
//           },
//         };

//         const res = await axios.post(
//           "http://localhost:3000/api/v1/get-order-history",
//           {},
//           config
//         );

//         const ordersData: Order[] = res.data.data;
//         setOrders(ordersData);
//       } catch (err) {
//         console.error(err);
//         setError("Failed to load orders");
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchOrders();
//   }, []);

//   const toggleExpanded = (orderId: string) => {
//     setExpandedOrderId((prev) => (prev === orderId ? null : orderId));
//   };

//   if (loading) return <div className="text-center py-8">Loading...</div>;
//   if (error) return <div className="text-center text-red-500">{error}</div>;
//   if (orders.length === 0)
//     return <div className="text-center py-12">No orders found</div>;

//   return (
//     <div className="max-w-3xl mx-auto p-4">
//       <h2 className="text-2xl font-semibold mb-6 text-gray-800">My Orders</h2>

//       {orders.map((order) => {
//         const firstItem = order.items[0];

//         return (
//           <div
//             key={order._id}
//             className="border border-gray-200 rounded-lg p-4 mb-4 shadow-sm bg-white"
//           >
//             {/* First Book Display */}
//             {firstItem && (
//               <div className="flex justify-between items-center mb-2">
//                 <div className="font-medium text-gray-900 text-base">
//                   {firstItem.book?.title || "Untitled Book"}
//                 </div>
//                 <div className="text-sm text-gray-700 font-semibold">
//                   ₹{(firstItem?.book?.price || 0) * firstItem.quantity}
//                 </div>
//               </div>
//             )}

//             {/* View All Button */}
//             {order.items.length > 1 && (
//               <div className="flex justify-end mb-2">
//                 <button
//                   onClick={() => toggleExpanded(order._id)}
//                   className="text-blue-600 text-sm hover:underline"
//                 >
//                   {expandedOrderId === order._id
//                     ? "Hide Items"
//                     : "View All Items"}
//                 </button>
//               </div>
//             )}

//             {/* Expanded List of Other Items (2nd, 3rd, etc.) */}
//             {expandedOrderId === order._id && (
//               <div className="mt-2 space-y-2">
//                 {order.items.slice(1).map((item, idx) => (
//                   <div
//                     key={idx}
//                     className="flex justify-between text-sm text-gray-700"
//                   >
//                     <div className="font-medium text-gray-900">
//                       {item.book?.title || "Unknown Book"} x{item.quantity}
//                     </div>
//                     <div className="font-medium text-gray-900">
//                       ₹{(item.book?.price || 0) * item.quantity}
//                     </div>
//                   </div>
//                 ))}
//               </div>
//             )}

//             {/* Order ID + Date + Status */}
//             <div className="mt-3 text-sm text-gray-500">
//               Order ID: <span className="font-mono">{order._id}</span>
//             </div>
//             <div className="flex justify-between items-center mt-1">
//               <div className="text-sm text-gray-500">
//                 Placed on: {new Date(order.createdAt).toLocaleDateString()}
//               </div>
//               <div>
//                 <span
//                   className={`px-2 py-1 text-sm rounded-full ${
//                     order.status === "Delivered"
//                       ? "bg-green-100 text-green-800"
//                       : order.status === "Canceled"
//                       ? "bg-red-100 text-red-800"
//                       : "bg-blue-100 text-blue-800"
//                   }`}
//                 >
//                   {order.status}
//                 </span>
//               </div>
//             </div>

//             {/* Total */}
//             <div className="mt-4 text-right font-semibold text-lg text-gray-800">
//               Total: ₹{order.total}
//             </div>
//           </div>
//         );
//       })}
//     </div>
//   );
// };

// export default OrdersPage;

import React, { useEffect, useState } from "react";
import axios from "axios";

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

const OrdersPage = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [expandedOrderId, setExpandedOrderId] = useState<string | null>(null);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const token = localStorage.getItem("token");
        const userId = localStorage.getItem("userId");

        if (!token || !userId) {
          setError("Not logged in");
          return;
        }

        const config = {
          headers: {
            Authorization: `Bearer ${token}`,
            id: userId,
          },
        };

        const res = await axios.post(
          "http://localhost:3000/api/v1/get-order-history",
          {},
          config
        );

        const ordersData: Order[] = res.data.data;
        setOrders(ordersData);
      } catch (err) {
        console.error(err);
        setError("Failed to load orders");
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  const toggleExpanded = (orderId: string) => {
    setExpandedOrderId((prev) => (prev === orderId ? null : orderId));
  };

  if (loading) return <div className="text-center py-8">Loading...</div>;
  if (error) return <div className="text-center text-red-500">{error}</div>;
  if (orders.length === 0)
    return <div className="text-center py-12">No orders found</div>;

  return (
    <div className="max-w-3xl mx-auto p-4">
      <h2 className="text-2xl font-semibold mb-6 text-gray-800">My Orders</h2>

      {orders.map((order) => {
        const firstItem = order.items[0];

        return (
          <div
            key={order._id}
            className="border border-gray-200 rounded-lg p-4 mb-4 shadow-sm bg-white"
          >
            {/* First Book Display with its Price */}
            {firstItem && (
              <div className="flex justify-between items-center mb-2">
                <div className="font-medium text-gray-900 text-base">
                  {firstItem.book?.title || "Untitled Book"} x {firstItem.quantity}
                </div>
                <div className="text-sm text-gray-700 font-semibold">
                  {`INR ${(firstItem?.book?.price || 0) * firstItem.quantity}`}
                </div>
              </div>
            )}

            {/* View All Button */}
            {order.items.length > 1 && expandedOrderId !== order._id && (
              <div className="flex justify-end mb-2">
                <button
                  onClick={() => toggleExpanded(order._id)}
                  className="text-blue-600 text-sm hover:underline"
                >
                  View All Items
                </button>
              </div>
            )}

            {/* Expanded List of Other Items (2nd, 3rd, etc.) */}
            {expandedOrderId === order._id && (
              <div className="mt-2 space-y-2">
                {order.items.slice(1).map((item, idx) => (
                  <div
                    key={idx}
                    className="flex justify-between text-sm text-gray-700"
                  >
                    <div className="font-medium text-gray-900">
                      {item.book?.title || "Unknown Book"} x {item.quantity}
                    </div>
                    <div className="font-medium text-gray-900">
                      {`INR ${(item.book?.price || 0) * item.quantity}`}
                    </div>
                  </div>
                ))}
                {/* Hide Items Button - Displayed After All Items are Visible */}
                <div className="flex justify-end mt-4">
                  <button
                    onClick={() => toggleExpanded(order._id)}
                    className="text-blue-600 text-sm hover:underline"
                  >
                    Hide Items
                  </button>
                </div>
              </div>
            )}

            {/* Order ID + Date + Status */}
            <div className="mt-3 text-sm text-gray-500">
              Order ID: <span className="font-mono">{order._id}</span>
            </div>
            <div className="flex justify-between items-center mt-1">
              <div className="text-sm text-gray-500">
                Placed on: {new Date(order.createdAt).toLocaleDateString()}
              </div>
              <div>
                <span
                  className={`px-2 py-1 text-sm rounded-full ${
                    order.status === "Delivered"
                      ? "bg-green-100 text-green-800"
                      : order.status === "Canceled"
                      ? "bg-red-100 text-red-800"
                      : "bg-blue-100 text-blue-800"
                  }`}
                >
                  {order.status}
                </span>
              </div>
            </div>

            {/* Total */}
            <div className="mt-4 text-right font-semibold text-lg text-gray-800">
              {`INR ${order.total}`}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default OrdersPage;

