'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import Search from './Search';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathname = usePathname();

  const navLinks = [
    { href: '/catalog/laptops', label: 'Laptops', page: 'laptops' },
    { href: '/catalog/desktops', label: 'Desktops', page: 'desktops' },
    { href: '/rapid-parts', label: 'Components', page: 'rapid-parts' },
    { href: '/deals', label: 'Deals', page: 'deals' },
  ];

  const getActivePage = () => {
    for (const link of navLinks) {
        if (pathname.startsWith(link.href)) {
            return link.page;
        }
    }
    if (pathname === '/') return 'home';
    return '';
  }

  const activePage = getActivePage();

  return (
    <header className="fixed top-0 w-full bg-surface-container-lowest/80 backdrop-blur-xl z-50 shadow-lg shadow-black/20">
      <div className="flex justify-between items-center px-4 sm:px-8 h-20">
        <div className="flex items-center gap-8">
          <Link href="/" className="text-2xl font-bold tracking-tighter text-on-surface font-headline">SpecNest</Link>
          <nav className="hidden md:flex items-center gap-6">
            {navLinks.map(link => (
              <Link
                key={link.href}
                href={link.href}
                className={`font-manrope text-sm tracking-tight transition-all duration-300 ${activePage === link.page ? 'text-primary border-b-2 border-primary pb-1' : 'text-on-surface-variant hover:text-on-surface'}`}>
                {link.label}
              </Link>
            ))}
          </nav>
        </div>
        <div className="flex items-center gap-3 sm:gap-5">
          <div className="hidden sm:block">
            <Search />
          </div>
          <Link href="/cart" className="material-symbols-outlined text-on-surface-variant hover:text-on-surface transition-all scale-95 active:scale-90">shopping_cart</Link>
          <Link href="/account" className="material-symbols-outlined text-on-surface-variant hover:text-on-surface transition-all scale-95 active:scale-90">person</Link>
          <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="md:hidden material-symbols-outlined text-on-surface-variant hover:text-on-surface transition-all">
            {isMenuOpen ? 'close' : 'menu'}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-surface-container-low absolute w-full shadow-inner">
          <div className="px-4 py-2 sm:hidden">
              <Search />
          </div>
          <nav className="flex flex-col items-center py-4">
            {navLinks.map(link => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setIsMenuOpen(false)}
                className={`w-full text-center py-4 font-manrope tracking-tight transition-all duration-300 ${activePage === link.page ? 'text-primary bg-primary/10' : 'text-on-surface-variant hover:bg-surface-container'}`}>
                {link.label}
              </Link>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
}
