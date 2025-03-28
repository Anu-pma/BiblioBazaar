import React from 'react';
import { Link } from 'react-router-dom';
import { Facebook, Twitter, Instagram, Mail, Phone, MapPin } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-xl font-bold mb-4">About BiblioBazaar</h3>
            <p className="text-gray-400">
              Your one-stop destination for books. Discover millions of titles across genres, from bestsellers to rare finds.
            </p>
            <div className="flex gap-4 mt-4">
              <a href="https://facebook.com" className="hover:text-blue-400">
                <Facebook size={24} />
              </a>
              <a href="https://twitter.com" className="hover:text-blue-400">
                <Twitter size={24} />
              </a>
              <a href="https://instagram.com" className="hover:text-blue-400">
                <Instagram size={24} />
              </a>
            </div>
          </div>

          <div>
            <h3 className="text-xl font-bold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/books" className="text-gray-400 hover:text-white">
                  Browse Books
                </Link>
              </li>
              <li>
                <Link to="/new-releases" className="text-gray-400 hover:text-white">
                  New Releases
                </Link>
              </li>
              <li>
                <Link to="/bestsellers" className="text-gray-400 hover:text-white">
                  Bestsellers
                </Link>
              </li>
              <li>
                <Link to="/deals" className="text-gray-400 hover:text-white">
                  Special Deals
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-xl font-bold mb-4">Customer Service</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/contact" className="text-gray-400 hover:text-white">
                  Contact Us
                </Link>
              </li>
              <li>
                <Link to="/faq" className="text-gray-400 hover:text-white">
                  FAQ
                </Link>
              </li>
              <li>
                <Link to="/shipping" className="text-gray-400 hover:text-white">
                  Shipping Information
                </Link>
              </li>
              <li>
                <Link to="/returns" className="text-gray-400 hover:text-white">
                  Returns Policy
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-xl font-bold mb-4">Contact Info</h3>
            <ul className="space-y-2">
              <li className="flex items-center gap-2 text-gray-400">
                <MapPin size={20} />
                123 Book Street, Reading City, 12345
              </li>
              <li className="flex items-center gap-2 text-gray-400">
                <Phone size={20} />
                +1 (555) 123-4567
              </li>
              <li className="flex items-center gap-2 text-gray-400">
                <Mail size={20} />
                support@bibliobazaar.com
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
          <p>&copy; {new Date().getFullYear()} BiblioBazaar. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}