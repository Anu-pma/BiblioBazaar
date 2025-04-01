// import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
// import { Header } from '@/components/layout/header';
// import { Home } from '@/pages/home';
// import Books  from '@/pages/books';
// import BookDetails  from '@/pages/book-details';
// import  Cart  from '@/pages/cart';
// import Favorites from '@/pages/favorites';
// // Auth Pages
// import SignIn from './pages/auth/SignIn';
// import SignUp from './pages/auth/SignUp';

// const queryClient = new QueryClient();

// function App() {
//   return (
//     <QueryClientProvider client={queryClient}>
//       <Router>
//         <div className="min-h-screen bg-background">
//           <Header />
//           <main className="container py-6">
//             <Routes>
//               <Route path="/" element={<Home />} />
//               <Route path="/books" element={<Books />} />
//               <Route path="/books/:id" element={<BookDetails />} />
//               <Route path="/cart" element={<Cart />} />
//               <Route path="/favorites" element={<Favorites />} />
//               <Route path="/signin" element={<SignIn />} />
//                 <Route path="/signup" element={<SignUp />} />
//             </Routes>
//           </main>
//         </div>
//       </Router>
//     </QueryClientProvider>
//   );
// }

// export default App;

// import React from 'react';
// import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// import { Toaster } from 'react-hot-toast';
// import { AuthProvider } from './context/AuthContext';
// import { CartProvider } from './context/CartContext';
// import { FavoritesProvider } from './context/FavoritesContext';
// //import { ReviewsProvider } from './context/ReviewsContext';
// import ProtectedRoute from './components/ProtectedRoute';

// // Auth Pages
// import SignIn from './pages/auth/SignIn';
// import SignUp from './pages/auth/SignUp';

// // User Pages
// import Books from './pages/books';
// import BookDetails from './pages/book-details';
// import Cart from './pages/cart';
// import Favorites from './pages/favorites';
// //import UserDashboard from './pages/user/Dashboard';
// //import Profile from './pages/user/Profile';

// // Admin Pages
// import AdminDashboard from './pages/admin/Dashboard';
// //import AdminBooks from './pages/admin/Books';
// //import BookForm from './pages/admin/BookForm';

// function App() {
//   return (
//     <Router>
//       <AuthProvider>
//         <CartProvider>
//           <FavoritesProvider>
//             {/* <ReviewsProvider> */}
//               <Toaster position="top-right" />
//               <Routes>
//                 {/* Public Routes */}
//                 <Route path="/" element={<Books />} />
//                 <Route path="/signin" element={<SignIn />} />
//                 <Route path="/signup" element={<SignUp />} />
//                 <Route path="/books" element={<Books />} />
//                 <Route path="/books/:id" element={<BookDetails />} />
                
//                 {/* Protected User Routes */}
//                 {/* <Route path="/dashboard" element={
//                   <ProtectedRoute> */}
//                     {/* <UserDashboard /> */}
//                   {/* </ProtectedRoute>
//                 } /> */}
//                 {/* <Route path="/profile" element={
//                   <ProtectedRoute> */}
//                     {/* <Profile /> */}
//                   {/* </ProtectedRoute>
//                 } /> */}
//                 <Route path="/cart" element={
//                   <ProtectedRoute>
//                     <Cart />
//                   </ProtectedRoute>
//                 } />
//                 <Route path="/favorites" element={
//                   <ProtectedRoute>
//                     <Favorites />
//                   </ProtectedRoute>
//                 } />
                
//                 {/* Protected Admin Routes */}
//                 <Route path="/admin" element={
//                   <ProtectedRoute requireAdmin>
//                     <AdminDashboard />
//                   </ProtectedRoute>
//                 } />
//                 {/* <Route path="/admin/books" element={
//                   <ProtectedRoute requireAdmin> */}
//                     {/* <AdminBooks /> */}
//                   {/* </ProtectedRoute>
//                 } />
//                 <Route path="/admin/books/new" element={
//                   <ProtectedRoute requireAdmin> */}
//                     {/* <BookForm /> */}
//                   {/* </ProtectedRoute>
//                 } />
//                 <Route path="/admin/books/edit/:id" element={
//                   <ProtectedRoute requireAdmin> */}
//                     {/* <BookForm /> */}
//                   {/* </ProtectedRoute>
//                 } /> */}
//               </Routes>
//             {/* </ReviewsProvider> */}
//           </FavoritesProvider>
//         </CartProvider>
//       </AuthProvider>
//     </Router>
//   );
// }

// export default App;

// import React from 'react';
// import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// import { Toaster } from 'react-hot-toast';
// import { AuthProvider } from './context/AuthContext';
// import { CartProvider } from './context/CartContext';
// import { FavoritesProvider } from './context/FavoritesContext';
// import { ReviewsProvider } from './context/ReviewsContext';
// import ProtectedRoute from './components/ProtectedRoute';

// // Auth Pages
// import SignIn from './pages/auth/SignIn';
// import SignUp from './pages/auth/SignUp';

// // User Pages
// import Books from './pages/books';
// import { Header } from '@/components/layout/header';
// import { Home } from '@/pages/home';
// import BookDetails from './pages/book-details';
// import Cart from './pages/cart';
// import Favorites from './pages/favorites';
// import UserDashboard from './pages/user/Dashboard';
// import Profile from './pages/user/Profile';

// // Admin Pages
// import AdminDashboard from './pages/admin/Dashboard';
// // import AdminBooks from './pages/admin/Books';
// // import BookForm from './pages/admin/BookForm';

// function App() {
//   return (
    
//     <Router>
//       <AuthProvider>
//         <CartProvider>
//           <FavoritesProvider>
//             <ReviewsProvider>
//               <Toaster position="top-right" />
//               <Header />
//               <Routes>
//                 {/* Public Routes */}
//                 <Route path="/" element={<Home />} />
//                 <Route path="/signin" element={<SignIn />} />
//                 <Route path="/signup" element={<SignUp />} />
//                 <Route path="/books" element={<Books />} />
//                 <Route path="/books/:id" element={<BookDetails />} />
                
//                 {/* Protected User Routes */}
//                 <Route path="/dashboard" element={
//                   <ProtectedRoute>
//                     <UserDashboard />
//                   </ProtectedRoute>
//                 } />
//                 <Route path="/profile" element={
//                   <ProtectedRoute>
//                     <Profile />
//                   </ProtectedRoute>
//                 } />
//                 <Route path="/cart" element={
//                   <ProtectedRoute>
//                     <Cart />
//                   </ProtectedRoute>
//                 } />
//                 <Route path="/favorites" element={
//                   <ProtectedRoute>
//                     <Favorites />
//                   </ProtectedRoute>
//                 } />
                
//                 {/* Protected Admin Routes */}
//                 <Route path="/admin" element={
//                   <ProtectedRoute requireAdmin>
//                     <AdminDashboard />
//                   </ProtectedRoute>
//                 } />
//                 {/* <Route path="/admin/books" element={
//                   <ProtectedRoute requireAdmin>
//                     <AdminBooks />
//                   </ProtectedRoute>
//                 } />
//                 <Route path="/admin/books/new" element={
//                   <ProtectedRoute requireAdmin>
//                     <BookForm />
//                   </ProtectedRoute>
//                 } />
//                 <Route path="/admin/books/edit/:id" element={
//                   <ProtectedRoute requireAdmin>
//                     <BookForm />
//                   </ProtectedRoute>
//                 } /> */}
//               </Routes>
//             </ReviewsProvider>
//           </FavoritesProvider>
//         </CartProvider>
//       </AuthProvider>
//     </Router>
//   );
// }

// export default App;
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { AuthProvider } from './context/AuthContext';
import { CartProvider } from './context/CartContext';
import { FavoritesProvider } from './context/FavoritesContext';
import { ReviewsProvider } from './context/ReviewsContext';
import { Header } from '@/components/layout/header';
import  Footer  from '@/components/layout/Footer';
import ProtectedRoute from './components/ProtectedRoute';

// Auth Pages
import SignIn from './pages/auth/SignIn';
import SignUp from './pages/auth/SignUp';

// User Pages
import Books from './pages/books';
import BookDetails from './pages/book-details';
import Cart from './pages/cart';
import { Home } from '@/pages/home';
import Bestsellers from './pages/Bestsellers';
import NewReleases from './pages/NewReleases';
import Deals from './pages/Deals';
import Favorites from './pages/favorites';
import UserDashboard from './pages/user/Dashboard';
import Profile from './pages/user/Profile';

import FAQ from './pages/FAQ';
import Shipping from './pages/Shipping';
import Contact from './pages/Contact';

// Admin Pages
import AdminDashboard from './pages/admin/Dashboard';
import AdminBooks from './pages/admin/Books';
import BookForm from './pages/admin/BookForm';

function App() {
  return (
    <Router>
      <AuthProvider>
        <CartProvider>
          <FavoritesProvider>
            <ReviewsProvider>
              <Toaster position="top-right" />
              <Header/>
              <Routes>
                {/* Public Routes */}
                <Route path="/" element={<Home />} />
                <Route path="/signin" element={<SignIn />} />
                <Route path="/signup" element={<SignUp />} />
                <Route path="/books" element={<Books />} />
                <Route path="/books/:id" element={<BookDetails />} />
                <Route path="/new-releases" element={<NewReleases />} />
                <Route path="/bestsellers" element={<Bestsellers />} />
                <Route path="/deals" element={<Deals />} />
                <Route path="/faq" element={<FAQ />} />
                <Route path="/shipping" element={<Shipping />} />
                <Route path="/contact" element={<Contact />} />
                
                {/* Protected User Routes */}
                <Route path="/dashboard" element={
                  <ProtectedRoute>
                    <UserDashboard />
                  </ProtectedRoute>
                } />
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
              <Footer/>
            </ReviewsProvider>
          </FavoritesProvider>
        </CartProvider>
      </AuthProvider>
    </Router>
  );
}

export default App;