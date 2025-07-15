import { Truck, Clock, Globe, CreditCard, ShieldCheck, HelpCircle } from 'lucide-react';

export default function Shipping() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Shipping Information</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="space-y-6">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="flex items-center gap-3 mb-4">
              <Truck className="w-6 h-6 text-blue-600" />
              <h2 className="text-xl font-bold">Shipping Methods</h2>
            </div>
            <div className="space-y-4">
              <div className="border-b pb-4">
                <h3 className="font-semibold mb-2">Standard Shipping</h3>
                <p className="text-gray-600">3-5 business days</p>
                <p className="text-gray-600">₹10 for orders under ₹200</p>
                <p className="text-gray-600">Free for orders over ₹200</p>
              </div>
              <div className="border-b pb-4">
                <h3 className="font-semibold mb-2">Express Shipping</h3>
                <p className="text-gray-600">1-2 business days</p>
                <p className="text-gray-600">₹20 flat rate</p>
              </div>
              <div>
                <h3 className="font-semibold mb-2">Next Day Delivery</h3>
                <p className="text-gray-600">Next business day</p>
                <p className="text-gray-600">₹50 flat rate</p>
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="flex items-center gap-3 mb-4">
              <Globe className="w-6 h-6 text-blue-600" />
              <h2 className="text-xl font-bold">International Shipping</h2>
            </div>
            <p className="text-gray-600 mb-4">
              We ship to most countries worldwide. International shipping rates and delivery
              times vary by location. Please note that additional customs fees or import
              duties may apply.
            </p>
            <div className="space-y-2">
              <p className="text-gray-600">• Europe: 7-10 business days</p>
              <p className="text-gray-600">• Asia: 10-14 business days</p>
              <p className="text-gray-600">• Australia: 12-15 business days</p>
              <p className="text-gray-600">• Other regions: 14-21 business days</p>
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="flex items-center gap-3 mb-4">
              <Clock className="w-6 h-6 text-blue-600" />
              <h2 className="text-xl font-bold">Processing Time</h2>
            </div>
            <p className="text-gray-600 mb-4">
              Orders are typically processed within 1-2 business days. During peak seasons
              or promotional periods, processing times may be slightly longer.
            </p>
            <div className="bg-blue-50 p-4 rounded-lg">
              <p className="text-sm text-blue-800">
                <strong>Note:</strong> Orders placed after 2 PM EST will be processed the
                next business day.
              </p>
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="flex items-center gap-3 mb-4">
              <ShieldCheck className="w-6 h-6 text-blue-600" />
              <h2 className="text-xl font-bold">Shipping Insurance</h2>
            </div>
            <p className="text-gray-600 mb-4">
              All orders are automatically insured against loss or damage during transit.
              Additional insurance coverage is available at checkout for valuable items.
            </p>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="flex items-center gap-3 mb-4">
              <CreditCard className="w-6 h-6 text-blue-600" />
              <h2 className="text-xl font-bold">Payment & Security</h2>
            </div>
            <p className="text-gray-600 mb-4">
              We accept all major credit cards and PayPal. All payments are processed
              securely through our encrypted payment gateway.
            </p>
          </div>

          <div className="bg-blue-50 p-6 rounded-lg">
            <div className="flex items-center gap-3 mb-4">
              <HelpCircle className="w-6 h-6 text-blue-600" />
              <h2 className="text-xl font-bold">Need Help?</h2>
            </div>
            <p className="text-gray-700 mb-4">
              If you have any questions about shipping or need to track an order, our
              customer service team is here to help.
            </p>
            <div className="space-y-2">
              <p className="text-gray-700">• Email: shipping@bibliobazaar.com</p>
              <p className="text-gray-700">• Phone: +1 (555) 123-4567</p>
              {/* <p className="text-gray-700">• Live Chat: Available 24/7</p> */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}