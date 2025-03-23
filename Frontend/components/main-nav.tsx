'use client';

import * as React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import { BookOpen } from 'lucide-react';

export function MainNav() {
  const pathname = usePathname();

  return (
    <div className="mr-4 hidden md:flex">
      <Link href="/" className="mr-6 flex items-center space-x-2">
        <BookOpen className="h-6 w-6" />
        <span className="hidden font-bold sm:inline-block">
          BiblioBazzar
        </span>
      </Link>
      <nav className="flex items-center space-x-6 text-sm font-medium">
        <Link
          href="/books"
          className={cn(
            'transition-colors hover:text-primary',
            pathname === '/books'
              ? 'text-foreground'
              : 'text-foreground/60'
          )}
        >
          Books
        </Link>
        <Link
          href="/favorites"
          className={cn(
            'transition-colors hover:text-primary',
            pathname === '/favorites'
              ? 'text-foreground'
              : 'text-foreground/60'
          )}
        >
          Favorites
        </Link>
        <Link
          href="/cart"
          className={cn(
            'transition-colors hover:text-primary',
            pathname === '/cart'
              ? 'text-foreground'
              : 'text-foreground/60'
          )}
        >
          Cart
        </Link>
      </nav>
    </div>
  );
}