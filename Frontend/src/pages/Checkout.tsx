import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import axios from 'axios';
import { CheckCircle, AlertCircle } from 'lucide-react';

interface ShippingDetails {
  fullName: string;
  address: string;
  city: string;
  state: string;
  zipCode: string;
  phone: string;
}

const stateCityMap: { [key: string]: string[] } = {
  'Uttar Pradesh': ['Prayagraj', 'Lucknow', 'Kanpur'],
  'Maharashtra': ['Mumbai', 'Pune', 'Nagpur'],
  'Delhi': ['New Delhi'],
};

export default function Checkout() {
  const navigate = useNavigate();
  const { items, total, clearCart } = useCart();
  const [loading, setLoading] = useState(false);
  const [orderSuccess, setOrderSuccess] = useState(false);
  const [error, setError] = useState('');

  const [shippingDetails, setShippingDetails] = useState<ShippingDetails>({
    fullName: '',
    address: '',
    city: '',
    state: '',
    zipCode: '',
    phone: '',
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;

    if (name === 'state') {
      setShippingDetails(prev => ({
        ...prev,
        state: value,
        city: '' // reset city when state changes
      }));
    } else {
      setShippingDetails(prev => ({
        ...prev,
        [name]: value
      }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    // Phone validation
    if (!/^\d{10}$/.test(shippingDetails.phone)) {
      setError("Please enter a valid 10-digit phone number.");
      setLoading(false);
      return;
    }

    try {
      const token = localStorage.getItem('token');
      const userId = localStorage.getItem('userId');

      const orderItems = items.map(item => ({
        _id: item._id,
        quantity: item.quantity,
        price: item.price,
        total: item.price * item.quantity 
        
      }));

      const overallTotal = orderItems.reduce((sum, item) => sum + item.total, 0);

      const response = await axios.post('http://localhost:3000/api/v1/place-order', {
        order: orderItems,
        total: overallTotal // send overall total
      }, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'id': userId,
          'Content-Type': 'application/json'
        }
      });

      if (response.data.status === "Success") {
        setOrderSuccess(true);
        clearCart();

        try {
          await axios.patch(`http://localhost:3000/api/v1/users/${userId}`, {
            address: `${shippingDetails.address}, ${shippingDetails.city}, ${shippingDetails.state} ${shippingDetails.zipCode}`
          }, {
            headers: {
              'Authorization': `Bearer ${token}`,
              'Content-Type': 'application/json'
            }
          });
        } catch (addressError) {
          console.error('Failed to update address:', addressError);
        }
      }
    } catch (err: any) {
      setError(err.response?.data?.message || 'Failed to place order. Please try again.');
      console.error('Order placement error:', err);
    } finally {
      setLoading(false);
    }
  };

  if (orderSuccess) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <div className="bg-white p-8 rounded-lg shadow-md max-w-md mx-auto">
          <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
          <h2 className="text-2xl font-bold mb-4">Order Placed Successfully!</h2>
          <p className="text-gray-600 mb-8">Thank you for your purchase.</p>
          <button
            onClick={() => navigate('/orders')}
            className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700"
          >
            View Orders
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <h1 className="text-3xl font-bold mb-8">Checkout</h1>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h2 className="text-xl font-semibold mb-4">Shipping Details</h2>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Full Name
                  </label>
                  <input
                    type="text"
                    name="fullName"
                    required
                    value={shippingDetails.fullName}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Address
                  </label>
                  <input
                    type="text"
                    name="address"
                    required
                    value={shippingDetails.address}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      State
                    </label>
                    <select
                      name="state"
                      required
                      value={shippingDetails.state}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="">Select State</option>
                      {Object.keys(stateCityMap).map(state => (
                        <option key={state} value={state}>{state}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      City
                    </label>
                    <select
                      name="city"
                      required
                      value={shippingDetails.city}
                      onChange={handleInputChange}
                      disabled={!shippingDetails.state}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="">Select City</option>
                      {shippingDetails.state &&
                        stateCityMap[shippingDetails.state].map(city => (
                          <option key={city} value={city}>{city}</option>
                        ))}
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      ZIP Code
                    </label>
                    <input
                      type="text"
                      name="zipCode"
                      required
                      value={shippingDetails.zipCode}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Phone
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      required
                      value={shippingDetails.phone}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                </div>
              </div>
            </div>

            {error && (
              <div className="flex items-center gap-2 text-red-600 bg-red-50 p-4 rounded-lg">
                <AlertCircle size={20} />
                <p>{error}</p>
              </div>
            )}

            <button
              type="submit"
              disabled={loading || items.length === 0}
              className={`w-full bg-blue-600 text-white py-3 rounded-lg ${
                loading || items.length === 0 ? 'opacity-70 cursor-not-allowed' : 'hover:bg-blue-700'
              }`}
            >
              {loading ? 'Placing Order...' : 'Place Order'}
            </button>
          </form>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md h-fit">
          <h2 className="text-xl font-bold mb-4">Order Summary</h2>
          <div className="space-y-4 mb-4">
            {items.map(item => (
              <div key={item._id} className="flex justify-between">
                <span className="text-gray-600">
                  {item.title} x {item.quantity}
                </span>
                <span>${(item.price * item.quantity).toFixed(2)}</span>
              </div>
            ))}
          </div>
          <div className="border-t pt-4">
            <div className="flex justify-between text-lg font-bold">
              <span>Total</span>
              <span>${total.toFixed(2)}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
