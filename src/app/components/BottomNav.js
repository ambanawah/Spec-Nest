'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

const BottomNav = () => {
    const pathname = usePathname();

    const navItems = [
        { href: '/', icon: 'home', label: 'Home', page: 'home' },
        { href: '/catalog', icon: 'laptop_chromebook', label: 'Laptops', page: 'laptops' },
        { href: '/build', icon: 'build', label: 'Build', page: 'build' },
        { href: '/deals', icon: 'sell', label: 'Deals', page: 'deals' },
        { href: '/cart', icon: 'shopping_cart', label: 'Cart', page: 'cart' },
    ];

    const getActivePage = () => {
        if (pathname === '/') return 'home';
        for (const item of navItems) {
            if (item.href !== '/' && pathname.startsWith(item.href)) {
                return item.page;
            }
        }
        return '';
    }

    const activePage = getActivePage();

    return (
        <nav className="fixed bottom-0 left-0 w-full bg-surface-container/90 backdrop-blur-lg border-t border-outline-variant/20 shadow-lg z-40 md:hidden">
            <div className="flex justify-around items-center h-20">
                {navItems.map(item => (
                    <Link key={item.href} href={item.href} className={`flex flex-col items-center gap-1 transition-colors ${activePage === item.page ? 'text-primary' : 'text-on-surface-variant hover:text-on-surface'}`}>
                        <span className="material-symbols-outlined text-2xl">{item.icon}</span>
                        <span className="font-label text-[10px] uppercase tracking-widest">{item.label}</span>
                    </Link>
                ))}
            </div>
        </nav>
    );
};

export default BottomNav;
