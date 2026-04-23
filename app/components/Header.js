'use client';

import Link from 'next/link';
import Search from './Search';

export default function Header({ activePage = 'home' }) {
  return (
    <header className="fixed top-0 w-full flex justify-between items-center px-8 h-20 bg-[#111125]/70 backdrop-blur-xl z-50 shadow-2xl shadow-black/20">
      <div className="flex items-center gap-8">
        <Link href="/" className="text-2xl font-bold tracking-tighter text-[#e2e0fc] font-headline">SpecNest</Link>
        <nav className="hidden md:flex items-center gap-6">
          <Link className={`font-manrope text-sm tracking-tight transition-all duration-300 ${activePage === 'laptops' ? 'text-[#b3c5ff] border-b-2 border-[#b3c5ff] pb-1' : 'text-[#e2e0fc]/70 hover:text-[#e2e0fc]'}`} href="/catalog">Laptops</Link>
          <Link className={`font-manrope text-sm tracking-tight transition-all duration-300 ${activePage === 'desktops' ? 'text-[#b3c5ff] border-b-2 border-[#b3c5ff] pb-1' : 'text-[#e2e0fc]/70 hover:text-[#e2e0fc]'}`} href="/catalog/desktops">Desktops</Link>
          <Link className={`font-manrope text-sm tracking-tight transition-all duration-300 ${activePage === 'components' ? 'text-[#b3c5ff] border-b-2 border-[#b3c5ff] pb-1' : 'text-[#e2e0fc]/70 hover:text-[#e2e0fc]'}`} href="/component-library">Components</Link>
          <Link className={`font-manrope text-sm tracking-tight transition-all duration-300 ${activePage === 'deals' ? 'text-[#b3c5ff] border-b-2 border-[#b3c5ff] pb-1' : 'text-[#e2e0fc]/70 hover:text-[#e2e0fc]'}`} href="/deals">Deals</Link>
        </nav>
      </div>
      <div className="flex items-center gap-5">
        <Search />
        <Link href="/cart" className="material-symbols-outlined text-[#e2e0fc]/70 hover:text-[#e2e0fc] transition-all scale-95 active:scale-90">shopping_cart</Link>
        <Link href="/account" className="material-symbols-outlined text-[#e2e0fc]/70 hover:text-[#e2e0fc] transition-all scale-95 active:scale-90">person</Link>
      </div>
    </header>
  );
}