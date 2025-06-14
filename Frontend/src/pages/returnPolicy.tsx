import React from 'react';
import { 
  ArrowLeft, 
  BookOpen, 
  Clock, 
  Shield, 
  RefreshCw, 
  CheckCircle, 
  AlertCircle, 
  Mail, 
  Phone, 
  Package, 
  CreditCard,
  Truck
} from 'lucide-react';

function returnPolicy() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-white to-orange-50">
      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-6 py-12">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-amber-100 rounded-full mb-6">
            <RefreshCw className="w-8 h-8 text-amber-600" />
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Return Policy</h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
            We want you to love every book you purchase. If you're not completely satisfied, 
            we're here to help with our hassle-free return process.
          </p>
        </div>

        {/* Quick Overview Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
            <Clock className="w-8 h-8 text-blue-600 mb-4" />
            <h3 className="text-lg font-semibold text-gray-900 mb-2">30-Day Returns</h3>
            <p className="text-gray-600 text-sm">Return most items within 30 days of delivery for a full refund.</p>
          </div>
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
            <Package className="w-8 h-8 text-green-600 mb-4" />
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Free Returns</h3>
            <p className="text-gray-600 text-sm">We provide prepaid return labels for your convenience.</p>
          </div>
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
            <CreditCard className="w-8 h-8 text-purple-600 mb-4" />
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Quick Refunds</h3>
            <p className="text-gray-600 text-sm">Refunds processed within 3-5 business days after we receive your return.</p>
          </div>
        </div>

        {/* Detailed Sections */}
        <div className="space-y-12">
          {/* Eligibility Section */}
          <section className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100">
            <div className="flex items-start space-x-4 mb-6">
              <div className="flex-shrink-0 w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                <CheckCircle className="w-5 h-5 text-green-600" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-2">Return Eligibility</h2>
                <p className="text-gray-600">Items eligible for return must meet the following criteria:</p>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-gray-900">✅ Returnable Items</h3>
                <ul className="space-y-2 text-gray-600">
                  <li className="flex items-start space-x-2">
                    <span className="w-1.5 h-1.5 bg-green-500 rounded-full mt-2 flex-shrink-0"></span>
                    <span>New books in original condition</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <span className="w-1.5 h-1.5 bg-green-500 rounded-full mt-2 flex-shrink-0"></span>
                    <span>Used books as described, undamaged</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <span className="w-1.5 h-1.5 bg-green-500 rounded-full mt-2 flex-shrink-0"></span>
                    <span>Items returned within 30 days</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <span className="w-1.5 h-1.5 bg-green-500 rounded-full mt-2 flex-shrink-0"></span>
                    <span>Books with original packaging/accessories</span>
                  </li>
                </ul>
              </div>
              
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-gray-900">❌ Non-Returnable Items</h3>
                <ul className="space-y-2 text-gray-600">
                  <li className="flex items-start space-x-2">
                    <span className="w-1.5 h-1.5 bg-red-500 rounded-full mt-2 flex-shrink-0"></span>
                    <span>Digital downloads and e-books</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <span className="w-1.5 h-1.5 bg-red-500 rounded-full mt-2 flex-shrink-0"></span>
                    <span>Personalized or custom items</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <span className="w-1.5 h-1.5 bg-red-500 rounded-full mt-2 flex-shrink-0"></span>
                    <span>Books damaged by customer</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <span className="w-1.5 h-1.5 bg-red-500 rounded-full mt-2 flex-shrink-0"></span>
                    <span>Items returned after 30 days</span>
                  </li>
                </ul>
              </div>
            </div>
          </section>

          {/* Return Process Section */}
          <section className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100">
            <div className="flex items-start space-x-4 mb-6">
              <div className="flex-shrink-0 w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                <Truck className="w-5 h-5 text-blue-600" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-2">How to Return Your Order</h2>
                <p className="text-gray-600">Follow these simple steps to return your items:</p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="relative">
                <div className="flex items-center justify-center w-8 h-8 bg-amber-600 text-white rounded-full font-bold text-sm mb-4">1</div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Initiate Return</h3>
                <p className="text-gray-600 text-sm">Log into your account and select "Return Items" from your order history, or contact our support team.</p>
              </div>
              
              <div className="relative">
                <div className="flex items-center justify-center w-8 h-8 bg-amber-600 text-white rounded-full font-bold text-sm mb-4">2</div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Pack & Ship</h3>
                <p className="text-gray-600 text-sm">Pack items securely in original packaging. Use our prepaid return label to ship back to us.</p>
              </div>
              
              <div className="relative">
                <div className="flex items-center justify-center w-8 h-8 bg-amber-600 text-white rounded-full font-bold text-sm mb-4">3</div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Get Refunded</h3>
                <p className="text-gray-600 text-sm">Once we receive and inspect your return, we'll process your refund within 3-5 business days.</p>
              </div>
            </div>
          </section>

          {/* Refund Information */}
          <section className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100">
            <div className="flex items-start space-x-4 mb-6">
              <div className="flex-shrink-0 w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                <CreditCard className="w-5 h-5 text-purple-600" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-2">Refund Processing</h2>
                <p className="text-gray-600">Important information about how and when you'll receive your refund:</p>
              </div>
            </div>

            <div className="bg-gradient-to-r from-purple-50 to-blue-50 rounded-lg p-6 border border-purple-100">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">Refund Timeline</h3>
                  <ul className="space-y-2 text-gray-600 text-sm">
                    <li><strong>Credit Cards:</strong> 3-5 business days</li>
                    <li><strong>PayPal:</strong> 1-2 business days</li>
                    <li><strong>Bank Transfer:</strong> 5-7 business days</li>
                    <li><strong>Gift Cards:</strong> Instant credit to account</li>
                  </ul>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">Refund Amount</h3>
                  <p className="text-gray-600 text-sm mb-2">
                    Full purchase price including applicable taxes will be refunded. 
                    Original shipping costs are non-refundable unless the return is due to our error.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Special Cases */}
          <section className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100">
            <div className="flex items-start space-x-4 mb-6">
              <div className="flex-shrink-0 w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center">
                <AlertCircle className="w-5 h-5 text-orange-600" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-2">Special Circumstances</h2>
                <p className="text-gray-600">Additional policies for specific situations:</p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-red-50 rounded-lg p-4 border border-red-100">
                <h3 className="text-lg font-semibold text-red-900 mb-2">Damaged Items</h3>
                <p className="text-red-800 text-sm">
                  If you receive a damaged item, contact us immediately with photos. 
                  We'll provide a full refund and prepaid return label at no cost to you.
                </p>
              </div>
              
              <div className="bg-yellow-50 rounded-lg p-4 border border-yellow-100">
                <h3 className="text-lg font-semibold text-yellow-900 mb-2">Wrong Item Received</h3>
                <p className="text-yellow-800 text-sm">
                  If we sent the wrong item, we'll send the correct item immediately 
                  and provide a prepaid return label for the incorrect item.
                </p>
              </div>
            </div>
          </section>

          {/* Contact Section */}
          <section className="bg-gradient-to-r from-amber-600 to-orange-600 rounded-2xl p-8 text-white">
            <div className="text-center mb-8">
              <Shield className="w-12 h-12 text-white mx-auto mb-4" />
              <h2 className="text-2xl font-bold mb-2">Need Help with Your Return?</h2>
              <p className="text-amber-100">Our customer service team is here to assist you every step of the way.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-white/10 rounded-lg p-6 backdrop-blur-sm">
                <div className="flex items-center space-x-3 mb-3">
                  <Mail className="w-5 h-5 text-white" />
                  <h3 className="text-lg font-semibold">Email Support</h3>
                </div>
                <p className="text-amber-100 text-sm mb-2">Get help via email</p>
                <p className="text-white font-medium">returns@bibliobazaar.com</p>
                <p className="text-amber-100 text-xs mt-1">Response within 24 hours</p>
              </div>
              
              <div className="bg-white/10 rounded-lg p-6 backdrop-blur-sm">
                <div className="flex items-center space-x-3 mb-3">
                  <Phone className="w-5 h-5 text-white" />
                  <h3 className="text-lg font-semibold">Phone Support</h3>
                </div>
                <p className="text-amber-100 text-sm mb-2">Speak with our team</p>
                <p className="text-white font-medium">1-800-BIBLIO-1</p>
                <p className="text-amber-100 text-xs mt-1">Mon-Fri 9AM-6PM EST</p>
              </div>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}

export default returnPolicy;