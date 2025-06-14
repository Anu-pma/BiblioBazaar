import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { AuthProvider, useAuth } from './context/AuthContext';
import { CartProvider } from './context/CartContext';
import { FavoritesProvider } from './context/FavoritesContext';
import { ReviewsProvider } from './context/ReviewsContext';
import { Header } from '@/components/layout/header';
import Footer from '@/components/layout/Footer';
import ProtectedRoute from './components/ProtectedRoute';

// Auth Pages
import SignIn from './pages/auth/SignIn';
import SignUp from './pages/auth/SignUp';
import {GoogleOAuthProvider} from '@react-oauth/google'

// User Pages
import Books from './pages/books';
import BookDetails from './pages/book-details';
import Cart from './pages/cart';
import { Home } from '@/pages/home';
import Bestsellers from './pages/Bestsellers';
import NewReleases from './pages/NewReleases';
import Deals from './pages/Deals';
import Favorites from './pages/favorites';
import Profile from './pages/user/Profile';
import Checkout from './pages/Checkout';
import AuthorsPage from './pages/AuthorsPage';
import CategoriesPage from './pages/CategoriesPage';
import FAQ from './pages/FAQ';
import LearnMore from './pages/learnMore';
import ReturnPolicy from './pages/returnPolicy';
import Shipping from './pages/Shipping';
import Contact from './pages/Contact';
import OrdersPage from './pages/OrdersPage';
// Admin Pages
import AdminDashboard from './pages/admin/Dashboard';
import AdminBooks from './pages/admin/Books';
import BookForm from './pages/admin/BookForm';
import ManageBooks from './pages/admin/ManageBooks';
import ManageOrders from './pages/admin/ManageOrders';

const GOOGLE_CLIENT_ID = "604623369554-7snrkl4m14qqrgvgo6hntcu63ucp06j8.apps.googleusercontent.com";

function AppContent() {
  const location = useLocation();
  const { user } = useAuth();

  const isAdminRoute = location.pathname.startsWith('/admin');

  // Redirect admin users to admin dashboard if they try to access user routes
  if (user?.role === 'admin' && !isAdminRoute) {
    return <Navigate to="/admin" replace />;
  }


  return (
    <><GoogleOAuthProvider clientId={GOOGLE_CLIENT_ID}>
      <Toaster position="top-right" />
      {!isAdminRoute && <Header />}
      
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Home />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/books" element={<Books />} />
        <Route path="/books/:id" element={<BookDetails />} />
        <Route path="/authors" element={<AuthorsPage />} />
        <Route path="/categories" element={<CategoriesPage />} />
        <Route path="/new-releases" element={<NewReleases />} />
        <Route path="/bestsellers" element={<Bestsellers />} />
        <Route path="/deals" element={<Deals />} />
        <Route path="/faq" element={<FAQ />} />
        <Route path="/learnMore" element={<LearnMore />} />
        <Route path="/returnPolicy" element={<ReturnPolicy />} />
        <Route path="/shipping" element={<Shipping />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/myorders" element={<OrdersPage />} />

        {/* Protected User Routes */}
        <Route path="/profile" element={
          <ProtectedRoute>
            <Profile />
          </ProtectedRoute>
        } />
        <Route path="/cart" element={
          <ProtectedRoute>
            <Cart />
          </ProtectedRoute>
        } />
        <Route path="/favorites" element={
          <ProtectedRoute>
            <Favorites />
          </ProtectedRoute>
        } />
        <Route path="/checkout" element={
          <ProtectedRoute>
            <Checkout />
          </ProtectedRoute>
        } />

        {/* Protected Admin Routes */}
        <Route path="/admin" element={
          <ProtectedRoute requireAdmin>
            <AdminDashboard />
          </ProtectedRoute>
        } />
        <Route path="/admin/books" element={
          <ProtectedRoute requireAdmin>
            <AdminBooks />
          </ProtectedRoute>
        } />
        <Route path="/admin/books/managebooks" element={
          <ProtectedRoute requireAdmin>
            <ManageBooks />
          </ProtectedRoute>
        } />
        <Route path="/admin/books/manageorders" element={
          <ProtectedRoute requireAdmin>
            <ManageOrders />
          </ProtectedRoute>
        } />
        <Route path="/admin/books/new" element={
          <ProtectedRoute requireAdmin>
            <BookForm />
          </ProtectedRoute>
        } />
        <Route path="/admin/books/edit/:id" element={
          <ProtectedRoute requireAdmin>
            <BookForm />
          </ProtectedRoute>
        } />
      </Routes>

      {!isAdminRoute && <Footer />}
      </GoogleOAuthProvider>
    </>
  );
}

function App() {
  return (
    <Router>
      <AuthProvider>
        <CartProvider>
          <FavoritesProvider>
            <ReviewsProvider>
              <AppContent />
            </ReviewsProvider>
          </FavoritesProvider>
        </CartProvider>
      </AuthProvider>
    </Router>
  );
}

export default App;