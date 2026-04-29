"use client";

import { useState, useEffect, Suspense } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import ProductCard from '../components/ProductCard';
import { useSearchParams, useRouter, usePathname } from 'next/navigation';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';

function Catalog() {
    const searchParams = useSearchParams();
    const router = useRouter();
    const pathname = usePathname();

    const [products, setProducts] = useState([]);
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true);
    const [filters, setFilters] = useState({
        category: searchParams.get('category') || '',
        sortBy: searchParams.get('sortBy') || 'price',
        sortOrder: searchParams.get('sortOrder') || 'asc',
    });

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const res = await fetch(`${API_URL}/api/categories`);
                const data = await res.json();
                setCategories(data);
            } catch (error) {
                console.error("Failed to fetch categories:", error);
            }
        };
        fetchCategories();
    }, []);

    useEffect(() => {
        const fetchProducts = async () => {
            setLoading(true);
            const params = new URLSearchParams();
            if (filters.category) params.set('category', filters.category);
            if (filters.sortBy) params.set('sortBy', filters.sortBy);
            if (filters.sortOrder) params.set('sortOrder', filters.sortOrder);

            // Update URL
            const newUrl = `${pathname}?${params.toString()}`;
            router.push(newUrl, { scroll: false });

            try {
                const res = await fetch(`${API_URL}/api/products?${params.toString()}`);
                const data = await res.json();
                setProducts(data);
            } catch (error) {
                console.error("Failed to fetch products:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchProducts();
    }, [filters]);

    const handleFilterChange = (e) => {
        const { name, value } = e.target;
        setFilters(prev => ({ ...prev, [name]: value }));
    };

    return (
        <>
            <Header activePage="catalog" />
            <main className="pt-24 pb-16">
                 <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8">
                     <div className="grid md:grid-cols-4 gap-8">
                        {/* Filters Sidebar */}
                        <aside className="md:col-span-1 bg-surface-container-low p-6 rounded-xl self-start top-24 sticky">
                           <h3 className="font-headline text-xl font-bold text-on-surface mb-6">Filters</h3>
                           <div className="space-y-6">
                                <div>
                                   <label htmlFor="category" className="block text-sm font-medium text-on-surface-variant mb-2">Category</label>
                                   <select name="category" id="category" value={filters.category} onChange={handleFilterChange} className="w-full px-4 py-3 bg-surface-container-high rounded-lg focus:outline-none focus:ring-2 focus:ring-primary">
                                       <option value="">All</option>
                                        {categories.map(cat => (
                                           <option key={cat.id} value={cat.name}>{cat.name}</option>
                                       ))}
                                   </select>
                               </div>
                                <div>
                                   <label htmlFor="sortBy" className="block text-sm font-medium text-on-surface-variant mb-2">Sort By</label>
                                   <select name="sortBy" id="sortBy" value={filters.sortBy} onChange={handleFilterChange} className="w-full px-4 py-3 bg-surface-container-high rounded-lg focus:outline-none focus:ring-2 focus:ring-primary">
                                       <option value="price">Price</option>
                                       <option value="name">Name</option>
                                       <option value="created_at">Newest</option>
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

                        {/* Products Grid */}
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
        // The new App Router in Next.js requires you to use a Client Component to use searchParams.
        // A common pattern is to create a client component that reads the searchParams and then passes them to a server component.
        // However, for simplicity in this case where the whole page is interactive, we will make the whole page a client component.
        <Suspense fallback={<div>Loading...</div>}>
            <Catalog />
        </Suspense>
    );
}
