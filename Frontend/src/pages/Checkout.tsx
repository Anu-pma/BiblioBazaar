import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import axios from 'axios';
import { CheckCircle, CreditCard } from 'lucide-react';

interface ShippingDetails {
  fullName: string;
  address: string;
  city: string;
  state: string;
  zipCode: string;
  phone: string;
  email: string;
}

interface RazorpayOrderResponse {
  id: string;
  amount: number;
  currency: string;
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
  const [paymentProcessing, setPaymentProcessing] = useState(false);
  const [orderSuccess, setOrderSuccess] = useState(false);
  const [error, setError] = useState('');

  const [shippingDetails, setShippingDetails] = useState<ShippingDetails>({
    fullName: '',
    address: '',
    city: '',
    state: '',
    zipCode: '',
    phone: '',
    email: '',
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

  const validateForm = (): boolean => {
    const phoneRegex = /^[+]?[0-9]{10,15}$/;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!phoneRegex.test(shippingDetails.phone)) {
      setError("Please enter a valid phone number.");
      return false;
    }

    if (!emailRegex.test(shippingDetails.email)) {
      setError("Please enter a valid email address.");
      return false;
    }

    return true;
  };

  function loadRazorpayScript() {
  return new Promise((resolve) => {
    const script = document.createElement('script');
    script.src = 'https://checkout.razorpay.com/v1/checkout.js';
    script.onload = () => {
      resolve(true);
    };
    script.onerror = () => {
      resolve(false);
    };
    document.body.appendChild(script);
  });
}

  const createRazorpayOrder = async (): Promise<RazorpayOrderResponse> => {
    const token = localStorage.getItem('token');

    const response = await axios.post(
      'http://localhost:3000/api/v1/create-razorpay-order',
      {
        amount: Math.round(total * 100), // Razorpay expects amount in paise
        currency: 'INR'
      },
      {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      }
    );

    return response.data.order;
  };

  const verifyPayment = async (paymentDetails: {
    razorpay_payment_id: string;
    razorpay_order_id: string;
    razorpay_signature: string;
  }) => {
    const token = localStorage.getItem('token');
    const userId = localStorage.getItem('userId');

    const orderItems = items.map(item => ({
      _id: item._id,
      quantity: item.quantity,
      price: item.price,
    }));

    const response = await axios.post(
      'http://localhost:3000/api/v1/verify-payment',
      {
        ...paymentDetails,
        order: orderItems,
        total: total,
        shippingDetails,
        userId
      },
      {
        headers: {
          'Authorization': `Bearer ${token}`,
          'id': userId ?? '',
          'Content-Type': 'application/json'
        }
      }
    );

    return response.data;
  };
  
  const handlePayment = async () => {
  if (!validateForm()) {
    setTimeout(() => setError(''), 3000);
    return;
  }

  setPaymentProcessing(true);
  setError('');

  const isRazorpayLoaded = await loadRazorpayScript();
  if (!isRazorpayLoaded) {
    setError('Failed to load Razorpay SDK. Please refresh and try again.');
    setPaymentProcessing(false);
    return;
  }

  if (!window.Razorpay) {
    setError('Razorpay SDK not loaded. Please refresh and try again.');
    setPaymentProcessing(false);
    return;
  }

  try {
    const razorpayOrder = await createRazorpayOrder();

      const options = {
        key: import.meta.env.VITE_RAZORPAY_KEY_ID,
        amount: razorpayOrder.amount,
        currency: razorpayOrder.currency,
        name: 'Your Store Name',
        description: 'Purchase from Your Store',
        order_id: razorpayOrder.id,
        handler: async (response: any) => {
          try {
            setLoading(true);

            const result = await verifyPayment({
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_order_id: response.razorpay_order_id,
              razorpay_signature: response.razorpay_signature,
            });

            if (result.status === 'Success') {
              setOrderSuccess(true);
              clearCart();

              // Update user address
              try {
                const userId = localStorage.getItem('userId');
                const token = localStorage.getItem('token');

                await axios.patch(`${import.meta.env.VITE_APP_API_URL}/users/${userId}`, {
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
            } else {
              setError('Payment verification failed. Please contact support.');
            }
          } catch (err: any) {
            console.error('Payment verification error:', err);
            setError(err.response?.data?.message || 'Payment verification failed. Please contact support.');
          } finally {
            setLoading(false);
            setPaymentProcessing(false);
          }
        },
        prefill: {
          name: shippingDetails.fullName,
          email: shippingDetails.email,
          contact: shippingDetails.phone,
        },
        notes: {
          address: `${shippingDetails.address}, ${shippingDetails.city}, ${shippingDetails.state}`,
        },
        theme: {
          color: '#2563eb',
        },
        modal: {
          ondismiss: () => {
            setPaymentProcessing(false);
            setError('Payment was cancelled. Please try again.');
            setTimeout(() => setError(''), 3000);
          },
        },
      };

      const razorpay = new window.Razorpay(options);
      razorpay.open();
  } catch (err: any) {
    console.error('Payment initialization error:', err);
      setError(err.response?.data?.message || 'Failed to initialize payment. Please try again.');
      setPaymentProcessing(false);
      setTimeout(() => setError(''), 3000);
  }
};

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await handlePayment();
  };

  if (orderSuccess) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <div className="bg-white p-8 rounded-xl shadow-lg max-w-md mx-auto">
          <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
          <h2 className="text-2xl font-bold mb-4 text-gray-800">Payment Successful!</h2>
          <p className="text-gray-600 mb-2">Thank you for your purchase.</p>
          <p className="text-sm text-gray-500 mb-8">Your order has been placed successfully.</p>
          <button
            onClick={() => navigate('/myorders')}
            className="bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition-colors duration-200"
          >
            View Orders
          </button>
        </div>
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <div className="bg-white p-8 rounded-xl shadow-lg max-w-md mx-auto">
          <h2 className="text-2xl font-bold mb-4 text-gray-800">Your cart is empty</h2>
          <p className="text-gray-600 mb-8">Add some items to your cart before checkout.</p>
          <button
            onClick={() => navigate('/')}
            className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors duration-200"
          >
            Continue Shopping
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto bg-white rounded-lg shadow p-6">
          <h1 className="text-3xl font-bold mb-6 text-gray-900">Checkout</h1>
          {error && (
            <div className="mb-4 text-red-600 font-semibold text-center">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="fullName" className="block text-gray-700 font-semibold mb-2">
                Full Name
              </label>
              <input
                type="text"
                id="fullName"
                name="fullName"
                value={shippingDetails.fullName}
                onChange={handleInputChange}
                required
                className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label htmlFor="address" className="block text-gray-700 font-semibold mb-2">
                Address
              </label>
              <input
                type="text"
                id="address"
                name="address"
                value={shippingDetails.address}
                onChange={handleInputChange}
                required
                className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label htmlFor="state" className="block text-gray-700 font-semibold mb-2">
                  State
                </label>
                <select
                  id="state"
                  name="state"
                  value={shippingDetails.state}
                  onChange={handleInputChange}
                  required
                  className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">Select State</option>
                  {Object.keys(stateCityMap).map(state => (
                    <option key={state} value={state}>
                      {state}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label htmlFor="city" className="block text-gray-700 font-semibold mb-2">
                  City
                </label>
                <select
                  id="city"
                  name="city"
                  value={shippingDetails.city}
                  onChange={handleInputChange}
                  required
                  disabled={!shippingDetails.state}
                  className={`w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                    !shippingDetails.state ? 'bg-gray-100 cursor-not-allowed' : ''
                  }`}
                >
                  <option value="">Select City</option>
                  {shippingDetails.state &&
                    stateCityMap[shippingDetails.state].map(city => (
                      <option key={city} value={city}>
                        {city}
                      </option>
                    ))}
                </select>
              </div>

              <div>
                <label htmlFor="zipCode" className="block text-gray-700 font-semibold mb-2">
                  Zip Code
                </label>
                <input
                  type="text"
                  id="zipCode"
                  name="zipCode"
                  value={shippingDetails.zipCode}
                  onChange={handleInputChange}
                  required
                  pattern="[0-9]{5,6}"
                  title="Zip code should be 5 or 6 digits"
                  className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>

            <div>
              <label htmlFor="phone" className="block text-gray-700 font-semibold mb-2">
                Phone Number
              </label>
              <input
                type="tel"
                id="phone"
                name="phone"
                value={shippingDetails.phone}
                onChange={handleInputChange}
                required
                placeholder="+911234567890"
                className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label htmlFor="email" className="block text-gray-700 font-semibold mb-2">
                Email Address
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={shippingDetails.email}
                onChange={handleInputChange}
                required
                className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div className="border-t pt-4">
              <h2 className="text-xl font-semibold mb-2">Order Summary</h2>
              <ul className="mb-4">
                {items.map(item => (
                  <li key={item._id} className="flex justify-between py-1">
                    <span>{item.title} x {item.quantity}</span>
                    <span>₹{(item.price * item.quantity).toFixed(2)}</span>
                  </li>
                ))}
              </ul>
              <div className="flex justify-between font-bold text-lg">
                <span>Total:</span>
                <span>₹{total.toFixed(2)}</span>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading || paymentProcessing}
              className={`w-full flex items-center justify-center gap-2 bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition-colors duration-200 ${
                (loading || paymentProcessing) ? 'opacity-50 cursor-not-allowed' : ''
              }`}
            >
              <CreditCard className="w-5 h-5" />
              {loading || paymentProcessing ? 'Processing...' : 'Pay Now'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
