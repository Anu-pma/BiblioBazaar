import React from 'react';
import { Link } from 'react-router-dom';

import { 
  ArrowLeft, 
  BookOpen, 
  Users, 
  Shield, 
  Search, 
  Star, 
  Truck, 
  Heart, 
  Globe, 
  Award, 
  TrendingUp, 
  MessageCircle,
  CheckCircle,
  Zap,
  Target,
  BookMarked,
  Library,
  Sparkles
} from 'lucide-react';

function learnMore() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-gray-900 rounded-full mb-8">
            <Library className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
            Discover Your Next
            <span className="block text-gray-700">
              Great Read
            </span>
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed mb-8">
            Bibliobazaar is more than just a bookstore—it's a thriving community where book lovers discover, 
            share, and celebrate the written word. Join millions of readers in the ultimate literary marketplace.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/books">
                <button className="bg-gray-900 text-white px-8 py-4 rounded-lg font-semibold hover:bg-gray-800 transition-colors">
                    Start Exploring
                </button>
            </Link>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">2M+</div>
              <div className="text-gray-600 font-medium">Books Available</div>
            </div>
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">500K+</div>
              <div className="text-gray-600 font-medium">Happy Readers</div>
            </div>
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">50K+</div>
              <div className="text-gray-600 font-medium">Authors</div>
            </div>
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">4.9★</div>
              <div className="text-gray-600 font-medium">Customer Rating</div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Why Choose Bibliobazaar?</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              We've built the ultimate platform for book lovers, combining cutting-edge technology 
              with a passion for literature.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Feature Cards */}
            <div className="bg-white rounded-lg p-8 border border-gray-200 hover:shadow-lg transition-shadow group">
              <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center mb-6 group-hover:bg-gray-200 transition-colors">
                <Search className="w-6 h-6 text-gray-700" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Smart Discovery</h3>
              <p className="text-gray-600 leading-relaxed">
                Our AI-powered recommendation engine learns your preferences and suggests books 
                you'll love based on your reading history and interests.
              </p>
            </div>

            <div className="bg-white rounded-lg p-8 border border-gray-200 hover:shadow-lg transition-shadow group">
              <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center mb-6 group-hover:bg-gray-200 transition-colors">
                <Shield className="w-6 h-6 text-gray-700" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Secure Transactions</h3>
              <p className="text-gray-600 leading-relaxed">
                Shop with confidence knowing your personal and payment information is protected 
                by bank-level security and encryption.
              </p>
            </div>

            <div className="bg-white rounded-lg p-8 border border-gray-200 hover:shadow-lg transition-shadow group">
              <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center mb-6 group-hover:bg-gray-200 transition-colors">
                <Truck className="w-6 h-6 text-gray-700" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Fast Delivery</h3>
              <p className="text-gray-600 leading-relaxed">
                Get your books delivered quickly with our network of fulfillment centers. 
                Free shipping on orders over $25.
              </p>
            </div>

            <div className="bg-white rounded-lg p-8 border border-gray-200 hover:shadow-lg transition-shadow group">
              <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center mb-6 group-hover:bg-gray-200 transition-colors">
                <Heart className="w-6 h-6 text-gray-700" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Community Driven</h3>
              <p className="text-gray-600 leading-relaxed">
                Connect with fellow book lovers, join reading groups, and participate in 
                discussions about your favorite titles.
              </p>
            </div>

            <div className="bg-white rounded-lg p-8 border border-gray-200 hover:shadow-lg transition-shadow group">
              <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center mb-6 group-hover:bg-gray-200 transition-colors">
                <Star className="w-6 h-6 text-gray-700" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Expert Reviews</h3>
              <p className="text-gray-600 leading-relaxed">
                Read authentic reviews from verified readers and professional critics to 
                make informed decisions about your next purchase.
              </p>
            </div>

            <div className="bg-white rounded-lg p-8 border border-gray-200 hover:shadow-lg transition-shadow group">
              <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center mb-6 group-hover:bg-gray-200 transition-colors">
                <Globe className="w-6 h-6 text-gray-700" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Global Reach</h3>
              <p className="text-gray-600 leading-relaxed">
                Access books from publishers worldwide, including rare finds and international 
                bestsellers you won't find anywhere else.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">How Bibliobazaar Works</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Getting started is simple. Follow these easy steps to begin your literary journey.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="relative mb-8">
                <div className="w-20 h-20 bg-gray-900 rounded-full flex items-center justify-center mx-auto">
                  <span className="text-2xl font-bold text-white">1</span>
                </div>
                <div className="absolute top-10 left-1/2 w-full h-0.5 bg-gray-200 transform -translate-x-1/2 hidden md:block"></div>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Browse & Discover</h3>
              <p className="text-gray-600 leading-relaxed">
                Explore our vast collection of books across all genres. Use our smart filters 
                and recommendations to find exactly what you're looking for.
              </p>
            </div>

            <div className="text-center">
              <div className="relative mb-8">
                <div className="w-20 h-20 bg-gray-900 rounded-full flex items-center justify-center mx-auto">
                  <span className="text-2xl font-bold text-white">2</span>
                </div>
                <div className="absolute top-10 left-1/2 w-full h-0.5 bg-gray-200 transform -translate-x-1/2 hidden md:block"></div>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Add to Cart</h3>
              <p className="text-gray-600 leading-relaxed">
                Found something you love? Add it to your cart and continue shopping. 
                We'll save your selections until you're ready to checkout.
              </p>
            </div>

            <div className="text-center">
              <div className="relative mb-8">
                <div className="w-20 h-20 bg-gray-900 rounded-full flex items-center justify-center mx-auto">
                  <span className="text-2xl font-bold text-white">3</span>
                </div>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Enjoy Reading</h3>
              <p className="text-gray-600 leading-relaxed">
                Complete your secure checkout and we'll ship your books fast. 
                Then sit back, relax, and enjoy your new literary adventures.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-4xl font-bold text-gray-900 mb-6">
                More Than Just a Bookstore
              </h2>
              <p className="text-xl text-gray-600 mb-8 leading-relaxed">
                Bibliobazaar is your gateway to a world of knowledge, entertainment, and discovery. 
                We're committed to fostering a love of reading and supporting the literary community.
              </p>
              
              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0 w-8 h-8 bg-gray-100 rounded-lg flex items-center justify-center">
                    <CheckCircle className="w-4 h-4 text-gray-700" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-1">Curated Collections</h3>
                    <p className="text-gray-600">Hand-picked selections by literary experts and bestseller lists.</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0 w-8 h-8 bg-gray-100 rounded-lg flex items-center justify-center">
                    <Zap className="w-4 h-4 text-gray-700" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-1">Instant Access</h3>
                    <p className="text-gray-600">Digital books available for immediate download and reading.</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0 w-8 h-8 bg-gray-100 rounded-lg flex items-center justify-center">
                    <Target className="w-4 h-4 text-gray-700" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-1">Personalized Experience</h3>
                    <p className="text-gray-600">Tailored recommendations based on your unique reading preferences.</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="relative">
              <div className="bg-white border border-gray-200 rounded-lg p-8">
                <div className="grid grid-cols-2 gap-6">
                  <div className="bg-gray-50 rounded-lg p-6 text-center">
                    <BookMarked className="w-8 h-8 text-gray-700 mx-auto mb-3" />
                    <div className="text-2xl font-bold text-gray-900 mb-1">24/7</div>
                    <div className="text-sm text-gray-600">Access</div>
                  </div>
                  <div className="bg-gray-50 rounded-lg p-6 text-center">
                    <Award className="w-8 h-8 text-gray-700 mx-auto mb-3" />
                    <div className="text-2xl font-bold text-gray-900 mb-1">Award</div>
                    <div className="text-sm text-gray-600">Winning</div>
                  </div>
                  <div className="bg-gray-50 rounded-lg p-6 text-center">
                    <TrendingUp className="w-8 h-8 text-gray-700 mx-auto mb-3" />
                    <div className="text-2xl font-bold text-gray-900 mb-1">Growing</div>
                    <div className="text-sm text-gray-600">Community</div>
                  </div>
                  <div className="bg-gray-50 rounded-lg p-6 text-center">
                    <Sparkles className="w-8 h-8 text-gray-700 mx-auto mb-3" />
                    <div className="text-2xl font-bold text-gray-900 mb-1">Premium</div>
                    <div className="text-sm text-gray-600">Quality</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">What Our Readers Say</h2>
            <p className="text-xl text-gray-600">Join thousands of satisfied customers who've found their perfect reads.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white rounded-lg p-8 border border-gray-200">
              <div className="flex items-center mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 text-gray-400 fill-current" />
                ))}
              </div>
              <p className="text-gray-600 mb-6 leading-relaxed">
                "Bibliobazaar has completely transformed my reading experience. The recommendations 
                are spot-on, and I've discovered so many amazing authors I never would have found otherwise."
              </p>
              <div className="flex items-center">
                <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center text-gray-700 font-bold text-sm mr-3">
                  AN
                </div>
                <div>
                  <div className="font-semibold text-gray-900">Anupma</div>
                  <div className="text-sm text-gray-600">Reader</div>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg p-8 border border-gray-200">
              <div className="flex items-center mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 text-gray-400 fill-current" />
                ))}
              </div>
              <p className="text-gray-600 mb-6 leading-relaxed">
                "The customer service is exceptional, and the delivery is always fast. 
                I love being part of the Bibliobazaar community and participating in book discussions."
              </p>
              <div className="flex items-center">
                <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center text-gray-700 font-bold text-sm mr-3">
                  PR
                </div>
                <div>
                  <div className="font-semibold text-gray-900">Priyanshi Rathore</div>
                  <div className="text-sm text-gray-600">Book Club Leader</div>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg p-8 border border-gray-200">
              <div className="flex items-center mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 text-gray-400 fill-current" />
                ))}
              </div>
              <p className="text-gray-600 mb-6 leading-relaxed">
                "As an author, I appreciate how Bibliobazaar supports both readers and writers. 
                The platform has helped me connect with my audience in meaningful ways."
              </p>
              <div className="flex items-center">
                <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center text-gray-700 font-bold text-sm mr-3">
                  FS
                </div>
                <div>
                  <div className="font-semibold text-gray-900">F. Scott Fitzgerald</div>
                  <div className="text-sm text-gray-600">Published Author</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default learnMore;