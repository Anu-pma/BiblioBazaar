import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import { CartProvider } from './context/CartContext';
import { FavoritesProvider } from "./context/FavoritesContext";

ReactDOM.createRoot(document.getElementById('root')!).render(
<React.StrictMode>
    <FavoritesProvider> {/* Wrap FavoritesProvider around CartProvider */}
      <CartProvider>
        <App />
      </CartProvider>
    </FavoritesProvider>
  </React.StrictMode>

);