import { Link } from 'react-router-dom';
import { BookOpen, ShoppingCart, Heart, Sun, Moon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useTheme } from '@/hooks/use-theme';
import { useBookStore } from '@/lib/store';

export function Header() {
  const { theme, toggleTheme } = useTheme();
  const cart = useBookStore((state) => state.cart);
  const favorites = useBookStore((state) => state.favorites);

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 items-center">
        <Link to="/" className="flex items-center space-x-2">
          <BookOpen className="h-6 w-6" />
          <span className="hidden font-bold sm:inline-block">BiblioBazzar</span>
        </Link>
        
        <nav className="flex flex-1 items-center justify-center space-x-6 text-sm font-medium">
          <Link to="/books" className="transition-colors hover:text-primary">
            Books
          </Link>
          <Link to="/authors" className="transition-colors hover:text-primary">
            Authors
          </Link>
          <Link to="/categories" className="transition-colors hover:text-primary">
            Categories
          </Link>
        </nav>

        <div className="flex items-center space-x-4">
          <Link to="/favorites" className="relative">
            <Heart className="h-5 w-5" />
            {favorites.length > 0 && (
              <span className="absolute -right-2 -top-2 flex h-4 w-4 items-center justify-center rounded-full bg-primary text-[10px] text-primary-foreground">
                {favorites.length}
              </span>
            )}
          </Link>
          
          <Link to="/cart" className="relative">
            <ShoppingCart className="h-5 w-5" />
            {cart.length > 0 && (
              <span className="absolute -right-2 -top-2 flex h-4 w-4 items-center justify-center rounded-full bg-primary text-[10px] text-primary-foreground">
                {cart.reduce((total, item) => total + item.quantity, 0)}
              </span>
            )}
          </Link>

          <Button
            variant="ghost"
            size="icon"
            onClick={toggleTheme}
            className="h-9 w-9"
          >
            {theme === 'dark' ? (
              <Sun className="h-5 w-5" />
            ) : (
              <Moon className="h-5 w-5" />
            )}
          </Button>

          <Link to="/auth">
            <Button variant="default" size="sm">
              Sign In
            </Button>
          </Link>
        </div>
      </div>
    </header>
  );
}