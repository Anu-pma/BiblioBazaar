// import { useState, useRef, useEffect } from 'react';
// import { Link, useNavigate } from 'react-router-dom';
// import { BookOpen, ShoppingCart, Heart, UserCircle } from 'lucide-react';
// import { Button } from '@/components/ui/button';
// import { useBookStore } from '@/lib/store';
// import { useAuth } from '@/context/AuthContext';
// import { useLocation } from 'react-router-dom';

// export function Header() {
//   const cart = useBookStore((state) => state.cart);
//   const favorites = useBookStore((state) => state.favorites);
//   const { user, signOut } = useAuth();
//   const [dropdownOpen, setDropdownOpen] = useState(false);
//   const dropdownRef = useRef(null);
//   const navigate = useNavigate();
//   const location = useLocation();

//   useEffect(() => {
//     setDropdownOpen(false); // close dropdown on any route change
//   }, [location.pathname]);

//   // Close dropdown when clicking outside
//   useEffect(() => {
//     const handleClickOutside = (event: MouseEvent) => {
//       if (dropdownRef.current && !(dropdownRef.current as any).contains(event.target)) {
//         setDropdownOpen(false);
//       }
//     };
//     document.addEventListener('mousedown', handleClickOutside);
//     return () => document.removeEventListener('mousedown', handleClickOutside);
//   }, []);

//   const handleLogout = () => {
//     signOut(); // Call the logout function from AuthContext
//     navigate('/'); // Redirect to home after logout
//   };

//   return (
//     <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
//       <div className="container flex h-14 items-center">
//         <Link to="/" className="flex items-center space-x-2">
//           <BookOpen className="h-6 w-6" />
//           <span className="hidden font-bold sm:inline-block">BiblioBazaar</span>
//         </Link>

//         <nav className="flex flex-1 items-center justify-center space-x-6 text-sm font-medium">
//           <Link to="/books" className="transition-colors hover:text-primary">Books</Link>
//           <Link to="/authors" className="transition-colors hover:text-primary">Authors</Link>
//           <Link to="/categories" className="transition-colors hover:text-primary">Categories</Link>
//         </nav>

//         <div className="flex items-center space-x-4 relative">
//           <Link to="/favorites" className="relative">
//             <Heart className="h-5 w-5" />
//             {favorites.length > 0 && (
//               <span className="absolute -right-2 -top-2 flex h-4 w-4 items-center justify-center rounded-full bg-primary text-[10px] text-primary-foreground">
//                 {favorites.length}
//               </span>
//             )}
//           </Link>

//           <Link to="/cart" className="relative">
//             <ShoppingCart className="h-5 w-5" />
//             {cart.length > 0 && (
//               <span className="absolute -right-2 -top-2 flex h-4 w-4 items-center justify-center rounded-full bg-primary text-[10px] text-primary-foreground">
//                 {cart.reduce((total, item) => total + item.quantity, 0)}
//               </span>
//             )}
//           </Link>

//           {!user ? (
//             <div className="space-x-2">
//               <Link to="/signin">
//                 <Button variant="outline" size="sm">Sign In</Button>
//               </Link>
//               <Link to="/signup">
//                 <Button variant="default" size="sm">Sign Up</Button>
//               </Link>
//             </div>
//           ) : (
//             <div className="relative" ref={dropdownRef}>
//               <button onClick={() => setDropdownOpen((prev) => !prev)}>
//                 <UserCircle className="w-8 h-8 text-gray-600 hover:text-blue-500" />
//               </button>

//               {dropdownOpen && (
//                 <div className="absolute right-0 mt-2 w-40 rounded-md shadow-lg bg-white border border-gray-200 z-50">
//                   <ul className="py-2 text-sm text-gray-700">
//                     <li>
//                       <Link
//                         to={user.role === 'admin' ? '/admin' : '/profile'}
//                         className="block px-4 py-2 hover:bg-gray-100"
//                         onClick={() => setDropdownOpen(false)}
//                       >
//                         My Profile
//                       </Link>
//                     </li>
//                     <li>
//                       <Link
//                         to="/myorders"
//                         className="block px-4 py-2 hover:bg-gray-100"
//                         onClick={() => setDropdownOpen(false)}
//                       >
//                         My Orders
//                       </Link>
//                     </li>
//                     <li>
//                       <button
//                         onClick={handleLogout}
//                         className="block w-full text-left px-4 py-2 hover:bg-gray-100"
//                       >
//                         Logout
//                       </button>
//                     </li>
//                   </ul>
//                 </div>
//               )}
//             </div>
//           )}
//         </div>
//       </div>
//     </header>
//   );
// }

// import { useState, useRef, useEffect } from 'react';
// import { Link, useNavigate } from 'react-router-dom';
// import { BookOpen, ShoppingCart, Heart, UserCircle, Menu } from 'lucide-react';
// import { Button } from '@/components/ui/button';
// import { useBookStore } from '@/lib/store';
// import { useAuth } from '@/context/AuthContext';
// import { useLocation } from 'react-router-dom';

// export function Header() {
//   const cart = useBookStore((state) => state.cart);
//   const favorites = useBookStore((state) => state.favorites);
//   const { user, signOut } = useAuth();
//   const [dropdownOpen, setDropdownOpen] = useState(false);
//   const [mobileNavOpen, setMobileNavOpen] = useState(false);
//   const dropdownRef = useRef(null);
//   const navigate = useNavigate();
//   const location = useLocation();

//   useEffect(() => {
//     setDropdownOpen(false);
//     setMobileNavOpen(false);
//   }, [location.pathname]);

//   useEffect(() => {
//     const handleClickOutside = (event: MouseEvent) => {
//       if (dropdownRef.current && !(dropdownRef.current as any).contains(event.target)) {
//         setDropdownOpen(false);
//       }
//     };
//     document.addEventListener('mousedown', handleClickOutside);
//     return () => document.removeEventListener('mousedown', handleClickOutside);
//   }, []);

//   const handleLogout = () => {
//     signOut();
//     navigate('/');
//   };

//   return (
//     <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
//       <div className="container flex h-14 items-center justify-between">
//         <div className="flex items-center space-x-2">
//           <Link to="/" className="flex items-center space-x-2">
//             <BookOpen className="h-6 w-6" />
//             <span className="hidden font-bold sm:inline-block">BiblioBazaar</span>
//           </Link>
//         </div>

//         {/* Hamburger button (mobile only) */}
//         <button
//           className="sm:hidden"
//           onClick={() => setMobileNavOpen((prev) => !prev)}
//         >
//           <Menu className="h-6 w-6" />
//         </button>

//         {/* Desktop nav */}
//         <nav className="hidden sm:flex flex-1 justify-center space-x-6 text-sm font-medium">
//           <Link to="/books" className="transition-colors hover:text-primary">Books</Link>
//           <Link to="/authors" className="transition-colors hover:text-primary">Authors</Link>
//           <Link to="/categories" className="transition-colors hover:text-primary">Categories</Link>
//         </nav>

//         {/* Icons & auth */}
//         <div className="hidden sm:flex items-center space-x-4 relative">
//           <Link to="/favorites" className="relative">
//             <Heart className="h-5 w-5" />
//             {favorites.length > 0 && (
//               <span className="absolute -right-2 -top-2 flex h-4 w-4 items-center justify-center rounded-full bg-primary text-[10px] text-primary-foreground">
//                 {favorites.length}
//               </span>
//             )}
//           </Link>

//           <Link to="/cart" className="relative">
//             <ShoppingCart className="h-5 w-5" />
//             {cart.length > 0 && (
//               <span className="absolute -right-2 -top-2 flex h-4 w-4 items-center justify-center rounded-full bg-primary text-[10px] text-primary-foreground">
//                 {cart.reduce((total, item) => total + item.quantity, 0)}
//               </span>
//             )}
//           </Link>

//           {!user ? (
//             <div className="space-x-2">
//               <Link to="/signin"><Button variant="outline" size="sm">Sign In</Button></Link>
//               <Link to="/signup"><Button variant="default" size="sm">Sign Up</Button></Link>
//             </div>
//           ) : (
//             <div className="relative" ref={dropdownRef}>
//               <button onClick={() => setDropdownOpen((prev) => !prev)}>
//                 <UserCircle className="w-8 h-8 text-gray-600 hover:text-blue-500" />
//               </button>
//               {dropdownOpen && (
//                 <div className="absolute right-0 mt-2 w-40 rounded-md shadow-lg bg-white border border-gray-200 z-50">
//                   <ul className="py-2 text-sm text-gray-700">
//                     <li>
//                       <Link
//                         to={user.role === 'admin' ? '/admin' : '/profile'}
//                         className="block px-4 py-2 hover:bg-gray-100"
//                         onClick={() => setDropdownOpen(false)}
//                       >
//                         My Profile
//                       </Link>
//                     </li>
//                     <li>
//                       <Link
//                         to="/myorders"
//                         className="block px-4 py-2 hover:bg-gray-100"
//                         onClick={() => setDropdownOpen(false)}
//                       >
//                         My Orders
//                       </Link>
//                     </li>
//                     <li>
//                       <button
//                         onClick={handleLogout}
//                         className="block w-full text-left px-4 py-2 hover:bg-gray-100"
//                       >
//                         Logout
//                       </button>
//                     </li>
//                   </ul>
//                 </div>
//               )}
//             </div>
//           )}
//         </div>
//       </div>

//       {/* Mobile nav menu */}
//       {mobileNavOpen && (
//         <div className="sm:hidden border-t bg-white shadow-sm">
//           <nav className="flex flex-col p-4 space-y-2 text-sm font-medium">
//             <Link to="/books" className="hover:text-primary">Books</Link>
//             <Link to="/authors" className="hover:text-primary">Authors</Link>
//             <Link to="/categories" className="hover:text-primary">Categories</Link>
//             <Link to="/favorites" className="hover:text-primary">Favorites ({favorites.length})</Link>
//             <Link to="/cart" className="hover:text-primary">
//               Cart ({cart.reduce((total, item) => total + item.quantity, 0)})
//             </Link>
//             {!user ? (
//               <>
//                 <Link to="/signin">Sign In</Link>
//                 <Link to="/signup">Sign Up</Link>
//               </>
//             ) : (
//               <>
//                 <Link to={user.role === 'admin' ? '/admin' : '/profile'}>My Profile</Link>
//                 <Link to="/myorders">My Orders</Link>
//                 <button onClick={handleLogout} className="text-left text-red-500">Logout</button>
//               </>
//             )}
//           </nav>
//         </div>
//       )}
//     </header>
//   );
// }

import { useState, useRef, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { BookOpen, ShoppingCart, Heart, UserCircle, Menu } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useBookStore } from '@/lib/store';
import { useAuth } from '@/context/AuthContext';

export function Header() {
  const cart = useBookStore((state) => state.cart);
  const favorites = useBookStore((state) => state.favorites);
  const { user, signOut } = useAuth();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const dropdownRef = useRef(null);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    setDropdownOpen(false);
    setMobileMenuOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !(dropdownRef.current as any).contains(event.target)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleLogout = () => {
    signOut();
    navigate('/');
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 items-center justify-between">
        <Link to="/" className="flex items-center space-x-2">
          <BookOpen className="h-6 w-6" />
          <span className="hidden font-bold sm:inline-block">BiblioBazaar</span>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden sm:flex flex-1 items-center justify-center space-x-6 text-sm font-medium">
          <Link to="/books" className="transition-colors hover:text-primary">Books</Link>
          <Link to="/authors" className="transition-colors hover:text-primary">Authors</Link>
          <Link to="/categories" className="transition-colors hover:text-primary">Categories</Link>
        </nav>

        {/* Right side icons */}
        <div className="flex items-center space-x-4">
          {/* Mobile Menu Toggle */}
          <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="sm:hidden">
            <Menu className="h-6 w-6" />
          </button>

          {/* Heart First */}
          <Link to="/favorites" className="relative">
            <Heart className="h-5 w-5" />
            {favorites.length > 0 && (
              <span className="absolute -right-2 -top-2 flex h-4 w-4 items-center justify-center rounded-full bg-primary text-[10px] text-primary-foreground">
                {favorites.length}
              </span>
            )}
          </Link>

          {/* Cart Second */}
          <Link to="/cart" className="relative">
            <ShoppingCart className="h-5 w-5" />
            {cart.length > 0 && (
              <span className="absolute -right-2 -top-2 flex h-4 w-4 items-center justify-center rounded-full bg-primary text-[10px] text-primary-foreground">
                {cart.reduce((total, item) => total + item.quantity, 0)}
              </span>
            )}
          </Link>

          {/* User login / dropdown - Desktop only */}
          <div className="hidden sm:block">
            {!user ? (
              <div className="space-x-2">
                <Link to="/signin"><Button variant="outline" size="sm">Sign In</Button></Link>
                <Link to="/signup"><Button variant="default" size="sm">Sign Up</Button></Link>
              </div>
            ) : (
              <div className="relative" ref={dropdownRef}>
                <button onClick={() => setDropdownOpen((prev) => !prev)}>
                  <UserCircle className="w-8 h-8 text-gray-600 hover:text-blue-500" />
                </button>
                {dropdownOpen && (
                  <div className="absolute right-0 mt-2 w-40 rounded-md shadow-lg bg-white border z-50">
                    <ul className="py-2 text-sm text-gray-700">
                      <li><Link to={user.role === 'admin' ? '/admin' : '/profile'} className="block px-4 py-2 hover:bg-gray-100" onClick={() => setDropdownOpen(false)}>My Profile</Link></li>
                      <li><Link to="/myorders" className="block px-4 py-2 hover:bg-gray-100" onClick={() => setDropdownOpen(false)}>My Orders</Link></li>
                      <li><button onClick={handleLogout} className="block w-full text-left px-4 py-2 hover:bg-gray-100">Logout</button></li>
                    </ul>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Mobile Navigation Dropdown */}
      {mobileMenuOpen && (
        <div className="sm:hidden border-t px-4 py-3 bg-white shadow-md text-sm font-medium space-y-2">
          <nav className="flex flex-col space-y-2">
            <Link to="/books" className="hover:text-primary">Books</Link>
            <Link to="/authors" className="hover:text-primary">Authors</Link>
            <Link to="/categories" className="hover:text-primary">Categories</Link>
            {!user ? (
              <>
                <Link to="/signin" className="hover:text-primary">Sign In</Link>
                <Link to="/signup" className="hover:text-primary">Sign Up</Link>
              </>
            ) : (
              <>
                <Link to={user.role === 'admin' ? '/admin' : '/profile'} className="hover:text-primary">My Profile</Link>
                <Link to="/myorders" className="hover:text-primary">My Orders</Link>
                <button onClick={handleLogout} className="text-left text-red-600 hover:underline">Logout</button>
              </>
            )}
          </nav>
        </div>
      )}
    </header>
  );
}
