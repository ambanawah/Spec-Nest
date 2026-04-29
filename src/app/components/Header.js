'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import Search from './Search';
import { useCurrency } from '../context/CurrencyContext';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathname = usePathname();
  const { currency, setCurrency, currencies } = useCurrency();

  const navLinks = [
    { href: '/catalog/laptops', label: 'Laptops', page: 'laptops' },
    { href: '/catalog/desktops', label: 'Desktops', page: 'desktops' },
    { href: '/rapid-parts', label: 'Components', page: 'rapid-parts' },
    { href: '/deals', label: 'Deals', page: 'deals' },
  ];

  const activePage = navLinks.find(l => pathname.startsWith(l.href))?.page
    ?? (pathname === '/' ? 'home' : '');

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
          <select
            value={currency}
            onChange={e => setCurrency(e.target.value)}
            className="bg-surface-container-low border border-outline-variant/30 text-on-surface-variant font-label text-[10px] uppercase tracking-widest focus:ring-1 focus:ring-primary rounded-sm px-2 py-1 cursor-pointer">
            {currencies.map(c => (
              <option key={c.currency_code} value={c.currency_code}>
                {c.currency_code} — {c.currency_name}
              </option>
            ))}
          </select>
          <Link href="/cart" className="material-symbols-outlined text-on-surface-variant hover:text-on-surface transition-all scale-95 active:scale-90">shopping_cart</Link>
          <Link href="/account" className="material-symbols-outlined text-on-surface-variant hover:text-on-surface transition-all scale-95 active:scale-90">person</Link>
          <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="md:hidden material-symbols-outlined text-on-surface-variant hover:text-on-surface transition-all">
            {isMenuOpen ? 'close' : 'menu'}
          </button>
        </div>
      </div>

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
