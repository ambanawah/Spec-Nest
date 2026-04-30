'use client';
import { useState, useEffect } from 'react';
import ComparisonTray from '../components/ComparisonTray';
import Footer from '../components/Footer';
import Header from '../components/Header';
import ProductCard from '../components/ProductCard';
import { useCart } from '../cart/CartContext';
import { useCurrency } from '../context/CurrencyContext';

export default function RapidPartsPage() {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [sortBy, setSortBy] = useState('price');
    const [sortOrder, setSortOrder] = useState('asc');
    const { addToCart } = useCart();
    const { currency } = useCurrency();

    useEffect(() => {
        setLoading(true);
        const params = new URLSearchParams({ category: 'components', sortBy, sortOrder, currency });
        fetch(`/api/products?${params}`)
            .then(r => r.json())
            .then(data => setProducts(Array.isArray(data) ? data : []))
            .catch(() => setProducts([]))
            .finally(() => setLoading(false));
    }, [sortBy, sortOrder, currency]);

    const handleSortChange = (e) => {
        const val = e.target.value;
        if (val === 'price_asc') { setSortBy('price'); setSortOrder('asc'); }
        else if (val === 'price_desc') { setSortBy('price'); setSortOrder('desc'); }
        else if (val === 'name') { setSortBy('name'); setSortOrder('asc'); }
    };

    return (
        <>
            <Header />
            <main className="pt-24 pb-32 min-h-screen px-4 md:px-8 max-w-[1600px] mx-auto flex flex-col md:flex-row gap-8">
                <aside className="w-full md:w-72 flex-shrink-0">
                    <div className="sticky top-28 space-y-8">
                        <div className="flex items-center justify-between">
                            <h2 className="font-label text-xs uppercase tracking-widest text-primary">Refine Specs</h2>
                        </div>
                        <div className="space-y-4">
                            <label className="font-label text-xs uppercase tracking-widest text-on-surface-variant">Price Range</label>
                            <div className="h-1 bg-surface-container-highest rounded-full relative">
                                <div className="absolute left-1/4 right-1/4 h-full bg-primary-container"></div>
                                <div className="absolute left-1/4 top-1/2 -translate-y-1/2 w-3 h-3 bg-primary rounded-full shadow-lg cursor-pointer"></div>
                                <div className="absolute right-1/4 top-1/2 -translate-y-1/2 w-3 h-3 bg-primary rounded-full shadow-lg cursor-pointer"></div>
                            </div>
                            <div className="flex justify-between font-label text-[10px] text-on-surface-variant">
                                <span>$10</span><span>$1500</span>
                            </div>
                        </div>
                        <div className="space-y-3">
                            <label className="font-label text-xs uppercase tracking-widest text-on-surface-variant">Component Type</label>
                            <div className="grid grid-cols-2 gap-2">
                                <button className="bg-primary-container text-on-primary-container font-label text-[10px] py-2 rounded-sm tracking-widest uppercase">CPU</button>
                                <button className="bg-surface-container-highest text-on-surface-variant font-label text-[10px] py-2 rounded-sm tracking-widest uppercase hover:bg-surface-bright transition-colors">GPU</button>
                                <button className="bg-surface-container-highest text-on-surface-variant font-label text-[10px] py-2 rounded-sm tracking-widest uppercase hover:bg-surface-bright transition-colors">RAM</button>
                                <button className="bg-surface-container-highest text-on-surface-variant font-label text-[10px] py-2 rounded-sm tracking-widest uppercase hover:bg-surface-bright transition-colors">Motherboard</button>
                            </div>
                        </div>
                    </div>
                </aside>

                <section className="flex-1 space-y-8">
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                        <div>
                            <h1 className="font-headline text-3xl font-extrabold tracking-tighter text-on-surface">Rapid Parts</h1>
                            <p className="text-on-surface-variant text-sm font-body">
                                {loading ? 'Loading...' : `${products.length} components`}
                            </p>
                        </div>
                        <div className="flex items-center gap-4">
                            <span className="font-label text-[10px] uppercase tracking-widest text-on-surface-variant">Sort By:</span>
                            <select
                                onChange={handleSortChange}
                                defaultValue="price_asc"
                                className="bg-surface-container-low border-none text-primary font-label text-[10px] uppercase tracking-widest focus:ring-0 cursor-pointer">
                                <option value="price_asc">Price (Low–High)</option>
                                <option value="price_desc">Price (High–Low)</option>
                                <option value="name">Name</option>
                            </select>
                        </div>
                    </div>

                    {loading ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                            {[...Array(4)].map((_, i) => (
                                <div key={i} className="bg-surface-container-low rounded-xl p-6 animate-pulse">
                                    <div className="h-40 bg-surface-container-high rounded-lg mb-4"></div>
                                    <div className="h-6 bg-surface-container-high rounded-md w-3/4 mb-2"></div>
                                    <div className="h-4 bg-surface-container-high rounded-md w-1/2"></div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                            {products.map(product => (
                                <ProductCard key={product.id} product={product} onAddToCart={() => addToCart(product)} />
                            ))}
                        </div>
                    )}

                    {products.length === 0 && !loading && (
                        <p className="text-center text-on-surface-variant py-24">No components found.</p>
                    )}
                </section>
            </main>
            <ComparisonTray />
            <Footer />
        </>
    );
}
