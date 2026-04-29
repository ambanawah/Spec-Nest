'use client';

import { useState, useEffect, Suspense } from 'react';
import { useSearchParams, useRouter, usePathname } from 'next/navigation';
import Header from '../components/Header';
import Footer from '../components/Footer';
import ProductCard from '../components/ProductCard';
import { useCurrency } from '../context/CurrencyContext';

function Catalog() {
    const searchParams = useSearchParams();
    const router = useRouter();
    const pathname = usePathname();
    const { currency } = useCurrency();

    const [products, setProducts] = useState([]);
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true);
    const [filters, setFilters] = useState({
        category: searchParams.get('category') || '',
        sortBy: searchParams.get('sortBy') || 'price',
        sortOrder: searchParams.get('sortOrder') || 'asc',
    });

    useEffect(() => {
        fetch('/api/categories')
            .then(r => r.json())
            .then(data => { if (Array.isArray(data)) setCategories(data); })
            .catch(() => {});
    }, []);

    useEffect(() => {
        setLoading(true);
        const params = new URLSearchParams();
        if (filters.category) params.set('category', filters.category);
        params.set('sortBy', filters.sortBy);
        params.set('sortOrder', filters.sortOrder);
        params.set('currency', currency);

        router.push(`${pathname}?${params.toString()}`, { scroll: false });

        fetch(`/api/products?${params.toString()}`)
            .then(r => r.json())
            .then(data => setProducts(Array.isArray(data) ? data : []))
            .catch(() => setProducts([]))
            .finally(() => setLoading(false));
    }, [filters, currency]);

    const handleFilterChange = (e) => {
        const { name, value } = e.target;
        setFilters(prev => ({ ...prev, [name]: value }));
    };

    return (
        <>
            <Header />
            <main className="pt-24 pb-16">
                <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid md:grid-cols-4 gap-8">
                        <aside className="md:col-span-1 bg-surface-container-low p-6 rounded-xl self-start top-24 sticky">
                            <h3 className="font-headline text-xl font-bold text-on-surface mb-6">Filters</h3>
                            <div className="space-y-6">
                                <div>
                                    <label htmlFor="category" className="block text-sm font-medium text-on-surface-variant mb-2">Category</label>
                                    <select name="category" id="category" value={filters.category} onChange={handleFilterChange} className="w-full px-4 py-3 bg-surface-container-high rounded-lg focus:outline-none focus:ring-2 focus:ring-primary">
                                        <option value="">All</option>
                                        {categories.map(cat => (
                                            <option key={cat.id} value={cat.slug}>{cat.name}</option>
                                        ))}
                                    </select>
                                </div>
                                <div>
                                    <label htmlFor="sortBy" className="block text-sm font-medium text-on-surface-variant mb-2">Sort By</label>
                                    <select name="sortBy" id="sortBy" value={filters.sortBy} onChange={handleFilterChange} className="w-full px-4 py-3 bg-surface-container-high rounded-lg focus:outline-none focus:ring-2 focus:ring-primary">
                                        <option value="price">Price</option>
                                        <option value="name">Name</option>
                                    </select>
                                </div>
                                <div>
                                    <label htmlFor="sortOrder" className="block text-sm font-medium text-on-surface-variant mb-2">Order</label>
                                    <select name="sortOrder" id="sortOrder" value={filters.sortOrder} onChange={handleFilterChange} className="w-full px-4 py-3 bg-surface-container-high rounded-lg focus:outline-none focus:ring-2 focus:ring-primary">
                                        <option value="asc">Ascending</option>
                                        <option value="desc">Descending</option>
                                    </select>
                                </div>
                            </div>
                        </aside>

                        <div className="md:col-span-3">
                            {loading ? (
                                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                                    {[...Array(6)].map((_, i) => (
                                        <div key={i} className="bg-surface-container-low rounded-xl p-6 animate-pulse">
                                            <div className="h-40 bg-surface-container-high rounded-lg mb-4"></div>
                                            <div className="h-6 bg-surface-container-high rounded-md w-3/4 mb-2"></div>
                                            <div className="h-4 bg-surface-container-high rounded-md w-1/2"></div>
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                                    {products.map(product => (
                                        <ProductCard key={product.id} product={product} />
                                    ))}
                                </div>
                            )}
                            {products.length === 0 && !loading && (
                                <div className="text-center col-span-full py-24">
                                    <p className="text-on-surface-variant">No products found matching your criteria.</p>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </main>
            <Footer />
        </>
    );
}

export default function CatalogPage() {
    return (
        <Suspense fallback={<div className="pt-24 text-center text-on-surface-variant">Loading...</div>}>
            <Catalog />
        </Suspense>
    );
}
